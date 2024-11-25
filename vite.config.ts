import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// force deploy
// https://vite.dev/config/
export default defineConfig({
  base: '/art-works/',
  plugins: [react()],
})
