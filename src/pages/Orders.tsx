import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import MobileNav from '../components/MobileNav'
import Footer from '../components/Footer'
import { orderService } from '../services/orders'
import { catalogService } from '../services/catalog'
import { fadeUpAnimate } from '../lib/animations'

export default function Orders() {
  const orders = orderService.getAll()

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20 px-container-margin max-w-3xl mx-auto w-full pb-section-gap">
        <motion.div {...fadeUpAnimate} className="mt-8 md:mt-12">
          <h1 className="font-headline-lg text-[28px] md:text-headline-lg uppercase tracking-tighter mb-8 md:mb-12">
            Your Orders
          </h1>

          {orders.length === 0 ? (
            <div className="flex flex-col items-center gap-6 py-16">
              <span className="material-symbols-outlined text-5xl text-secondary">receipt_long</span>
              <p className="font-headline-md text-[18px] uppercase text-secondary">No orders yet</p>
              <Link to="/shop" className="font-label-caps text-label-caps underline hover:text-primary transition-colors">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <article key={order.id} className="border border-primary p-5 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4 border-b border-primary/30 pb-4">
                    <div>
                      <p className="font-label-caps text-label-caps uppercase tracking-widest">{order.id}</p>
                      <p className="font-body-md text-body-md text-secondary mt-1">
                        {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <p className="font-label-caps text-[10px] text-secondary uppercase mt-1">
                        {order.paymentMethod.replace('_', ' ')} — {order.paymentStatus.replace('_', ' ')}
                      </p>
                    </div>
                    <p className="font-headline-md text-[18px]">{catalogService.formatPrice(order.subtotal)}</p>
                  </div>
                  <ul className="space-y-2">
                    {order.items.map((item) => (
                      <li key={`${item.id}-${item.size}`} className="flex justify-between font-label-caps text-[10px] md:text-label-caps uppercase">
                        <span className="truncate pr-4">{item.name}{item.size ? ` (${item.size})` : ''} × {item.qty}</span>
                        <span>{catalogService.formatPrice(item.price * item.qty)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-body-md text-body-md text-secondary mt-4 text-[12px]">
                    Ships to: {order.shipping.firstName} {order.shipping.lastName}, {order.shipping.city}
                  </p>
                </article>
              ))}
            </div>
          )}
        </motion.div>
      </main>
      <MobileNav />
      <Footer />
    </>
  )
}
