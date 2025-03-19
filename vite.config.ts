import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Écoute sur toutes les interfaces réseau
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true // Améliore la détection des changements sur certains systèmes
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    },
    cors: true,
    hmr: {
      host: 'localhost',
      protocol: 'ws'
    }
  },
  preview: {
    port: 3000,
    host: true
  }
})
