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
    <footer className="w-full border-t border-outline-variant bg-background pb-28 md:pb-10">
      <div className="px-container-margin py-8 md:py-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-gutter">
          <div className="md:col-span-3">
            <div className="font-headline-md text-[20px] md:text-headline-md tracking-widest uppercase mb-4">LUCIR</div>
            <p className="font-body-md text-body-md text-secondary max-w-xs">
              Architectural fashion engineered for the modern form. Est. 2024.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-label-caps text-label-caps uppercase tracking-widest mb-4 text-primary">Quick Links</h4>
            <div className="flex flex-col gap-2 font-label-caps text-label-caps text-secondary uppercase">
              <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
              <Link to="/wishlist" className="hover:text-primary transition-colors">Wishlist</Link>
              <Link to="/bag" className="hover:text-primary transition-colors">Bag</Link>
              <Link to="/orders" className="hover:text-primary transition-colors">Orders</Link>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-label-caps text-label-caps uppercase tracking-widest mb-4 text-primary">Support</h4>
            <div className="flex flex-col gap-2 font-label-caps text-label-caps text-secondary uppercase">
              <Link to="/info/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link>
              <Link to="/info/size-guide" className="hover:text-primary transition-colors">Size Guide</Link>
              <Link to="/info/contact" className="hover:text-primary transition-colors">Contact</Link>
              <Link to="/info/faq" className="hover:text-primary transition-colors">FAQ</Link>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-label-caps text-label-caps uppercase tracking-widest mb-4 text-primary">Newsletter</h4>
            <form onSubmit={handleNewsletter} className="flex border border-primary w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-3 py-2 font-body-md text-body-md placeholder:text-secondary/50 focus:outline-none min-w-0"
                required
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-primary text-on-primary px-4 py-2 font-label-caps text-label-caps uppercase hover:opacity-90 transition-opacity flex-shrink-0"
              >
                Join
              </motion.button>
            </form>
            <p className="font-body-md text-body-md text-secondary mt-3 text-[11px]">
              Get early access to new collections and editorial content.
            </p>
          </div>
        </div>

        <div className="mt-10 md:mt-14 pt-8 border-t border-outline-variant">
          <TrustBadges />
        </div>

        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 font-label-caps text-label-caps text-secondary uppercase text-[10px] md:text-label-caps">
            <Link to="/info/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/info/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/info/sustainability" className="hover:text-primary transition-colors">Sustainability</Link>
          </div>
          <p className="font-label-caps text-label-caps text-secondary text-[10px] md:text-label-caps uppercase tracking-wider">
            &copy; 2024 LUCIR ARCHITECTURAL FASHION. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  )
}
