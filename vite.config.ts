/**
 * Vite 构建配置。
 * 使用相对路径，保证 dist/index.html 可直接部署到 GitHub Pages。
 */

import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
});
