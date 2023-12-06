import path from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@app': path.resolve('src/app'),
      '@processes': path.resolve('src/processes'),
      '@pages': path.resolve('src/pages'),
      '@widgets': path.resolve('src/widgets'),
      '@features': path.resolve('src/features'),
      '@entities': path.resolve('src/entities'),
      '@shared': path.resolve('src/shared'),
    },
  },
  server: {
    host: true,
  },
});
