import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative w-full bg-slate-50 text-slate-800 overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{
        backgroundImage: "url(bg.avif)"
      }} />
      <div className="relative container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-8 hover:bg-orange-200 transition-colors duration-300">
            ✨ Selamat Datang
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
            HALO, SMANTISZEN!
          </h1>
          <p className="text-xl md:text-2xl font-light mb-6 text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Website OSIS SMAN 13 Depok
          </p>
          <p className="text-lg md:text-xl mb-12 text-slate-500 leading-relaxed max-w-3xl mx-auto">
            Organisasi Siswa Intra Sekolah yang mewadahi aspirasi dan kegiatan
            siswa SMAN 13 Depok
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-slate-800 text-white hover:bg-slate-700 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 group hover:scale-105">
              Tentang Kami
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="bg-transparent border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105">
              Program Kerja
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}