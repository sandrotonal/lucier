import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/StoreContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { cart, setCartOpen } = useStore()
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        animate={{
          backgroundColor: scrolled ? 'rgba(249, 249, 249, 0.95)' : 'rgba(0, 0, 0, 0)',
          borderBottom: scrolled ? '1px solid #7e7576' : '1px solid rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 w-full z-50 flex justify-between items-center px-container-margin h-16 md:h-20 backdrop-blur-md"
      >
        <div className="flex gap-6 items-center">
          <button
            onClick={() => setMenuOpen(true)}
            className={`${scrolled ? 'text-primary' : 'text-white drop-shadow-md'} hover:opacity-70 transition-opacity duration-200`}
            aria-label="Menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
        <div className="relative w-full max-w-sm hidden md:block">
          <input
            className={`w-full rounded-full px-4 py-2 font-label-caps text-label-caps focus:outline-none transition-colors duration-300 ${
              scrolled
                ? 'bg-transparent border border-primary/30 text-primary placeholder:text-primary/40 focus:border-primary'
                : 'bg-white/15 backdrop-blur-sm border border-white/50 text-white placeholder:text-white/70 focus:border-white'
            }`}
            placeholder="Search"
            type="text"
          />
          <button
            onClick={() => {/* search */}}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 flex items-center justify-center transition-colors duration-300 rounded-full ${
              scrolled ? 'bg-primary text-on-primary' : 'bg-white/30 text-white hover:bg-white/50'
            }`}
            aria-label="Search"
          >
            <span className="material-symbols-outlined text-[16px]">search</span>
          </button>
        </div>
        <div className={`flex gap-4 items-center ${scrolled ? 'text-primary' : 'text-white drop-shadow-md'}`}>
          <Link to="/wishlist" className="hover:opacity-70 transition-opacity duration-200 hidden md:block" aria-label="Wishlist">
            <span className="material-symbols-outlined">favorite</span>
          </Link>
          <button onClick={() => setCartOpen(true)} className="hover:opacity-70 transition-opacity duration-200 relative" aria-label="Bag">
            <span className="material-symbols-outlined">shopping_bag</span>
            {cartCount > 0 && (
              <span className={`absolute -top-2 -right-2 text-[10px] w-5 h-5 flex items-center justify-center font-bold font-label-caps shadow-lg ${
                scrolled ? 'bg-primary text-on-primary' : 'bg-white text-black'
              }`}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface p-8 md:p-12 w-[90vw] max-w-md border border-primary"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-4 right-4 text-primary"
                aria-label="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <div className="flex flex-col gap-6 font-headline-md text-headline-md uppercase">
                <Link to="/" onClick={() => setMenuOpen(false)} className="hover:opacity-70 transition-opacity border-b border-primary pb-2">Home</Link>
                <Link to="/shop" onClick={() => setMenuOpen(false)} className="hover:opacity-70 transition-opacity border-b border-primary pb-2">Shop</Link>
                <Link to="/shop" onClick={() => setMenuOpen(false)} className="hover:opacity-70 transition-opacity border-b border-primary pb-2">New Collection</Link>
                <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="hover:opacity-70 transition-opacity border-b border-primary pb-2">Wishlist</Link>
                <a href="#" onClick={() => setMenuOpen(false)} className="hover:opacity-70 transition-opacity border-b border-primary pb-2">About</a>
                <Link to="/bag" onClick={() => setMenuOpen(false)} className="hover:opacity-70 transition-opacity">Bag ({cartCount})</Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
