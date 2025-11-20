import { useState, useEffect } from 'react'
import { articlesAPI, imageAPI, Article } from '../lib/supabase'
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut, Save, X } from 'lucide-react'

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image_url: '',
    category: 'Umum',
    published: false
  })

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const data = await articlesAPI.getAll()
      setArticles(data || [])
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const articleData = {
        ...formData,
        author: 'Admin OSIS'
      }

      if (editingArticle) {
        await articlesAPI.update(editingArticle.id, articleData)
      } else {
        await articlesAPI.create(articleData)
      }

      await fetchArticles()
      resetForm()
    } catch (error) {
      console.error('Error saving article:', error)
      alert('Gagal menyimpan artikel')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (article: Article) => {
    setEditingArticle(article)
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      image_url: article.image_url,
      category: article.category,
      published: article.published
    })
    setImagePreview(article.image_url)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus artikel ini?')) return

    try {
      await articlesAPI.delete(id)
      await fetchArticles()
    } catch (error) {
      console.error('Error deleting article:', error)
      alert('Gagal menghapus artikel')
    }
  }

  const togglePublished = async (article: Article) => {
    try {
      await articlesAPI.update(article.id, { published: !article.published })
      await fetchArticles()
    } catch (error) {
      console.error('Error updating article:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      image_url: '',
      category: 'Umum',
      published: false
    })
    setImagePreview('')
    setEditingArticle(null)
    setShowForm(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const imageUrl = await imageAPI.uploadImage(file)
      setFormData({ ...formData, image_url: imageUrl })
      setImagePreview(imageUrl)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Gagal upload gambar. Pastikan file kurang dari 10MB.')
    } finally {
      setUploading(false)
    }
  }

  if (loading && articles.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Memuat dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/logo.avif"
              alt="Logo"
              className="h-10 w-10 object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-slate-800">Admin Dashboard</h1>
              <p className="text-sm text-slate-500">OSIS SMAN 13 Depok</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-800">{articles.length}</h3>
            <p className="text-slate-500">Total Artikel</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-2xl font-bold text-green-600">
              {articles.filter(a => a.published).length}
            </h3>
            <p className="text-slate-500">Artikel Published</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-2xl font-bold text-orange-600">
              {articles.filter(a => !a.published).length}
            </h3>
            <p className="text-slate-500">Artikel Draft</p>
          </div>
        </div>

        {/* Add Article Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Kelola Artikel</h2>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-xl hover:bg-slate-700 transition-colors"
          >
            <Plus size={18} />
            Tambah Artikel
          </button>
        </div>

        {/* Article Form */}
        {showForm && (
          <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800">
                {editingArticle ? 'Edit Artikel' : 'Tambah Artikel Baru'}
              </h3>
              <button
                onClick={resetForm}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Judul Artikel
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="Umum">Umum</option>
                    <option value="Akademik">Akademik</option>
                    <option value="Budaya">Budaya</option>
                    <option value="Teknologi">Teknologi</option>
                    <option value="Olahraga">Olahraga</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Ringkasan (Excerpt)
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Konten Lengkap
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={8}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Gambar Artikel
                </label>
                <div className="space-y-4">
                  {imagePreview && (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-slate-300">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview('')
                          setFormData({ ...formData, image_url: '' })
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )}
                  <label className="flex items-center justify-center gap-3 px-4 py-6 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-slate-400 transition-colors">
                    <span className="text-2xl">📸</span>
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-700">
                        Pilih atau drag gambar di sini
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        PNG, JPG, WebP (Max 10MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                  {uploading && (
                    <div className="flex items-center justify-center gap-2 py-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-600"></div>
                      <span className="text-sm text-slate-600">Uploading...</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({...formData, published: e.target.checked})}
                  className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="published" className="text-sm font-medium text-slate-700">
                  Publish artikel ini
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-xl hover:bg-slate-700 transition-colors disabled:opacity-50"
                >
                  <Save size={18} />
                  {loading ? 'Menyimpan...' : (editingArticle ? 'Update' : 'Simpan')}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Articles List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800">Daftar Artikel</h3>
          </div>

          {articles.length === 0 ? (
            <div className="p-12 text-center">
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full">
                  <span className="text-4xl">📋</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Belum Ada Artikel</h3>
                  <p className="text-slate-500">
                    Mulai dengan membuat artikel pertama untuk menampilkan konten di website.
                  </p>
                </div>
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-6 flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-xl hover:bg-slate-700 transition-colors"
                >
                  <Plus size={18} />
                  Buat Artikel Pertama
                </button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {articles.map((article) => (
                <div key={article.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-slate-800">{article.title}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          article.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {article.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm mb-2">{article.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>{article.category}</span>
                        <span>{new Date(article.created_at).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => togglePublished(article)}
                        className={`p-2 rounded-lg transition-colors ${
                          article.published
                            ? 'text-green-600 hover:bg-green-50'
                            : 'text-orange-600 hover:bg-orange-50'
                        }`}
                        title={article.published ? 'Unpublish' : 'Publish'}
                      >
                        {article.published ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                      <button
                        onClick={() => handleEdit(article)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
