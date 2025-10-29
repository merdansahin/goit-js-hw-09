import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    
    base: '/goit-js-hw-09/',
    
    
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },

  
    root: 'src',

    build: {
      sourcemap: false,
      outDir: '../dist', 
      emptyOutDir: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'), 
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          assetFileNames: 'assets/[name]-[hash][extname]',
          entryFileNames: '[name].js',
        },
      },
    },

    
    plugins: [
      injectHTML(),
      FullReload(['./src/**/*.html']),
    ],

    css: {
      postcss: {
        plugins: [
          SortCss({ sort: 'mobile-first' }),
        ],
      },
    },

    //
    server: {
      open: true,
      port: 5173,
    },
  };
});
