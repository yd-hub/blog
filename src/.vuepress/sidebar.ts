import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/posts/": [
    {
      text: '我的文章', 
      icon: 'book', 
      link: '/posts/',
    },
    {
      text: "问题日志",
      icon: "question",
      prefix: "ProblemLog/",
      // collapsible: true,
      children: [
        "yuqueCORS"
      ],
    },
  ],
  "/note/": [
    {
      text: '前端笔记', 
      icon: 'book-open', 
      link: '/note/',
    },
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
      children: [
        "JavaScripBase",
        "WebAPIs",
        "ES6+"
      ],
    },
  ], 
  "/": [
    "",
    "intro",
    {
      text: "前端笔记",
      icon: "book-open",
      link: "note/",
      prefix: "note/",
    },
    {
      text: "我的文章",
      icon: "book",
      link: "posts/",
      prefix: "posts/",
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
