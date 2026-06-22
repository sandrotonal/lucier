import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useStore } from '../store/StoreContext'
import { formatPrice } from '../data/products'

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQty, cartTotal, cartCount } = useStore()

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70]"
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#F7F4EF] z-[80] flex flex-col border-l border-primary shadow-2xl"
          >
            <div className="flex items-center justify-between px-4 md:px-6 py-4 md:py-5 border-b border-primary">
              <h2 className="font-headline-md text-[18px] md:text-[20px] uppercase tracking-tighter">YOUR BAG ({cartCount})</h2>
              <button onClick={() => setCartOpen(false)} className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity border border-primary" aria-label="Close">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 divide-y divide-primary/20">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <span className="material-symbols-outlined text-5xl text-secondary">shopping_bag</span>
                  <p className="font-body-md text-body-md text-secondary uppercase">Your bag is empty</p>
                  <Link to="/shop" onClick={() => setCartOpen(false)} className="font-label-caps text-label-caps underline hover:text-primary transition-colors">
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.size}`}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 py-4 relative group"
                  >
                    <div className="w-20 h-24 bg-surface-container overflow-hidden flex-shrink-0 border border-primary/30">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-label-caps text-label-caps uppercase truncate pr-2">{item.name}</h3>
                        <button onClick={() => removeFromCart(item.id, item.size)} className="text-secondary hover:text-primary transition-colors flex-shrink-0" aria-label="Remove">
                          <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                      </div>
                      {item.size && <p className="font-label-caps text-[10px] text-secondary uppercase">Size: {item.size}</p>}
                      <p className="font-body-md text-body-md text-secondary mt-1">{formatPrice(item.price)}</p>
                      <div className="flex items-center gap-2 mt-3 border border-primary w-fit">
                        <button onClick={() => updateQty(item.id, -1, item.size)} className="w-10 h-10 flex items-center justify-center font-label-caps text-label-caps hover:bg-primary hover:text-surface transition-colors" aria-label="Decrease">-</button>
                        <span className="w-8 h-10 flex items-center justify-center font-label-caps text-label-caps border-x border-primary">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1, item.size)} className="w-10 h-10 flex items-center justify-center font-label-caps text-label-caps hover:bg-primary hover:text-surface transition-colors" aria-label="Increase">+</button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-primary px-4 md:px-6 py-4 md:py-5 bg-surface/50 safe-area-bottom">
                <div className="flex justify-between items-center mb-4 font-headline-md text-[18px] uppercase tracking-tighter">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <Link to="/checkout" onClick={() => setCartOpen(false)} className="w-full block text-center border border-primary bg-primary text-on-primary py-3 font-label-caps text-label-caps uppercase tracking-widest hover:opacity-90 transition-all duration-300">
                  CHECKOUT
                </Link>
                <Link to="/bag" onClick={() => setCartOpen(false)} className="w-full block text-center mt-2 font-label-caps text-label-caps text-secondary uppercase tracking-widest hover:text-primary transition-colors py-2">
                  VIEW FULL BAG
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
