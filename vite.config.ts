import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    // 'base' is crucial for GitHub Pages. './' ensures assets are loaded relatively.
    base: './', 
    define: {
      // This polyfills process.env.API_KEY so your existing code works without modification
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})