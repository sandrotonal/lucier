/**
 * Lucir — uygulama yapılandırması
 *
 * Veri katmanı: Supabase (opsiyonel) + localStorage fallback
 * Supabase projesi paused olursa uygulama çalışmaya devam eder.
 *
 * Ödeme: Stripe yok (TR). Havale/EFT + Lemon Squeezy + PayPal.
 */
export const APP_CONFIG = {
  dataMode: 'hybrid' as const,
  brandName: 'LUCIR',
} as const
