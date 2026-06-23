declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

export interface AnalyticsEvent {
  event: string
  category: string
  action: string
  label?: string
  value?: number
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || ''

export const analyticsService = {
  initialize() {
    if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return

    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script1)

    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_path: window.location.pathname,
        send_page_view: false
      });
    `
    document.head.appendChild(script2)
  },

  pageView(path: string, title: string) {
    if (!window.gtag) return
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
    })
  },

  event(event: AnalyticsEvent) {
    if (!window.gtag) return
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    })
  },

  trackAddToCart(productId: number, name: string, price: number, quantity: number) {
    this.event({
      event: 'add_to_cart',
      category: 'Ecommerce',
      action: 'add_to_cart',
      label: name,
      value: price * quantity,
    })
  },

  trackRemoveFromCart(productId: number, name: string) {
    this.event({
      event: 'remove_from_cart',
      category: 'Ecommerce',
      action: 'remove_from_cart',
      label: name,
    })
  },

  trackPurchase(orderId: string, total: number, items: any[]) {
    this.event({
      event: 'purchase',
      category: 'Ecommerce',
      action: 'purchase',
      label: orderId,
      value: total,
    })
  },

  trackSearch(query: string) {
    this.event({
      event: 'search',
      category: 'Engagement',
      action: 'search',
      label: query,
    })
  },

  trackSignUp(method: string) {
    this.event({
      event: 'sign_up',
      category: 'User',
      action: 'sign_up',
      label: method,
    })
  },

  trackSignIn(method: string) {
    this.event({
      event: 'login',
      category: 'User',
      action: 'login',
      label: method,
    })
  },
}
