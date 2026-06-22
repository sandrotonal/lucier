import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './layout/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Bag from './pages/Bag'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import Wishlist from './pages/Wishlist'
import { StoreProvider } from './store/StoreContext'
import Toast from './components/Toast'
import CartDrawer from './components/CartDrawer'
import SearchOverlay from './components/SearchOverlay'

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
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/bag" element={<Bag />} />
            <Route path="/jacket" element={<ProductDetail />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <AnimatedRoutes />
      <Toast />
      <CartDrawer />
      <SearchOverlay />
    </StoreProvider>
  )
}
