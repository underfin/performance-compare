import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 6532
  },
  output: {
     sourceMap: {
      js: false,
      css: false
     }
  }
});
