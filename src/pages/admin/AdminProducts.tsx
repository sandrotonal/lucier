import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { products } from '../../data/products'
import { catalogService } from '../../services/catalog'

export default function AdminProducts() {
  const [productList, setProductList] = useState(products)
  const [search, setSearch] = useState('')

  const filteredProducts = productList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    setProductList(productList.filter((p) => p.id !== id))
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="font-headline-lg text-[32px] uppercase tracking-tighter mb-2">
            Products
          </h1>
          <p className="font-body-md text-body-md text-secondary">
            {filteredProducts.length} total products
          </p>
        </div>
        <Link
          to="/admin/products/new"
          className="border-2 border-primary bg-primary text-on-primary px-6 py-3 font-label-caps text-label-caps uppercase hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          Add Product
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-md bg-transparent border-2 border-primary px-4 py-3 font-body-md text-body-md focus:outline-none"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border-2 border-primary overflow-x-auto"
      >
        <table className="w-full">
          <thead className="bg-surface-container-low border-b-2 border-primary">
            <tr>
              <th className="text-left p-4 font-label-caps text-label-caps uppercase">Image</th>
              <th className="text-left p-4 font-label-caps text-label-caps uppercase">Name</th>
              <th className="text-left p-4 font-label-caps text-label-caps uppercase">Category</th>
              <th className="text-left p-4 font-label-caps text-label-caps uppercase">Price</th>
              <th className="text-left p-4 font-label-caps text-label-caps uppercase">Stock</th>
              <th className="text-left p-4 font-label-caps text-label-caps uppercase">Status</th>
              <th className="text-right p-4 font-label-caps text-label-caps uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/20">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-surface-container-low transition-colors">
                <td className="p-4">
                  <div className="w-16 h-20 bg-surface-container overflow-hidden border border-primary/30">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="p-4">
                  <p className="font-label-caps text-label-caps uppercase">{product.name}</p>
                  <p className="font-body-md text-[12px] text-secondary mt-1">
                    ID: {product.id}
                  </p>
                </td>
                <td className="p-4">
                  <span className="inline-block px-3 py-1 bg-surface-container border border-primary/30 font-label-caps text-[10px] uppercase">
                    {product.category}
                  </span>
                </td>
                <td className="p-4">
                  <p className="font-body-md text-body-md">
                    {catalogService.formatPrice(product.price)}
                  </p>
                </td>
                <td className="p-4">
                  <p className={`font-body-md text-body-md ${product.stock === 0 ? 'text-error' : product.stock < 5 ? 'text-error' : ''}`}>
                    {product.stock}
                  </p>
                </td>
                <td className="p-4">
                  {product.stock > 0 ? (
                    <span className="inline-flex items-center gap-1 text-primary">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className="font-label-caps text-[10px] uppercase">In Stock</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-error">
                      <span className="w-2 h-2 bg-error rounded-full"></span>
                      <span className="font-label-caps text-[10px] uppercase">Out of Stock</span>
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/admin/products/${product.id}`}
                      className="p-2 border border-primary hover:bg-surface-container-low transition-colors"
                      aria-label="Edit"
                    >
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 border border-error text-error hover:bg-error/10 transition-colors"
                      aria-label="Delete"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <span className="material-symbols-outlined text-6xl text-secondary mb-4">
            inventory_2
          </span>
          <p className="font-headline-md text-[20px] uppercase text-secondary">
            No products found
          </p>
        </motion.div>
      )}
    </div>
  )
}
