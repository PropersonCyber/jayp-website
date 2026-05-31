# PremiumPack - Professional Fabric Packaging Website

A modern B2B website for a fabric packaging manufacturer built with **Vue 3** + **TypeScript** + **Vite** + **UnoCSS**.

## Tech Stack

- **Vue 3** - Progressive JavaScript framework (Composition API)
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next generation frontend tooling
- **UnoCSS** - The instant on-demand atomic CSS engine with Iconify integration

## Features

- ✅ Fully responsive design (PC, Tablet, Mobile)
- ✅ Modern minimalist design style (Apple-level whitespace)
- ✅ SEO optimized structure
- ✅ Multiple interactive components
- ✅ Form validation
- ✅ Smooth animations and transitions
- ✅ Iconify icons via CDN (auto-loaded, tree-shakeable)

## Icon System

Icons are powered by **Iconify** and loaded on-demand from CDN. No npm packages needed!

Usage in Vue components:
```vue
<span i="fas-check text-green-600"></span>
<span i="fas-star text-yellow-400"></span>
<span i="fas-bars text-xl"></span>
<span i="fas-arrow-right"></span>
```

Available icon sets:
- `fas` - Font Awesome Solid
- `far` - Font Awesome Regular
- `fab` - Font Awesome Brands

## Getting Started

### Installation

```bash
npm install
# or
pnpm install
```

### Development

```bash
npm run dev
```

The development server will start at http://localhost:5173

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## UnoCSS Shortcuts

Pre-configured shortcuts for common styles:

| Shortcut | Description |
|----------|-------------|
| `btn-primary` | Primary button with hover effect |
| `btn-secondary` | Secondary outlined button |
| `card-hover` | Card with lift and shadow on hover |
| `nav-link` | Navigation link with underline animation |

## Project Structure

```
JaypWebsite/
├── src/
│   ├── components/
│   │   ├── BackToTop.vue
│   │   ├── Blog.vue
│   │   ├── Contact.vue
│   │   ├── FAQ.vue
│   │   ├── Factory.vue
│   │   ├── Footer.vue
│   │   ├── Header.vue
│   │   ├── Hero.vue
│   │   ├── Newsletter.vue
│   │   ├── Process.vue
│   │   ├── ProductCategories.vue
│   │   ├── Testimonials.vue
│   │   ├── TrustedBy.vue
│   │   └── WhyChooseUs.vue
│   ├── App.vue
│   └── main.ts
├── public/
│   └── vite.svg
├── index.html
├── package.json
├── tsconfig.json
├── uno.config.ts
├── vite.config.ts
└── README.md
```

## Components List

| Component | Section | Key Features |
|-----------|---------|--------------|
| Header | Navigation | Fixed header, mobile menu, language dropdown |
| Hero | Home | Animated stats, floating badges, gradient text |
| TrustedBy | Brands | Logo showcase with fade effect |
| ProductCategories | Products | 7 product cards, hover animations, badges |
| Factory | Manufacturing | Stats grid, image gallery, certifications |
| WhyChooseUs | Benefits | 6 feature cards on dark background |
| Process | Workflow | 5-step timeline with gradient connector |
| Testimonials | Reviews | 3 review cards, star ratings, trust stats |
| FAQ | Help | Accordion with smooth expand/collapse |
| Blog | News | 3 article cards with hover zoom |
| Contact | CTA | Full form with validation, contact info |
| Newsletter | Subscribe | Email subscription form |
| Footer | Links | Multi-column, social links, payment icons |
| BackToTop | Utility | Scroll-triggered button |

## Customization

### Colors

Edit `uno.config.ts` to customize the color theme:

```typescript
theme: {
  colors: {
    primary: '#0a0a0a',
    secondary: '#1a1a1a',
    accent: '#6366f1',
    'accent-hover': '#4f46e5',
    surface: '#fafafa'
  }
}
```

### Shortcuts

Add or modify shortcuts in the shortcuts section of `uno.config.ts`:

```typescript
shortcuts: {
  'btn-primary': 'bg-primary text-white px-6 py-3 rounded-full',
  // Add more shortcuts here
}
```

## License

MIT
