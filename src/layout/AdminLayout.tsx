import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { authService } from '../services/auth'

export default function AdminLayout() {
  const navigate = useNavigate()
  const [user, setUser] = useState(authService.getCurrentUser())

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (!currentUser) {
      navigate('/admin/login')
      return
    }
    setUser(currentUser)
  }, [navigate])

  const handleSignOut = async () => {
    await authService.signOut()
    navigate('/admin/login')
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-surface">
      <nav className="border-b border-primary bg-surface-container-low sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/admin" className="font-headline-md text-[20px] uppercase tracking-tighter">
              LUCIR Admin
            </Link>
            <div className="flex gap-6">
              <Link
                to="/admin/products"
                className="font-label-caps text-label-caps uppercase hover:text-primary transition-colors"
              >
                Products
              </Link>
              <Link
                to="/admin/orders"
                className="font-label-caps text-label-caps uppercase hover:text-primary transition-colors"
              >
                Orders
              </Link>
              <Link
                to="/admin/coupons"
                className="font-label-caps text-label-caps uppercase hover:text-primary transition-colors"
              >
                Coupons
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="font-label-caps text-[11px] uppercase text-secondary hover:text-primary">
              View Site
            </Link>
            <span className="font-body-md text-[12px] text-secondary">{user.email}</span>
            <button
              onClick={handleSignOut}
              className="border border-primary px-4 py-2 font-label-caps text-[11px] uppercase hover:bg-primary hover:text-on-primary transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}
