import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/supermarket-comparison-web-app/'  // ← CRITICAL for project sites
})