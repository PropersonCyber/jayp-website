import type { Config } from 'tailwindcss'
import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons'
import typography from '@tailwindcss/typography'

export default <Partial<Config>>{
  darkMode: ['class'],
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/composables/**/*.{js,ts}',
    './app/lib/**/*.{js,ts}',
    './app/app.vue',
  ],
  safelist: [
    'i-lucide-instagram',
    'i-lucide-pinterest',
    'i-lucide-linkedin',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#2C5E45',
          foreground: '#FFFFFF',
          light: '#3A7358',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 3px)',
        sm: 'calc(var(--radius) - 6px)',
      },
      boxShadow: {
        soft: '0 8px 28px -18px rgb(18 35 26 / 30%)',
        card: '0 12px 30px -20px rgb(18 35 26 / 35%)',
      },
      spacing: {
        18: '4.5rem',
        35: '8.75rem',
        40: '10rem',
      },
    },
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(['lucide']),
    }),
    typography,
  ],
}
