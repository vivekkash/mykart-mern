/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-macbook': "url('/images/macbook.jpg')",
        'hero-iphone': "url('/images/iphone.jpg')",
        'hero-camera': "url('/images/camera.jpg')",
        'hero-watch': "url('/images/watch.jpg')",
        'login-screen': "url('/images/login.jpg')",
      },
    },
  },
  plugins: ['flowbite/plugin'],
};
