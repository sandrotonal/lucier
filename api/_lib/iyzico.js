const Iyzipay = require('iyzipay')

function getIyzipay() {
  const apiKey = process.env.IYZICO_API_KEY
  const secretKey = process.env.IYZICO_SECRET_KEY
  if (!apiKey || !secretKey) return null

  return new Iyzipay({
    apiKey,
    secretKey,
    uri: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com',
  })
}

function usdToTry(amountUsd) {
  const rate = Number(process.env.IYZICO_USD_TRY_RATE || 36)
  return (Number(amountUsd) * rate).toFixed(2)
}

function promisify(fn, request) {
  return new Promise((resolve, reject) => {
    fn(request, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

function getSiteUrl(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '')
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  const host = req.headers?.host
  if (host) return `http://${host}`
  return 'http://localhost:5173'
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim()
  return req.headers['x-real-ip'] || '85.34.78.112'
}

module.exports = { getIyzipay, Iyzipay, usdToTry, promisify, getSiteUrl, getClientIp }
