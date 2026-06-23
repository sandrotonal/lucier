export interface SEOMeta {
  title: string
  description: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  canonical?: string
  robots?: string
  alternates?: Array<{ hreflang: string; href: string }>
}

export interface GeoTargeting {
  country: string
  countryCode: string
  currency: string
  currencySymbol: string
  language: string
  shippingAvailable: boolean
  taxRate: number
}

const DEFAULT_SEO: SEOMeta = {
  title: 'LUCIR - Architectural Fashion',
  description: 'Contemporary architectural fashion engineered for the modern form. Discover our curated collection of premium jackets, accessories, and footwear.',
  keywords: 'fashion, architectural fashion, contemporary, luxury, jackets, accessories, premium',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  robots: 'index, follow',
}

const GEO_TARGETING: Record<string, GeoTargeting> = {
  TR: {
    country: 'Turkey',
    countryCode: 'TR',
    currency: 'TRY',
    currencySymbol: '₺',
    language: 'tr-TR',
    shippingAvailable: true,
    taxRate: 0.18,
  },
  US: {
    country: 'United States',
    countryCode: 'US',
    currency: 'USD',
    currencySymbol: '$',
    language: 'en-US',
    shippingAvailable: true,
    taxRate: 0,
  },
  GB: {
    country: 'United Kingdom',
    countryCode: 'GB',
    currency: 'GBP',
    currencySymbol: '£',
    language: 'en-GB',
    shippingAvailable: true,
    taxRate: 0.20,
  },
  DE: {
    country: 'Germany',
    countryCode: 'DE',
    currency: 'EUR',
    currencySymbol: '€',
    language: 'de-DE',
    shippingAvailable: true,
    taxRate: 0.19,
  },
  FR: {
    country: 'France',
    countryCode: 'FR',
    currency: 'EUR',
    currencySymbol: '€',
    language: 'fr-FR',
    shippingAvailable: true,
    taxRate: 0.20,
  },
}

export const seoService = {
  getDefaultMeta(): SEOMeta {
    return { ...DEFAULT_SEO }
  },

  getPageMeta(page: string, data?: Record<string, any>): SEOMeta {
    const baseUrl = import.meta.env.VITE_SITE_URL || 'https://lucir.vercel.app'
    
    const pages: Record<string, SEOMeta> = {
      home: {
        title: 'LUCIR - Architectural Fashion | Contemporary Luxury',
        description: 'Discover LUCIR\'s curated collection of architectural fashion. Premium jackets, accessories, and footwear designed for the modern aesthetic.',
        keywords: 'lucir, architectural fashion, luxury fashion, contemporary, premium jackets, designer accessories',
        ogImage: `${baseUrl}/og-home.jpg`,
        canonical: baseUrl,
      },
      shop: {
        title: 'Shop Collection - LUCIR',
        description: 'Browse our complete collection of architectural fashion pieces. Free shipping on orders over $500.',
        keywords: 'shop fashion, buy luxury clothing, contemporary fashion, designer pieces',
        ogImage: `${baseUrl}/og-shop.jpg`,
        canonical: `${baseUrl}/shop`,
      },
      product: {
        title: data?.name ? `${data.name} - LUCIR` : 'Product - LUCIR',
        description: data?.desc || 'Premium architectural fashion piece from LUCIR collection.',
        keywords: `${data?.category || 'fashion'}, ${data?.name || 'product'}, buy, shop`,
        ogImage: data?.img || `${baseUrl}/og-product.jpg`,
        ogType: 'product',
        canonical: `${baseUrl}${data?.slug || '/product'}`,
      },
      checkout: {
        title: 'Checkout - LUCIR',
        description: 'Complete your order. Secure checkout with SSL encryption and multiple payment options.',
        keywords: 'checkout, secure payment, buy fashion',
        robots: 'noindex, nofollow',
        canonical: `${baseUrl}/checkout`,
      },
      bag: {
        title: 'Shopping Bag - LUCIR',
        description: 'Review your selected items and proceed to checkout.',
        robots: 'noindex, follow',
        canonical: `${baseUrl}/bag`,
      },
      wishlist: {
        title: 'Wishlist - LUCIR',
        description: 'Your saved items and favorites.',
        robots: 'noindex, follow',
        canonical: `${baseUrl}/wishlist`,
      },
      orders: {
        title: 'My Orders - LUCIR',
        description: 'Track and manage your orders.',
        robots: 'noindex, nofollow',
        canonical: `${baseUrl}/orders`,
      },
    }

    const pageMeta = pages[page] || DEFAULT_SEO
    
    return {
      ...DEFAULT_SEO,
      ...pageMeta,
      ogTitle: pageMeta.title,
      ogDescription: pageMeta.description,
      twitterTitle: pageMeta.title,
      twitterDescription: pageMeta.description,
      twitterImage: pageMeta.ogImage,
    }
  },

  async detectGeo(): Promise<GeoTargeting> {
    try {
      const response = await fetch('https://ipapi.co/json/')
      const data = await response.json()
      const countryCode = data.country_code || 'US'
      return GEO_TARGETING[countryCode] || GEO_TARGETING.US
    } catch {
      return GEO_TARGETING.US
    }
  },

  getGeoByCountryCode(code: string): GeoTargeting {
    return GEO_TARGETING[code] || GEO_TARGETING.US
  },

  getAllGeoCountries(): GeoTargeting[] {
    return Object.values(GEO_TARGETING)
  },

  updateMetaTags(meta: SEOMeta) {
    document.title = meta.title

    const updateOrCreate = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector)
      if (!element) {
        element = document.createElement('meta')
        const attrName = attribute.split('=')[0]
        const attrValue = attribute.split('=')[1].replace(/['"]/g, '')
        element.setAttribute(attrName, attrValue)
        document.head.appendChild(element)
      }
      element.setAttribute('content', value)
    }

    updateOrCreate('meta[name="description"]', 'name="description"', meta.description)
    if (meta.keywords) updateOrCreate('meta[name="keywords"]', 'name="keywords"', meta.keywords)
    if (meta.robots) updateOrCreate('meta[name="robots"]', 'name="robots"', meta.robots)

    if (meta.ogTitle) updateOrCreate('meta[property="og:title"]', 'property="og:title"', meta.ogTitle)
    if (meta.ogDescription) updateOrCreate('meta[property="og:description"]', 'property="og:description"', meta.ogDescription)
    if (meta.ogImage) updateOrCreate('meta[property="og:image"]', 'property="og:image"', meta.ogImage)
    if (meta.ogType) updateOrCreate('meta[property="og:type"]', 'property="og:type"', meta.ogType)

    if (meta.twitterCard) updateOrCreate('meta[name="twitter:card"]', 'name="twitter:card"', meta.twitterCard)
    if (meta.twitterTitle) updateOrCreate('meta[name="twitter:title"]', 'name="twitter:title"', meta.twitterTitle)
    if (meta.twitterDescription) updateOrCreate('meta[name="twitter:description"]', 'name="twitter:description"', meta.twitterDescription)
    if (meta.twitterImage) updateOrCreate('meta[name="twitter:image"]', 'name="twitter:image"', meta.twitterImage)

    if (meta.canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }
      link.href = meta.canonical
    }
  },

  generateStructuredData(type: 'product' | 'organization' | 'website', data?: any) {
    const baseUrl = import.meta.env.VITE_SITE_URL || 'https://lucir.vercel.app'

    const schemas: Record<string, any> = {
      organization: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'LUCIR',
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        sameAs: [
          'https://instagram.com/lucir',
          'https://twitter.com/lucir',
        ],
      },
      website: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'LUCIR',
        url: baseUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/shop?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      product: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: data?.name || 'Product',
        description: data?.desc || '',
        image: data?.img || '',
        brand: {
          '@type': 'Brand',
          name: 'LUCIR',
        },
        offers: {
          '@type': 'Offer',
          url: `${baseUrl}${data?.slug || ''}`,
          priceCurrency: 'USD',
          price: data?.price || 0,
          availability: data?.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        },
      },
    }

    return schemas[type] || schemas.website
  },
}
