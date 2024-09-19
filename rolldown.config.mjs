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
    // // transform jsx to js
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
            source: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./main.css">
  </head>
  <body>
    <div id="root"></div>
    <script src="./index.js"></script>
  </body>
</html>`,
          })
        },
      },
  ],
  output: {
    format: 'app',
  },
  dev: process.env.mode === "development" ? true : false,
})
