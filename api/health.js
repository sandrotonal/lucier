module.exports = function handler(_req, res) {
  res.status(200).json({
    ok: true,
    service: 'lucir-api',
    iyzico: Boolean(process.env.IYZICO_API_KEY),
    supabase: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_URL),
  })
}
