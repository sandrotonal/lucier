export interface Coupon {
  code: string
  discount: number
  type: 'percentage' | 'fixed'
  minAmount?: number
  expiresAt?: Date
  usedCount?: number
  maxUses?: number
}

const COUPONS: Coupon[] = [
  { code: 'WELCOME10', discount: 10, type: 'percentage', minAmount: 100 },
  { code: 'LUCIR20', discount: 20, type: 'percentage', minAmount: 500 },
  { code: 'FIRST50', discount: 50, type: 'fixed', minAmount: 200 },
  { code: 'FREESHIP', discount: 0, type: 'fixed' },
]

export const couponService = {
  validate(code: string, cartTotal: number): { valid: boolean; message: string; coupon?: Coupon } {
    const coupon = COUPONS.find((c) => c.code.toUpperCase() === code.toUpperCase())
    
    if (!coupon) {
      return { valid: false, message: 'Invalid coupon code' }
    }

    if (coupon.minAmount && cartTotal < coupon.minAmount) {
      return {
        valid: false,
        message: `Minimum order amount is $${coupon.minAmount}`,
      }
    }

    if (coupon.expiresAt && new Date() > coupon.expiresAt) {
      return { valid: false, message: 'Coupon has expired' }
    }

    if (coupon.maxUses && coupon.usedCount && coupon.usedCount >= coupon.maxUses) {
      return { valid: false, message: 'Coupon usage limit reached' }
    }

    return {
      valid: true,
      message: `Coupon applied: ${coupon.type === 'percentage' ? `${coupon.discount}% off` : `$${coupon.discount} off`}`,
      coupon,
    }
  },

  calculateDiscount(coupon: Coupon, cartTotal: number): number {
    if (coupon.type === 'percentage') {
      return Math.round((cartTotal * coupon.discount) / 100)
    }
    return Math.min(coupon.discount, cartTotal)
  },

  getAvailableCoupons(): Coupon[] {
    return COUPONS.filter((c) => !c.expiresAt || new Date() < c.expiresAt)
  },
}
