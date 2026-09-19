import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match the GitHub Pages sub-path: https://oranucarl.github.io/Laundry/
export default defineConfig({
  base: '/Laundry/',
  plugins: [react()],
})
