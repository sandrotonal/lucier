import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useStore } from '../store/StoreContext'
import { newsletterService } from '../services/newsletter'
import TrustBadges from './TrustBadges'

export default function Footer() {
  const [email, setEmail] = useState('')
  const { showToast } = useStore()

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    const result = newsletterService.subscribe(email)
    if (result.ok === false) {
      showToast(result.reason, result.reason === 'Already subscribed' ? 'info' : 'error')
      return
    }
    showToast('Subscribed to newsletter!', 'success')
    setEmail('')
  }

  return (
    <footer className="w-full border-t border-outline-variant bg-background pb-20 md:pb-6">
      <div className="px-container-margin py-6 md:py-10 max-w-[1600px] mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 pb-6 border-b border-outline-variant">
          <div>
            <div className="font-headline-md text-[24px] tracking-widest uppercase mb-2">LUCIR</div>
            <p className="font-body-md text-[13px] text-secondary">
              Architectural fashion engineered for the modern form.
            </p>
          </div>

          <form onSubmit={handleNewsletter} className="flex border border-primary max-w-md w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Newsletter"
              className="flex-1 bg-transparent px-3 py-2 font-body-md text-[13px] placeholder:text-secondary/50 focus:outline-none min-w-0"
              required
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-primary text-on-primary px-4 py-2 font-label-caps text-[10px] uppercase hover:opacity-90 transition-opacity"
            >
              Join
            </motion.button>
          </form>
        </div>

        <div className="hidden md:block py-6">
          <TrustBadges />
        </div>

        <div className="py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 font-label-caps text-[10px] text-secondary uppercase">
            <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <Link to="/info/shipping" className="hover:text-primary transition-colors">Shipping</Link>
            <Link to="/info/contact" className="hover:text-primary transition-colors">Contact</Link>
            <Link to="/info/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          </div>
          <p className="font-label-caps text-[9px] md:text-[10px] text-secondary uppercase">
            &copy; 2024 LUCIR
          </p>
        </div>
      </div>
    </footer>
  )
}
