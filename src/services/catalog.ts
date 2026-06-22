import { products, getProductById, getProductBySlug, filterProducts, getRelatedProducts, featuredProducts, formatPrice, getStock as getStaticStock } from '../data/products'
import { fetchStockFromSupabase } from './sync'
import type { Product, CategoryFilter, ProductColor } from '../data/products'

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name'

export interface FilterOptions {
  category: CategoryFilter
  query?: string
  sort?: SortOption
  priceRange?: [number, number]
  sizes?: string[]
  colors?: ProductColor[]
  inStock?: boolean
  isNew?: boolean
}

/** API'ye geçişte sadece bu servis değişir; UI aynı kalır */
export const catalogService = {
  getAll(): Product[] {
    return [...products]
  },

  getFeatured(): Product[] {
    return featuredProducts
  },

  getById(id: number): Product | undefined {
    return getProductById(id)
  },

  getBySlug(slug: string): Product | undefined {
    return getProductBySlug(slug)
  },

  search(category: CategoryFilter, query = '', sort: SortOption = 'featured'): Product[] {
    let list = filterProducts(category, query)

    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'name':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured))
    }

    return list
  },

  searchWithFilters(filters: FilterOptions): Product[] {
    let list = filterProducts(filters.category, filters.query || '')

    if (filters.priceRange) {
      const [min, max] = filters.priceRange
      list = list.filter((p) => p.price >= min && p.price <= max)
    }

    if (filters.sizes && filters.sizes.length > 0) {
      list = list.filter((p) => 
        p.sizes && p.sizes.some((s) => filters.sizes!.includes(s))
      )
    }

    if (filters.colors && filters.colors.length > 0) {
      list = list.filter((p) => 
        p.colors && p.colors.some((c) => filters.colors!.includes(c))
      )
    }

    if (filters.inStock) {
      list = list.filter((p) => p.stock > 0)
    }

    if (filters.isNew) {
      list = list.filter((p) => p.isNew === true)
    }

    const sort = filters.sort || 'featured'
    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'name':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured))
    }

    return list
  },

  getAvailableSizes(): string[] {
    const sizes = new Set<string>()
    products.forEach((p) => {
      if (p.sizes) p.sizes.forEach((s) => sizes.add(s))
    })
    return Array.from(sizes).sort()
  },

  getAvailableColors(): ProductColor[] {
    const colors = new Set<ProductColor>()
    products.forEach((p) => {
      if (p.colors) p.colors.forEach((c) => colors.add(c))
    })
    return Array.from(colors)
  },

  getPriceRange(): [number, number] {
    const prices = products.map((p) => p.price)
    return [Math.min(...prices), Math.max(...prices)]
  },

  getRelated(id: number, limit = 4): Product[] {
    return getRelatedProducts(id, limit)
  },

  formatPrice,

  getStock(productId: number): number {
    return getStaticStock(productId)
  },

  async getStockLive(productId: number): Promise<number> {
    const remote = await fetchStockFromSupabase(productId)
    if (remote !== null) {
      const product = getProductById(productId)
      if (product) product.stock = remote
      return remote
    }
    return getStaticStock(productId)
  },

  canAddToCart(productId: number, requestedQty: number, currentInCart: number): boolean {
    return currentInCart + requestedQty <= getStaticStock(productId)
  },
}
