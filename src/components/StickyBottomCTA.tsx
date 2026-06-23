import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface StickyBottomCTAProps {
  onAddToCart: () => void
  price: number
  disabled?: boolean
  inStock: boolean
}

export default function StickyBottomCTA({ onAddToCart, price, disabled, inStock }: StickyBottomCTAProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 400
      setShow(scrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[60] bg-surface border-t-2 border-primary shadow-2xl md:hidden"
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="font-label-caps text-[10px] uppercase text-secondary mb-1">Price</p>
              <p className="font-headline-md text-[20px] tracking-tighter">${price.toLocaleString()}</p>
            </div>
            <motion.button
              onClick={onAddToCart}
              disabled={disabled || !inStock}
              whileTap={{ scale: disabled || !inStock ? 1 : 0.95 }}
              className={`px-8 py-3 font-label-caps text-label-caps uppercase tracking-widest transition-opacity ${
                disabled || !inStock
                  ? 'bg-secondary/30 text-secondary cursor-not-allowed'
                  : 'bg-primary text-on-primary hover:opacity-90'
              }`}
            >
              {!inStock ? 'Out of Stock' : 'Add to Bag'}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
