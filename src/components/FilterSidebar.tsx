import { motion, AnimatePresence } from 'framer-motion'
import type { ProductColor } from '../data/products'

interface FilterSidebarProps {
  open: boolean
  onClose: () => void
  priceRange: [number, number]
  selectedPriceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  availableSizes: string[]
  selectedSizes: string[]
  onSizeToggle: (size: string) => void
  availableColors: ProductColor[]
  selectedColors: ProductColor[]
  onColorToggle: (color: ProductColor) => void
  inStockOnly: boolean
  onInStockToggle: () => void
  isNewOnly: boolean
  onIsNewToggle: () => void
  onClearAll: () => void
}

const COLOR_MAP: Record<ProductColor, string> = {
  Black: '#000000',
  White: '#FFFFFF',
  Gray: '#9CA3AF',
  Beige: '#F5F5DC',
  Brown: '#8B4513',
  Blue: '#3B82F6',
  Green: '#10B981',
  Red: '#EF4444',
}

export default function FilterSidebar({
  open,
  onClose,
  priceRange,
  selectedPriceRange,
  onPriceRangeChange,
  availableSizes,
  selectedSizes,
  onSizeToggle,
  availableColors,
  selectedColors,
  onColorToggle,
  inStockOnly,
  onInStockToggle,
  isNewOnly,
  onIsNewToggle,
  onClearAll,
}: FilterSidebarProps) {
  const hasActiveFilters = 
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    inStockOnly ||
    isNewOnly ||
    selectedPriceRange[0] !== priceRange[0] ||
    selectedPriceRange[1] !== priceRange[1]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        >
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface h-full w-[85vw] max-w-sm border-r border-primary overflow-y-auto"
          >
            <div className="sticky top-0 bg-surface border-b border-primary p-6 flex items-center justify-between z-10">
              <h2 className="font-headline-md text-[20px] uppercase tracking-tighter">Filters</h2>
              <button onClick={onClose} className="text-primary hover:opacity-70" aria-label="Close">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 space-y-8">
              {hasActiveFilters && (
                <button
                  onClick={onClearAll}
                  className="w-full border border-primary px-4 py-2 font-label-caps text-label-caps uppercase hover:bg-primary hover:text-on-primary transition-colors"
                >
                  Clear All
                </button>
              )}

              <div>
                <h3 className="font-label-caps text-label-caps uppercase mb-4">Price Range</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min={priceRange[0]}
                    max={priceRange[1]}
                    value={selectedPriceRange[0]}
                    onChange={(e) =>
                      onPriceRangeChange([Number(e.target.value), selectedPriceRange[1]])
                    }
                    className="w-full accent-black"
                  />
                  <input
                    type="range"
                    min={priceRange[0]}
                    max={priceRange[1]}
                    value={selectedPriceRange[1]}
                    onChange={(e) =>
                      onPriceRangeChange([selectedPriceRange[0], Number(e.target.value)])
                    }
                    className="w-full accent-black"
                  />
                  <div className="flex justify-between font-body-md text-body-md">
                    <span>${selectedPriceRange[0]}</span>
                    <span>${selectedPriceRange[1]}</span>
                  </div>
                </div>
              </div>

              {availableSizes.length > 0 && (
                <div>
                  <h3 className="font-label-caps text-label-caps uppercase mb-4">Size</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => onSizeToggle(size)}
                        className={`border px-3 py-2 font-label-caps text-label-caps uppercase transition-colors ${
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
                  <h3 className="font-label-caps text-label-caps uppercase mb-4">Color</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {availableColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => onColorToggle(color)}
                        className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                          selectedColors.includes(color)
                            ? 'border-primary scale-110'
                            : 'border-primary/30 hover:border-primary/60'
                        }`}
                        style={{ backgroundColor: COLOR_MAP[color] }}
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

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={onInStockToggle}
                    className="w-5 h-5 accent-black cursor-pointer"
                  />
                  <span className="font-label-caps text-label-caps uppercase">In Stock Only</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNewOnly}
                    onChange={onIsNewToggle}
                    className="w-5 h-5 accent-black cursor-pointer"
                  />
                  <span className="font-label-caps text-label-caps uppercase">New Arrivals</span>
                </label>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
