import { useEffect } from 'react'
import { loadFromStorage, saveToStorage } from '../lib/storage'

const RECENT_KEY = 'lucir_recently_viewed'
const MAX = 4

export function trackRecentlyViewed(productId: number) {
  const prev = loadFromStorage<number[]>(RECENT_KEY, [])
  const next = [productId, ...prev.filter((id) => id !== productId)].slice(0, MAX)
  saveToStorage(RECENT_KEY, next)
}

export function useRecentlyViewedIds(): number[] {
  return loadFromStorage<number[]>(RECENT_KEY, [])
}

export function useTrackProductView(productId: number | undefined) {
  useEffect(() => {
    if (productId && !Number.isNaN(productId)) {
      trackRecentlyViewed(productId)
    }
  }, [productId])
}
