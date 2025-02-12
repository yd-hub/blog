import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/posts/": [
    '',
    'first-post'
  ],
  "/note/": [
    '',
    {
      text: "HTML+CSS",
      icon: "fa-brands:html5",
      prefix: "html/",
      link: "html/",
      // collapsible: true,
      children: [
        "SCSS_LESS"
      ],
    },
    {
      text: "JavaScript",
      icon: "fa-brands:js",
      prefix: "JavaScript/",
      // collapsible: true,
      children: "structure",
    },
  ], 
  "/": [
    "",
    "intro",
    {
      text: "前端笔记",
      icon: "book-open",
      link: "note/",
    },
    {
      text: "我的文章",
      icon: "book",
      link: "posts/",
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
   
  ], 
});
