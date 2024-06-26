import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: '172.19.3.96',
  //    port: 5173, // Vous pouvez changer le port si nécessaire
  //    proxy: {
  //     '/api': {
  //       target: 'http://172.19.3.96:5000', // Remplacez par l'adresse de votre API
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // }
})
