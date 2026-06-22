import { motion } from 'framer-motion'

interface TrustBadgesProps {
  variant?: 'default' | 'checkout'
  className?: string
}

export default function TrustBadges({ variant = 'default', className = '' }: TrustBadgesProps) {
  const badges = [
    {
      icon: 'verified_user',
      title: 'Secure Payment',
      desc: 'SSL encrypted checkout',
    },
    {
      icon: 'local_shipping',
      title: 'Free Shipping',
      desc: 'On orders over $500',
    },
    {
      icon: 'sync',
      title: 'Easy Returns',
      desc: '30-day return policy',
    },
    {
      icon: 'support_agent',
      title: '24/7 Support',
      desc: 'Customer service',
    },
  ]

  if (variant === 'checkout') {
    return (
      <div className={`border border-primary/30 p-4 bg-surface-container-low ${className}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="material-symbols-outlined text-primary text-xl">shield_check</span>
          <h3 className="font-label-caps text-label-caps uppercase">Secure Checkout</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 px-2 py-1 bg-surface border border-primary/20">
            <span className="font-label-caps text-[9px] uppercase">SSL Secure</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-surface border border-primary/20">
            <span className="font-label-caps text-[9px] uppercase">iyzico</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-surface border border-primary/20">
            <span className="font-label-caps text-[9px] uppercase">Visa</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-surface border border-primary/20">
            <span className="font-label-caps text-[9px] uppercase">Mastercard</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-surface border border-primary/20">
            <span className="font-label-caps text-[9px] uppercase">Bank Transfer</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 ${className}`}>
      {badges.map((badge, i) => (
        <motion.div
          key={badge.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex flex-col items-center text-center gap-2"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 border border-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">
              {badge.icon}
            </span>
          </div>
          <div>
            <p className="font-label-caps text-[11px] md:text-label-caps uppercase tracking-widest">
              {badge.title}
            </p>
            <p className="font-body-md text-[10px] md:text-body-md text-secondary">
              {badge.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
