import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-test',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true
  }
})
