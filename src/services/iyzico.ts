const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? ''

export interface IyzicoInitPayload {
  orderId: string
  amountUsd: number
  shipping: {
    firstName: string
    lastName: string
    email: string
    address: string
    city: string
    postalCode: string
    phone?: string
  }
  items: Array<{ id: number; name: string; price: number; qty: number }>
}

export interface IyzicoInitResponse {
  token: string
  paymentPageUrl: string
  paidPriceTry: string
}

export const iyzicoService = {
  isEnabled(): boolean {
    return import.meta.env.VITE_IYZICO_ENABLED === 'true'
  },

  async initialize(payload: IyzicoInitPayload): Promise<IyzicoInitResponse> {
    const res = await fetch(`${API_BASE}/api/iyzico/initialize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json() as IyzicoInitResponse & { error?: string }
    if (!res.ok) throw new Error(data.error || 'iyzico payment could not be started')
    return data
  },
}
