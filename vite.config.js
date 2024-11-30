import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      // vueDevTools(),
  ],
  base: 'admin',
  server:{
    host: '0.0.0.0',
  },
  css:{
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"],
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 确保别名'@'指向src目录
    },
  }
})
