import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{vue,ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
    '../hdot-tmaster-front/components/**/*.{vue,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config