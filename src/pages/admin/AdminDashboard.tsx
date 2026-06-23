import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

interface DashboardStats {
  totalProducts: number
  totalOrders: number
  pendingOrders: number
  totalRevenue: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 5,
    totalOrders: 12,
    pendingOrders: 3,
    totalRevenue: 8547,
  })

  const cards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: 'inventory_2',
      link: '/admin/products',
      color: 'text-primary',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: 'receipt_long',
      link: '/admin/orders',
      color: 'text-primary',
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: 'schedule',
      link: '/admin/orders',
      color: 'text-error',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: 'payments',
      link: '/admin/orders',
      color: 'text-primary',
    },
  ]

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-headline-lg text-[32px] uppercase tracking-tighter mb-2">
          Dashboard
        </h1>
        <p className="font-body-md text-body-md text-secondary">
          Welcome back to LUCIR Admin
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={card.link}
              className="block border-2 border-primary p-6 hover:bg-surface-container-low transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <span className={`material-symbols-outlined text-3xl ${card.color}`}>
                  {card.icon}
                </span>
              </div>
              <p className="font-label-caps text-label-caps uppercase text-secondary mb-2">
                {card.title}
              </p>
              <p className="font-headline-md text-[28px] tracking-tighter">
                {card.value}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="border-2 border-primary p-6"
        >
          <h2 className="font-headline-md text-[20px] uppercase tracking-tighter mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              to="/admin/products/new"
              className="flex items-center gap-3 p-4 border border-primary hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-primary">add</span>
              <span className="font-label-caps text-label-caps uppercase">Add New Product</span>
            </Link>
            <Link
              to="/admin/orders"
              className="flex items-center gap-3 p-4 border border-primary hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-primary">list_alt</span>
              <span className="font-label-caps text-label-caps uppercase">View All Orders</span>
            </Link>
            <Link
              to="/admin/coupons"
              className="flex items-center gap-3 p-4 border border-primary hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-primary">confirmation_number</span>
              <span className="font-label-caps text-label-caps uppercase">Manage Coupons</span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="border-2 border-primary p-6"
        >
          <h2 className="font-headline-md text-[20px] uppercase tracking-tighter mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            <div className="p-3 border border-primary/30 bg-surface-container-low">
              <p className="font-label-caps text-[11px] uppercase text-secondary mb-1">
                2 hours ago
              </p>
              <p className="font-body-md text-[13px]">New order received (#ORD-2024-001)</p>
            </div>
            <div className="p-3 border border-primary/30 bg-surface-container-low">
              <p className="font-label-caps text-[11px] uppercase text-secondary mb-1">
                5 hours ago
              </p>
              <p className="font-body-md text-[13px]">Product stock updated</p>
            </div>
            <div className="p-3 border border-primary/30 bg-surface-container-low">
              <p className="font-label-caps text-[11px] uppercase text-secondary mb-1">
                1 day ago
              </p>
              <p className="font-body-md text-[13px]">New user registered</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
