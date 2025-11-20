import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Database types
export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  image_url: string
  category: string
  author: string
  created_at: string
  updated_at: string
  published: boolean
}

export interface AdminUser {
  id: string
  email: string
  role: 'admin' | 'editor'
  created_at: string
}

// Local Storage Helper Functions (untuk fallback jika Supabase tidak tersedia)
const ARTICLES_STORAGE_KEY = 'osis_articles'

export const articlesAPI = {
  async getAll() {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false })
        if (error) throw error
        return data || []
      } catch (error) {
        console.warn('Supabase fetch failed, using local storage:', error)
        return this.getAllLocal()
      }
    }
    return this.getAllLocal()
  },

  async create(article: Omit<Article, 'id' | 'created_at' | 'updated_at'>) {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('articles')
          .insert([article])
          .select()
        if (error) throw error
        return data?.[0] || null
      } catch (error) {
        console.warn('Supabase insert failed, using local storage:', error)
        return this.createLocal(article)
      }
    }
    return this.createLocal(article)
  },

  async update(id: string, article: Partial<Article>) {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('articles')
          .update(article)
          .eq('id', id)
          .select()
        if (error) throw error
        return data?.[0] || null
      } catch (error) {
        console.warn('Supabase update failed, using local storage:', error)
        return this.updateLocal(id, article)
      }
    }
    return this.updateLocal(id, article)
  },

  async delete(id: string) {
    if (supabase) {
      try {
        const { error } = await supabase
          .from('articles')
          .delete()
          .eq('id', id)
        if (error) throw error
        return true
      } catch (error) {
        console.warn('Supabase delete failed, using local storage:', error)
        return this.deleteLocal(id)
      }
    }
    return this.deleteLocal(id)
  },

  // Local Storage Methods
  getAllLocal(): Article[] {
    try {
      const data = localStorage.getItem(ARTICLES_STORAGE_KEY)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },

  createLocal(article: Omit<Article, 'id' | 'created_at' | 'updated_at'>): Article {
    const newArticle: Article = {
      ...article,
      id: `local_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    const articles = this.getAllLocal()
    articles.push(newArticle)
    localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(articles))
    return newArticle
  },

  updateLocal(id: string, updates: Partial<Article>): Article | null {
    const articles = this.getAllLocal()
    const index = articles.findIndex(a => a.id === id)
    if (index === -1) return null
    
    articles[index] = {
      ...articles[index],
      ...updates,
      updated_at: new Date().toISOString()
    }
    localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(articles))
    return articles[index]
  },

  deleteLocal(id: string): boolean {
    const articles = this.getAllLocal()
    const filtered = articles.filter(a => a.id !== id)
    localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(filtered))
    return true
  }
}

// Image Upload API
export const imageAPI = {
  async uploadImage(file: File): Promise<string> {
    if (!supabase) {
      // Fallback: Convert to base64 for local storage
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    }

    try {
      const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`
      const { error } = await supabase.storage
        .from('article-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) throw error

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(fileName)

      return publicUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  },

  async deleteImage(imageUrl: string): Promise<boolean> {
    if (!supabase || imageUrl.startsWith('data:')) {
      // Skip deletion for local storage/base64 images
      return true
    }

    try {
      // Extract filename from URL
      const fileName = imageUrl.split('/').pop()
      if (!fileName) return false

      const { error } = await supabase.storage
        .from('article-images')
        .remove([fileName])

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting image:', error)
      return false
    }
  }
}
