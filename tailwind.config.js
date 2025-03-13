/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./*.html",
      "./pages/*.html",
      "./src/*.{html,js}",
    ],
    theme: {
      extend: {
        colors: {
            blue: {
                DEFAULT: '#2226F1',
            },
            red: {
                DEFAULT: '#FF3300'
            }
        }
      },
    },
    plugins: [],
  }