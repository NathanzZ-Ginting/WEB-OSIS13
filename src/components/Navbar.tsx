import { useState } from 'react';
import { Instagram, Youtube, Twitter, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-slate-100">
      <div className="container mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/logo.avif"
            alt="SMAN 13 DEPOK Logo"
            className="h-12 w-12 rounded-lg shadow-sm hover:scale-105 transition-transform duration-300 object-cover object-center"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
              SMAN 13 DEPOK
            </h1>
            <p className="text-sm text-slate-500 font-medium">Student Council</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-slate-700 hover:text-orange-600 font-medium transition-all duration-300 hover:scale-105 relative group"
          >
            Beranda
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/about"
            className="text-slate-700 hover:text-orange-600 font-medium transition-all duration-300 hover:scale-105 relative group"
          >
            Tentang
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/news"
            className="text-slate-700 hover:text-orange-600 font-medium transition-all duration-300 hover:scale-105 relative group"
          >
            Berita
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/contact"
            className="text-slate-700 hover:text-orange-600 font-medium transition-all duration-300 hover:scale-105 relative group"
          >
            Kontak
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Social Media Icons - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://instagram.com/osissman13dpk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-orange-600 transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-orange-50"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-orange-600 transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-orange-50"
          >
            <Twitter size={20} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-orange-600 transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-orange-50"
          >
            <Youtube size={20} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-700 hover:text-orange-600 transition-colors duration-300 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm py-6 px-6 shadow-lg border-t border-slate-100 animate-in slide-in-from-top-2 duration-300">
          <nav className="flex flex-col gap-5">
            <Link
              to="/"
              className="text-slate-700 hover:text-orange-600 font-medium transition-colors duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Beranda
            </Link>
            <Link
              to="/about"
              className="text-slate-700 hover:text-orange-600 font-medium transition-colors duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Tentang
            </Link>
            <Link
              to="/news"
              className="text-slate-700 hover:text-orange-600 font-medium transition-colors duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Berita
            </Link>
            <Link
              to="/contact"
              className="text-slate-700 hover:text-orange-600 font-medium transition-colors duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Kontak
            </Link>
          </nav>
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-200">
            <a
              href="https://instagram.com/osissman13dpk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-orange-600 transition-colors duration-300 p-2 rounded-full hover:bg-orange-50"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-orange-600 transition-colors duration-300 p-2 rounded-full hover:bg-orange-50"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-orange-600 transition-colors duration-300 p-2 rounded-full hover:bg-orange-50"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}