
import { resolve } from 'path';

import { defineConfig } from 'vite';

const root = resolve(__dirname, 'src/pages');
const outDir = resolve(__dirname, '../../dist/apps/vanilla');

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [],
  resolve: {
    alias: {
      '@js-camp': resolve(__dirname, '../../libs'),
    },
  },

  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: [
        resolve(root, 'index.html'),
        resolve(root, 'login', 'index.html'),
        resolve(root, 'registration', 'index.html'),
        resolve(root, 'details', 'index.html'),
      ],
    },
  },
}

);
