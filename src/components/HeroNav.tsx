import { Link } from 'react-router-dom'

export default function HeroNav() {
  return (
    <div className="relative z-20 w-full flex justify-center mb-6 md:mb-8 px-4">
      <div className="border border-on-tertiary/50 rounded-full px-4 md:px-6 py-2 md:py-3 flex gap-3 md:gap-6 items-center bg-black/20 backdrop-blur-sm overflow-x-auto no-scrollbar">
        <Link
          to="/"
          className="text-on-tertiary font-bold font-label-caps text-label-caps bg-white text-black px-3 py-1 rounded-full whitespace-nowrap"
        >
          Lucir
        </Link>
        <div className="w-px h-4 bg-on-tertiary/30 flex-shrink-0" />
        <Link to="/shop" className="text-on-tertiary hover:text-white transition-colors font-label-caps text-label-caps whitespace-nowrap">
          Shop
        </Link>
        <div className="w-px h-4 bg-on-tertiary/30 flex-shrink-0" />
        <Link to="/shop" className="text-on-tertiary hover:text-white transition-colors font-label-caps text-label-caps whitespace-nowrap">
          New collection
        </Link>
        <div className="w-px h-4 bg-on-tertiary/30 flex-shrink-0" />
        <Link to="/info/about" className="text-on-tertiary hover:text-white transition-colors font-label-caps text-label-caps whitespace-nowrap">
          About
        </Link>
      </div>
    </div>
  )
}
