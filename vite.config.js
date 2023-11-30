import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  define: {
    global: {},
  },
  server: {
    proxy: {
        // 配置多个代理
        "/api": {
          target: "http://localhost:9291",//这里改成你自己的后端api端口地址，记得每次修改，都需要重新build
          //target: "http://localhost:58427",
          //target: "http://api.douban.com",
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            // 路径重写，
            "^/apb": "" // 替换target中的请求地址
          }
        },
        "/images": {
          target: "http://localhost:9291",
          ws: true,
          changeOrigin: true
        },
        "/is4api": {
          target: "http://localhost:5004",
          ws: true,
          changeOrigin: true
        },
    },
  }
})
