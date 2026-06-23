import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { seoService, type SEOMeta } from '../services/seo'

interface SEOHeadProps {
  meta?: Partial<SEOMeta>
  page?: string
  data?: Record<string, any>
  structuredData?: any
}

export default function SEOHead({ meta, page, data, structuredData }: SEOHeadProps) {
  const location = useLocation()

  useEffect(() => {
    let finalMeta: SEOMeta

    if (meta) {
      finalMeta = { ...seoService.getDefaultMeta(), ...meta }
    } else if (page) {
      finalMeta = seoService.getPageMeta(page, data)
    } else {
      finalMeta = seoService.getDefaultMeta()
    }

    seoService.updateMetaTags(finalMeta)

    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]')
      if (!script) {
        script = document.createElement('script')
        script.setAttribute('type', 'application/ld+json')
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(structuredData)
    }
  }, [meta, page, data, structuredData, location.pathname])

  return null
}
