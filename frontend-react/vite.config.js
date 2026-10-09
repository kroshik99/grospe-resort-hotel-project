import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const page = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  // Two real pages, so /events/ works on any static host without rewrite rules.
  build: {
    rollupOptions: {
      input: { main: page('./index.html'), events: page('./events/index.html') },
    },
  },
});
