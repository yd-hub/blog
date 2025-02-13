import { defineClientConfig } from "vuepress/client";
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