import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',  // Gantilah dengan alamat server API kamu
        changeOrigin: true,              // Mengubah origin dari permintaan
        secure: false,                  // Set false jika server API menggunakan HTTPS tanpa SSL yang valid
        //rewrite: (path) => path.replace(/^\/api/, ''),  // Opsional: menghapus `/api` dari path jika diperlukan oleh API
      },
    },
  },
});
