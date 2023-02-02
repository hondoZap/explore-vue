import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
  },
  server: {
    port: 8080,
    proxy: {
      '^(/api|/meta|/login|/logout)': {
        target: 'http://localhost:8000',
        changeOrigin: false,
      },
    },
  },
})
