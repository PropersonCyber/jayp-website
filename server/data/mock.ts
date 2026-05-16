import type { BlogPost, Category, HomeSection, Product, SiteSettings } from '../../app/types'

export const mockSiteSettings: SiteSettings = {
  contact_email: 'hello@bagluxe.com',
  phone: '+1 (555) 123-4567',
  address: '88 Packaging Ave, Los Angeles, CA 90001, USA',
  brand_description:
    'BAGLUXE crafts premium fabric packaging that elevates your brand — from velvet pouches to sustainable cotton bags, with low MOQ and worldwide shipping.',
  social_links: [
    { platform: 'instagram', url: 'https://instagram.com/bagluxe' },
    { platform: 'facebook', url: 'https://facebook.com/bagluxe' },
    { platform: 'pinterest', url: 'https://pinterest.com/bagluxe' },
    { platform: 'linkedin', url: 'https://linkedin.com/company/bagluxe' },
  ],
}

export const mockHomeSection: HomeSection = {
  hero_title: 'Elevate Your Brand with Premium Fabric Packaging',
  hero_subtitle:
    'Discover luxurious fabric bags crafted for discerning brands. Low MOQ, sustainable materials, shipped worldwide.',
  value_props: [
    { icon: 'i-lucide-award', title: 'Premium Quality', description: 'Finest fabrics & craftsmanship' },
    { icon: 'i-lucide-package', title: 'Low MOQ', description: 'Start from 100 units' },
    { icon: 'i-lucide-leaf', title: 'Sustainable', description: 'Eco-friendly materials' },
    { icon: 'i-lucide-globe', title: 'Worldwide Shipping', description: 'Delivered globally' },
  ],
}

export const mockCategories: Category[] = [
  { id: '1', slug: 'velvet-bags', name: 'Velvet Bags', description: 'Soft & Luxurious', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop', sort: 1 },
  { id: '2', slug: 'cotton-bags', name: 'Cotton Bags', description: 'Eco & Durable', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83b34f44?w=600&h=600&fit=crop', sort: 2 },
  { id: '3', slug: 'organza-bags', name: 'Organza Bags', description: 'Sheer & Elegant', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop', sort: 3 },
  { id: '4', slug: 'linen-bags', name: 'Linen Bags', description: 'Natural Texture', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop', sort: 4 },
  { id: '5', slug: 'jute-bags', name: 'Jute Bags', description: 'Eco-Friendly', image: 'https://images.unsplash.com/photo-1591195853828-9ea85f840f8d?w=600&h=600&fit=crop', sort: 5 },
  { id: '6', slug: 'drawstring-bags', name: 'Drawstring Bags', description: 'Versatile Carry', image: 'https://images.unsplash.com/photo-1584917865442-de89a76b4553?w=600&h=600&fit=crop', sort: 6 },
]

const img = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&h=800&fit=crop`

export const mockProducts: Product[] = [
  {
    id: 'p1',
    slug: 'luxury-velvet-pouch',
    title: 'Luxury Velvet Pouch',
    short_description: 'Soft-touch velvet pouch with drawstring closure.',
    description: '<p>Our signature velvet pouch adds a touch of luxury to any product presentation. Perfect for jewelry, cosmetics, and premium gifts.</p>',
    material: 'Premium velvet (polyester blend)',
    material_care: 'Spot clean only. Store in dry place.',
    shipping_returns: 'Ships within 5-7 business days. 30-day return on uncustomized orders.',
    moq: 100,
    production_days: 7,
    shipping_note: 'Free shipping on orders over $500',
    featured: true,
    rating: 4.8,
    review_count: 124,
    categories: [mockCategories[0]!],
    images: [img('1590874103328-eac38a683ce7'), img('1553062407-98eeb64c6a62')],
    variants: [
      { id: 'v1', product_id: 'p1', sku: 'VP-BLK-S', color: 'Black', color_hex: '#1a1a1a', size: 'S', price: 2.5, sort: 1 },
      { id: 'v2', product_id: 'p1', sku: 'VP-BLK-M', color: 'Black', color_hex: '#1a1a1a', size: 'M', price: 2.8, sort: 2 },
      { id: 'v3', product_id: 'p1', sku: 'VP-GRN-M', color: 'Forest Green', color_hex: '#1B3D2F', size: 'M', price: 2.8, sort: 3 },
      { id: 'v4', product_id: 'p1', sku: 'VP-BGE-L', color: 'Beige', color_hex: '#D4C4A8', size: 'L', price: 3.2, sort: 4 },
    ],
  },
  {
    id: 'p2',
    slug: 'organic-cotton-tote',
    title: 'Organic Cotton Tote Bag',
    short_description: 'Sustainable organic cotton with reinforced handles.',
    description: '<p>Eco-conscious brands love our GOTS-certified organic cotton totes. Customizable with screen printing or embroidery.</p>',
    material: '100% organic cotton',
    material_care: 'Machine wash cold. Air dry.',
    shipping_returns: 'Production 10-14 days. Returns accepted within 14 days.',
    moq: 200,
    production_days: 14,
    featured: true,
    rating: 4.6,
    review_count: 89,
    categories: [mockCategories[1]!],
    images: [img('1601925260368-ae2f83b34f44')],
    variants: [
      { id: 'v5', product_id: 'p2', sku: 'CT-NAT-M', color: 'Natural', color_hex: '#F5F0E8', size: 'M', price: 4.5, sort: 1 },
      { id: 'v6', product_id: 'p2', sku: 'CT-NAT-L', color: 'Natural', color_hex: '#F5F0E8', size: 'L', price: 5.0, sort: 2 },
    ],
  },
  {
    id: 'p3',
    slug: 'sheer-organza-bag',
    title: 'Sheer Organza Gift Bag',
    short_description: 'Elegant organza with satin ribbon drawstring.',
    material: 'Sheer organza (polyester)',
    moq: 100,
    production_days: 5,
    rating: 4.7,
    review_count: 56,
    categories: [mockCategories[2]!],
    images: [img('1553062407-98eeb64c6a62')],
    variants: [
      { id: 'v7', product_id: 'p3', sku: 'OB-WHT-S', color: 'White', color_hex: '#FFFFFF', size: 'S', price: 1.8, sort: 1 },
      { id: 'v8', product_id: 'p3', sku: 'OB-GLD-M', color: 'Gold', color_hex: '#C9A962', size: 'M', price: 2.2, sort: 2 },
    ],
  },
  {
    id: 'p4',
    slug: 'linen-drawstring-pouch',
    title: 'Linen Drawstring Pouch',
    short_description: 'Natural linen texture with cotton drawstring.',
    material: 'European linen blend',
    moq: 150,
    production_days: 10,
    rating: 4.5,
    review_count: 42,
    categories: [mockCategories[3]!],
    images: [img('1548036328-c9fa89d128fa')],
    variants: [
      { id: 'v9', product_id: 'p4', sku: 'LN-CRM-M', color: 'Cream', color_hex: '#EDE8DC', size: 'M', price: 3.0, sort: 1 },
    ],
  },
  {
    id: 'p5',
    slug: 'eco-jute-shopping-bag',
    title: 'Eco Jute Shopping Bag',
    short_description: 'Biodegradable jute with cotton rope handles.',
    material: 'Natural jute fiber',
    moq: 300,
    production_days: 12,
    rating: 4.4,
    review_count: 31,
    categories: [mockCategories[4]!],
    images: [img('1591195853828-9ea85f840f8d')],
    variants: [
      { id: 'v10', product_id: 'p5', sku: 'JT-NAT-L', color: 'Natural', color_hex: '#C4A574', size: 'L', price: 3.8, sort: 1 },
    ],
  },
  {
    id: 'p6',
    slug: 'microfiber-drawstring',
    title: 'Microfiber Drawstring Bag',
    short_description: 'Soft microfiber ideal for electronics & accessories.',
    material: 'Brushed microfiber polyester',
    moq: 100,
    production_days: 7,
    rating: 4.9,
    review_count: 78,
    categories: [mockCategories[5]!],
    images: [img('1584917865442-de89a76b4553')],
    variants: [
      { id: 'v11', product_id: 'p6', sku: 'MF-GRY-S', color: 'Grey', color_hex: '#9CA3AF', size: 'S', price: 1.5, sort: 1 },
      { id: 'v12', product_id: 'p6', sku: 'MF-NVY-M', color: 'Navy', color_hex: '#1E3A5F', size: 'M', price: 1.7, sort: 2 },
    ],
  },
]

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'b1',
    slug: 'sustainable-packaging-trends-2026',
    title: 'Sustainable Packaging Trends for 2026',
    excerpt: 'How eco-conscious brands are rethinking fabric packaging.',
    body: '<p>Sustainability is no longer optional for premium brands...</p>',
    cover: img('1542601906990-b4d3fb778b09'),
    published_at: '2026-04-01',
  },
  {
    id: 'b2',
    slug: 'choosing-right-velvet-pouch',
    title: 'Choosing the Right Velvet Pouch for Your Brand',
    excerpt: 'A guide to sizes, colors, and customization options.',
    body: '<p>Velvet pouches remain the gold standard for luxury unboxing...</p>',
    cover: img('1590874103328-eac38a683ce7'),
    published_at: '2026-03-15',
  },
  {
    id: 'b3',
    slug: 'low-moq-manufacturing-guide',
    title: 'Low MOQ Manufacturing: What You Need to Know',
    excerpt: 'Start small without compromising on quality.',
    body: '<p>Many emerging brands hesitate to invest in custom packaging...</p>',
    cover: img('1607083206869-4c8d2f4bf528'),
    published_at: '2026-02-20',
  },
]

