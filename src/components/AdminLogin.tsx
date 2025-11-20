import { useState } from 'react'
import { LogIn, Eye, EyeOff } from 'lucide-react'

interface AdminLoginProps {
  onLogin: () => void
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // For demo purposes, using simple email/password check
      // In production, you'd use Supabase Auth
      if (email === 'admin@osis-smans13depok.com' && password === 'admin123') {
        localStorage.setItem('adminAuthenticated', 'true')
        onLogin()
      } else {
        setError('Email atau password salah')
      }
    } catch (err) {
      setError('Terjadi kesalahan saat login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/Tangkapan_Layar_2025-11-19_pukul_20.11.45.png"
            alt="SMAN 13 DEPOK Logo"
            className="h-16 w-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-slate-600">OSIS SMAN 13 Depok</p>
        </div>

        {/* Login Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-6 text-center">
            Masuk ke Dashboard
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="admin@osis-smans13depok.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white py-3 px-6 rounded-xl hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Masuk...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Masuk
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-xl">
            <h3 className="text-sm font-medium text-orange-800 mb-1">Demo Credentials</h3>
            <p className="text-xs text-orange-700">
              Email: admin@osis-smans13depok.com<br />
              Password: admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
