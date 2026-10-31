import { defineConfig } from 'vite'
export default defineConfig({
  esbuild: { jsx: 'transform', jsxFactory: 'React.createElement', jsxFragment: 'React.Fragment', jsxInject: `import React from 'react'` },
  build: {
    outDir: 'build', emptyOutDir: true, copyPublicDir: false, cssCodeSplit: false, minify: true,
    lib: { entry: 'src/main.tsx', formats: ['iife'], name: 'MindTheGap', fileName: () => 'app.js' },
    rollupOptions: { external: ['react', 'react-dom', 'react-dom/client'], output: { globals: { react: 'React', 'react-dom': 'ReactDOM', 'react-dom/client': 'ReactDOM' }, assetFileNames: 'app.[ext]' } },
  },
})
