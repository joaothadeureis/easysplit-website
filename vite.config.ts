import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Otimizações de build
        target: 'es2020',
        minify: 'esbuild', // esbuild já vem com Vite e é mais rápido
        rollupOptions: {
          output: {
            // Code splitting para melhor cache
            manualChunks: {
              'vendor-react': ['react', 'react-dom', 'react-router-dom'],
              'vendor-icons': ['lucide-react'],
              'vendor-recharts': ['recharts', 'd3-shape', 'd3-scale', 'd3-path', 'd3-array', 'd3-interpolate', 'd3-color', 'd3-format', 'd3-time', 'd3-time-format'],
            },
          },
        },
        // Gerar sourcemaps apenas em dev
        sourcemap: false,
        // Otimizar CSS
        cssCodeSplit: true,
        // Limitar chunks pequenos demais
        chunkSizeWarningLimit: 500,
      },
      // Remover console.log em produção
      esbuild: {
        drop: ['console', 'debugger'],
      },
    };
});
