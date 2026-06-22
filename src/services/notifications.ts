import type { SavedOrder } from './orders'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

/**
 * Ücretsiz e-posta bildirimi — Web3Forms (250 gönderim/ay, backend gerekmez)
 * https://web3forms.com
 */
export const notificationService = {
  isConfigured(): boolean {
    return Boolean(WEB3FORMS_KEY)
  },

  async sendOrderConfirmation(order: SavedOrder): Promise<boolean> {
    if (!WEB3FORMS_KEY) return false

    const itemsList = order.items
      .map((i) => `${i.name}${i.size ? ` (${i.size})` : ''} × ${i.qty} — $${i.price * i.qty}`)
      .join('\n')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Lucir Order ${order.id}`,
          from_name: 'Lucir Store',
          email: order.shipping.email,
          message: [
            `Order ID: ${order.id}`,
            `Payment: ${order.paymentMethod} (${order.paymentStatus})`,
            '',
            'Items:',
            itemsList,
            '',
            `Total: $${order.subtotal}`,
            '',
            `Ship to: ${order.shipping.firstName} ${order.shipping.lastName}`,
            `${order.shipping.address}, ${order.shipping.city} ${order.shipping.postalCode}`,
          ].join('\n'),
        }),
      })

      const data = await res.json() as { success?: boolean }
      return Boolean(data.success)
    } catch {
      return false
    }
  },
}
