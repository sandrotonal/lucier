export type ProductCategory = 'Jackets' | 'Accessories' | 'Shoes' | 'Tops'

export interface Product {
  id: number
  name: string
  shortName: string
  price: number
  priceLabel: string
  desc: string
  category: ProductCategory
  slug: string
  img: string
  images?: string[]
  aspect?: string
  col?: string
  offset?: string
  featured?: boolean
  sizes?: string[]
  unavailableSizes?: string[]
  stock: number
}

export const CATEGORIES = ['All', 'Jackets', 'Accessories', 'Shoes', 'Tops'] as const
export type CategoryFilter = (typeof CATEGORIES)[number]

export const products: Product[] = [
  {
    id: 1,
    name: 'OVERSIZED TOTE BAG',
    shortName: 'Bag',
    price: 1299,
    priceLabel: '$1299',
    desc: 'STRUCTURAL LEATHER, ARCHITECTURAL SILHOUETTE. HANDCRAFTED IN ITALY.',
    category: 'Accessories',
    slug: '/product/1',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2l-S8vmxu3vnpN-hrIIxnPXisCdnW5PxPtjwHBm4iOEm9BJj6JQdju6_BerWQOEqpvnSDOw9Hf1IF8Bg2ltM_QZlJ11NIPEuSXJhoFpPtIvswb1opAJC_hd1oB182eU8WDX-Du3Nl5j_kDgDdQPCNdReT55L4xRiH3y39E5mqBt8ouI_8llvywEn8c_Ln9ukFyT8bw_I5tZq8EYLEN22dTEfj2cRtSCcVlKWLSIcjf8Gv4mR6nRq8tvIbFvv0D-PqBgBXGUq-nwM',
    aspect: 'aspect-[4/3]',
    col: 'md:col-span-8',
    featured: true,
    stock: 8,
  },
  {
    id: 2,
    name: 'TECHNICAL NYLON SHELL JACKET',
    shortName: 'Jacket',
    price: 999,
    priceLabel: '$999',
    desc: 'STRUCTURAL POLYAMIDE, ARCHITECTURAL CUT. ENGINEERED FOR VOLUME.',
    category: 'Jackets',
    slug: '/jacket',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQbvVTypm1gJ0WPNwSFwku-QmG5Scc5hiZMe3ibjfVErxcgnY5VvarVCQwXdHAFeJkkqyO2Q9_ufVnsw41OEoNe7UX3cz8_mzsG3Is74thgT-f85CmqxEPMB8oN6yarT8xIhIBogVpfg7K3VEiUjidBPYrQ2yl3Bm7zGXVd_dPnJB9P4g_ppMmgI6VYhaD1edpB_dZ0rkKgeJDR6YuKYXA_P_Zy7NmYfbRLcj6Ib1qB-f8ZfF-XxG4I-BAEYIlh4PJhkpnu-gHsSc',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDQbvVTypm1gJ0WPNwSFwku-QmG5Scc5hiZMe3ibjfVErxcgnY5VvarVCQwXdHAFeJkkqyO2Q9_ufVnsw41OEoNe7UX3cz8_mzsG3Is74thgT-f85CmqxEPMB8oN6yarT8xIhIBogVpfg7K3VEiUjidBPYrQ2yl3Bm7zGXVd_dPnJB9P4g_ppMmgI6VYhaD1edpB_dZ0rkKgeJDR6YuKYXA_P_Zy7NmYfbRLcj6Ib1qB-f8ZfF-XxG4I-BAEYIlh4PJhkpnu-gHsSc',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDvfLJDiueMhRNvZHBfobSSPDl8j1LaqQ82qSZzp9qpMw5tsAiivX0fUx2wd7_tvE95oHw2cb1norGgFTE_oKz2Mkyihj1FC1UIXfzOOKzGk7NxBtb4qN8SLNNv5B4LNczznn5BKRjQoqi4_MBappgE0zryXZM2BuMjbdbocabbyxKuUWUy-qKHUDhyz7UpUeNEYamDyPJJJ3O1622SpM7l1vipA5IYhP4T7BS9KSTXj_Q7t9MgnhV4kyIKgiJojc9OnwhLxPxUOr8',
    ],
    aspect: 'aspect-[3/4]',
    col: 'md:col-span-4',
    offset: 'md:-mt-12',
    featured: true,
    sizes: ['S', 'M', 'L', 'XL'],
    unavailableSizes: ['XL'],
    stock: 12,
  },
  {
    id: 3,
    name: 'WRAPAROUND SHADES',
    shortName: 'Glasses',
    price: 759,
    priceLabel: '$759',
    desc: 'SHIELD LENS, TITANIUM FRAME. UV400 PROTECTION.',
    category: 'Accessories',
    slug: '/product/3',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsw3110AyoUwDNFS7PP9eCX4uGLZy6_Y-nDQMmmFFiNyDg16OUGHXo7fhn2F-hbkNA2PVKiMBOke-OhGmqCcaQApVoyXaUwEv0d5squ6psV2oyWo7x2lyXJx3DH3HjGhfbzrtuwqSKIrjx4ENlIciPz4_b0A_tbXgcRLNIeJ3WPWvB65N-dUvdMoAnjEHj9G50HibSZHlMew-1Itd6og5kbfwqE5Y2K99y_J-RBX9aj-3XNDJqBD8w4Y73hubJOo2pOGokxp0JqbQ',
    aspect: 'aspect-square',
    col: 'md:col-span-4',
    featured: true,
    stock: 15,
  },
  {
    id: 4,
    name: 'GEO LONGSLEEVE',
    shortName: 'Longsleeve',
    price: 459,
    priceLabel: '$459',
    desc: 'GEOMETRIC CUT COTTON BLEND. RELAXED ARCHITECTURAL FIT.',
    category: 'Tops',
    slug: '/product/4',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6j4o5EO4T_kLP_SXW6flxXiIAsmwGuRD_xfeH6ZsOaB1-7sBgsGdw-0xXA0JkwPUNBXlzOS_9gOrtGnWz6Uu6qXAv96ykz_VSl1z9xNjUPQ6oTc5xS1BADCb5_ndS2FvqS-b4xBBxSjtqZ4yfnhBfxRRgo_FDndG7nkG-08trytEkUgsFeoebuoQa-oCmFDx0pl4MbWs29DI3zd21b4wW4JEl3YgtFrrlBaUqfbOH5tOlRJlgKphit10erLb0bqXy7PGmKxUeCNo',
    aspect: 'aspect-[3/4]',
    col: 'md:col-span-4',
    offset: 'md:mt-12',
    featured: true,
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 20,
  },
  {
    id: 5,
    name: 'INDUSTRIAL SNEAKER',
    shortName: 'Sneaker',
    price: 890,
    priceLabel: '$890',
    desc: 'METALLIC FINISH, CHUNKY SOLE. LIMITED EDITION.',
    category: 'Shoes',
    slug: '/product/5',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtc_QJzMTgCYQgXfGGaMv02P2alv2y_-t1DHQjwEeIaq6rp_lcr9Jsb4TLrT2bzDnqD9RX7-_F3kxZy20Lbg5K4-QYk6Ai8n1nRa1tlhARL9YBMF3Dvi7yzb_4Jz89d8KZ6aq5cLNSsCe6dInANJT_LFnpnDomqnHVeyvV0IaqEmVOIgvdqdPxvmcZN4PKUOUcI7A4EzadGO6ocFSq_0o4AwEDp1yIFAndZeKOOE18dxyHK4Rd19S3qSN3vLDs7KTn40W_XFnTWLc',
    aspect: 'aspect-square',
    sizes: ['40', '41', '42', '43', '44'],
    stock: 6,
  },
]

export const featuredProducts = products.filter((p) => p.featured)

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function filterProducts(category: CategoryFilter, query = ''): Product[] {
  const q = query.trim().toLowerCase()
  return products.filter((p) => {
    const matchCat = category === 'All' || p.category === category
    const matchQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.shortName.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    return matchCat && matchQuery
  })
}

export function getRelatedProducts(id: number, limit = 4): Product[] {
  const current = getProductById(id)
  if (!current) return products.slice(0, limit)
  return products.filter((p) => p.id !== id && p.category !== current.category)
    .concat(products.filter((p) => p.id !== id && p.category === current.category))
    .slice(0, limit)
}

export function getStock(productId: number): number {
  return getProductById(productId)?.stock ?? 0
}

export function formatPrice(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`
}
