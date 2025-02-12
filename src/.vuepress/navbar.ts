import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  
  {
    text: "网站导航",
    icon: "map",
    link: "/intro",
  },
  {
    text: "我的文章",
    icon: "book",
    prefix: "/posts/",
      children: [
          {
            text: "我的文章",
            icon: "book",
            link: "/posts/"
          },
          {
            text: "第一篇文章",
            icon: "pen-to-square",
            link: "/posts/first-post"
          },
      ],
  },
  {
    text: "前端笔记",
    icon: "book-open",
    prefix: "/note/",
    children: [
      {
        text: "前端笔记",
        icon: "book-open",
        link: "/note/"
      },
      {
        text: "前端基础",
        icon: "pen-to-square",
        children: [
          { text: "HTML+CSS", icon: "fa-brands:html5", link: "html/" },
          { text: "JavaScript", icon: "fa-brands:js", link: "JavaScript/WebAPIs" },
        ],
      },
    ],
  },
  // {
  //   text: "时间轴",
  //   icon: "clock",
  //   link: "/timeline/",
  // },
  // {
  //   text: "分类",
  //   icon: "grip",
  //   link: "/category/",
  // },
  // {
  //   text: "标签",
  //   icon: "tags",
  //   link: "/tag/",
  // },
]);
