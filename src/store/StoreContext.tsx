import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { CartItem, Toast } from './types'
import { CART_KEY, WISHLIST_KEY, loadFromStorage, saveToStorage } from '../lib/storage'
import { catalogService } from '../services/catalog'
import type { BackendStatus } from '../lib/supabase'

interface StoreContextType {
  cart: CartItem[]
  wishlist: number[]
  toasts: Toast[]
  cartOpen: boolean
  searchOpen: boolean
  orderPlaced: boolean
  backendStatus: BackendStatus
  addToCart: (item: Omit<CartItem, 'qty'>) => boolean
  removeFromCart: (id: number, size?: string) => void
  updateQty: (id: number, delta: number, size?: string) => boolean
  clearCart: () => void
  toggleWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean
  showToast: (message: string, type?: Toast['type']) => void
  setCartOpen: (open: boolean) => void
  setSearchOpen: (open: boolean) => void
  setOrderPlaced: (placed: boolean) => void
  setBackendStatus: (status: BackendStatus) => void
  cartCount: number
  cartTotal: number
}

const StoreContext = createContext<StoreContextType | null>(null)

let toastId = 0

function cartItemKey(id: number, size?: string) {
  return `${id}-${size ?? 'default'}`
}

function qtyInCart(cart: CartItem[], productId: number, size?: string): number {
  return cart
    .filter((i) => cartItemKey(i.id, i.size) === cartItemKey(productId, size))
    .reduce((s, i) => s + i.qty, 0)
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => loadFromStorage(CART_KEY, []))
  const [wishlist, setWishlist] = useState<number[]>(() => loadFromStorage(WISHLIST_KEY, []))
  const [toasts, setToasts] = useState<Toast[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [backendStatus, setBackendStatus] = useState<BackendStatus>('local')

  useEffect(() => { saveToStorage(CART_KEY, cart) }, [cart])
  useEffect(() => { saveToStorage(WISHLIST_KEY, wishlist) }, [wishlist])

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000)
  }, [])

  const addToCart = useCallback((item: Omit<CartItem, 'qty'>): boolean => {
    const currentQty = qtyInCart(cart, item.id, item.size)
    if (!catalogService.canAddToCart(item.id, 1, currentQty)) {
      showToast('This item is out of stock', 'error')
      return false
    }

    setCart((prev) => {
      const existing = prev.find(
        (i) => cartItemKey(i.id, i.size) === cartItemKey(item.id, item.size)
      )
      if (existing) {
        return prev.map((i) =>
          cartItemKey(i.id, i.size) === cartItemKey(item.id, item.size)
            ? { ...i, qty: i.qty + 1 }
            : i
        )
      }
      return [...prev, { ...item, qty: 1 }]
    })

    setCartOpen(true)
    showToast(`${item.name} added to bag`, 'success')
    return true
  }, [cart, showToast])

  const removeFromCart = useCallback((id: number, size?: string) => {
    setCart((prev) => prev.filter((i) => cartItemKey(i.id, i.size) !== cartItemKey(id, size)))
  }, [])

  const updateQty = useCallback((id: number, delta: number, size?: string): boolean => {
    if (delta > 0) {
      const currentQty = qtyInCart(cart, id, size)
      if (!catalogService.canAddToCart(id, delta, currentQty)) {
        showToast('Maximum stock reached', 'error')
        return false
      }
    }

    setCart((prev) => prev.map((i) =>
      cartItemKey(i.id, i.size) === cartItemKey(id, size)
        ? { ...i, qty: Math.max(1, i.qty + delta) }
        : i
    ))
    return true
  }, [cart, showToast])

  const clearCart = useCallback(() => setCart([]), [])

  const toggleWishlist = useCallback((id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }, [])

  const isInWishlist = useCallback((id: number) => wishlist.includes(id), [wishlist])

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <StoreContext.Provider value={{
      cart, wishlist, toasts, cartOpen, searchOpen, orderPlaced, backendStatus,
      addToCart, removeFromCart, updateQty, clearCart,
      toggleWishlist, isInWishlist,
      showToast, setCartOpen, setSearchOpen, setOrderPlaced, setBackendStatus,
      cartCount, cartTotal,
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
