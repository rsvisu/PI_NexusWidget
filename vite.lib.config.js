import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// Icons
import Icons from 'unplugin-icons/vite'

/**
 * Build embebible: genera un único embed.js autoejecutable para incrustar con un <script>
 * No lleva vueDevTools (solo desarrollo) ni la SPA de ExamplePage; el entry es src/embed.js
 *
 * https://vite.dev/config/
 */
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // El build embebible no copia public/ (favicon e imágenes de ExamplePage son solo del modo dev)
  publicDir: false,

  // En modo librería Vite no sustituye process.env.NODE_ENV lo que provoca un error
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },

  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/embed.js', import.meta.url)),
      name: 'NexusWidget',
      // iife = un solo archivo autoejecutable, sin sistema de módulos en el navegador
      formats: ['iife'],
      fileName: () => 'embed.js',
    },
  },
})
