export interface CartItem {
  id: number
  name: string
  desc: string
  price: number
  qty: number
  img: string
  size?: string
}

export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

export interface OrderDetails {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  postalCode: string
}
