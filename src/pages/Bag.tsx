import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import MobileNav from '../components/MobileNav'
import Footer from '../components/Footer'
import { useStore } from '../store/StoreContext'
import { formatPrice } from '../data/products'

export default function Bag() {
  const { cart, removeFromCart, updateQty, cartTotal } = useStore()

  return (
    <>
      <Navbar />

      <main className="flex-grow px-container-margin max-w-7xl mx-auto w-full pb-section-gap pt-16 md:pt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 md:mb-16 mt-8 md:mt-12">
          <Link to="/shop" className="text-secondary hover:text-primary transition-colors flex items-center gap-1 font-label-caps text-label-caps uppercase mb-4">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Shop
          </Link>
          <h1 className="font-headline-lg text-[28px] md:text-display-xl md:font-display-xl uppercase tracking-tighter">YOUR BAG</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-gutter">
          <div className="lg:col-span-8 flex flex-col border-t border-primary">
            {cart.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 md:py-16 flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-5xl text-secondary">shopping_bag</span>
                <p className="font-headline-md text-[20px] text-secondary uppercase tracking-tighter">YOUR BAG IS EMPTY</p>
                <Link to="/shop" className="font-label-caps text-label-caps underline hover:text-primary transition-colors">
                  Continue Shopping
                </Link>
              </motion.div>
            ) : (
              cart.map((item, idx) => (
                <motion.div
                  key={`${item.id}-${item.size ?? 'default'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col sm:flex-row py-6 md:py-8 border-b border-primary gap-4 md:gap-6 relative group"
                >
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    aria-label="Remove item"
                    className="absolute top-6 md:top-8 right-0 text-secondary hover:text-primary transition-colors sm:opacity-0 sm:group-hover:opacity-100 z-10"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                  <Link to={item.id === 2 ? '/jacket' : `/product/${item.id}`} className="w-full sm:w-32 md:w-48 aspect-[3/4] bg-surface-container overflow-hidden flex-shrink-0">
                    <img alt={item.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" src={item.img} />
                  </Link>
                  <div className="flex flex-col justify-between flex-grow pt-1 md:pt-2">
                    <div>
                      <div className="flex justify-between items-start mb-2 pr-8">
                        <h3 className="font-headline-md text-[18px] md:text-headline-md leading-none uppercase">{item.name}</h3>
                        <span className="font-body-lg text-body-lg">{formatPrice(item.price)}</span>
                      </div>
                      {item.size && (
                        <p className="font-label-caps text-label-caps text-secondary uppercase">Size: {item.size}</p>
                      )}
                      <p className="font-body-md text-body-md text-secondary uppercase max-w-sm mt-1">{item.desc}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4 md:mt-8">
                      <div className="flex items-center border border-primary font-label-caps text-label-caps w-fit">
                        <button onClick={() => updateQty(item.id, -1, item.size)} className="px-3 py-2 md:py-1 hover:bg-primary hover:text-surface transition-colors min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center" aria-label="Decrease">-</button>
                        <span className="px-3 py-1 border-x border-primary min-w-[2rem] text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1, item.size)} className="px-3 py-2 md:py-1 hover:bg-primary hover:text-surface transition-colors min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center" aria-label="Increase">+</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24 md:top-28 border border-primary p-5 md:p-8 flex flex-col gap-5 md:gap-6 bg-[#F7F4EF]"
            >
              <h2 className="font-headline-md text-[20px] md:text-headline-md uppercase border-b border-primary pb-4">SUMMARY</h2>
              <div className="flex flex-col gap-3 md:gap-4 font-body-md text-body-md uppercase border-b border-primary pb-5 md:pb-6">
                <div className="flex justify-between"><span>SUBTOTAL</span><span>{formatPrice(cartTotal)}</span></div>
                <div className="flex justify-between text-secondary"><span>SHIPPING</span><span>FREE</span></div>
                <div className="flex justify-between text-secondary"><span>TAXES</span><span>AT CHECKOUT</span></div>
              </div>
              <div className="flex justify-between items-end font-headline-md text-[20px] md:text-headline-md pt-1 md:pt-2">
                <span>TOTAL</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <Link
                to="/checkout"
                className={`w-full mt-6 md:mt-8 border border-primary bg-transparent text-primary py-4 px-6 flex justify-between items-center hover:bg-primary hover:text-surface transition-colors group font-label-caps text-label-caps ${cart.length === 0 ? 'opacity-30 pointer-events-none' : ''}`}
              >
                <span className="tracking-widest uppercase">PROCEED TO CHECKOUT</span>
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </Link>
              <div className="mt-2 md:mt-4 pt-4 border-t border-outline-variant/30 flex items-center gap-2 justify-center text-secondary">
                <span className="material-symbols-outlined text-sm">lock</span>
                <span className="font-label-caps text-label-caps">SECURE ENCRYPTED CHECKOUT</span>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <MobileNav />
      <Footer />
    </>
  )
}
