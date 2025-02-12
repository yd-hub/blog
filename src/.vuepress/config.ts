import { defineUserConfig } from "vuepress";

import theme from "./theme.js";
export default defineUserConfig({
  base: "/blog/",

  lang: "zh-CN",
  title: "zhao's blog",
  description: "zhao's blog",
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],    
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ""}],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Lora:ital,wght@0,400..700;1,400..700&display=swap' }],
  ],

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
