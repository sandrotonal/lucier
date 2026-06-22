const { getIyzipay, Iyzipay, usdToTry, promisify, getSiteUrl, getClientIp } = require('../_lib/iyzico')

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const iyzipay = getIyzipay()
  if (!iyzipay) {
    return res.status(503).json({ error: 'iyzico not configured. Set IYZICO_API_KEY and IYZICO_SECRET_KEY.' })
  }

  try {
    const { orderId, amountUsd, shipping, items } = req.body || {}

    if (!orderId || !amountUsd || !shipping?.email) {
      return res.status(400).json({ error: 'Missing orderId, amountUsd, or shipping' })
    }

    const paidPrice = usdToTry(amountUsd)
    const siteUrl = getSiteUrl(req)
    const contactName = `${shipping.firstName} ${shipping.lastName}`.trim()
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ')

    const basketItems = (items || []).map((item, i) => ({
      id: String(item.id || i + 1),
      name: (item.name || 'Product').slice(0, 100),
      category1: 'Fashion',
      itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
      price: usdToTry(item.price * item.qty),
    }))

    if (basketItems.length === 0) {
      basketItems.push({
        id: '1',
        name: 'Lucir Order',
        category1: 'Fashion',
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: paidPrice,
      })
    }

    const request = {
      locale: Iyzipay.LOCALE.TR,
      conversationId: orderId,
      price: paidPrice,
      paidPrice,
      currency: Iyzipay.CURRENCY.TRY,
      basketId: orderId,
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      callbackUrl: `${siteUrl}/api/iyzico/callback`,
      enabledInstallments: [1, 2, 3, 6, 9],
      buyer: {
        id: orderId.replace(/[^a-zA-Z0-9]/g, '').slice(0, 20) || 'BY001',
        name: shipping.firstName || 'Ad',
        surname: shipping.lastName || 'Soyad',
        gsmNumber: shipping.phone || '+905350000000',
        email: shipping.email,
        identityNumber: shipping.identityNumber || '74300864791',
        lastLoginDate: now,
        registrationDate: now,
        registrationAddress: shipping.address || 'Istanbul',
        ip: getClientIp(req),
        city: shipping.city || 'Istanbul',
        country: 'Turkey',
        zipCode: shipping.postalCode || '34000',
      },
      shippingAddress: {
        contactName,
        city: shipping.city || 'Istanbul',
        country: 'Turkey',
        address: shipping.address || 'Istanbul',
        zipCode: shipping.postalCode || '34000',
      },
      billingAddress: {
        contactName,
        city: shipping.city || 'Istanbul',
        country: 'Turkey',
        address: shipping.address || 'Istanbul',
        zipCode: shipping.postalCode || '34000',
      },
      basketItems,
    }

    const result = await promisify(iyzipay.checkoutFormInitialize.create.bind(iyzipay.checkoutFormInitialize), request)

    if (result.status !== 'success' || !result.token) {
      return res.status(502).json({
        error: result.errorMessage || 'iyzico initialization failed',
        detail: result,
      })
    }

    const isSandbox = (process.env.IYZICO_BASE_URL || '').includes('sandbox') || !process.env.IYZICO_BASE_URL
    const paymentPageUrl = isSandbox
      ? `https://sandbox-cpp.iyzipay.com?token=${result.token}&lang=tr`
      : `https://cpp.iyzipay.com?token=${result.token}&lang=tr`

    return res.status(200).json({
      token: result.token,
      paymentPageUrl,
      paidPriceTry: paidPrice,
    })
  } catch (err) {
    console.error('iyzico initialize error:', err)
    return res.status(500).json({ error: err.message || 'Internal server error' })
  }
}
