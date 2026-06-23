import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { authService, type SignUpData, type SignInData } from '../services/auth'
import { useStore } from '../store/StoreContext'

interface AuthModalProps {
  open: boolean
  onClose: () => void
  initialMode?: 'signin' | 'signup'
}

export default function AuthModal({ open, onClose, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>(initialMode)
  const [loading, setLoading] = useState(false)
  const { showToast } = useStore()

  const [signInForm, setSignInForm] = useState<SignInData>({ email: '', password: '' })
  const [signUpForm, setSignUpForm] = useState<SignUpData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  })
  const [resetEmail, setResetEmail] = useState('')

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const result = await authService.signIn(signInForm)
    setLoading(false)

    if (result.ok) {
      showToast('Welcome back!', 'success')
      onClose()
      window.location.reload()
    } else {
      showToast(result.error || 'Sign in failed', 'error')
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const result = await authService.signUp(signUpForm)
    setLoading(false)

    if (result.ok) {
      showToast('Account created! Check your email to verify.', 'success')
      onClose()
    } else {
      showToast(result.error || 'Sign up failed', 'error')
    }
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const result = await authService.resetPassword(resetEmail)
    setLoading(false)

    if (result.ok) {
      showToast('Password reset email sent!', 'success')
      setMode('signin')
      setResetEmail('')
    } else {
      showToast(result.error || 'Reset failed', 'error')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface border-2 border-primary max-w-md w-full relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-primary hover:opacity-70 transition-opacity z-10"
              aria-label="Close"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="p-8 md:p-10">
              {mode === 'signin' && (
                <>
                  <h2 className="font-headline-lg text-[24px] uppercase tracking-tighter mb-6">Sign In</h2>
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <input
                      type="email"
                      value={signInForm.email}
                      onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                      placeholder="Email"
                      required
                      className="w-full bg-transparent border border-primary px-4 py-3 font-body-md text-body-md focus:outline-none"
                    />
                    <input
                      type="password"
                      value={signInForm.password}
                      onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                      placeholder="Password"
                      required
                      className="w-full bg-transparent border border-primary px-4 py-3 font-body-md text-body-md focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-on-primary py-3 font-label-caps text-label-caps uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                  </form>
                  <div className="mt-6 text-center space-y-2">
                    <button
                      onClick={() => setMode('reset')}
                      className="font-body-md text-[12px] text-secondary hover:text-primary transition-colors"
                    >
                      Forgot password?
                    </button>
                    <p className="font-body-md text-[12px] text-secondary">
                      Don't have an account?{' '}
                      <button
                        onClick={() => setMode('signup')}
                        className="text-primary hover:opacity-70 transition-opacity"
                      >
                        Sign up
                      </button>
                    </p>
                  </div>
                </>
              )}

              {mode === 'signup' && (
                <>
                  <h2 className="font-headline-lg text-[24px] uppercase tracking-tighter mb-6">Create Account</h2>
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={signUpForm.firstName}
                        onChange={(e) => setSignUpForm({ ...signUpForm, firstName: e.target.value })}
                        placeholder="First Name"
                        className="w-full bg-transparent border border-primary px-4 py-3 font-body-md text-body-md focus:outline-none"
                      />
                      <input
                        type="text"
                        value={signUpForm.lastName}
                        onChange={(e) => setSignUpForm({ ...signUpForm, lastName: e.target.value })}
                        placeholder="Last Name"
                        className="w-full bg-transparent border border-primary px-4 py-3 font-body-md text-body-md focus:outline-none"
                      />
                    </div>
                    <input
                      type="email"
                      value={signUpForm.email}
                      onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                      placeholder="Email"
                      required
                      className="w-full bg-transparent border border-primary px-4 py-3 font-body-md text-body-md focus:outline-none"
                    />
                    <input
                      type="password"
                      value={signUpForm.password}
                      onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                      placeholder="Password (min 6 characters)"
                      required
                      minLength={6}
                      className="w-full bg-transparent border border-primary px-4 py-3 font-body-md text-body-md focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-on-primary py-3 font-label-caps text-label-caps uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                  </form>
                  <p className="mt-6 text-center font-body-md text-[12px] text-secondary">
                    Already have an account?{' '}
                    <button
                      onClick={() => setMode('signin')}
                      className="text-primary hover:opacity-70 transition-opacity"
                    >
                      Sign in
                    </button>
                  </p>
                </>
              )}

              {mode === 'reset' && (
                <>
                  <h2 className="font-headline-lg text-[24px] uppercase tracking-tighter mb-6">Reset Password</h2>
                  <form onSubmit={handleReset} className="space-y-4">
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="Email"
                      required
                      className="w-full bg-transparent border border-primary px-4 py-3 font-body-md text-body-md focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-on-primary py-3 font-label-caps text-label-caps uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                  </form>
                  <p className="mt-6 text-center font-body-md text-[12px] text-secondary">
                    <button
                      onClick={() => setMode('signin')}
                      className="text-primary hover:opacity-70 transition-opacity"
                    >
                      Back to sign in
                    </button>
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
