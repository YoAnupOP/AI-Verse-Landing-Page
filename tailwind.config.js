// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        michroma: ['Michroma', 'sans-serif'],
        dmsans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {
      scrollSnapType: ['responsive'],
      scrollSnapAlign: ['responsive'],
    },
  },
  plugins: [],
}
