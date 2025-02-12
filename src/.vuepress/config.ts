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
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap' }],  // Lora
    ["link",{ href: "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;700&display=swap",rel: "stylesheet" }], // 思源宋体
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css' }],  // 楷体

    
  ],
  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
