import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackStartVite } from '@tanstack/start/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tanstackStartVite(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    target: 'es2020',
    minify: 'terser',
  },
  ssr: {
    external: ['firebase', '@supabase/supabase-js'],
  },
})
