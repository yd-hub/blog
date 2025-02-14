import { defineClientConfig } from "vuepress/client";
import { defineGiscusConfig } from '@vuepress/plugin-comment/client'
import imageProxy from "./components/imageProxy.vue";
// navbar 透明
import { setupTransparentNavbar } from "vuepress-theme-hope/presets/transparentNavbar.js";
export default defineClientConfig({
  setup: () => {
    // navbar 透明
    // setupTransparentNavbar({ type: "homepage" });
  },
  enhance: ({ app, router, siteData }) => {
    app.component("imageProxy", imageProxy);
  },
});

defineGiscusConfig({
  // Giscus 选项
  repo:"yd-hub/blog", 
  repoId:"R_kgDON4KMyQ", 
  category: "General",
  categoryId:"DIC_kwDON4KMyc4Cm-Hu"
})

