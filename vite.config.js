import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: process.env.NODE_ENV === 'production'
    ? '/personalpractice01/' // 部署到 GitHub Pages 的子路徑
    : '/',
  plugins: [vue()]
})
