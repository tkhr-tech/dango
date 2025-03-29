import type { Config } from 'tailwindcss';

// eslint-disable-next-line import/no-default-export
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  safelist: [
    'grid-cols-1',
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-4',
    'grid-cols-5',
    'grid-cols-6',
    'grid-cols-7',
    'grid-cols-8',
    'grid-cols-9',
    'grid-cols-10',
    'grid-cols-11',
    'grid-cols-12',
  ],
  darkMode: 'media',
  theme: {
    extend: {}
  },
  plugins: [],
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    extend: {
      borderRadius: ['hover', 'focus'],
      fontWeight: ['hover', 'focus']
    }
  }
} satisfies Config;
