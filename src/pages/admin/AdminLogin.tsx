import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { authService } from '../../services/auth'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await authService.signIn(form)
    setLoading(false)

    if (result.ok) {
      navigate('/admin')
    } else {
      setError(result.error || 'Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="border-2 border-primary bg-surface p-8 md:p-10">
          <h1 className="font-headline-lg text-[28px] uppercase tracking-tighter mb-2">
            Admin Login
          </h1>
          <p className="font-body-md text-body-md text-secondary mb-8">
            LUCIR Editorial Management
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-label-caps text-label-caps uppercase mb-2 block">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full bg-transparent border border-primary px-4 py-3 font-body-md text-body-md focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-label-caps uppercase mb-2 block">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full bg-transparent border border-primary px-4 py-3 font-body-md text-body-md focus:outline-none"
              />
            </div>

            {error && (
              <div className="bg-error/10 border border-error px-4 py-3">
                <p className="font-body-md text-[13px] text-error">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary py-3 font-label-caps text-label-caps uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="font-body-md text-[12px] text-secondary hover:text-primary transition-colors"
            >
              ← Back to site
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
