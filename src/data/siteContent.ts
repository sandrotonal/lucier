export interface InfoSection {
  title: string
  body: string[]
}

export interface InfoPage {
  title: string
  sections: InfoSection[]
}

export const infoPages: Record<string, InfoPage> = {
  about: {
    title: 'About Lucir',
    sections: [
      {
        title: 'Architectural Fashion',
        body: [
          'Lucir is a design-led fashion house founded on the principle that clothing should function as architecture for the body.',
          'Each piece is engineered with structural precision — oversized volumes, technical materials, and deliberate silhouettes that interact with the wearer\'s environment.',
        ],
      },
      {
        title: 'Craft & Origin',
        body: [
          'Our collections are produced in limited runs across Italy and Portugal, prioritizing quality over scale.',
          'We work with specialist ateliers for outerwear, leather goods, and technical textiles.',
        ],
      },
    ],
  },
  shipping: {
    title: 'Shipping & Returns',
    sections: [
      {
        title: 'Shipping',
        body: [
          'Complimentary express shipping on all orders worldwide.',
          'Standard delivery: 3–5 business days. Express: 1–2 business days.',
          'You will receive tracking information once your order ships.',
        ],
      },
      {
        title: 'Returns',
        body: [
          'Returns accepted within 14 days of delivery.',
          'Items must be unworn, with original tags attached.',
          'Refunds are processed within 5–7 business days after inspection.',
        ],
      },
    ],
  },
  faq: {
    title: 'FAQ',
    sections: [
      {
        title: 'Sizing',
        body: ['Our fit is generally true to size with an architectural, slightly oversized cut. Refer to the Size Guide on each product page.'],
      },
      {
        title: 'Payment',
        body: ['We accept major credit cards. Payment processing will be enabled in the next release — currently checkout saves your order locally for demo purposes.'],
      },
      {
        title: 'Care',
        body: ['Each product page includes specific care instructions. Technical outerwear should be hand washed cold and air dried.'],
      },
    ],
  },
  contact: {
    title: 'Contact',
    sections: [
      {
        title: 'Customer Care',
        body: [
          'Email: care@lucir.studio',
          'Hours: Mon–Fri, 9:00–18:00 CET',
          'We respond within 24 hours on business days.',
        ],
      },
      {
        title: 'Press & Wholesale',
        body: ['Press: press@lucir.studio', 'Wholesale: wholesale@lucir.studio'],
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    sections: [
      {
        title: 'Data We Collect',
        body: [
          'We collect information you provide at checkout (name, email, address) and newsletter sign-ups.',
          'Cart and wishlist data is stored locally in your browser until a backend is connected.',
        ],
      },
      {
        title: 'Your Rights',
        body: ['You may request deletion of your data by contacting care@lucir.studio.'],
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    sections: [
      {
        title: 'Orders',
        body: ['All orders are subject to availability. Prices are listed in USD and include applicable taxes at checkout.'],
      },
      {
        title: 'Intellectual Property',
        body: ['All content, designs, and imagery on this site are property of Lucir Architectural Fashion.'],
      },
    ],
  },
  sustainability: {
    title: 'Sustainability',
    sections: [
      {
        title: 'Materials',
        body: [
          'We prioritize recycled technical textiles and vegetable-tanned leather where possible.',
          'Packaging is 100% recyclable and plastic-free.',
        ],
      },
      {
        title: 'Production',
        body: ['Limited runs reduce overproduction. Unsold inventory is never destroyed — it is donated or repurposed.'],
      },
    ],
  },
  'size-guide': {
    title: 'Size Guide',
    sections: [
      {
        title: 'Outerwear',
        body: [
          'S: Chest 36–38" | M: Chest 38–40" | L: Chest 40–42" | XL: Chest 42–44"',
          'Fit is architectural and slightly oversized. Size up for a more relaxed volume.',
        ],
      },
      {
        title: 'Tops',
        body: ['XS–L available. Model is 6\'1" (185 cm) and wears size M.'],
      },
      {
        title: 'Shoes',
        body: ['EU sizing 40–44. True to size.'],
      },
    ],
  },
}
