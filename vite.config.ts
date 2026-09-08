import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/idea-zoo/',
  server: {
    proxy: {
      '/api/community': {
        target: 'http://localhost:8899',
        changeOrigin: true,
      },
    },
  },
})
