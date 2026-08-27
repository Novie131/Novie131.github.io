import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import adminApi from './plugins/admin-api.js'

export default defineConfig({
  plugins: [
    react(),
    adminApi(),   // dev-only：/__admin/* 內容編輯 API，不會進 production build
  ],
  base: '/',      // Novie131.github.io 是根域名，base 設 /
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
