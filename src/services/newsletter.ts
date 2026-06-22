import { loadFromStorage, saveToStorage } from '../lib/storage'
import { syncNewsletterToSupabase } from './sync'

const NEWSLETTER_KEY = 'lucir_newsletter'

export const newsletterService = {
  subscribe(email: string): { ok: true } | { ok: false; reason: string } {
    const normalized = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      return { ok: false, reason: 'Invalid email address' }
    }

    const list = loadFromStorage<string[]>(NEWSLETTER_KEY, [])
    if (list.includes(normalized)) {
      return { ok: false, reason: 'Already subscribed' }
    }

    saveToStorage(NEWSLETTER_KEY, [...list, normalized])
    void syncNewsletterToSupabase(normalized)
    return { ok: true }
  },
}
