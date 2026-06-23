import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { catalogService } from '../services/catalog'
import { useStore } from '../store/StoreContext'

interface CustomersAlsoBoughtProps {
  productId: number
  className?: string
}

export default function CustomersAlsoBought({ productId, className = '' }: CustomersAlsoBoughtProps) {
  const { toggleWishlist, isInWishlist } = useStore()
  const recommendations = catalogService.getRelated(productId, 4)

  if (recommendations.length === 0) return null

  return (
    <div className={className}>
      <h3 className="font-headline-md text-[20px] md:text-headline-md uppercase tracking-tighter mb-6 md:mb-8">
        Customers Also Bought
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {recommendations.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <Link to={product.slug} className="block relative">
              <div className="aspect-[3/4] bg-surface-container mb-3 overflow-hidden border border-transparent group-hover:border-primary transition-colors">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  toggleWishlist(product.id)
                }}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-surface/80 backdrop-blur-sm hover:bg-surface transition-colors"
                aria-label="Add to wishlist"
              >
                <span
                  className={`material-symbols-outlined text-lg ${
                    isInWishlist(product.id) ? 'text-primary' : 'text-secondary'
                  }`}
                  style={{ fontVariationSettings: isInWishlist(product.id) ? "'FILL' 1" : "'FILL' 0" }}
                >
                  favorite
                </span>
              </button>
            </Link>
            <div>
              <p className="font-label-caps text-[11px] md:text-label-caps uppercase mb-1 truncate">
                {product.name}
              </p>
              <div className="flex items-center justify-between">
                <p className="font-body-md text-body-md">{catalogService.formatPrice(product.price)}</p>
                {product.stock > 0 && product.stock < 5 && (
                  <span className="font-label-caps text-[9px] uppercase text-error">
                    Only {product.stock} left
                  </span>
                )}
              </div>
              {product.isNew && (
                <span className="inline-block mt-1 px-2 py-0.5 bg-primary text-on-primary font-label-caps text-[9px] uppercase">
                  New
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
