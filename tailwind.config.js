// tailwind.config.js
import scrollbarHide from 'tailwind-scrollbar-hide'

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [scrollbarHide],
};