import { defineUserConfig } from "vuepress";

import theme from "./theme.js";
export default defineUserConfig({
  base: "/blog/",

  lang: "zh-CN",
  title: "zhao's blog",
  description: "zhao's blog",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
