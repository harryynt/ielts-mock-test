export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        panel: '0 10px 25px rgba(15, 23, 42, 0.08)'
      },
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#2563eb',
          600: '#1d4ed8'
        }
      }
    }
  },
  plugins: []
};
