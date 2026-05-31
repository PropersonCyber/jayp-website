import { defineConfig, presetUno, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/',
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    })
  ],
  theme: {
    colors: {
      primary: '#0a0a0a',
      secondary: '#1a1a1a',
      accent: '#6366f1',
      'accent-hover': '#4f46e5',
      surface: '#fafafa'
    }
  },
  shortcuts: {
    'btn-primary': 'bg-primary text-white px-6 py-3 rounded-full font-medium transition-all duration-200 hover:bg-secondary hover:scale-102 cursor-pointer',
    'btn-secondary': 'bg-white text-primary border border-gray-200 px-6 py-3 rounded-full font-medium transition-all duration-200 hover:bg-gray-50 cursor-pointer',
    'card-hover': 'transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl',
    'nav-link': 'relative cursor-pointer after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary after:transition-all after:duration-300 hover:after:w-full'
  }
})
