import { useEffect } from 'react'
import { checkSupabaseHealth } from '../lib/supabase'
import { flushSyncQueue } from '../services/sync'
import { catalogService } from '../services/catalog'
import { products } from '../data/products'
import { useStore } from '../store/StoreContext'

/** Uygulama açılışında: Supabase health check + sync kuyruğu + stok güncelleme */
export function useBackendInit() {
  const { setBackendStatus } = useStore()

  useEffect(() => {
    let cancelled = false

    async function init() {
      const online = await checkSupabaseHealth()
      if (cancelled) return

      setBackendStatus(online ? 'online' : import.meta.env.VITE_SUPABASE_URL ? 'offline' : 'local')

      if (online) {
        await flushSyncQueue()
        await Promise.all(
          products.map(async (p) => {
            const live = await catalogService.getStockLive(p.id)
            return live
          })
        )
      }
    }

    void init()
    return () => { cancelled = true }
  }, [setBackendStatus])
}
