import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 127.0.0.1, not localhost: Node resolves localhost to ::1 first, so a
      // stray IPv6-only listener on :3000 would silently swallow API calls.
      '/api': 'http://127.0.0.1:3000',
    },
  },
  build: {
    outDir: '../backend/public',
    emptyOutDir: true,
  },
});
