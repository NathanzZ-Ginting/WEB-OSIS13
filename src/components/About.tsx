
import { Users, Target, Award, TrendingUp } from 'lucide-react';

export function About() {
  const benefits = [
    {
      icon: Users,
      title: 'Kepemimpinan',
      description: 'Pengembangan kepemimpinan dan manajemen organisasi'
    },
    {
      icon: Target,
      title: 'Kerja Tim',
      description: 'Kemampuan bekerja dalam tim dengan berbagai karakter'
    },
    {
      icon: Award,
      title: 'Keterampilan',
      description: 'Keterampilan komunikasi dan problem solving'
    },
    {
      icon: TrendingUp,
      title: 'Networking',
      description: 'Membangun jaringan dan koneksi yang luas'
    }
  ];

  return (
    <section className="w-full py-24 md:py-32 bg-slate-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-in">
          <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider mb-4 inline-block">
            Tentang OSIS
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight tracking-tight">
            Kenapa Harus Masuk OSIS?
          </h2>
          <div className="w-16 h-1 bg-orange-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="order-2 lg:order-1 space-y-8 animate-fade-in">
            <p className="text-slate-600 text-xl leading-relaxed">
              Buat kamu yang sebelumnya belum pernah bergabung dan mencoba masuk
              ke dalam organisasi, OSIS menjadi pilihan yang tepat untuk kamu
              belajar berorganisasi di masa sekolah.
            </p>
            <p className="text-slate-600 text-xl leading-relaxed">
              Dalam organisasi kamu akan dilibatkan dengan beberapa tim dan
              beradaptasi dengan berbagai karakter rekan kerjamu. Kamu akan
              mendapatkan pengalaman berharga dalam:
            </p>
            <ul className="space-y-4">
              {[
                'Pengembangan kepemimpinan dan manajemen',
                'Kemampuan bekerja dalam tim',
                'Keterampilan komunikasi',
                'Kreativitas dan pemecahan masalah',
                'Membangun jaringan dan koneksi'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4 text-slate-600">
                  <div className="mt-1 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-orange-600"></div>
                  </div>
                  <span className="text-lg leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <button className="bg-slate-800 text-white hover:bg-slate-700 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mt-8 hover:scale-105">
              Pelajari Lebih Lanjut
            </button>
          </div>

          <div className="order-1 lg:order-2 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-200/30 rounded-3xl transform rotate-2 hover:rotate-1 transition-transform duration-500"></div>
              <img
                src="/OSIS.avif"
                alt="Pengurus OSIS SMAN 13 Depok"
                className="relative w-full h-auto rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-500"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <span className="text-4xl mb-4">🏆</span>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Manfaat Tidak Tersedia</h3>
              <p className="text-slate-500">
                Data manfaat OSIS sedang dalam proses pembaruan. Silakan kembali lagi nanti.
              </p>
            </div>
          ) : (
            benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 group hover:border-orange-200 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-100 transition-colors duration-300 group-hover:scale-110">
                  <benefit.icon className="text-orange-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}