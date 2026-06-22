import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useStore } from '../store/StoreContext'
import type { Product } from '../data/products'

interface Props {
  product: Product
  index?: number
  className?: string
}

export default function ProductCard({ product, index = 0, className = '' }: Props) {
  const { toggleWishlist, isInWishlist } = useStore()
  const liked = isInWishlist(product.id)

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`flex flex-col gap-3 md:gap-4 group relative ${product.offset ?? ''} ${className}`}
    >
      <Link
        to={product.slug}
        className={`w-full ${product.aspect ?? 'aspect-[3/4]'} bg-surface-container overflow-hidden relative border border-primary block`}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full"
        >
          <img
            alt={product.name}
            className="w-full h-full object-cover"
            src={product.img}
            loading="lazy"
          />
        </motion.div>
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id) }}
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-2 md:top-4 right-2 md:right-4 z-10 hover:scale-110 transition-transform"
        >
          <span
            className={`material-symbols-outlined text-xl md:text-2xl ${liked ? 'text-primary' : 'text-on-surface hover:text-primary-container'}`}
            style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>
      </Link>
      <div className="flex justify-between items-start font-label-caps text-[10px] md:text-label-caps uppercase w-full">
        <span className="pr-2">{product.name}</span>
        <span>{product.priceLabel}</span>
      </div>
    </motion.article>
  )
}
