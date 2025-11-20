import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { articlesAPI, Article } from '../lib/supabase';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';

export function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    if (!id) {
      setError('ID artikel tidak valid');
      setLoading(false);
      return;
    }

    try {
      // Get all articles and find the one with matching ID
      const allArticles = await articlesAPI.getAll();
      const foundArticle = allArticles.find(a => a.id === id);

      if (!foundArticle) {
        setError('Artikel tidak ditemukan');
      } else if (!foundArticle.published) {
        setError('Artikel belum dipublikasikan');
      } else {
        setArticle(foundArticle);
      }
    } catch (err) {
      console.error('Error fetching article:', err);
      setError('Gagal memuat artikel');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Memuat artikel...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
              <span className="text-4xl">❌</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">Artikel Tidak Ditemukan</h1>
              <p className="text-slate-500 mb-6">{error}</p>
              <Link
                to="/news"
                className="inline-flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-xl hover:bg-slate-700 transition-colors"
              >
                <ArrowLeft size={18} />
                Kembali ke Berita
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full bg-slate-50 py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="mb-8">
                <Link
                  to="/news"
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-orange-600 transition-colors"
                >
                  <ArrowLeft size={18} />
                  Kembali ke Berita
                </Link>
              </nav>

              {/* Article Header */}
              <div className="text-center mb-12">
                <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider mb-4 inline-block">
                  {article.category}
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight tracking-tight">
                  {article.title}
                </h1>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Article Meta */}
                <div className="flex items-center justify-center gap-8 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{new Date(article.created_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>5 menit baca</span>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              {article.image_url && (
                <div className="mb-12">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-96 md:h-[500px] object-cover rounded-3xl shadow-2xl"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg prose-slate max-w-none">
                <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
                  <div 
                    className="text-slate-700 leading-relaxed ql-editor"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </div>
              </div>

              {/* Share & Navigation */}
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
                <Link
                  to="/news"
                  className="inline-flex items-center gap-2 bg-slate-800 text-white px-8 py-4 rounded-xl hover:bg-slate-700 transition-colors"
                >
                  <ArrowLeft size={18} />
                  Lihat Berita Lainnya
                </Link>

                <div className="flex items-center gap-4">
                  <span className="text-slate-600">Bagikan:</span>
                  <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    📘
                  </button>
                  <button className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                    📷
                  </button>
                  <button className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                    🐦
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
