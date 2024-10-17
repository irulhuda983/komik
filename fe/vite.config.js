import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy';

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000,
    proxy: {
      '/scrap': {
        target: 'https://komiku.id/manga/kimi-to-boku-no-saigo-no-senjou-aruiwa-sekai-ga-hajimaru-seisen/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/scrap/, '')
      }
    }
  },
  preview: {
    port: 8080,
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    vue(),
    viteStaticCopy({
        targets: [
            {
              src: 'robots.txt',  // Path to your robots.txt
              dest: '',           // Destination in the dist folder
            },
        ],
    }),
],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
