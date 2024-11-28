import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Mode, plugin } from 'vite-plugin-markdown';
import path from "path";

export default defineConfig({
  base: '/art-works/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Define @ as an alias for src
    },
  },
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
