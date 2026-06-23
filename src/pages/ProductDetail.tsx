import { Link, useParams, useLocation, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import MobileNav from '../components/MobileNav'
import Footer from '../components/Footer'
import SizeGuide from '../components/SizeGuide'
import ProductReviews from '../components/ProductReviews'
import CustomersAlsoBought from '../components/CustomersAlsoBought'
import SEOHead from '../components/SEOHead'
import LiveViewers from '../components/LiveViewers'
import StickyBottomCTA from '../components/StickyBottomCTA'
import { getProductById } from '../data/products'
import { catalogService } from '../services/catalog'
import { useTrackProductView } from '../hooks/useRecentlyViewed'
import { useStore } from '../store/StoreContext'
import { seoService } from '../services/seo'
import { useStockUrgency } from '../hooks/useStockUrgency'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { pathname } = useLocation()
  const productId = pathname === '/jacket' ? 2 : Number(id)
  const product = getProductById(productId)

  useTrackProductView(product?.id)

  const [selectedSize, setSelectedSize] = useState('')
  const [activeImage, setActiveImage] = useState(0)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [zoom, setZoom] = useState(false)
  const { addToCart, toggleWishlist, isInWishlist, showToast } = useStore()

  if (!product) return <Navigate to="/shop" replace />

  const images = product.images ?? [product.img]
  const sizes = product.sizes ?? []
  const unavailable = new Set(product.unavailableSizes ?? [])
  const currentSize = selectedSize || sizes.find((s) => !unavailable.has(s)) || ''
  const liked = isInWishlist(product.id)
  const related = catalogService.getRelated(product.id)
  const stockUrgency = useStockUrgency(product.stock)

  const structuredData = seoService.generateStructuredData('product', {
    name: product.name,
    desc: product.desc,
    img: product.img,
    slug: product.slug,
    price: product.price,
    stock: product.stock,
  })

  const handleAddToBag = () => {
    if (product.stock === 0) {
      showToast('This item is out of stock', 'error')
      return
    }
    if (sizes.length > 0 && !currentSize) {
      showToast('Please select a size', 'error')
      return
    }
    addToCart({
      id: product.id,
      name: product.name,
      desc: product.desc,
      price: product.price,
      img: product.img,
      size: currentSize || undefined,
    })
  }

  return (
    <>
      <SEOHead 
        page="product" 
        data={{
          name: product.name,
          desc: product.desc,
          img: product.img,
          slug: product.slug,
          price: product.price,
          category: product.category,
        }}
        structuredData={structuredData}
      />
      <Navbar />

      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/90 flex items-center justify-center cursor-zoom-out"
            onClick={() => setZoom(false)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={images[activeImage]}
              alt={product.name}
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <SizeGuide open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />

      <main className="flex-grow pt-16 md:pt-20 pb-section-gap px-container-margin w-full max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-gutter mt-8 md:mt-12">
          <div className="lg:col-span-7">
            <Link to="/shop" className="inline-flex items-center gap-1 text-secondary hover:text-primary transition-colors font-label-caps text-label-caps uppercase mb-4 md:mb-6">
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Back to Shop
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-gutter">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div
              className="relative aspect-[4/5] md:h-[870px] border border-primary p-1 bg-surface-container-lowest group cursor-crosshair"
              onClick={() => setZoom(true)}
            >
              <img
                alt={product.name}
                className="w-full h-full object-cover"
                src={images[activeImage]}
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
              <div className="absolute top-3 md:top-4 left-3 md:left-4 border border-primary bg-surface/80 backdrop-blur-sm px-2 md:px-3 py-1">
                <span className="font-label-caps text-[10px] md:text-label-caps text-primary tracking-widest uppercase">
                  Ref: {String(product.id).padStart(2, '0')}A
                </span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setZoom(true) }}
                className="absolute bottom-3 right-3 bg-surface/80 border border-primary p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Zoom"
              >
                <span className="material-symbols-outlined text-lg">fullscreen</span>
              </button>
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-20 md:w-20 md:h-24 flex-shrink-0 border overflow-hidden transition-colors ${
                      activeImage === i ? 'border-primary' : 'border-primary/30 opacity-60 hover:opacity-100'
                    }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-start pt-6 md:pt-8 lg:pl-8"
          >
            <div className="flex items-center gap-2 mb-6 md:mb-8 font-label-caps text-[10px] md:text-label-caps text-secondary uppercase tracking-widest flex-wrap">
              <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
              <span>/</span>
              <span className="hover:text-primary transition-colors">{product.category}</span>
              <span>/</span>
              <span className="text-primary">{product.shortName}</span>
            </div>

            <div className="mb-8 md:mb-12">
              <div className="flex justify-between items-start gap-4">
                <h1 className="font-headline-lg text-[24px] md:text-headline-lg text-primary uppercase mb-3 md:mb-4 tracking-tighter leading-none flex-1">
                  {product.name}
                </h1>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2 transition-all duration-300 flex-shrink-0 ${liked ? 'text-primary' : 'text-secondary hover:text-primary'}`}
                  aria-label="Toggle wishlist"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}>
                    favorite
                  </span>
                </button>
              </div>
              <p className="font-headline-md text-[20px] md:text-headline-md text-primary">{product.priceLabel}</p>
              {product.stock <= 3 && product.stock > 0 && (
                <p className="font-label-caps text-[10px] text-secondary uppercase mt-2">Only {product.stock} left</p>
              )}
              {product.stock === 0 && (
                <p className="font-label-caps text-[10px] text-error uppercase mt-2">Out of stock</p>
              )}
            </div>

            <div className="w-full h-px bg-primary mb-8 md:mb-12" />

            <div className="mb-8 md:mb-12">
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {product.desc}
              </p>
            </div>

            {sizes.length > 0 && (
              <div className="mb-8 md:mb-12">
                <div className="flex justify-between items-baseline mb-4">
                  <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Size</span>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="font-label-caps text-label-caps text-secondary underline hover:text-primary transition-colors"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {sizes.map((size) => {
                    const disabled = unavailable.has(size)
                    return (
                      <motion.button
                        key={size}
                        onClick={() => !disabled && setSelectedSize(size)}
                        whileHover={!disabled ? { scale: 1.05 } : {}}
                        whileTap={!disabled ? { scale: 0.95 } : {}}
                        className={`min-w-10 h-10 md:min-w-12 md:h-12 px-2 border border-primary flex items-center justify-center font-label-caps text-label-caps transition-colors ${
                          currentSize === size
                            ? 'bg-primary text-surface'
                            : 'hover:bg-primary hover:text-surface'
                        } ${disabled ? 'opacity-30 cursor-not-allowed line-through' : ''}`}
                        disabled={disabled}
                      >
                        {size}
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="mt-auto pt-6 md:pt-8 border-t border-primary">
              <motion.button
                onClick={handleAddToBag}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full group relative flex items-center justify-between border border-primary bg-transparent text-primary px-5 md:px-6 py-4 md:py-5 hover:bg-primary hover:text-surface transition-all duration-300"
              >
                <span className="font-headline-md text-[18px] md:text-headline-md uppercase tracking-wider">Add to Bag</span>
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
              </motion.button>
            </div>

            <div className="mt-6 md:mt-8 border border-primary divide-y divide-primary">
              <details className="group cursor-pointer">
                <summary className="flex justify-between items-center p-3 md:p-4 font-label-caps text-label-caps uppercase tracking-widest select-none">
                  Details & Care
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="p-3 md:p-4 pt-0 font-body-md text-body-md text-secondary">
                  Premium materials. Hand wash cold. Do not tumble dry. Crafted in Italy.
                </div>
              </details>
              <details className="group cursor-pointer">
                <summary className="flex justify-between items-center p-3 md:p-4 font-label-caps text-label-caps uppercase tracking-widest select-none">
                  Shipping
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="p-3 md:p-4 pt-0 font-body-md text-body-md text-secondary">
                  Complimentary express shipping on all orders. Returns accepted within 14 days of delivery.
                </div>
              </details>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16"
        >
          <ProductReviews productId={product.id} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16"
        >
          <CustomersAlsoBought productId={product.id} />
        </motion.div>
      </main>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="px-container-margin pb-section-gap max-w-[1600px] mx-auto w-full"
      >
        <div className="border-t border-primary pt-8 md:pt-12">
          <h2 className="font-headline-md text-[20px] md:text-headline-md text-primary uppercase mb-8 md:mb-12 tracking-tighter">
            You might also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-x-gutter md:gap-y-12">
            {related.map((item) => (
              <Link
                key={item.id}
                to={item.slug}
                className="group block border border-transparent hover:border-primary p-1 md:p-2 transition-colors duration-300"
              >
                <div className="aspect-[3/4] mb-3 md:mb-4 bg-surface-container relative overflow-hidden">
                  <img
                    alt={item.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    src={item.img}
                    loading="lazy"
                  />
                </div>
                <div className="flex justify-between items-start font-label-caps text-[10px] md:text-label-caps uppercase tracking-widest">
                  <span className="text-primary pr-2 md:pr-4">{item.shortName}</span>
                  <span className="text-secondary">{item.priceLabel}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Sticky add-to-bag — mobile (rakip UX: SSENSE, Mr Porter) */}
      <div className="lg:hidden fixed bottom-[max(5rem,calc(5rem+env(safe-area-inset-bottom)))] left-0 right-0 z-40 px-container-margin">
        <button
          onClick={handleAddToBag}
          className="w-full flex items-center justify-between border border-primary bg-primary text-on-primary px-5 py-3 font-label-caps text-label-caps uppercase tracking-widest shadow-2xl"
        >
          <span>Add to Bag — {product.priceLabel}</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>

      <MobileNav />
      <Footer />
    </>
  )
}
