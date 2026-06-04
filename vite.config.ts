import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Pre-transform entry files on startup to reduce first-request latency
      warmup: {
        clientFiles: [
          './src/main.tsx',
          './src/App.tsx',
          './src/components/Preloader.tsx',
          './src/components/DynamicNav.tsx',
        ],
      },
    },
    // Pre-bundle heavy deps so Vite doesn't discover & transform them on first request
    optimizeDeps: {
      include: [
        'react',
        'react/jsx-runtime',
        'react-dom',
        'react-dom/client',
        'motion',
        'motion/react',
        'three',
        'lucide-react',
        '@google/genai',
      ],
      // Force re-bundle when deps change (avoids stale cache issues)
      force: false,
    },
    build: {
      // Use esbuild for minification (faster than terser)
      minify: 'esbuild',
      // Increase chunk size warning threshold — three.js is large by design
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          // Manual chunks prevent a single massive bundle
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'motion-vendor': ['motion'],
            'three-vendor': ['three'],
            'icons-vendor': ['lucide-react'],
          },
        },
      },
    },
  };
});
