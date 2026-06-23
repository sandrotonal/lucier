import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './layout/Layout'
import AdminLayout from './layout/AdminLayout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Bag from './pages/Bag'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import Wishlist from './pages/Wishlist'
import InfoPage from './pages/InfoPage'
import Orders from './pages/Orders'
import PaymentResult from './pages/PaymentResult'
import NotFound from './pages/NotFound'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import { StoreProvider } from './store/StoreContext'
import Toast from './components/Toast'
import CartDrawer from './components/CartDrawer'
import SearchOverlay from './components/SearchOverlay'
import { useBackendInit } from './hooks/useBackendInit'

function BackendInit() {
  useBackendInit()
  return null
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const }}
      >
        <Routes location={location}>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminDashboard />} />
            <Route path="coupons" element={<AdminDashboard />} />
          </Route>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/bag" element={<Bag />} />
            <Route path="/jacket" element={<ProductDetail />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/payment/result" element={<PaymentResult />} />
            <Route path="/info/:slug" element={<InfoPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <BackendInit />
      <AnimatedRoutes />
      <Toast />
      <CartDrawer />
      <SearchOverlay />
    </StoreProvider>
  )
}
