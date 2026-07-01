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
        name: 'static-route-rewrite',
        configureServer(server) {
          server.middlewares.use((req, _res, next) => {
            const url = req.url || '';

            if (url === '/planos' || url.startsWith('/planos?')) {
              req.url = url.replace('/planos', '/planos/index.html');
            }
            if (url === '/obrigado' || url.startsWith('/obrigado?')) {
              req.url = url.replace('/obrigado', '/obrigado/index.html');
            }
            if (url === '/formulario' || url.startsWith('/formulario?')) {
              req.url = url.replace('/formulario', '/formulario/index.html');
            }
            if (url === '/lp-figma-preview' || url.startsWith('/lp-figma-preview?')) {
              req.url = url.replace('/lp-figma-preview', '/lp-figma-preview/index.html');
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
          thankyou: path.resolve(__dirname, 'obrigado/index.html'),
          form: path.resolve(__dirname, 'formulario/index.html'),
          figmaPreview: path.resolve(__dirname, 'lp-figma-preview/index.html'),
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
