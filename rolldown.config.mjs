import { defineConfig } from 'rolldown'
import { reactPlugin, transformPlugin } from 'rolldown/experimental'
import fs from 'fs'

export default defineConfig({
  input:  "./src/index.tsx",
  define: {
    'process.env.NODE_ENV': '"development"',
  },
  moduleTypes: {
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
        load(id) {
          if (id.endsWith('main.css')) {
            this.emitFile({
              type: 'asset',
              fileName: 'main.css',
              source: fs.readFileSync(id),
            })
            // rolldown should emit empty module for app format
            return "console.log('css')"
          }
        },
        generateBundle() {
          this.emitFile({
            type: 'asset',
            fileName: 'index.html',
            source: `<link rel="stylesheet" href="./main.css"><div id="app"></div><script src="./index.js"></script>`,
          })
        },
      },
  ],
  output: {
    format: 'app',
  },
  dev: process.env.mode === "development" ? true : false,
})
