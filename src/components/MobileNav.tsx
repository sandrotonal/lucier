import { Link, useLocation } from 'react-router-dom'
import { useStore } from '../store/StoreContext'

const links = [
  { id: 'home', to: '/', icon: 'home', label: 'Home', primary: true },
  { id: 'shop', to: '/shop', icon: 'storefront', label: 'Shop' },
  { id: 'wishlist', to: '/wishlist', icon: 'favorite', label: 'Wishlist' },
  { id: 'bag', to: '/bag', icon: 'shopping_bag', label: 'Bag' },
]

export default function MobileNav() {
  const { pathname } = useLocation()
  const { cartCount } = useStore()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="bg-white/95 backdrop-blur-md rounded-full mx-auto w-full max-w-sm border border-primary/20 px-2 py-2 flex justify-around items-center shadow-xl">
        {links.map((link) => {
          const active = pathname === link.to || (link.to === '/shop' && pathname.startsWith('/product'))
          return (
            <Link
              key={link.id}
              to={link.to}
              className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 py-1 rounded-full transition-all ${
                active ? 'text-primary' : 'text-primary/50 hover:text-primary'
              }`}
              aria-label={link.label}
            >
              <span className="material-symbols-outlined text-[22px]" style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                {link.icon}
              </span>
              {link.id === 'bag' && cartCount > 0 && (
                <span className="absolute -top-0.5 right-1 bg-primary text-on-primary text-[9px] w-4 h-4 flex items-center justify-center font-bold rounded-full">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
