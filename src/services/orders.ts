import type { CartItem } from '../store/types'
import type { PaymentMethod } from './payment'
import { loadFromStorage, saveToStorage } from '../lib/storage'
import { syncOrderToSupabase } from './sync'
import { notificationService } from './notifications'

const ORDERS_KEY = 'lucir_orders'

export type PaymentStatus = 'pending' | 'awaiting_transfer' | 'paid' | 'cancelled'

export interface SavedOrder {
  id: string
  createdAt: string
  items: CartItem[]
  subtotal: number
  shipping: { firstName: string; lastName: string; email: string; address: string; city: string; postalCode: string }
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
}

function generateOrderId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `LUCIR-${date}-${rand}`
}

export const orderService = {
  getAll(): SavedOrder[] {
    const raw = loadFromStorage<SavedOrder[]>(ORDERS_KEY, [])
    return raw.map((o) => ({
      ...o,
      paymentMethod: o.paymentMethod ?? 'bank_transfer',
      paymentStatus: o.paymentStatus ?? 'awaiting_transfer',
    }))
  },

  async placeOrder(
    items: CartItem[],
    shipping: SavedOrder['shipping'],
    paymentMethod: PaymentMethod,
  ): Promise<SavedOrder> {
    const order: SavedOrder = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      items: items.map((i) => ({ ...i })),
      subtotal: items.reduce((s, i) => s + i.price * i.qty, 0),
      shipping,
      paymentMethod,
      paymentStatus: paymentMethod === 'bank_transfer' ? 'awaiting_transfer' : 'pending',
    }

    const existing = this.getAll()
    saveToStorage(ORDERS_KEY, [order, ...existing])

    // Arka planda sync — başarısız olursa kuyruğa alınır
    void syncOrderToSupabase(order)
    void notificationService.sendOrderConfirmation(order)

    return order
  },

  getById(id: string): SavedOrder | undefined {
    return this.getAll().find((o) => o.id === id)
  },

  updatePaymentStatus(orderId: string, paymentStatus: PaymentStatus): void {
    const orders = this.getAll()
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, paymentStatus } : o
    )
    saveToStorage(ORDERS_KEY, updated)
  },
}
