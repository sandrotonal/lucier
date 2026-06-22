import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useStore } from '../store/StoreContext'
import { catalogService } from '../services/catalog'

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const results = catalogService.search('All', query).slice(0, 6)

  useEffect(() => {
    if (searchOpen) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 100)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [searchOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setSearchOpen])

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            onClick={() => setSearchOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 z-[95] bg-[#F7F4EF] border-b border-primary shadow-2xl"
          >
            <div className="px-container-margin py-6 max-w-[1600px] mx-auto">
              <div className="flex items-center gap-4 border-b border-primary pb-4">
                <span className="material-symbols-outlined text-primary">search</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, categories..."
                  className="flex-1 bg-transparent font-headline-md text-[20px] md:text-headline-md uppercase tracking-tighter focus:outline-none placeholder:text-secondary/50"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="w-10 h-10 flex items-center justify-center border border-primary hover:bg-primary hover:text-surface transition-colors"
                  aria-label="Close search"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="mt-6 max-h-[60vh] overflow-y-auto">
                {query.trim() === '' ? (
                  <p className="font-label-caps text-label-caps text-secondary uppercase">
                    Popular: Jacket, Bag, Sneaker, Glasses
                  </p>
                ) : results.length === 0 ? (
                  <p className="font-label-caps text-label-caps text-secondary uppercase">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.map((p) => (
                      <Link
                        key={p.id}
                        to={p.slug}
                        onClick={() => setSearchOpen(false)}
                        className="flex gap-4 p-3 border border-primary/30 hover:border-primary transition-colors group"
                      >
                        <div className="w-16 h-20 bg-surface-container overflow-hidden flex-shrink-0">
                          <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="flex flex-col justify-center min-w-0">
                          <span className="font-label-caps text-label-caps uppercase truncate">{p.name}</span>
                          <span className="font-body-md text-body-md text-secondary">{p.priceLabel}</span>
                          <span className="font-label-caps text-[10px] text-secondary uppercase">{p.category}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
