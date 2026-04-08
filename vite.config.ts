import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import { fileURLToPath } from 'url';
import removeAttr from 'react-remove-attr';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const plugins = [react(), tailwindcss(), svgr()];
  if (isProduction) {
    plugins.unshift(
      removeAttr({
        extensions: ['tsx'],
        attributes: ['data-testid'],
      })
    );
  }
  return {
    plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        assets: path.resolve(__dirname, './src/assets'),
        components: path.resolve(__dirname, './src/components'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    server: {
      open: true,
    },
  };
});
