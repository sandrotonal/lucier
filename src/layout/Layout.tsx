import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import NewsletterPopup from '../components/NewsletterPopup'
import CookieConsent from '../components/CookieConsent'
import { analyticsService } from '../services/analytics'

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    analyticsService.initialize()
  }, [])

  useEffect(() => {
    analyticsService.pageView(location.pathname, document.title)
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Outlet />
      <NewsletterPopup />
      <CookieConsent />
    </div>
  )
}
