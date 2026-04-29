import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',          // Novie131.github.io 是根域名，base 設 /
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
