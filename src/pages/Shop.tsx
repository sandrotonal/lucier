import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import MobileNav from '../components/MobileNav'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { CATEGORIES, type CategoryFilter } from '../data/products'
import { catalogService, type SortOption } from '../services/catalog'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price ↑' },
  { value: 'price-desc', label: 'Price ↓' },
  { value: 'name', label: 'Name' },
]

export default function Shop() {
  const [activeCat, setActiveCat] = useState<CategoryFilter>('All')
  const [sort, setSort] = useState<SortOption>('featured')
  const filtered = catalogService.search(activeCat, '', sort)

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-16 md:pt-20 pb-section-gap px-container-margin max-w-[1600px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-primary pb-6 md:pb-8 mt-8 md:mt-12"
        >
          <div>
            <motion.h1
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[28px] md:text-headline-lg font-headline-lg uppercase tracking-tight leading-tight"
            >
              COLLECTION 24/25
            </motion.h1>
            <p className="font-label-caps text-label-caps text-secondary uppercase mt-2">
              {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3 md:gap-4 font-label-caps text-label-caps"
            >
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`uppercase transition-colors ${
                    activeCat === cat ? 'border-b border-primary pb-1 font-bold' : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </motion.div>
            <div className="flex gap-3 font-label-caps text-[10px] md:text-label-caps uppercase">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSort(opt.value)}
                  className={`transition-colors ${sort === opt.value ? 'text-primary font-bold' : 'text-secondary hover:text-primary'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-headline-md text-[20px] uppercase text-secondary mb-4">No products in this category</p>
            <button onClick={() => setActiveCat('All')} className="font-label-caps text-label-caps underline hover:text-primary">
              View all
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-gutter">
            {filtered.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                index={i}
                className={`${p.col ?? 'md:col-span-4'} col-span-1`}
              />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-20"
        >
          <div className="w-full aspect-video md:aspect-[16/7] bg-surface-container overflow-hidden relative border border-primary flex items-center justify-center">
            <img
              alt="Editorial Campaign"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDetVlRt9juCodPLx1D-TmpagHrA1QzW3zl6zHsLiJET2VeZ7U9WvGWy2nAlnbtOU1tazR7t5x76k2smHm0cj-TfMUSXcCFkELizg4qlYHIhB7b9ChiF0GmeGMN35VOGn8J_BDPNaL9Tk_RZl4mpun_KBAr9Bp_PgscBKzvkN3wVYY0W-h22KzHPgGCURyKd9KvEsFUzgITDFlWzGyuNdGZbc7zElknrd_C75f0pbcwZEpPmxmcsdUmN94xPWAZMi2GqTqmo_n3A8o"
              loading="lazy"
            />
            <Link
              to="/jacket"
              className="z-10 bg-surface/80 backdrop-blur-sm px-6 py-3 md:px-8 md:py-4 hover:bg-surface transition-colors cursor-pointer border border-primary font-label-caps text-label-caps uppercase tracking-widest"
            >
              Explore Jacket
            </Link>
          </div>
        </motion.div>
      </main>

      <MobileNav />
      <Footer />
    </>
  )
}
