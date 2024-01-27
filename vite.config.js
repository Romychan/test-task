/// <reference types="vite/client" />

import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      '~/app': path.resolve(__dirname, 'src/app'),
      '~/components': path.resolve(__dirname, 'src/components'),
      '~/entities': path.resolve(__dirname, 'src/entities'),
      '~/shared': path.resolve(__dirname, 'src/shared'),
    },
  },
});
