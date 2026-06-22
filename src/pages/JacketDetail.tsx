import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import MobileNav from '../components/MobileNav'
import { useStore } from '../store/StoreContext'
import Footer from '../components/Footer'
import SizeGuide from '../components/SizeGuide'

const sizes = ["S", "M", "L", "XL"]
const related = [
  { name: "Oversized Tote", price: "$1299",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDChywhkXSnIXSSMCFDUIToXeln0YgfIyPcf4ys6fMtYI2QhAQuzDgnidSGCl4iVOQiEf-m7MVtHTFRXyK5zGJhCLmmtzwTGmkPExxvGa0GOGeoDD25mLeutjefLDo6ZHs9obFvQhoZSLAsgd1viqTaIjxkCHhwvnQPJtPBfBuy8P1PgtSVq52N66BpzRZChYBhth3JemwJ1xt5KtNPfRwiDvPAKBdscICGn8W1cRM1IV40EifBqTNNFLPsd_oFmY1SgDg-LPnw4co" },
  { name: "Shield Glasses", price: "$759",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC351tUmIS1lB4vDROTjzMDyXLF9I6ejzfZoAwRMNbmkdIx_tYPWL1Te8P2SKBvgBo56iwD9hNiGxLgsk62OUkaxrbbDk8mAYe4P7gDCzCInnJDn_wWojinJ12s5_ffdtR2afAdOoQ_jLhnO_Nwc5aAIDp3FLBuoinq74Al7h38O8MthCN7giRlkDjEurP5du4W7M1y2EXQXvQPg-YRqIc2u5PXSJ3StNlnDHcwuNNe33FxDr68t9TkCwabev61vELbTg7Ml3Bp1ns" },
  { name: "Geometric Tunic", price: "$459",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDr2ILanWWgEb2wKj1gMJnx9czoOHoCjROwST-o3bYw1jktYpP4uIxc7N-8vgz-8a2j43XXGDNAdVARLMBRWrJraYfqIwqPxtrgMONittk63itT5vehj9peWEzvL0zzLDAhhJcJM0Y4j_F2K36Ie1tfopLY0xV6X-dNE2f37uF0_3TObfdqC9vwVtwVdwzZpiuxf2EljqDyIcSkpznJhm_hVxz1ZgWDZQqulQKYlS8x1rayydVbvoDmzNFuQLGegFhk3mg8go0jMSk" },
  { name: "Industrial Sneaker", price: "$890",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtc_QJzMTgCYQgXfGGaMv02P2alv2y_-t1DHQjwEeIaq6rp_lcr9Jsb4TLrT2bzDnqD9RX7-_F3kxZy20Lbg5K4-QYk6Ai8n1nRa1tlhARL9YBMF3Dvi7yzb_4Jz89d8KZ6aq5cLNSsCe6dInANJT_LFnpnDomqnHVeyvV0IaqEmVOIgvdqdPxvmcZN4PKUOUcI7A4EzadGO6ocFSq_0o4AwEDp1yIFAndZeKOOE18dxyHK4Rd19S3qSN3vLDs7KTn40W_XFnTWLc" },
]

export default function JacketDetail() {
  const [selectedSize, setSelectedSize] = useState("M")
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [zoom, setZoom] = useState(false)
  const { addToCart, toggleWishlist, isInWishlist, setCartOpen } = useStore()

  const handleAddToBag = () => {
    addToCart({
      id: 2,
      name: "TECHNICAL NYLON SHELL JACKET",
      desc: "STRUCTURAL POLYAMIDE, ARCHITECTURAL CUT. ENGINEERED FOR VOLUME.",
      price: 999,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQbvVTypm1gJ0WPNwSFwku-QmG5Scc5hiZMe3ibjfVErxcgnY5VvarVCQwXdHAFeJkkqyO2Q9_ufVnsw41OEoNe7UX3cz8_mzsG3Is74thgT-f85CmqxEPMB8oN6yarT8xIhIBogVpfg7K3VEiUjidBPYrQ2yl3Bm7zGXVd_dPnJB9P4g_ppMmgI6VYhaD1edpB_dZ0rkKgeJDR6YuKYXA_P_Zy7NmYfbRLcj6Ib1qB-f8ZfF-XxG4I-BAEYIlh4PJhkpnu-gHsSc",
    })
  }

  const liked = isInWishlist(2)

  return (
    <>
      <Navbar />

      {/* Image Zoom Overlay */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/90 flex items-center justify-center cursor-zoom-out"
            onClick={() => setZoom(false)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQbvVTypm1gJ0WPNwSFwku-QmG5Scc5hiZMe3ibjfVErxcgnY5VvarVCQwXdHAFeJkkqyO2Q9_ufVnsw41OEoNe7UX3cz8_mzsG3Is74thgT-f85CmqxEPMB8oN6yarT8xIhIBogVpfg7K3VEiUjidBPYrQ2yl3Bm7zGXVd_dPnJB9P4g_ppMmgI6VYhaD1edpB_dZ0rkKgeJDR6YuKYXA_P_Zy7NmYfbRLcj6Ib1qB-f8ZfF-XxG4I-BAEYIlh4PJhkpnu-gHsSc"
              alt="Zoom"
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <SizeGuide open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />

      <main className="flex-grow pt-16 md:pt-20 pb-section-gap px-container-margin w-full max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-gutter mt-8 md:mt-12">
          <div className="lg:col-span-7">
            <Link to="/shop" className="inline-flex items-center gap-1 text-secondary hover:text-primary transition-colors font-label-caps text-label-caps uppercase mb-4 md:mb-6">
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Back to Shop
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-gutter">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 relative aspect-[4/5] md:h-[870px] border border-primary p-1 bg-surface-container-lowest group cursor-crosshair"
            onClick={() => setZoom(true)}
          >
            <img
              alt="Technical Nylon Jacket Hero View"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQbvVTypm1gJ0WPNwSFwku-QmG5Scc5hiZMe3ibjfVErxcgnY5VvarVCQwXdHAFeJkkqyO2Q9_ufVnsw41OEoNe7UX3cz8_mzsG3Is74thgT-f85CmqxEPMB8oN6yarT8xIhIBogVpfg7K3VEiUjidBPYrQ2yl3Bm7zGXVd_dPnJB9P4g_ppMmgI6VYhaD1edpB_dZ0rkKgeJDR6YuKYXA_P_Zy7NmYfbRLcj6Ib1qB-f8ZfF-XxG4I-BAEYIlh4PJhkpnu-gHsSc"
            />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
            <div className="absolute top-3 md:top-4 left-3 md:left-4 border border-primary bg-surface/80 backdrop-blur-sm px-2 md:px-3 py-1">
              <span className="font-label-caps text-[10px] md:text-label-caps text-primary tracking-widest uppercase">Item_Ref: 08A-XYZ</span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setZoom(true) }}
              className="absolute bottom-3 right-3 bg-surface/80 border border-primary p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Zoom"
            >
              <span className="material-symbols-outlined text-lg">fullscreen</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-start pt-6 md:pt-8 lg:pl-8"
          >
            <div className="flex items-center gap-2 mb-6 md:mb-8 font-label-caps text-[10px] md:text-label-caps text-secondary uppercase tracking-widest flex-wrap">
              <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
              <span>/</span>
              <a href="#" className="hover:text-primary transition-colors">Outerwear</a>
              <span>/</span>
              <span className="text-primary">Jacket</span>
            </div>

            <div className="mb-8 md:mb-12">
              <div className="flex justify-between items-start">
                <h1 className="font-headline-lg text-[24px] md:text-headline-lg text-primary uppercase mb-3 md:mb-4 tracking-tighter leading-none flex-1">
                  Technical Nylon Shell Jacket
                </h1>
                <button
                  onClick={() => toggleWishlist(2)}
                  className={`p-2 transition-all duration-300 ${liked ? 'text-primary' : 'text-secondary hover:text-primary'}`}
                  aria-label="Toggle wishlist"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}>
                    favorite
                  </span>
                </button>
              </div>
              <p className="font-headline-md text-[20px] md:text-headline-md text-primary">$999</p>
            </div>

            <div className="w-full h-px bg-primary mb-8 md:mb-12" />

            <div className="mb-8 md:mb-12">
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Engineered with architectural precision. This technical shell utilizes a proprietary high-density nylon weave, offering unparalleled structural integrity and weather resistance. The silhouette is deliberately oversized, creating a protective, severe volume that interacts dynamically with the wearer's environment.
              </p>
            </div>

            <div className="mb-8 md:mb-12">
              <div className="flex justify-between items-baseline mb-4">
                <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Size</span>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="font-label-caps text-label-caps text-secondary underline hover:text-primary transition-colors"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex gap-3 md:gap-4">
                {sizes.map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    whileHover={size !== 'XL' ? { scale: 1.05 } : {}}
                    whileTap={size !== 'XL' ? { scale: 0.95 } : {}}
                    className={`w-10 h-10 md:w-12 md:h-12 border border-primary flex items-center justify-center font-label-caps text-label-caps transition-colors ${
                      selectedSize === size
                        ? 'bg-primary text-surface'
                        : 'hover:bg-primary hover:text-surface'
                    } ${size === 'XL' ? 'opacity-30 cursor-not-allowed' : ''}`}
                    disabled={size === 'XL'}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6 md:pt-8 border-t border-primary">
              <motion.button
                onClick={handleAddToBag}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full group relative flex items-center justify-between border border-primary bg-transparent text-primary px-5 md:px-6 py-4 md:py-5 hover:bg-primary hover:text-surface transition-all duration-300"
              >
                <span className="font-headline-md text-[18px] md:text-headline-md uppercase tracking-wider">Add to Bag</span>
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
              </motion.button>
            </div>

            <div className="mt-6 md:mt-8 border border-primary divide-y divide-primary">
              <details className="group cursor-pointer">
                <summary className="flex justify-between items-center p-3 md:p-4 font-label-caps text-label-caps uppercase tracking-widest select-none">
                  Details & Care
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="p-3 md:p-4 pt-0 font-body-md text-body-md text-secondary">
                  100% Technical Polyamide. Hand wash cold. Do not tumble dry. Crafted in Italy.
                </div>
              </details>
              <details className="group cursor-pointer">
                <summary className="flex justify-between items-center p-3 md:p-4 font-label-caps text-label-caps uppercase tracking-widest select-none">
                  Shipping
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="p-3 md:p-4 pt-0 font-body-md text-body-md text-secondary">
                  Complimentary express shipping on all orders. Returns accepted within 14 days of delivery.
                </div>
              </details>
            </div>
          </motion.div>
        </div>
      </main>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="px-container-margin pb-section-gap max-w-[1600px] mx-auto w-full"
      >
        <div className="border-t border-primary pt-8 md:pt-12">
          <h2 className="font-headline-md text-[20px] md:text-headline-md text-primary uppercase mb-8 md:mb-12 tracking-tighter">
            You might also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-x-gutter md:gap-y-12">
            {related.map((item, i) => (
              <motion.a
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                href="#"
                className="group block border border-transparent hover:border-primary p-1 md:p-2 transition-colors duration-300"
              >
                <div className="aspect-[3/4] mb-3 md:mb-4 bg-surface-container relative overflow-hidden">
                  <img
                    alt={item.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    src={item.img}
                  />
                </div>
                <div className="flex justify-between items-start font-label-caps text-[10px] md:text-label-caps uppercase tracking-widest">
                  <span className="text-primary pr-2 md:pr-4">{item.name}</span>
                  <span className="text-secondary">{item.price}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>

      <MobileNav />
      <Footer />
    </>
  )
}
