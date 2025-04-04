import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'build', // Ensure this is correct, this is the default output directory
  },
  plugins: [react()],
})
