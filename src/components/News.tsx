
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articlesAPI, Article } from '../lib/supabase';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export function News() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const data = await articlesAPI.getAll();
      setArticles((data || []).filter(a => a.published));
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="w-full py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Memuat berita...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-in">
          <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider mb-4 inline-block">
            Berita & Artikel
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight tracking-tight">
            Berita Terbaru
          </h2>
          <div className="w-16 h-1 bg-orange-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-500 text-xl max-w-3xl mx-auto leading-relaxed">
            Informasi terkini dari kegiatan OSIS SMAN 13 Depok
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full">
                <span className="text-4xl">📰</span>
              </div>
              <div>
                <p className="text-sm font-mono bg-slate-900 text-green-400 px-4 py-2 rounded-lg inline-block mb-4">
                  ERROR_404_NO_ARTICLES_FOUND
                </p>
                <h3 className="text-2xl font-bold text-slate-800 mb-2 mt-4">Belum Ada Berita</h3>
                <p className="text-slate-500 italic text-lg">
                  "Berita seperti admin kami... masih loading di surga! 😇"
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <article
                key={article.id}
                className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden group hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-orange-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-orange-600 transition-colors duration-300 leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 mb-6 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-slate-400 mb-6 pb-6 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{new Date(article.created_at).toLocaleDateString('id-ID')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>3 menit</span>
                    </div>
                  </div>

                  <Link
                    to={`/article/${article.id}`}
                    className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-3 group/btn transition-colors duration-300"
                  >
                    Baca Selengkapnya
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="text-center mt-16 animate-fade-in">
          <Link
            to="/news"
            className="bg-slate-800 text-white hover:bg-slate-700 font-semibold px-10 py-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-block"
          >
            Lihat Semua Berita
          </Link>
        </div>
      </div>
    </section>
  );
}