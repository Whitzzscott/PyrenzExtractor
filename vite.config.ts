import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import webExtension from 'vite-plugin-web-extension'
import { resolve } from 'path'

export default defineConfig({
  define: {
    'process.env': {},
  },
  plugins: [
    react(),
    tsconfigPaths(),
    webExtension({
      manifest: resolve(__dirname, 'public/manifest.json'),
    }),
  ],
  publicDir: 'public',
  build: {
    target: 'es2020',
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      input: {
        content: resolve(__dirname, 'src/content.tsx'),
      },
      output: {
        entryFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash].[ext]',
      },
    },
  },
  esbuild: {
    legalComments: 'none',
  },
})
