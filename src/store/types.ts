export interface CartItem {
  id: number
  name: string
  desc: string
  price: number
  qty: number
  img: string
}

export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}
