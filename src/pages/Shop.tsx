import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import MobileNav from '../components/MobileNav'
import { useStore } from '../store/StoreContext'

const categories = ["All", "Jackets", "Accessories", "Shoes"]
const products = [
  { id: 1, name: "OVERSIZED TOTE BAG", price: "$1299", aspect: "aspect-[4/3]", col: "md:col-span-8",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2l-S8vmxu3vnpN-hrIIxnPXisCdnW5PxPtjwHBm4iOEm9BJj6JQdju6_BerWQOEqpvnSDOw9Hf1IF8Bg2ltM_QZlJ11NIPEuSXJhoFpPtIvswb1opAJC_hd1oB182eU8WDX-Du3Nl5j_kDgDdQPCNdReT55L4xRiH3y39E5mqBt8ouI_8llvywEn8c_Ln9ukFyT8bw_I5tZq8EYLEN22dTEfj2cRtSCcVlKWLSIcjf8Gv4mR6nRq8tvIbFvv0D-PqBgBXGUq-nwM" },
  { id: 5, name: "TRANSLUCENT JACKET", price: "$999", aspect: "aspect-[3/4]", col: "md:col-span-4", offset: "md:-mt-12",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvfLJDiueMhRNvZHBfobSSPDl8j1LaqQ82qSZzp9qpMw5tsAiivX0fUx2wd7_tvE95oHw2cb1norGgFTE_oKz2Mkyihj1FC1UIXfzOOKzGk7NxBtb4qN8SLNNv5B4LNczznn5BKRjQoqi4_MBappgE0zryXZM2BuMjbdbocabbyxKuUWUy-qKHUDhyz7UpUeNEYamDyPJJJ3O1622SpM7l1vipA5IYhP4T7BS9KSTXj_Q7t9MgnhV4kyIKgiJojc9OnwhLxPxUOr8" },
  { id: 3, name: "WRAPAROUND SHADES", price: "$759", aspect: "aspect-square", col: "md:col-span-4",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsw3110AyoUwDNFS7PP9eCX4uGLZy6_Y-nDQMmmFFiNyDg16OUGHXo7fhn2F-hbkNA2PVKiMBOke-OhGmqCcaQApVoyXaUwEv0d5squ6psV2oyWo7x2lyXJx3DH3HjGhfbzrtuwqSKIrjx4ENlIciPz4_b0A_tbXgcRLNIeJ3WPWvB65N-dUvdMoAnjEHj9G50HibSZHlMew-1Itd6og5kbfwqE5Y2K99y_J-RBX9aj-3XNDJqBD8w4Y73hubJOo2pOGokxp0JqbQ" },
  { id: 4, name: "GEO LONGSLEEVE", price: "$459", aspect: "aspect-[3/4]", col: "md:col-span-4", offset: "md:mt-12",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6j4o5EO4T_kLP_SXW6flxXiIAsmwGuRD_xfeH6ZsOaB1-7sBgsGdw-0xXA0JkwPUNBXlzOS_9gOrtGnWz6Uu6qXAv96ykz_VSl1z9xNjUPQ6oTc5xS1BADCb5_ndS2FvqS-b4xBBxSjtqZ4yfnhBfxRRgo_FDndG7nkG-08trytEkUgsFeoebuoQa-oCmFDx0pl4MbWs29DI3zd21b4wW4JEl3YgtFrrlBaUqfbOH5tOlRJlgKphit10erLb0bqXy7PGmKxUeCNo" },
]

export default function Shop() {
  const [activeCat, setActiveCat] = useState("All")
  const { toggleWishlist, isInWishlist } = useStore()

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-16 md:pt-20 pb-section-gap px-container-margin max-w-[1600px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-primary pb-6 md:pb-8 mt-8 md:mt-12"
        >
          <div>
            <motion.h1
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[28px] md:text-headline-lg font-headline-lg uppercase tracking-tight leading-tight"
            >
              COLLECTION 24/25
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3 md:gap-4 font-label-caps text-label-caps"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCat(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`uppercase transition-colors ${
                  activeCat === cat ? 'border-b border-primary pb-1 font-bold' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-gutter"
        >
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              variants={{
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className={`${p.col} col-span-1 flex flex-col gap-3 md:gap-4 group cursor-pointer relative ${p.offset || ''}`}
            >
              <Link to={i === 1 ? "/jacket" : "#"} className={`w-full ${p.aspect} bg-surface-container overflow-hidden relative border border-primary`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full"
                >
                  <img
                    alt={p.name}
                    className="w-full h-full object-cover"
                    src={p.img}
                  />
                </motion.div>
                <motion.button
                  onClick={(e) => { e.preventDefault(); toggleWishlist(p.id) }}
                  whileHover={{ scale: 1.2 }}
                  aria-label="Save"
                  className="absolute top-2 md:top-4 right-2 md:right-4 z-10"
                >
                  <span
                    className={`material-symbols-outlined text-xl md:text-2xl ${isInWishlist(p.id) ? 'text-primary' : 'text-on-surface hover:text-primary-container'}`}
                    style={{ fontVariationSettings: isInWishlist(p.id) ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </motion.button>
              </Link>
              <div className="flex justify-between items-start font-label-caps text-[10px] md:text-label-caps uppercase w-full">
                <span>{p.name}</span>
                <span>{p.price}</span>
              </div>
            </motion.div>
          ))}

          <motion.div
            variants={{
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
            }}
            className="col-span-2 md:col-span-4 flex items-center justify-center md:justify-end py-6 md:py-12"
          >
            <motion.div whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 200 }}>
              <Link
                to="/jacket"
                className="flex items-center gap-2 text-[24px] md:text-headline-md font-headline-md hover:opacity-70 transition-opacity border-b-2 border-primary pb-1 group"
              >
                BUY NOW
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="material-symbols-outlined text-3xl md:text-4xl"
                >arrow_forward</motion.span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={{
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
            }}
            className="col-span-2 md:col-span-3 flex flex-col gap-3 md:gap-4 group cursor-pointer relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="w-full aspect-square bg-surface-container overflow-hidden relative border border-primary"
            >
              <img
                alt="Metallic Sneaker"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6rosGYA6J69D-2yY3ZmNtrO_SCrQGnEKeyICxlUT5O2ELFYXRuqGxc-rWRkAkjXLSnSx5sqj2t6zPIlqsVgpb64GfDVH4r4P0BgHuVYZmRu76vJw9cXsoC8gCfTBBOSrFbPpLo3EnnC4eSdE35WkNNhdKRNuSUb3s8q_ntFq1NCkMm42qu6OuhBI0f057yPQLEHyaVQbo2Mzg2CmVZE778FjYG-Z78uODk1DzXaD5ev2i0dWFFM3aYJmEtzmMSoENpa8njtSOReA"
              />
            </motion.div>
          </motion.div>

          <motion.div
            variants={{
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
            }}
            className="col-span-2 md:col-span-9 flex flex-col gap-3 md:gap-4 group cursor-pointer relative"
          >
            <div className="w-full aspect-video md:aspect-[16/7] bg-surface-container overflow-hidden relative border border-primary flex items-center justify-center">
              <img
                alt="Editorial Campaign"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDetVlRt9juCodPLx1D-TmpagHrA1QzW3zl6zHsLiJET2VeZ7U9WvGWy2nAlnbtOU1tazR7t5x76k2smHm0cj-TfMUSXcCFkELizg4qlYHIhB7b9ChiF0GmeGMN35VOGn8J_BDPNaL9Tk_RZl4mpun_KBAr9Bp_PgscBKzvkN3wVYY0W-h22KzHPgGCURyKd9KvEsFUzgITDFlWzGyuNdGZbc7zElknrd_C75f0pbcwZEpPmxmcsdUmN94xPWAZMi2GqTqmo_n3A8o"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert("Campaign video coming soon")}
                className="z-10 bg-surface/80 backdrop-blur-sm p-3 md:p-4 hover:bg-surface transition-colors cursor-pointer border border-primary"
                aria-label="Play"
              >
                <span className="material-symbols-outlined text-2xl md:text-4xl text-primary">play_arrow</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <MobileNav />

      <footer className="w-full py-12 md:py-section-gap px-container-margin flex flex-col items-center gap-6 md:gap-gutter bg-background border-t border-outline mb-20 md:mb-0">
        <div className="text-[24px] md:text-headline-md font-headline-md mb-4 md:mb-8 tracking-widest uppercase">LUCIR</div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-12 text-label-caps font-label-caps uppercase">
          <a className="text-secondary hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="text-secondary hover:text-primary transition-colors" href="#">Terms of Service</a>
          <a className="text-secondary hover:text-primary transition-colors" href="#">Shipping & Returns</a>
          <a className="text-secondary hover:text-primary transition-colors" href="#">Sustainability</a>
        </div>
        <div className="text-label-caps font-label-caps text-secondary mt-4 md:mt-8 text-center uppercase tracking-wider">
          &copy; 2024 LUCIR ARCHITECTURAL FASHION. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </>
  )
}
