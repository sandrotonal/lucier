Lucier

Lucir Editorial E-Commerce – React, Vite, TypeScript ve Tailwind CSS ile geliştirilmiş modern bir e-ticaret platformu.

Canlı Demo: lucier-rho.vercel.app

---

Ozellikler

· Hizli Gelistirme Ortami – Vite ile olusturulmus, hizli yeniden yukleme ve derleme surecleri
· E-Ticaret Altyapisi – Urun listeleme, detay sayfalari, sepet ve odeme akisi
· Kimlik Dogrulama – Kullanici girisi, kayit ve oturum yonetimi
· Stok Yonetimi – Stok durumu uyarilari ve anlik stok takibi
· Canli Izleyici – Urun sayfalarinda anlik ziyaretci sayisi gosterimi
· Odeme Entegrasyonu – iyzico ile guvenli odeme islemleri
· Admin Paneli – Urun, siparis ve kullanici yonetimi
· SEO Duyarli – Sayfa basliklari, meta etiketler ve acik grafik destegi
· Cerez Onayi – GDPR uyumlu cerez yonetimi
· Tam Duyarli – Mobil, tablet ve masaustu icin optimize edilmis arayuz
· Loading Spinner – Veri yuklenirken kullanici dostu geri bildirim
· Sticky Bottom CTA – Sayfa sonunda sabit harekete gecirici buton

---

Teknolojiler

Alan Teknoloji
Frontend React, TypeScript, Vite, Tailwind CSS
Backend API Node.js (Vercel Serverless Functions)
Veritabani Supabase (PostgreSQL)
Odeme iyzico
Hosting Vercel

---

Proje Yapisi

```
lucier/
├── api/                # Vercel Serverless API fonksiyonlari
│   ├── _lib/           # Ortak yardimci fonksiyonlar
│   ├── iyzico/         # Odeme entegrasyonu
│   └── health.js       # Saglik kontrolu
├── public/             # Statik dosyalar (favicon, resimler vb.)
├── src/
│   ├── components/     # Yeniden kullanilabilir UI bilesenleri
│   ├── config/         # Yapilandirma dosyalari
│   ├── data/           # Sabit veriler ve mock veriler
│   ├── hooks/          # Ozel React hook'lari
│   ├── layout/         # Sayfa duzeni sablonlari
│   ├── lib/            # Yardimci kutuphaneler ve araclar
│   ├── pages/          # Sayfa bilesenleri
│   ├── services/       # API servis cagrilari
│   ├── store/          # Durum yonetimi (Zustand/Context)
│   └── App.tsx         # Ana uygulama bileseni
├── supabase/
│   └── migrations/     # Veritabani schema degisiklikleri
├── .env.example        # Ornek ortam degiskenleri
└── index.html          # Giris HTML dosyasi
```

---

Kurulum

1. Depoyu klonlayin

```bash
git clone https://github.com/sandrotonal/lucier.git
cd lucier
```

2. Bagimliliklari yukleyin

```bash
npm install
# veya
yarn install
```

3. Ortam degiskenlerini ayarlayin

.env.example dosyasini .env olarak kopyalayin ve gerekli degerleri doldurun:

```bash
cp .env.example .env
```

Gerekli degiskenler:

· VITE_SUPABASE_URL – Supabase proje URL'si
· VITE_SUPABASE_ANON_KEY – Supabase anonim anahtari
· IYZICO_API_KEY – iyzico API anahtari (backend icin)
· IYZICO_SECRET_KEY – iyzico gizli anahtari

4. Gelistirme sunucusunu baslatin

```bash
npm run dev
# veya
yarn dev
```

Uygulama http://localhost:5173 adresinde calisacaktir.

5. Production build

```bash
npm run build
# veya
yarn build
```

---

Veritabani (Supabase)

Supabase migration dosyalari supabase/migrations/ klasorunde bulunmaktadir. Migration'lari uygulamak icin:

```bash
npx supabase migration up
```

---

Deployment

Proje Vercel uzerinden deploy edilmektedir.

1. Projeyi Vercel'e import edin
2. Ortam degiskenlerini Vercel dashboard'dan ayarlayin
3. Deploy edin

---

Katkida Bulunma

1. Bu depoyu fork'layin
2. Yeni bir branch olusturun (git checkout -b feature/amazing-feature)
3. Degisikliklerinizi commit'leyin (git commit -m 'feat: add amazing feature')
4. Branch'inizi push'layin (git push origin feature/amazing-feature)
5. Bir Pull Request olusturun

---

Lisans

Bu proje MIT lisansi ile lisanslanmistir.

---

Yazar

Omer Ozbay – sandrotonal

---

Proje ile ilgili herhangi bir sorunuz veya oneriniz varsa lutfen Issues kismindan bildirin. Iyi kodlamalar.