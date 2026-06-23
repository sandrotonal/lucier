import { emailTemplates, type OrderEmailData } from './email-templates'

export interface EmailConfig {
  apiKey: string
  apiUrl: string
  fromEmail: string
  fromName: string
}

const config: EmailConfig = {
  apiKey: import.meta.env.VITE_EMAIL_API_KEY || '',
  apiUrl: 'https://api.web3forms.com/submit',
  fromEmail: 'hello@lucir.com',
  fromName: 'LUCIR',
}

export const emailService = {
  async sendOrderConfirmation(data: OrderEmailData): Promise<{ ok: boolean; error?: string }> {
    try {
      const template = emailTemplates.orderConfirmation(data)
      
      const payload = {
        access_key: config.apiKey,
        subject: template.subject,
        from_name: config.fromName,
        email: data.customerEmail,
        message: template.text,
      }

      if (!config.apiKey) {
        console.log('[Email] Would send:', template.subject, 'to', data.customerEmail)
        return { ok: true }
      }

      const response = await fetch(config.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        return { ok: false, error: result.message || 'Email send failed' }
      }

      return { ok: true }
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : 'Email send failed',
      }
    }
  },

  async sendShippingNotification(
    orderId: string,
    customerEmail: string,
    trackingNumber: string
  ): Promise<{ ok: boolean; error?: string }> {
    try {
      const payload = {
        access_key: config.apiKey,
        subject: `Your Order Has Shipped - ${orderId}`,
        from_name: config.fromName,
        email: customerEmail,
        message: `Your order ${orderId} has shipped!\n\nTracking: ${trackingNumber}\n\nThank you for shopping with LUCIR.`,
      }

      if (!config.apiKey) {
        console.log('[Email] Would send shipping notification to', customerEmail)
        return { ok: true }
      }

      const response = await fetch(config.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        return { ok: false, error: result.message || 'Email send failed' }
      }

      return { ok: true }
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : 'Email send failed',
      }
    }
  },
}
