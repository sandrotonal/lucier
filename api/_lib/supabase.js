const { createClient } = require('@supabase/supabase-js')

function getSupabaseAdmin() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

async function updateOrderPayment(orderId, paymentStatus) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return

  await supabase
    .from('orders')
    .update({ payment_status: paymentStatus })
    .eq('id', orderId)
}

async function decrementStock(items) {
  const supabase = getSupabaseAdmin()
  if (!supabase || !Array.isArray(items)) return

  for (const item of items) {
    const { data } = await supabase.from('products').select('stock').eq('id', item.id).maybeSingle()
    if (!data) continue
    const next = Math.max(0, (data.stock || 0) - (item.qty || 1))
    await supabase.from('products').update({ stock: next, updated_at: new Date().toISOString() }).eq('id', item.id)
  }
}

module.exports = { updateOrderPayment, decrementStock }
