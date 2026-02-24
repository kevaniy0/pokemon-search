import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import removeAttr from 'react-remove-attr';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const plugins = [react(), tailwindcss(), svgr(), tsconfigPaths()];
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
    },
    server: {
      open: true,
    },
  };
});
