import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import MobileNav from '../components/MobileNav'
import Footer from '../components/Footer'
import { useStore } from '../store/StoreContext'
import { getProductById } from '../data/products'

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useStore()
  const wishlistProducts = wishlist.map((id) => getProductById(id)).filter(Boolean)

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-16 md:pt-20 px-container-margin max-w-[1600px] mx-auto w-full pb-section-gap">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-headline-lg text-[28px] md:text-display-xl md:font-display-xl uppercase tracking-tighter mt-8 md:mt-12 mb-8 md:mb-16"
        >
          WISHLIST ({wishlistProducts.length})
        </motion.h1>

        {wishlistProducts.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center gap-6 mt-24">
            <span className="material-symbols-outlined text-6xl text-secondary">favorite</span>
            <p className="font-headline-md text-[20px] uppercase tracking-tighter text-secondary">Your wishlist is empty</p>
            <Link to="/shop" className="font-label-caps text-label-caps underline hover:text-primary transition-colors">
              Discover Products
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-gutter">
            {wishlistProducts.map((p, i) => p && (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group relative"
              >
                <Link to={p.slug} className="block">
                  <div className="aspect-[3/4] bg-surface-container overflow-hidden border border-primary/30">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="flex justify-between items-start mt-3 font-label-caps text-[10px] md:text-label-caps uppercase">
                    <span className="pr-2">{p.shortName}</span>
                    <span>{p.priceLabel}</span>
                  </div>
                </Link>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => addToCart({ id: p.id, name: p.name, desc: p.desc, price: p.price, img: p.img })}
                    className="flex-1 border border-primary py-2 font-label-caps text-[10px] md:text-label-caps uppercase hover:bg-primary hover:text-surface transition-colors"
                  >
                    Add to Bag
                  </button>
                  <button
                    onClick={() => toggleWishlist(p.id)}
                    className="w-10 border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-surface transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <MobileNav />
      <Footer />
    </>
  )
}
