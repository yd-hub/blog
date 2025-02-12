import { defineUserConfig } from "vuepress";

import theme from "./theme.js";
export default defineUserConfig({
  base: "/blog/",

  lang: "zh-CN",
  title: "zhao's blog",
  description: "zhao's blog",
  head: [
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Dancing+Script&family=Lora&display=swap' }]
  ],
  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
