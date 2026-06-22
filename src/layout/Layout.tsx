import { Outlet } from 'react-router-dom'
import NewsletterPopup from '../components/NewsletterPopup'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Outlet />
      <NewsletterPopup />
    </div>
  )
}
