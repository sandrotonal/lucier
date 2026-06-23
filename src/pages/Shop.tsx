import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import Navbar from '../components/Navbar'
import MobileNav from '../components/MobileNav'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import FilterSidebar from '../components/FilterSidebar'
import SEOHead from '../components/SEOHead'
import { CATEGORIES, type CategoryFilter, type ProductColor } from '../data/products'
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
  const [filterOpen, setFilterOpen] = useState(false)
  
  const priceRange = useMemo(() => catalogService.getPriceRange(), [])
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>(priceRange)
  const availableSizes = useMemo(() => catalogService.getAvailableSizes(), [])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const availableColors = useMemo(() => catalogService.getAvailableColors(), [])
  const [selectedColors, setSelectedColors] = useState<ProductColor[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [isNewOnly, setIsNewOnly] = useState(false)

  const filtered = useMemo(
    () =>
      catalogService.searchWithFilters({
        category: activeCat,
        query: '',
        sort,
        priceRange: selectedPriceRange,
        sizes: selectedSizes,
        colors: selectedColors,
        inStock: inStockOnly,
        isNew: isNewOnly,
      }),
    [activeCat, sort, selectedPriceRange, selectedSizes, selectedColors, inStockOnly, isNewOnly]
  )

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    )
  }

  const handleColorToggle = (color: ProductColor) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    )
  }

  const handleClearAll = () => {
    setSelectedPriceRange(priceRange)
    setSelectedSizes([])
    setSelectedColors([])
    setInStockOnly(false)
    setIsNewOnly(false)
  }

  const activeFilterCount =
    selectedSizes.length +
    selectedColors.length +
    (inStockOnly ? 1 : 0) +
    (isNewOnly ? 1 : 0) +
    (selectedPriceRange[0] !== priceRange[0] || selectedPriceRange[1] !== priceRange[1] ? 1 : 0)

  return (
    <>
      <SEOHead page="shop" />
      <Navbar />
      <FilterSidebar
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        priceRange={priceRange}
        selectedPriceRange={selectedPriceRange}
        onPriceRangeChange={setSelectedPriceRange}
        availableSizes={availableSizes}
        selectedSizes={selectedSizes}
        onSizeToggle={handleSizeToggle}
        availableColors={availableColors}
        selectedColors={selectedColors}
        onColorToggle={handleColorToggle}
        inStockOnly={inStockOnly}
        onInStockToggle={() => setInStockOnly(!inStockOnly)}
        isNewOnly={isNewOnly}
        onIsNewToggle={() => setIsNewOnly(!isNewOnly)}
        onClearAll={handleClearAll}
      />

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
            <div className="flex items-center justify-between gap-4">
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
              <button
                onClick={() => setFilterOpen(true)}
                className="lg:hidden border border-primary px-4 py-2 font-label-caps text-label-caps uppercase hover:bg-primary hover:text-on-primary transition-colors relative"
              >
                Filters
                {activeFilterCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-on-primary w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-gutter">
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24 self-start">
            <div className="border border-primary p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-headline-md text-[18px] uppercase tracking-tighter">Filters</h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="font-label-caps text-[10px] uppercase text-secondary hover:text-primary transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-label-caps text-label-caps uppercase mb-3">Price</h4>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min={priceRange[0]}
                      max={priceRange[1]}
                      value={selectedPriceRange[0]}
                      onChange={(e) =>
                        setSelectedPriceRange([Number(e.target.value), selectedPriceRange[1]])
                      }
                      className="w-full accent-black"
                    />
                    <input
                      type="range"
                      min={priceRange[0]}
                      max={priceRange[1]}
                      value={selectedPriceRange[1]}
                      onChange={(e) =>
                        setSelectedPriceRange([selectedPriceRange[0], Number(e.target.value)])
                      }
                      className="w-full accent-black"
                    />
                    <div className="flex justify-between font-body-md text-body-md text-[12px]">
                      <span>${selectedPriceRange[0]}</span>
                      <span>${selectedPriceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {availableSizes.length > 0 && (
                  <div>
                    <h4 className="font-label-caps text-label-caps uppercase mb-3">Size</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {availableSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeToggle(size)}
                          className={`border px-2 py-1.5 font-label-caps text-[10px] uppercase transition-colors ${
                            selectedSizes.includes(size)
                              ? 'border-primary bg-primary text-on-primary'
                              : 'border-primary/30 hover:border-primary'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {availableColors.length > 0 && (
                  <div>
                    <h4 className="font-label-caps text-label-caps uppercase mb-3">Color</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {availableColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => handleColorToggle(color)}
                          className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                            selectedColors.includes(color)
                              ? 'border-primary scale-110'
                              : 'border-primary/30 hover:border-primary/60'
                          }`}
                          style={{
                            backgroundColor:
                              color === 'Black'
                                ? '#000000'
                                : color === 'White'
                                ? '#FFFFFF'
                                : color === 'Gray'
                                ? '#9CA3AF'
                                : color === 'Beige'
                                ? '#F5F5DC'
                                : color === 'Brown'
                                ? '#8B4513'
                                : color === 'Blue'
                                ? '#3B82F6'
                                : color === 'Green'
                                ? '#10B981'
                                : '#EF4444',
                          }}
                          title={color}
                          aria-label={color}
                        >
                          {selectedColors.includes(color) && (
                            <span className="absolute inset-0 flex items-center justify-center material-symbols-outlined text-white text-sm drop-shadow-lg">
                              check
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3 pt-2 border-t border-primary/30">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={() => setInStockOnly(!inStockOnly)}
                      className="w-4 h-4 accent-black cursor-pointer"
                    />
                    <span className="font-label-caps text-[10px] uppercase">In Stock</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isNewOnly}
                      onChange={() => setIsNewOnly(!isNewOnly)}
                      className="w-4 h-4 accent-black cursor-pointer"
                    />
                    <span className="font-label-caps text-[10px] uppercase">New</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-9">
            {filtered.length === 0 ? (
              <div className="py-20 text-center">
                <p className="font-headline-md text-[20px] uppercase text-secondary mb-4">No products match filters</p>
                <button onClick={handleClearAll} className="font-label-caps text-label-caps underline hover:text-primary">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-9 gap-4 md:gap-gutter">
                {filtered.map((p, i) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    index={i}
                    className="md:col-span-3 col-span-1"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

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
