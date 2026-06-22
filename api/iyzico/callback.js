const { getIyzipay, Iyzipay, promisify, getSiteUrl } = require('../_lib/iyzico')
const { updateOrderPayment, decrementStock } = require('../_lib/supabase')

module.exports = async function handler(req, res) {
  const siteUrl = getSiteUrl(req)
  const redirect = (orderId, status) => {
    res.writeHead(302, {
      Location: `${siteUrl}/payment/result?orderId=${encodeURIComponent(orderId || '')}&status=${status}`,
    })
    res.end()
  }

  const token = req.body?.token || req.query?.token
  if (!token) {
    return redirect('', 'failed')
  }

  const iyzipay = getIyzipay()
  if (!iyzipay) {
    return redirect('', 'failed')
  }

  try {
    const result = await promisify(iyzipay.checkoutForm.retrieve.bind(iyzipay.checkoutForm), {
      locale: Iyzipay.LOCALE.TR,
      conversationId: req.body?.conversationId || req.query?.conversationId || '',
      token,
    })

    const orderId = result.conversationId || result.basketId || ''

    if (result.status === 'success' && result.paymentStatus === 'SUCCESS') {
      await updateOrderPayment(orderId, 'paid')

      // Stok düşürme — sipariş items Supabase'de varsa
      if (orderId) {
        const { createClient } = require('@supabase/supabase-js')
        const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
        const key = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (url && key) {
          const supabase = createClient(url, key)
          const { data } = await supabase.from('orders').select('items').eq('id', orderId).maybeSingle()
          if (data?.items) await decrementStock(data.items)
        }
      }

      return redirect(orderId, 'success')
    }

    await updateOrderPayment(orderId, 'cancelled')
    return redirect(orderId, 'failed')
  } catch (err) {
    console.error('iyzico callback error:', err)
    return redirect('', 'failed')
  }
}
