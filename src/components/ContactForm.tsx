import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare, MapPin, Phone, CheckCircle } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'osissman13dpk@gmail.com',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: MapPin,
      title: 'Alamat',
      value: 'SMAN 13 Depok, Jl. Pedurenan, Cisalak Pasar',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Phone,
      title: 'Telepon',
      value: '(021) 7777-8888',
      color: 'bg-green-100 text-green-600'
    }
  ];

  return (
    <section className="w-full py-24 md:py-32 bg-slate-50" id="contact">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider mb-4 inline-block">
              Kontak
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight tracking-tight">
              Hubungi Kami
            </h2>
            <div className="w-16 h-1 bg-orange-600 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-500 text-xl max-w-3xl mx-auto leading-relaxed">
              Ada pertanyaan atau saran? Jangan ragu untuk menghubungi kami.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-3xl shadow-lg p-10 border border-slate-100 animate-fade-in">
              {submitStatus === 'success' ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-500 mb-8 animate-bounce-subtle">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-4">
                    Pesan Terkirim!
                  </h3>
                  <p className="text-slate-500 text-lg leading-relaxed">
                    Terima kasih telah menghubungi kami. Kami akan segera merespons.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-3">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <User size={20} className="text-slate-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full pl-14 pr-5 py-4 border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:border-slate-300"
                        placeholder="Nama lengkap"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-3">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <Mail size={20} className="text-slate-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full pl-14 pr-5 py-4 border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:border-slate-300"
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-3">
                      Pesan
                    </label>
                    <div className="relative">
                      <div className="absolute top-5 left-5 flex items-center pointer-events-none">
                        <MessageSquare size={20} className="text-slate-400" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="block w-full pl-14 pr-5 py-4 border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:border-slate-300 resize-none"
                        placeholder="Tulis pesan anda disini..."
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center gap-3 py-5 px-8 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 hover:scale-105"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Kirim Pesan
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 p-8 border border-slate-100 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-5">
                    <div className={`w-16 h-16 rounded-2xl ${info.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">
                        {info.title}
                      </h3>
                      <p className="text-slate-500 leading-relaxed">{info.value}</p>
                    </div>
                  </div>
                </div>
              ))}
              {contactInfo.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <span className="text-4xl mb-4">📵</span>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Informasi Kontak Tidak Tersedia</h3>
                  <p className="text-slate-500">
                    Mohon hubungi admin sekolah untuk informasi kontak OSIS.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}