import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import MobileNav from '../components/MobileNav'
import Footer from '../components/Footer'
import { orderService } from '../services/orders'
import { fadeUpAnimate } from '../lib/animations'

export default function PaymentResult() {
  const [params] = useSearchParams()
  const orderId = params.get('orderId') || ''
  const status = params.get('status') || 'failed'
  const success = status === 'success'

  useEffect(() => {
    if (success && orderId) {
      orderService.updatePaymentStatus(orderId, 'paid')
    } else if (orderId) {
      orderService.updatePaymentStatus(orderId, 'cancelled')
    }
  }, [success, orderId])

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20 px-container-margin max-w-2xl mx-auto w-full pb-section-gap">
        <motion.div {...fadeUpAnimate} className="flex flex-col items-center text-center gap-6 mt-24 md:mt-32">
          <span className={`material-symbols-outlined text-6xl ${success ? 'text-primary' : 'text-error'}`}>
            {success ? 'check_circle' : 'cancel'}
          </span>
          <h1 className="font-headline-lg text-[28px] md:text-headline-lg uppercase tracking-tighter">
            {success ? 'Payment Successful' : 'Payment Failed'}
          </h1>
          {orderId && (
            <p className="font-label-caps text-label-caps uppercase tracking-widest border border-primary px-4 py-2">
              {orderId}
            </p>
          )}
          <p className="font-body-md text-body-md text-secondary max-w-md">
            {success
              ? 'Your payment has been confirmed. We will prepare your order for shipping.'
              : 'Payment was not completed. You can try again from your bag or orders page.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link to="/orders" className="border border-primary px-8 py-3 font-label-caps text-label-caps uppercase hover:bg-primary hover:text-surface transition-colors">
              View Orders
            </Link>
            <Link to="/shop" className="font-label-caps text-label-caps underline hover:text-primary transition-colors py-3">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </main>
      <MobileNav />
      <Footer />
    </>
  )
}
