/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        charbon: '#2c2c2c',
        or: '#d4a574',
        'or-dark': '#c49563',
        vert: '#6b8e23',
        rouge: '#c44536',
        'gris-texte': '#555555',
        creme: '#f8f8f8'
      },
      fontFamily: {
        titre: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif']
      },
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.3s ease-out',
      }
    }
  },
  plugins: []
};
