import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import MobileNav from '../components/MobileNav'
import { useStore } from '../store/StoreContext'
import Footer from '../components/Footer'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
}

export default function Checkout() {
  const { cart, clearCart } = useStore()
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  const handlePlaceOrder = () => {
    alert('Order placed successfully! Thank you for shopping with Lucir.')
    clearCart()
  }

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <main className="flex-grow pt-16 md:pt-20 px-container-margin max-w-7xl mx-auto w-full pb-section-gap">
          <motion.div {...fadeUp} className="flex flex-col items-center justify-center gap-6 mt-24">
            <span className="material-symbols-outlined text-6xl text-secondary">shopping_bag</span>
            <h1 className="font-headline-lg text-[28px] uppercase tracking-tighter">Your bag is empty</h1>
            <Link to="/shop" className="font-label-caps text-label-caps underline hover:text-primary transition-colors">
              Continue Shopping
            </Link>
          </motion.div>
        </main>
      <MobileNav />
      <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-16 md:pt-20 pb-section-gap px-container-margin max-w-7xl mx-auto w-full">
        <motion.div {...fadeUp} className="mt-8 md:mt-12 mb-8">
          <Link to="/bag" className="inline-flex items-center gap-1 text-secondary hover:text-primary transition-colors font-label-caps text-label-caps uppercase mb-4">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Bag
          </Link>
          <h1 className="font-headline-lg text-[28px] md:text-display-xl md:font-display-xl uppercase tracking-tighter">CHECKOUT</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-gutter">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7"
          >
            <h2 className="font-headline-md text-[20px] uppercase tracking-tighter mb-6 border-b border-primary pb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[
                { label: 'First Name', w: 'md:col-span-1' },
                { label: 'Last Name', w: 'md:col-span-1' },
                { label: 'Email', w: 'md:col-span-2' },
                { label: 'Address', w: 'md:col-span-2' },
                { label: 'City', w: 'md:col-span-1' },
                { label: 'Postal Code', w: 'md:col-span-1' },
              ].map((f) => (
                <div key={f.label} className={f.w}>
                  <label className="font-label-caps text-label-caps uppercase mb-1 block">{f.label}</label>
                  <input
                    type="text"
                    placeholder={f.label}
                    className="w-full bg-transparent border border-primary/50 px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}
            </div>

            <h2 className="font-headline-md text-[20px] uppercase tracking-tighter mt-10 mb-6 border-b border-primary pb-4">Payment</h2>
            <div className="grid grid-cols-1 gap-4">
              {['Card Number', 'Expiry', 'CVC'].map((f) => (
                <div key={f}>
                  <label className="font-label-caps text-label-caps uppercase mb-1 block">{f}</label>
                  <input
                    type="text"
                    placeholder={f}
                    className="w-full bg-transparent border border-primary/50 px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="border border-primary p-5 md:p-8 bg-surface/50 sticky top-24">
              <h2 className="font-headline-md text-[20px] uppercase tracking-tighter mb-6 border-b border-primary pb-4">Order Summary</h2>
              <div className="divide-y divide-primary/20">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 py-3">
                    <div className="w-16 h-20 bg-surface-container overflow-hidden flex-shrink-0 border border-primary/30">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-label-caps text-label-caps uppercase truncate">{item.name}</p>
                      <p className="font-body-md text-body-md text-secondary">Qty: {item.qty}</p>
                      <p className="font-body-md text-body-md">${item.price * item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-3 font-label-caps text-label-caps uppercase border-t border-primary pt-4">
                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal}</span></div>
                <div className="flex justify-between text-secondary"><span>Shipping</span><span>Free</span></div>
                <div className="flex justify-between text-secondary"><span>Tax</span><span>Calculated at next step</span></div>
                <div className="flex justify-between font-headline-md text-[18px] pt-2 border-t border-primary"><span>Total</span><span>${subtotal}</span></div>
              </div>
              <motion.button
                onClick={handlePlaceOrder}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full mt-6 border border-primary bg-primary text-on-primary py-4 font-label-caps text-label-caps uppercase tracking-widest hover:opacity-90 transition-all duration-300 flex items-center justify-between px-6 group"
              >
                <span>PLACE ORDER</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </motion.button>
              <div className="mt-4 flex items-center gap-2 justify-center text-secondary font-label-caps text-label-caps uppercase">
                <span className="material-symbols-outlined text-sm">lock</span>
                <span>Secure checkout</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  )
}
