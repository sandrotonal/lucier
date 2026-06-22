import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import MobileNav from '../components/MobileNav'
import { useStore } from '../store/StoreContext'
import Footer from '../components/Footer'

const products = [
  { id: 1, name: "OVERSIZED TOTE BAG", price: "$1299", slug: "#",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2l-S8vmxu3vnpN-hrIIxnPXisCdnW5PxPtjwHBm4iOEm9BJj6JQdju6_BerWQOEqpvnSDOw9Hf1IF8Bg2ltM_QZlJ11NIPEuSXJhoFpPtIvswb1opAJC_hd1oB182eU8WDX-Du3Nl5j_kDgDdQPCNdReT55L4xRiH3y39E5mqBt8ouI_8llvywEn8c_Ln9ukFyT8bw_I5tZq8EYLEN22dTEfj2cRtSCcVlKWLSIcjf8Gv4mR6nRq8tvIbFvv0D-PqBgBXGUq-nwM" },
  { id: 5, name: "TRANSLUCENT JACKET", price: "$999", slug: "/jacket",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvfLJDiueMhRNvZHBfobSSPDl8j1LaqQ82qSZzp9qpMw5tsAiivX0fUx2wd7_tvE95oHw2cb1norGgFTE_oKz2Mkyihj1FC1UIXfzOOKzGk7NxBtb4qN8SLNNv5B4LNczznn5BKRjQoqi4_MBappgE0zryXZM2BuMjbdbocabbyxKuUWUy-qKHUDhyz7UpUeNEYamDyPJJJ3O1622SpM7l1vipA5IYhP4T7BS9KSTXj_Q7t9MgnhV4kyIKgiJojc9OnwhLxPxUOr8" },
  { id: 3, name: "WRAPAROUND SHADES", price: "$759", slug: "#",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsw3110AyoUwDNFS7PP9eCX4uGLZy6_Y-nDQMmmFFiNyDg16OUGHXo7fhn2F-hbkNA2PVKiMBOke-OhGmqCcaQApVoyXaUwEv0d5squ6psV2oyWo7x2lyXJx3DH3HjGhfbzrtuwqSKIrjx4ENlIciPz4_b0A_tbXgcRLNIeJ3WPWvB65N-dUvdMoAnjEHj9G50HibSZHlMew-1Itd6og5kbfwqE5Y2K99y_J-RBX9aj-3XNDJqBD8w4Y73hubJOo2pOGokxp0JqbQ" },
  { id: 4, name: "GEO LONGSLEEVE", price: "$459", slug: "#",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6j4o5EO4T_kLP_SXW6flxXiIAsmwGuRD_xfeH6ZsOaB1-7sBgsGdw-0xXA0JkwPUNBXlzOS_9gOrtGnWz6Uu6qXAv96ykz_VSl1z9xNjUPQ6oTc5xS1BADCb5_ndS2FvqS-b4xBBxSjtqZ4yfnhBfxRRgo_FDndG7nkG-08trytEkUgsFeoebuoQa-oCmFDx0pl4MbWs29DI3zd21b4wW4JEl3YgtFrrlBaUqfbOH5tOlRJlgKphit10erLb0bqXy7PGmKxUeCNo" },
  { id: 6, name: "INDUSTRIAL SNEAKER", price: "$890", slug: "#",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtc_QJzMTgCYQgXfGGaMv02P2alv2y_-t1DHQjwEeIaq6rp_lcr9Jsb4TLrT2bzDnqD9RX7-_F3kxZy20Lbg5K4-QYk6Ai8n1nRa1tlhARL9YBMF3Dvi7yzb_4Jz89d8KZ6aq5cLNSsCe6dInANJT_LFnpnDomqnHVeyvV0IaqEmVOIgvdqdPxvmcZN4PKUOUcI7A4EzadGO6ocFSq_0o4AwEDp1yIFAndZeKOOE18dxyHK4Rd19S3qSN3vLDs7KTn40W_XFnTWLc" },
]

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useStore()

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id))

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-16 md:pt-20 px-container-margin max-w-[1600px] mx-auto w-full pb-section-gap">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-headline-lg text-[28px] md:text-display-xl md:font-display-xl uppercase tracking-tighter mt-8 md:mt-12 mb-8 md:mb-16"
        >
          WISHLIST ({wishlistProducts.length})
        </motion.h1>

        {wishlistProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center gap-6 mt-24"
          >
            <span className="material-symbols-outlined text-6xl text-secondary">favorite</span>
            <p className="font-headline-md text-[20px] uppercase tracking-tighter text-secondary">Your wishlist is empty</p>
            <Link to="/shop" className="font-label-caps text-label-caps underline hover:text-primary transition-colors">
              Discover Products
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-gutter">
            {wishlistProducts.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group relative"
              >
                <Link to={p.slug} className="block">
                  <div className="aspect-[3/4] bg-surface-container overflow-hidden border border-primary/30">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex justify-between items-start mt-3 font-label-caps text-[10px] md:text-label-caps uppercase">
                    <span>{p.name}</span>
                    <span>{p.price}</span>
                  </div>
                </Link>
                <button
                  onClick={() => toggleWishlist(p.id)}
                  className="absolute top-2 right-2 text-primary hover:scale-110 transition-transform"
                  aria-label="Remove from wishlist"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <MobileNav />
      <Footer />
    </>
  )
}
