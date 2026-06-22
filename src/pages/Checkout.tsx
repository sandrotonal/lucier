import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, type FormEvent } from 'react'
import Navbar from '../components/Navbar'
import MobileNav from '../components/MobileNav'
import Footer from '../components/Footer'
import { useStore } from '../store/StoreContext'
import { catalogService } from '../services/catalog'
import { orderService } from '../services/orders'
import { paymentService, type PaymentMethod } from '../services/payment'
import { iyzicoService } from '../services/iyzico'
import { fadeUpAnimate } from '../lib/animations'

export default function Checkout() {
  const { cart, clearCart, cartTotal, setOrderPlaced, orderPlaced, showToast } = useStore()
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', address: '', city: '', postalCode: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [orderId, setOrderId] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank_transfer')
  const [bankDetails, setBankDetails] = useState<ReturnType<typeof paymentService.getBankDetails> | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const paymentMethods = paymentService.getAvailableMethods()

  const validate = () => {
    const next: Record<string, string> = {}
    if (!form.firstName.trim()) next.firstName = 'Required'
    if (!form.lastName.trim()) next.lastName = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Valid email required'
    if (!form.address.trim()) next.address = 'Required'
    if (!form.city.trim()) next.city = 'Required'
    if (!form.postalCode.trim()) next.postalCode = 'Required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handlePlaceOrder = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    setSubmitting(true)
    try {
      const shipping = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        address: form.address.trim(),
        city: form.city.trim(),
        postalCode: form.postalCode.trim(),
      }

      const order = await orderService.placeOrder(cart, shipping, paymentMethod)

      if (paymentMethod === 'iyzico') {
        const { paymentPageUrl } = await iyzicoService.initialize({
          orderId: order.id,
          amountUsd: order.subtotal,
          shipping,
          items: cart.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
        })
        clearCart()
        window.location.href = paymentPageUrl
        return
      }

      setOrderId(order.id)

      if (paymentMethod === 'bank_transfer') {
        setBankDetails(paymentService.getBankDetails())
      }

      if (paymentService.isExternalPayment(paymentMethod)) {
        const url = paymentService.getExternalCheckoutUrl(paymentMethod, order.id, order.subtotal)
        if (url) window.open(url, '_blank', 'noopener,noreferrer')
      }

      clearCart()
      setOrderPlaced(true)
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Order failed', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  if (orderPlaced) {
    return (
      <>
        <Navbar />
        <main className="flex-grow pt-16 md:pt-20 px-container-margin max-w-2xl mx-auto w-full pb-section-gap">
          <motion.div {...fadeUpAnimate} className="flex flex-col items-center text-center gap-6 mt-24 md:mt-32">
            <span className="material-symbols-outlined text-6xl text-primary">check_circle</span>
            <h1 className="font-headline-lg text-[28px] md:text-headline-lg uppercase tracking-tighter">Order Confirmed</h1>
            {orderId && (
              <p className="font-label-caps text-label-caps uppercase tracking-widest border border-primary px-4 py-2">
                {orderId}
              </p>
            )}
            <p className="font-body-md text-body-md text-secondary max-w-md">
              Confirmation details sent to {form.email}.
            </p>

            {bankDetails && (
              <div className="w-full border border-primary p-5 md:p-6 text-left mt-2">
                <h2 className="font-headline-md text-[18px] uppercase tracking-tighter mb-4">Havale / EFT Bilgileri</h2>
                <div className="space-y-2 font-label-caps text-label-caps uppercase text-[11px] md:text-label-caps">
                  <p><span className="text-secondary">Hesap:</span> {bankDetails.holder}</p>
                  <p><span className="text-secondary">Banka:</span> {bankDetails.bank}</p>
                  <p className="break-all"><span className="text-secondary">IBAN:</span> {bankDetails.iban}</p>
                  <p className="text-secondary mt-4 normal-case font-body-md text-body-md">
                    Açıklama kısmına sipariş numaranızı ({orderId}) yazın. Ödeme onaylandıktan sonra kargoya verilir.
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link to="/orders" onClick={() => setOrderPlaced(false)} className="border border-primary px-8 py-3 font-label-caps text-label-caps uppercase hover:bg-primary hover:text-surface transition-colors">
                View Orders
              </Link>
              <Link to="/shop" onClick={() => setOrderPlaced(false)} className="font-label-caps text-label-caps underline hover:text-primary transition-colors py-3">
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

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <main className="flex-grow pt-16 md:pt-20 px-container-margin max-w-7xl mx-auto w-full pb-section-gap">
          <motion.div {...fadeUpAnimate} className="flex flex-col items-center justify-center gap-6 mt-24">
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

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n })
  }

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-16 md:pt-20 pb-section-gap px-container-margin max-w-7xl mx-auto w-full">
        <motion.div {...fadeUpAnimate} className="mt-8 md:mt-12 mb-8">
          <Link to="/bag" className="inline-flex items-center gap-1 text-secondary hover:text-primary transition-colors font-label-caps text-label-caps uppercase mb-4">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Bag
          </Link>
          <h1 className="font-headline-lg text-[28px] md:text-display-xl md:font-display-xl uppercase tracking-tighter">CHECKOUT</h1>
        </motion.div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-gutter">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-7 space-y-10">
            <section>
              <h2 className="font-headline-md text-[20px] uppercase tracking-tighter mb-6 border-b border-primary pb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {[
                  { key: 'firstName', label: 'First Name', w: 'md:col-span-1' },
                  { key: 'lastName', label: 'Last Name', w: 'md:col-span-1' },
                  { key: 'email', label: 'Email', w: 'md:col-span-2', type: 'email' },
                  { key: 'address', label: 'Address', w: 'md:col-span-2' },
                  { key: 'city', label: 'City', w: 'md:col-span-1' },
                  { key: 'postalCode', label: 'Postal Code', w: 'md:col-span-1' },
                ].map((f) => (
                  <div key={f.key} className={f.w}>
                    <label className="font-label-caps text-label-caps uppercase mb-1 block">{f.label}</label>
                    <input
                      type={f.type ?? 'text'}
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => update(f.key, e.target.value)}
                      placeholder={f.label}
                      className={`w-full bg-transparent border px-4 py-3 font-body-md text-body-md focus:outline-none transition-colors ${
                        errors[f.key] ? 'border-error' : 'border-primary/50 focus:border-primary'
                      }`}
                    />
                    {errors[f.key] && <p className="text-error font-label-caps text-[10px] mt-1 uppercase">{errors[f.key]}</p>}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-headline-md text-[20px] uppercase tracking-tighter mb-6 border-b border-primary pb-4">Payment Method</h2>
              <div className="space-y-3">
                {paymentMethods.map((m) => (
                  <label
                    key={m.method}
                    className={`flex items-start gap-4 border p-4 cursor-pointer transition-colors ${
                      paymentMethod === m.method ? 'border-primary bg-surface-container-low' : 'border-primary/30 hover:border-primary/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={m.method}
                      checked={paymentMethod === m.method}
                      onChange={() => setPaymentMethod(m.method)}
                      className="mt-1 accent-black"
                    />
                    <div>
                      <p className="font-label-caps text-label-caps uppercase tracking-widest">{m.label}</p>
                      <p className="font-body-md text-body-md text-secondary mt-1">{m.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </section>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-5">
            <div className="border border-primary p-5 md:p-8 bg-surface/50 sticky top-24 md:top-28">
              <h2 className="font-headline-md text-[20px] uppercase tracking-tighter mb-6 border-b border-primary pb-4">Order Summary</h2>
              <div className="divide-y divide-primary/20 max-h-[40vh] overflow-y-auto">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-3 py-3">
                    <div className="w-16 h-20 bg-surface-container overflow-hidden flex-shrink-0 border border-primary/30">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-label-caps text-label-caps uppercase truncate">{item.name}</p>
                      {item.size && <p className="font-label-caps text-[10px] text-secondary uppercase">Size: {item.size}</p>}
                      <p className="font-body-md text-body-md text-secondary">Qty: {item.qty}</p>
                      <p className="font-body-md text-body-md">{catalogService.formatPrice(item.price * item.qty)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-3 font-label-caps text-label-caps uppercase border-t border-primary pt-4">
                <div className="flex justify-between"><span>Subtotal</span><span>{catalogService.formatPrice(cartTotal)}</span></div>
                <div className="flex justify-between text-secondary"><span>Shipping</span><span>Free</span></div>
                <div className="flex justify-between font-headline-md text-[18px] pt-2 border-t border-primary"><span>Total</span><span>{catalogService.formatPrice(cartTotal)}</span></div>
              </div>
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.01 }}
                whileTap={{ scale: submitting ? 1 : 0.99 }}
                className="w-full mt-6 border border-primary bg-primary text-on-primary py-4 font-label-caps text-label-caps uppercase tracking-widest hover:opacity-90 transition-all duration-300 flex items-center justify-between px-6 group disabled:opacity-50"
              >
                <span>{submitting ? 'Processing...' : 'PLACE ORDER'}</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </motion.button>
            </div>
          </motion.div>
        </form>
      </main>

      <MobileNav />
      <Footer />
    </>
  )
}
