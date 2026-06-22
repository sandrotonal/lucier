import { loadFromStorage, saveToStorage } from './storage'

const QUEUE_KEY = 'lucir_sync_queue'

export type SyncJob =
  | { type: 'order'; payload: Record<string, unknown> }
  | { type: 'newsletter'; payload: { email: string } }

export function enqueueSync(job: SyncJob): void {
  const queue = loadFromStorage<SyncJob[]>(QUEUE_KEY, [])
  saveToStorage(QUEUE_KEY, [...queue, job])
}

export function getSyncQueue(): SyncJob[] {
  return loadFromStorage<SyncJob[]>(QUEUE_KEY, [])
}

export function clearSyncQueue(): void {
  saveToStorage(QUEUE_KEY, [])
}

export function setSyncQueue(queue: SyncJob[]): void {
  saveToStorage(QUEUE_KEY, queue)
}
