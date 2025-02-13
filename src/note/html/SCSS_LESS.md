---
icon: fa-brands:css3-alt
date: 2025-02-12
category:
  - HTML
  - 前端笔记
tag:
  - LESS
  - SCSS
  - CSS

---

# SCSS/LESS
此笔记基于ChatGPT，在其基础上进行了整理，并添加了一些自己的理解。

## SCSS
<font style="color:rgb(13, 13, 13);">（Sassy CSS）是一种扩展了 CSS 的样式表语言，使得 CSS 更加强大和简洁。它允许使用变量、嵌套规则、混合（mixins）、继承和其他功能，这些特性使得编写和维护样式变得更加容易。下面是一些 SCSS 的基本语法和用法示例。</font>

### <font style="color:rgb(13, 13, 13);">变量 $</font>
<font style="color:rgb(13, 13, 13);">变量使你可以存储样式值并在多个地方重复使用。</font>

```sass
$primary-color: #3498db;
$padding: 16px;

.button {
  background-color: $primary-color;
  padding: $padding;
}
```

### 选择器符号
#### 父选择器引用 & 
```sass
.box {
  // ...
  &:first-child {
   // ...
  }
}
```

以上代码标记部分会被编译成：

```sass
.box:first-child {
  // ...
}
```

#### 所有子代 >
以下代码为选中所有 .box 的div子元素。

```sass
.box {
  // ...
  > div {
   // ...
  }
}
```

### <font style="color:rgb(13, 13, 13);">嵌套规则</font>
<font style="color:rgb(13, 13, 13);">嵌套规则使你的 CSS 代码更具结构性和层次性。</font>

```sass
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: inline-block;

      a {
        text-decoration: none;
        color: $primary-color;
      }
    }
  }
}
```

### <font style="color:rgb(13, 13, 13);">混合（Mixins）</font>
<font style="color:rgb(13, 13, 13);">混合允许你定义样式块并在不同的地方重复使用。</font>

```sass
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  border-radius: $radius;
}

.box { 
  @include border-radius(10px);
}
```

### <font style="color:rgb(13, 13, 13);">继承  @extend</font>
<font style="color:rgb(13, 13, 13);">继承使一个选择器可以继承另一个选择器的样式。</font>

```sass
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  @extend .message;
  border-color: green;
}

.error {
  @extend .message;
  border-color: red;
}
```

### <font style="color:rgb(13, 13, 13);">运算</font>
<font style="color:rgb(13, 13, 13);">SCSS 允许在样式表中进行运算。</font>

> <font style="color:rgb(13, 13, 13);">calc() 是 CSS 中用于动态计算属性值的函数，它允许你在样式表中进行基本的数学运算。</font>
>
> <font style="color:rgb(13, 13, 13);">calc() 支持加法（+）、减法（-）、乘法（*）和除法（/），并且可以混合使用不同的单位，比如百分比（%）、像素（px）、em、rem 等</font>
>

```sass
.container {
  width: 100%;
  padding: $padding / 2;
  margin: $padding / 2;
}

.content {
  width: calc(100% - #{$padding * 2});
}
```

### <font style="color:rgb(13, 13, 13);">插值 #{ }</font>
<font style="color:rgb(13, 13, 13);">插值允许你动态生成样式名或属性。</font>

```sass
$side: left;

.box {
  margin-#{$side}: 10px;
}
```

### <font style="color:rgb(13, 13, 13);">条件和循环</font>
<font style="color:rgb(13, 13, 13);">SCSS 支持条件语句和循环语句，让样式更具逻辑性。</font>

```sass
@mixin theme-colors($theme) {
  @if $theme == 'dark' {
    background-color: #333;
    color: #fff;
  } @else if $theme == 'light' {
    background-color: #fff;
    color: #333;
  }
}

.theme {
  @include theme-colors('dark');
}

@for $i from 1 through 3 {
  .column-#{$i} {
    width: 100% / $i;
  }
}
```

### 用 Sass 变量控制主题
#### 定义主题变量及样式
首先，你需要定义一些 Sass 变量，这些变量将决定不同的样式属性。你可以根据不同的主题定义一组变量。

```sass
// 主题1：浅色主题
$background-color-light: #ffffff;
$text-color-light: #333333;
$primary-color-light: #007bff;

// 主题2：深色主题
$background-color-dark: #333333;
$text-color-dark: #ffffff;
$primary-color-dark: #ff6600;

// 默认使用浅色主题
$background-color: $background-color-light;
$text-color: $text-color-light;
$primary-color: $primary-color-light;
// 样式
body {
  background-color: $background-color;
  color: $text-color;
}

a {
  color: $primary-color;
}
```

#### 类名区分主题
有两种方式

```sass
.light-theme {
  $background-color: $background-color-light;
  $text-color: $text-color-light;
  $primary-color: $primary-color-light;

  body {
    background-color: $background-color;
    color: $text-color;
  }

  a {
    color: $primary-color;
  }
}

.dark-theme {
  $background-color: $background-color-dark;
  $text-color: $text-color-dark;
  $primary-color: $primary-color-dark;

  body {
    background-color: $background-color;
    color: $text-color;
  }

  a {
    color: $primary-color;
  }
}

```

```sass
// 定义 @mixin
@mixin theme($background-color, $text-color, $primary-color) {
  body {
    background-color: $background-color;
    color: $text-color;
  }
  a {
    color: $primary-color;
  }
}

// 应用浅色主题
.light-theme {
  // 使用mixin
  @include theme($background-color-light, $text-color-light, $primary-color-light);
}

// 应用深色主题
.dark-theme {
  // 使用mixin
  @include theme($background-color-dark, $text-color-dark, $primary-color-dark);
}
```

####  JavaScript 动态切换主题
```html
<!-- 默认浅色主题 -->
<div class="light-theme">
  <p>Hello, this is the light theme.</p>
</div>
```

```javascript
// 切换为深色主题
document.body.classList.add('dark-theme');
document.body.classList.remove('light-theme');

// 切换为浅色主题
document.body.classList.add('light-theme');
document.body.classList.remove('dark-theme');
```

## <font style="color:rgb(13, 13, 13);">LESS</font>
<font style="color:rgb(13, 13, 13);">LESS（Leaner CSS）是一种动态样式语言，类似于 SCSS，它扩展了 CSS，增加了变量、嵌套、混合（mixins）、函数和运算等功能，使得编写和维护 CSS 更加简单和高效。下面是一些 LESS 的基本语法和用法示例。</font>

### <font style="color:rgb(13, 13, 13);">变量</font>
<font style="color:rgb(13, 13, 13);">LESS 中的变量用 </font>**@**<font style="color:rgb(13, 13, 13);"> 符号定义，便于在多个地方重复使用相同的值。</font>

```less
@primary-color: #3498db;
@padding: 16px;

.button {
  background-color: @primary-color;
  padding: @padding;
}
```

### <font style="color:rgb(13, 13, 13);">嵌套规则</font>
<font style="color:rgb(13, 13, 13);">LESS 允许嵌套规则，使 CSS 代码结构更加清晰。</font>

```less
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: inline-block;

      a {
        text-decoration: none;
        color: @primary-color;
      }
    }
  }
}
```

### <font style="color:rgb(13, 13, 13);">混合（Mixins）</font>
<font style="color:rgb(13, 13, 13);">混合是定义一组样式，可以在其他选择器中复用这些样式。</font>

```less
.border-radius(@radius) {
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
  border-radius: @radius;
}

.box {
  .border-radius(10px);
}
```

### <font style="color:rgb(13, 13, 13);">继承（Extend）</font>
<font style="color:rgb(13, 13, 13);">LESS 允许一个选择器继承另一个选择器的样式。</font>

```less
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  &:extend(.message);
  border-color: green;
}

.error {
  &:extend(.message);
  border-color: red;
}
```

### <font style="color:rgb(13, 13, 13);">运算</font>
<font style="color:rgb(13, 13, 13);">LESS 支持在样式中进行数学运算。</font>

```less
@padding: 20px;

.container {
  width: 100%;
  padding: @padding / 2;
  margin: @padding / 2;
}

.content {
  width: calc(100% - (@padding * 2));
}
```

### <font style="color:rgb(13, 13, 13);">函数</font>
<font style="color:rgb(13, 13, 13);">LESS 提供内置函数，也可以自定义函数来处理复杂的逻辑。</font>

```less
.lighten(@color, @percentage) {
  @new-color: lighten(@color, @percentage);
  color: @new-color;
}

.button {
  .lighten(@primary-color, 20%);
  }
```

### <font style="color:rgb(13, 13, 13);">条件语句和循环</font>
<font style="color:rgb(13, 13, 13);">LESS 支持条件语句和循环，使样式逻辑更强大。</font>

```less
.theme-color(@theme) when (@theme = 'dark') {
  background-color: #333;
  color: #fff;
}
.theme-color(@theme) when (@theme = 'light') {
  background-color: #fff;
  color: #333;
}

.theme-dark {
  .theme-color('dark');
}

.theme-light {
  .theme-color('light');
}

@i: 1;
.loop (@i) when (@i <= 3) {
  .column-@{i} {
  width: (100% / @i);
}
.loop(@i + 1);
}
.loop(@i);
```

### <font style="color:rgb(13, 13, 13);">LESS 编译</font>
<font style="color:rgb(13, 13, 13);">使用 LESS 时，需要通过编译器将 LESS 文件编译成标准的 CSS 文件。常见的 LESS 编译器有命令行工具 </font>lessc<font style="color:rgb(13, 13, 13);">，以及许多构建工具（如 Grunt、Gulp）和 IDE 插件都支持 LESS 编译。</font>

