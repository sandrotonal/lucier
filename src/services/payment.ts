/**
 * Ödeme sağlayıcıları — Stripe Türkiye'de yok.
 *
 * 1. bank_transfer — Havale/EFT (ücretsiz, varsayılan)
 * 2. iyzico — Türkiye kart ödemesi (sandbox/production, Vercel API)
 * 3. lemonsqueezy — Uluslararası MoR
 * 4. paypal — PayPal link
 */
import { iyzicoService } from './iyzico'

export type PaymentMethod = 'bank_transfer' | 'iyzico' | 'lemonsqueezy' | 'paypal'

export interface PaymentConfig {
  method: PaymentMethod
  label: string
  description: string
  enabled: boolean
}

const bankIban = import.meta.env.VITE_BANK_IBAN as string | undefined
const bankHolder = import.meta.env.VITE_BANK_ACCOUNT_HOLDER as string | undefined
const lemonCheckout = import.meta.env.VITE_LEMONSQUEEZY_CHECKOUT_URL as string | undefined
const paypalLink = import.meta.env.VITE_PAYPAL_CHECKOUT_URL as string | undefined

export const paymentService = {
  getAvailableMethods(): PaymentConfig[] {
    const methods: PaymentConfig[] = [
      {
        method: 'bank_transfer',
        label: 'Havale / EFT',
        description: 'Banka havalesi ile ödeme. Sipariş onayından sonra IBAN bilgisi gösterilir.',
        enabled: true,
      },
      {
        method: 'iyzico',
        label: 'Kart (iyzico)',
        description: 'Türk banka kartı / kredi kartı — güvenli iyzico ödeme sayfası.',
        enabled: iyzicoService.isEnabled(),
      },
      {
        method: 'lemonsqueezy',
        label: 'Kart (Lemon Squeezy)',
        description: 'Visa, Mastercard — uluslararası güvenli ödeme.',
        enabled: Boolean(lemonCheckout),
      },
      {
        method: 'paypal',
        label: 'PayPal',
        description: 'PayPal hesabı veya kart ile ödeme.',
        enabled: Boolean(paypalLink),
      },
    ]
    return methods.filter((m) => m.enabled)
  },

  getBankDetails() {
    return {
      iban: bankIban ?? 'TR00 0000 0000 0000 0000 0000 00',
      holder: bankHolder ?? 'LUCIR ARCHITECTURAL FASHION',
      bank: 'Ziraat Bankası',
    }
  },

  getExternalCheckoutUrl(method: PaymentMethod, orderId: string, amount: number): string | null {
    if (method === 'lemonsqueezy' && lemonCheckout) {
      const url = new URL(lemonCheckout)
      url.searchParams.set('checkout[custom][order_id]', orderId)
      return url.toString()
    }
    if (method === 'paypal' && paypalLink) {
      return paypalLink.replace('{ORDER_ID}', orderId).replace('{AMOUNT}', String(amount))
    }
    return null
  },

  isExternalPayment(method: PaymentMethod): boolean {
    return method === 'lemonsqueezy' || method === 'paypal'
  },

  requiresRedirect(method: PaymentMethod): boolean {
    return method === 'iyzico' || this.isExternalPayment(method)
  },
}
