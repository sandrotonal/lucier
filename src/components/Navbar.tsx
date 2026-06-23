import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/StoreContext'
import AuthModal from './AuthModal'
import { authService } from '../services/auth'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [user, setUser] = useState(authService.getCurrentUser())
  const { cartCount, setCartOpen, setSearchOpen } = useStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleSignOut = async () => {
    await authService.signOut()
    setUser(null)
    setMenuOpen(false)
    window.location.href = '/'
  }

  return (
    <>
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <motion.nav
        animate={{
          backgroundColor: scrolled ? 'rgba(249, 249, 249, 0.95)' : 'rgba(0, 0, 0, 0)',
          borderBottom: scrolled ? '1px solid #7e7576' : '1px solid rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 w-full z-50 flex justify-between items-center px-container-margin h-16 md:h-20 backdrop-blur-md"
      >
        <div className="flex gap-4 md:gap-6 items-center">
          <button
            onClick={() => setMenuOpen(true)}
            className={`${scrolled ? 'text-primary' : 'text-white drop-shadow-md'} hover:opacity-70 transition-opacity duration-200`}
            aria-label="Menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <button
            onClick={() => setSearchOpen(true)}
            className={`md:hidden ${scrolled ? 'text-primary' : 'text-white drop-shadow-md'} hover:opacity-70 transition-opacity`}
            aria-label="Search"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>

        <div className="relative w-full max-w-sm hidden md:block">
          <button
            onClick={() => setSearchOpen(true)}
            className={`w-full rounded-full px-4 py-2 font-label-caps text-label-caps text-left transition-colors duration-300 ${
              scrolled
                ? 'bg-transparent border border-primary/30 text-primary/60 hover:border-primary'
                : 'bg-white/15 backdrop-blur-sm border border-white/50 text-white/70 hover:border-white'
            }`}
          >
            Search products...
          </button>
          <span
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 flex items-center justify-center rounded-full pointer-events-none ${
              scrolled ? 'text-primary/40' : 'text-white/50'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">search</span>
          </span>
        </div>

        <div className={`flex gap-3 md:gap-4 items-center ${scrolled ? 'text-primary' : 'text-white drop-shadow-md'}`}>
          {user ? (
            <button
              onClick={() => setMenuOpen(true)}
              className="hover:opacity-70 transition-opacity duration-200 flex items-center gap-2"
              aria-label="Account"
            >
              <span className="material-symbols-outlined">account_circle</span>
              <span className="hidden md:inline font-label-caps text-[11px] uppercase">
                {user.firstName || 'Account'}
              </span>
            </button>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="hover:opacity-70 transition-opacity duration-200 font-label-caps text-[11px] uppercase hidden md:block"
            >
              Sign In
            </button>
          )}
          <Link to="/wishlist" className="hover:opacity-70 transition-opacity duration-200" aria-label="Wishlist">
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
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          >
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface h-full w-[85vw] max-w-sm border-r border-primary p-8 flex flex-col"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="self-end text-primary mb-8"
                aria-label="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <div className="flex flex-col gap-6 font-headline-md text-[22px] md:text-headline-md uppercase flex-1">
                {user && (
                  <div className="border-b border-primary pb-4 mb-2">
                    <p className="font-label-caps text-label-caps text-secondary uppercase mb-2">Account</p>
                    <p className="font-body-md text-body-md">{user.email}</p>
                  </div>
                )}
                <Link to="/" onClick={() => setMenuOpen(false)} className="hover:opacity-70 transition-opacity border-b border-primary pb-3">Home</Link>
                <Link to="/shop" onClick={() => setMenuOpen(false)} className="hover:opacity-70 transition-opacity border-b border-primary pb-3">Shop</Link>
                <Link to="/shop" onClick={() => setMenuOpen(false)} className="hover:opacity-70 transition-opacity border-b border-primary pb-3">New Collection</Link>
                <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="hover:opacity-70 transition-opacity border-b border-primary pb-3">Wishlist</Link>
                <button onClick={() => { setMenuOpen(false); setSearchOpen(true) }} className="text-left hover:opacity-70 transition-opacity border-b border-primary pb-3">Search</button>
                <Link to="/orders" onClick={() => setMenuOpen(false)} className="hover:opacity-70 transition-opacity border-b border-primary pb-3">Orders</Link>
                <Link to="/info/about" onClick={() => setMenuOpen(false)} className="hover:opacity-70 transition-opacity border-b border-primary pb-3">About</Link>
                {user ? (
                  <button onClick={handleSignOut} className="text-left hover:opacity-70 transition-opacity border-b border-primary pb-3 text-secondary">
                    Sign Out
                  </button>
                ) : (
                  <button onClick={() => { setMenuOpen(false); setAuthModalOpen(true) }} className="text-left hover:opacity-70 transition-opacity border-b border-primary pb-3">
                    Sign In
                  </button>
                )}
                <Link to="/bag" onClick={() => setMenuOpen(false)} className="hover:opacity-70 transition-opacity mt-auto">Bag ({cartCount})</Link>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
