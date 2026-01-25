import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync } from 'fs';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TtaaiiProvider',
      fileName: (format) => `ttaaii-provider.${format}.js`,
      formats: ['es', 'cjs', 'umd']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    },
    sourcemap: true
  },
  plugins: [
    {
      name: 'copy-tables',
      closeBundle() {
        // Copy i18n table files to dist for CDN access
        const distDir = resolve(__dirname, 'dist');
        mkdirSync(distDir, { recursive: true });
        copyFileSync(
          resolve(__dirname, 'src/grammar/data/tables.en.json'),
          resolve(distDir, 'tables.en.json')
        );
        copyFileSync(
          resolve(__dirname, 'src/grammar/data/tables.fr.json'),
          resolve(distDir, 'tables.fr.json')
        );
      }
    }
  ]
});
