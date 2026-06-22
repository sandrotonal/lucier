import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!)
  : null

export type BackendStatus = 'local' | 'online' | 'offline'

let backendStatus: BackendStatus = isSupabaseConfigured ? 'offline' : 'local'

export function getBackendStatus(): BackendStatus {
  return backendStatus
}

/** Supabase paused/inactive projelerde false döner — uygulama localStorage ile devam eder */
export async function checkSupabaseHealth(): Promise<boolean> {
  if (!supabase) {
    backendStatus = 'local'
    return false
  }

  try {
    const timeout = new Promise<{ error: { message: string } }>((resolve) =>
      setTimeout(() => resolve({ error: { message: 'timeout' } }), 8000)
    )

    const query = supabase.from('products').select('id').limit(1)
    const { error } = await Promise.race([query, timeout])

    if (error) {
      backendStatus = 'offline'
      return false
    }

    backendStatus = 'online'
    return true
  } catch {
    backendStatus = 'offline'
    return false
  }
}
