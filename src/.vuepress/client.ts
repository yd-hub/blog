import { defineClientConfig } from "vuepress/client";
// navbar 透明
import { setupTransparentNavbar } from "vuepress-theme-hope/presets/transparentNavbar.js";
export default defineClientConfig({
  setup: () => {
    // setupTransparentNavbar({ type: "homepage" });
  },
});