import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Mode, plugin } from 'vite-plugin-markdown';

export default defineConfig({
  base: '/art-works/',
  plugins: [
    react(),
    plugin({
      mode: [Mode.REACT],
      markdownIt: {
        typographer: true,
        breaks: true,
      }
    })
  ],
})
