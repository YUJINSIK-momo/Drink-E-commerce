import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  base: "/Drink-E-commerce/",
  plugins: [react(), tailwindcss()],
  // 상위 폴더(백엔드 포트폴리오)의 postcss.config.js(Tailwind v3)가
  // 이 프로젝트(Tailwind v4) CSS에 적용되지 않도록 PostCSS를 격리한다.
  css: { postcss: {} },
})
