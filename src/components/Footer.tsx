
import { Instagram, Youtube, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="animate-fade-in">
            <div className="flex items-center gap-4 mb-8">
              <img
                src="/Tangkapan_Layar_2025-11-19_pukul_20.11.45.png"
                alt="SMAN 13 DEPOK Logo"
                className="h-16 w-16 rounded-xl shadow-lg"
              />
              <div>
                <h3 className="text-2xl font-bold text-white">SMAN 13 DEPOK</h3>
                <p className="text-sm text-slate-400 font-medium">Student Council</p>
              </div>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed text-lg">
              Organisasi Siswa Intra Sekolah yang mewadahi aspirasi dan kegiatan
              siswa SMAN 13 Depok.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/osissman13dpk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-orange-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram size={22} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-orange-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Twitter size={22} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-orange-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Youtube size={22} />
              </a>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h3 className="text-xl font-bold text-white mb-8">Tautan Cepat</h3>
            <ul className="space-y-4">
              {[
                { to: '/', label: 'Beranda' },
                { to: '/about', label: 'Tentang Kami' },
                { to: '/news', label: 'Berita' },
                { to: '/contact', label: 'Kontak' }
              ].map((link, ) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-orange-400 transition-colors duration-300 flex items-center gap-3 group hover:translate-x-1"
                  >
                    <span className="w-2 h-2 rounded-full bg-orange-600 group-hover:scale-125 transition-transform duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h3 className="text-xl font-bold text-white mb-8">Program</h3>
            <ul className="space-y-4">
              {['Kegiatan Akademik', 'Ekstrakurikuler', 'Organisasi', 'Kompetisi'].map((program, ) => (
                <li key={program}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-orange-400 transition-colors duration-300 flex items-center gap-3 group hover:translate-x-1"
                  >
                    <span className="w-2 h-2 rounded-full bg-orange-600 group-hover:scale-125 transition-transform duration-300"></span>
                    {program}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <h3 className="text-xl font-bold text-white mb-8">Kontak</h3>
            <ul className="space-y-6">
              <li className="flex gap-4 text-slate-400">
                <MapPin size={24} className="flex-shrink-0 mt-1 text-orange-500" />
                <span className="leading-relaxed">SMAN 13 Depok, Jl. Pedurenan, Cisalak Pasar</span>
              </li>
              <li className="flex gap-4 text-slate-400">
                <Phone size={24} className="flex-shrink-0 text-orange-500" />
                <span>(021) 7777-8888</span>
              </li>
              <li className="flex gap-4 text-slate-400">
                <Mail size={24} className="flex-shrink-0 text-orange-500" />
                <span>osissman13dpk@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-12 text-center">
          <p className="text-slate-500 text-lg">
            &copy; {currentYear} OSIS SMAN 13 Depok. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}