import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useStore } from '../store/StoreContext'
import type { Product } from '../data/products'

interface Props {
  product: Product
  index?: number
  className?: string
}

function defaultSize(product: Product): string | undefined {
  if (!product.sizes?.length) return undefined
  const unavailable = new Set(product.unavailableSizes ?? [])
  return product.sizes.find((s) => !unavailable.has(s))
}

export default function ProductCard({ product, index = 0, className = '' }: Props) {
  const { toggleWishlist, isInWishlist, addToCart } = useStore()
  const liked = isInWishlist(product.id)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const size = defaultSize(product)
    if (product.sizes?.length && !size) return
    addToCart({
      id: product.id,
      name: product.name,
      desc: product.desc,
      price: product.price,
      img: product.img,
      size,
    })
  }

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
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} className="w-full h-full">
          <img alt={product.name} className="w-full h-full object-cover" src={product.img} loading="lazy" />
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
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-0 left-0 right-0 bg-primary/90 text-on-primary py-2 font-label-caps text-[10px] md:text-label-caps uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10"
          aria-label="Quick add to bag"
        >
          Quick Add
        </button>
      </Link>
      <div className="flex justify-between items-start font-label-caps text-[10px] md:text-label-caps uppercase w-full">
        <span className="pr-2">{product.name}</span>
        <span>{product.priceLabel}</span>
      </div>
    </motion.article>
  )
}
