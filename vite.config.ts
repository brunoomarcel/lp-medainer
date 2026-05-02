import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'trial-route-rewrite',
        configureServer(server) {
          server.middlewares.use((req, _res, next) => {
            if (req.url === '/teste-gratuito') {
              req.url = '/teste-gratuito/index.html';
            }
            if (req.url === '/planos') {
              req.url = '/planos/index.html';
            }
            if (req.url === '/obrigado') {
              req.url = '/obrigado/index.html';
            }
            next();
          });
        },
      },
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          pricing: path.resolve(__dirname, 'planos/index.html'),
          trial: path.resolve(__dirname, 'teste-gratuito/index.html'),
          thankyou: path.resolve(__dirname, 'obrigado/index.html'),
        },
      },
    },
    server: {
      port: 3007,
      strictPort: true,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    preview: {
      port: 3007,
      strictPort: true,
    },
  };
});
