import { defineConfig } from 'vitest/config'
import preact from '@preact/preset-vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  base: process.env.BASE_URL || './',
  root: path.resolve(__dirname, './'),
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
