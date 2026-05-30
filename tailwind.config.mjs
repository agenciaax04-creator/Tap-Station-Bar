/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0D0D0D',
          amber: '#D4AF37'
        }
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(245, 158, 11, 0.28), 0 18px 50px rgba(0, 0, 0, 0.6)'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
};
