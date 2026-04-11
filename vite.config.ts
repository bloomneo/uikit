import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore - Tailwind CSS Vite plugin types
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { glob } from 'glob';

// Get all component files for individual exports
const getComponentEntries = () => {
  const entries: Record<string, string> = {};
  
  // UI Components
  const uiComponents = glob.sync('src/components/ui/*.tsx');
  uiComponents.forEach(file => {
    const name = file.replace('src/components/ui/', '').replace('.tsx', '');
    entries[name] = resolve(__dirname, file);
  });
  
  // Layout Components
  const layoutComponents = glob.sync('src/components/layouts/*.tsx');
  layoutComponents.forEach(file => {
    const name = file.replace('src/components/layouts/', '').replace('.tsx', '');
    entries[name] = resolve(__dirname, file);
  });
  
  // Section Components
  const sectionComponents = glob.sync('src/components/sections/*.tsx');
  sectionComponents.forEach(file => {
    const name = file.replace('src/components/sections/', '').replace('.tsx', '');
    entries[name] = resolve(__dirname, file);
  });
  
  // Themes
  entries['theme-provider'] = resolve(__dirname, 'src/themes/theme-provider.tsx');
  entries['themes'] = resolve(__dirname, 'src/themes/index.ts');

  // Hooks
  entries['hooks'] = resolve(__dirname, 'src/hooks/index.ts');

  // Utils and Lib
  entries['utils'] = resolve(__dirname, 'src/lib/utils.ts');
  entries['platform'] = resolve(__dirname, 'src/lib/platform.ts');
  entries['wrapper'] = resolve(__dirname, 'src/components/layouts/layout-wrapper.tsx');
  entries['format'] = resolve(__dirname, 'src/lib/format.ts');
  entries['fouc'] = resolve(__dirname, 'src/lib/fouc.ts');
  entries['errors'] = resolve(__dirname, 'src/lib/errors.ts');

  return entries;
};

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@voilajsx/uikit': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        ...getComponentEntries(),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        // Vite emits the bundled CSS as `style.css` by default. Rename it to
        // `styles.css` so it matches the `./styles` export in package.json.
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'styles.css';
          return assetInfo.name || 'assets/[name].[ext]';
        },
      },
    },
    // Keep cssCodeSplit false to bundle all CSS into one file
    cssCodeSplit: false,
    sourcemap: true,
    // Ensure CSS is extracted
    cssTarget: 'esnext',
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
  // Exclude examples from build and development
  root: '.',
  publicDir: 'public',
  // Explicitly exclude examples folder
  server: {
    fs: {
      allow: [
        // Allow serving files from the project root
        '.',
        // Explicitly deny examples folder
        '!examples',
      ],
    },
  },
  // Only include src files in the build
  define: {
    // Exclude examples from any build process
    __EXCLUDE_EXAMPLES__: true,
  },
});