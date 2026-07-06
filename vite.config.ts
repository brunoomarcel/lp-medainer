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
          formulario: path.resolve(__dirname, 'formulario/index.html'),
          obrigado: path.resolve(__dirname, 'obrigado/index.html'),
          planos: path.resolve(__dirname, 'planos/index.html'),
          proximo_passo: path.resolve(__dirname, 'proximo-passo/index.html'),
          old_lp: path.resolve(__dirname, 'old-lp/index.html'),
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
