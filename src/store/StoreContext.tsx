import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { CartItem, Toast } from './types'

interface StoreContextType {
  cart: CartItem[]
  wishlist: number[]
  toasts: Toast[]
  cartOpen: boolean
  addToCart: (item: Omit<CartItem, 'qty'>) => void
  removeFromCart: (id: number) => void
  updateQty: (id: number, delta: number) => void
  clearCart: () => void
  toggleWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean
  showToast: (message: string, type?: Toast['type']) => void
  setCartOpen: (open: boolean) => void
}

const StoreContext = createContext<StoreContextType | null>(null)

let toastId = 0

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [toasts, setToasts] = useState<Toast[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000)
  }, [])

  const addToCart = useCallback((item: Omit<CartItem, 'qty'>) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...item, qty: 1 }]
    })
    setCartOpen(true)
    showToast(`${item.name} added to bag`, 'success')
  }, [showToast])

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const updateQty = useCallback((id: number, delta: number) => {
    setCart((prev) => prev.map((i) =>
      i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
    ))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const toggleWishlist = useCallback((id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }, [])

  const isInWishlist = useCallback((id: number) => wishlist.includes(id), [wishlist])

  return (
    <StoreContext.Provider value={{
      cart, wishlist, toasts, cartOpen,
      addToCart, removeFromCart, updateQty, clearCart,
      toggleWishlist, isInWishlist,
      showToast, setCartOpen
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
