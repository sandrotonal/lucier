import { supabase, checkSupabaseHealth } from '../lib/supabase'
import { enqueueSync, getSyncQueue, setSyncQueue } from '../lib/syncQueue'
import type { SavedOrder } from './orders'

export async function syncOrderToSupabase(order: SavedOrder): Promise<boolean> {
  if (!supabase) return false

  const online = await checkSupabaseHealth()
  if (!online) {
    enqueueSync({
      type: 'order',
      payload: {
        id: order.id,
        items: order.items,
        subtotal: order.subtotal,
        shipping: order.shipping,
        payment_method: order.paymentMethod,
        payment_status: order.paymentStatus,
      },
    })
    return false
  }

  const { error } = await supabase.from('orders').insert({
    id: order.id,
    items: order.items,
    subtotal: order.subtotal,
    shipping: order.shipping,
    payment_method: order.paymentMethod,
    payment_status: order.paymentStatus,
  })

  if (error) {
    enqueueSync({ type: 'order', payload: { ...order } as unknown as Record<string, unknown> })
    return false
  }

  return true
}

export async function syncNewsletterToSupabase(email: string): Promise<boolean> {
  if (!supabase) return false

  const online = await checkSupabaseHealth()
  if (!online) {
    enqueueSync({ type: 'newsletter', payload: { email } })
    return false
  }

  const { error } = await supabase.from('newsletter_subscribers').insert({ email })

  if (error) {
    if (error.code === '23505') return true // duplicate ok
    enqueueSync({ type: 'newsletter', payload: { email } })
    return false
  }

  return true
}

export async function flushSyncQueue(): Promise<number> {
  if (!supabase) return 0

  const online = await checkSupabaseHealth()
  if (!online) return 0

  const queue = getSyncQueue()
  if (queue.length === 0) return 0

  const remaining: typeof queue = []
  let synced = 0

  for (const job of queue) {
    if (job.type === 'order') {
      const { error } = await supabase.from('orders').insert(job.payload)
      if (error) remaining.push(job)
      else synced++
    } else if (job.type === 'newsletter') {
      const { error } = await supabase.from('newsletter_subscribers').insert(job.payload)
      if (error && error.code !== '23505') remaining.push(job)
      else synced++
    }
  }

  setSyncQueue(remaining)
  return synced
}

export async function fetchStockFromSupabase(productId: number): Promise<number | null> {
  if (!supabase) return null

  const online = await checkSupabaseHealth()
  if (!online) return null

  const { data, error } = await supabase
    .from('products')
    .select('stock')
    .eq('id', productId)
    .maybeSingle()

  if (error || !data) return null
  return data.stock as number
}
