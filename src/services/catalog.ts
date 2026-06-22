import { products, getProductById, getProductBySlug, filterProducts, getRelatedProducts, featuredProducts, formatPrice, getStock as getStaticStock } from '../data/products'
import { fetchStockFromSupabase } from './sync'
import type { Product, CategoryFilter } from '../data/products'

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name'

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
