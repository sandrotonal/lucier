import { Link, useLocation } from 'react-router-dom'

const links = [
  { id: "home", to: "/", icon: "menu", label: "Lucir", primary: true },
  { id: "shop", to: "/shop", icon: "storefront", label: "Shop" },
  { id: "new", to: "/shop", icon: "fiber_new", label: "New" },
  { id: "about", to: "#", icon: "info", label: "About" },
]

export default function MobileNav() {
  const { pathname } = useLocation()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-center items-center">
      <div className="bg-white/90 backdrop-blur-md rounded-full mx-auto mb-4 w-fit border border-primary/20 px-2 py-2 flex gap-2 shadow-xl">
        {links.map((link) =>
          link.primary ? (
            <Link
              key={link.id}
              to={link.to}
              className="bg-primary text-white rounded-full px-4 py-2 font-label-caps text-label-caps flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">{link.icon}</span>
              {link.label}
            </Link>
          ) : (
            <Link
              key={link.id}
              to={link.to}
              className={`px-3 py-2 rounded-full transition-all flex items-center ${
                pathname === link.to ? 'text-primary bg-black/5' : 'text-primary/60 hover:bg-black/5 hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
            </Link>
          )
        )}
      </div>
    </nav>
  )
}
