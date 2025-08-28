/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './global.css',
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/*.{js,jsx,ts,tsx,mdx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/screens/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit_400Regular'],
        'outfit-bold': ['Outfit_700Bold'],
      },
      spacing: {
        global: '24px',
      },
      colors: {
        primary: 'var(--color-primary)',
        invert: 'var(--color-invert)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        text: 'var(--color-text)',
        highlight: 'var(--color-highlight)',
        border: 'var(--color-border)',
        darker: 'var(--color-darker)',
      },
    },
  },
  plugins: [],
};
