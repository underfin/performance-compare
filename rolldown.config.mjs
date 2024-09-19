import { defineConfig } from 'rolldown'
import { reactPlugin, transformPlugin } from 'rolldown/experimental'

export default defineConfig({
  input:  "./src/index.tsx",
  define: {
    'process.env.NODE_ENV': '"development"',
  },
  moduleTypes: {
    ".css": 'text',
    ".svg": 'binary'
  },
  plugins: [
    // transform jsx to js
    transformPlugin({
      reactRefresh: true, // enable react-refresh
    }),
    reactPlugin(), // load `react-refresh-entry.js` and inject react hmr helpers, eg `$RefreshSig$`
    {
        name: 'emit-html',
        generateBundle() {
          this.emitFile({
            type: 'asset',
            fileName: 'index.html',
            source: `<div id="app"></div><script src="./main.js"></script>`,
          })
        },
      },
  ],
  output: {
    format: 'app',
  },
  dev: process.env.mode === "development" ? true : false,
})
