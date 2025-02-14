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
  repo: "https://github.com/your-username/your-repo",
  repoId: "MDEwOlJlcG9zaXRvcnkxMTYyMzQ5NzQ=",
  category: "Announcements",
  categoryId: "DIC_kwDOFEEY",
  mapping: "pathname",
})
