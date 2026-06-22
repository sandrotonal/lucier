import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { newsletterService } from '../services/newsletter'
import { useStore } from '../store/StoreContext'

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const { showToast } = useStore()

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('newsletter-popup-seen')
    const isSubscribed = localStorage.getItem('newsletter-subscribed')
    
    if (!hasSeenPopup && !isSubscribed) {
      const timer = setTimeout(() => {
        setOpen(true)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setOpen(false)
    localStorage.setItem('newsletter-popup-seen', 'true')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = newsletterService.subscribe(email)
    
    if (result.ok === false) {
      showToast(result.reason, result.reason === 'Already subscribed' ? 'info' : 'error')
      return
    }

    showToast('Welcome! Use code WELCOME10 for 10% off', 'success')
    localStorage.setItem('newsletter-subscribed', 'true')
    setOpen(false)
    setEmail('')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface border-2 border-primary max-w-md w-full relative overflow-hidden"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-primary hover:opacity-70 transition-opacity z-10"
              aria-label="Close"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="p-8 md:p-10">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-center mb-6"
              >
                <div className="w-16 h-16 border-2 border-primary mx-auto mb-4 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-3xl">mail</span>
                </div>
                <h2 className="font-headline-lg text-[24px] md:text-headline-lg uppercase tracking-tighter mb-2">
                  Get 10% Off
                </h2>
                <p className="font-body-md text-body-md text-secondary">
                  Subscribe to our newsletter and receive exclusive access to new collections.
                </p>
              </motion.div>

              <motion.form
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-transparent border-2 border-primary px-4 py-3 font-body-md text-body-md placeholder:text-secondary/50 focus:outline-none"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary text-on-primary py-3 font-label-caps text-label-caps uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  Claim 10% Discount
                </motion.button>
              </motion.form>

              <p className="font-body-md text-[10px] text-secondary text-center mt-4">
                By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
              </p>

              <div className="mt-6 pt-6 border-t border-primary/30 flex items-center justify-center gap-2">
                <span className="font-label-caps text-[11px] uppercase text-primary tracking-widest">
                  Code: WELCOME10
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
