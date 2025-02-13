---
icon: fa-brands:html5
date: 2025-02-12
category:
  - HTML+CSS
  - 前端笔记
tag:
  - HTML
  - CSS

---

# HTML+CSS
复习所记，并不全面，详细笔记见下方尚硅谷笔记。

>::: details 尚硅谷-HTML4笔记
><PDF url="//yd-hub.github.io/docs/尚硅谷-HTML4笔记.pdf" />
>::: 
>::: details 尚硅谷-HTML5笔记
><PDF url="//yd-hub.github.io/docs/尚硅谷-HTML5笔记.pdf" />
>::: 
>::: details 尚硅谷-CSS2笔记
><PDF url="//yd-hub.github.io/docs/尚硅谷-CSS2笔记.pdf" />
>::: 
>::: details 尚硅谷-CSS3笔记
><PDF url="//yd-hub.github.io/docs/尚硅谷-CSS3笔记.pdf" />
>::: 
## html4
h1~h6 不能互相嵌套。

p 中不要写块级元素    

a 通过 a 标签，可以唤起设备应用程序。

```html
<!-- 唤起设备拨号 -->
<a href="tel:10010">电话联系</a>
<!-- 唤起设备发送邮件 -->
<a href="mailto:10010@qq.com">邮件联系</a>
<!-- 唤起设备发送短信 -->
<a href="sms:10086">短信联系</a>
```

pre	按原文显示（一般用于在页面中嵌入大段代码），空格会原样显示

## css2
### CSS复合选择器
#### 交集选择器
```css
/* 选中：类名为beauty的p元素，为此种写法用的非常多！！！！ */
p.beauty {
  color: blue;
}
/* 选中：类名包含rich和beauty的元素 */
.rich.beauty {
  color: green;
}
```

#### 并集选择器  
```css
/* 选中id为peiqi，或类名为rich，或类名为beauty的元素 */
#peiqi,
.rich,
.beauty {
  font-size: 40px;
  background-color: skyblue;
  width: 200px;
}
```

#### 后代选择器  
```css
/* 选中ul中的所有li */
ul li {
  color: red;
}
/* 选中ul中所有li中的a */
ul li a {
  color: orange;
}
/* 选中类名为subject元素中的所有li */
.subject li {
  color: blue;
}
/* 选中类名为subject元素中的所有类名为front-end的li */
.subject li.front-end {
  color: blue;
}
```

#### 子代选择器
 作用：选中指定元素中，符合要求的子元素（儿子元素）。（先写父，再写子）  

```css
/* div中的子代a元素 */
div>a {
  color: red;
}
/* 类名为persons的元素中的子代a元素 */
.persons>a{
  color: red;
}

```

<imageProxy src="https://cdn.nlark.com/yuque/0/2024/png/36126128/1711453917991-394e7290-1238-453e-8a10-e9d48874852d.png"/>
#### 兄弟选择器  
##### 相邻兄弟选择器  
```css
/* 选中div后相邻的兄弟p元素 */
div+p {
  color:red;
}
```

##### 通用兄弟选择器 
```css
/* 选中div后的所有的兄弟p元素 */
div~p {
  color:red;
}
```

#### 属性选择器  
1. [属性名] 选中具有某个属性的元素。
2. [属性名="值"] 选中包含某个属性，且属性值等于指定值的元素。
3. [属性名^="值"] 选中包含某个属性，且属性值以指定的值开头的元素。
4. [属性名$="值"] 选中包含某个属性，且属性值以指定的值结尾的元素。
5. [属性名*=“值”] 选择包含某个属性，属性值包含指定值的元素。

```css
/* 选中具有title属性的元素 */
div[title]{color:red;}
/* 选中title属性值为atguigu的元素 */
div[title="atguigu"]{color:red;}
/* 选中title属性值以a开头的元素 */
div[title^="a"]{color:red;}
/* 选中title属性值以u结尾的元素 */
div[title$="u"]{color:red;}
/* 选中title属性值包含g的元素 */
div[title*="g"]{color:red;}
```

### 伪类选择器
#### 动态伪类
a:link      链接访问前的样式（只有a标签可用）

a:visted    链接访问后的样式（只有a标签可用）

a:hover     鼠标悬浮样式

a:active    鼠标按下样式

以上四个伪类选择器要按lvha顺序写，不然会导致不生效。

input:focus 一般表单元素使用，获取焦点后的样式

#### 结构伪类
常用

1.*  :first-child 所有兄弟元素中的第一个。

  *   :last-child 所有兄弟元素中的最后一个。

2.*  :nth-child(n) 所有兄弟元素中的第 n 个。

      :nth-last-child(n) 所有兄弟元素中的倒数第 n 个。

      :nth-last-of-type(n) 所有同类型兄弟元素中的 倒数第n个 

    （n可用公式an+b）

3.* :first-of-type 所有同类型兄弟元素中的第一个。

   * :last-of-type 所有同类型兄弟元素中的最后一个。

   * :nth-of-type(n) 所有同类型兄弟元素中的 第n个 。

5.  :only-child 选择没有兄弟的元素（独生子女）。

    :only-of-type 选择没有同类型兄弟的元素。

6.  :root 根元素。

7.  :empty 内容为空元素（空格也算内容）。

#### 否定伪类
    :not(选择器) 排除满足括号中条件的元素。

#### UI伪类
    :checked 被选中的复选框或单选按钮。（单选/复选框样式不能更改）

    :enable 可用的表单元素（没有 disabled 属性）。

    :disabled 不可用的表单元素（有 disabled 属性）。

#### 目标伪类（了解）
    :target 选中锚点指向的元素。

#### 语言伪类（了解）
:lang() 根据指定的语言选择元素（本质是看 lang 属性的值）。

en 英文

zh-CN 简体中文

### 伪元素选择器
    作用：选中元素中的一些特殊位置。

#### 常用伪元素：
            ::first-letter 选中元素中的第一个文字。

            ::first-line 选中元素中的第一行文字。

            ::selection 选中被鼠标选中的内容。

            ::placeholder 选中输入框的提示文字。

            ::before 在元素最开始的位置，创建一个子元素（必须用 content 属性指定内容）。

            ::after 在元素最后的位置，创建一个子元素（必须用 content 属性指定内容）。

#### 选择器的优先级（权重）
            行内样式 > ID选择器 > 类选择器 > 元素选择器 > 通配选择器。

            1. 行内样式权重大于所有选择器。

            2. !important 的权重，大于行内样式，大于所有选择器，权重最高！

### 字体
#### 字体族 font-family
```html
    div {
        font-family: "STCaiyun","Microsoft YaHei",sans-serif;
    }
```

            1. 使用字体的英文名字兼容性会更好，具体的英文名可以自行查询， 或在电脑的设置里去寻找。

            2. 如果字体名包含空格，必须使用引号包裹起来。

            3. 可以设置多个字体，按照从左到右的顺序逐个查找，找到就用，没有找到就使用后面

            的，且通常在最后写上 serif （衬线字体）或 sans-serif （非衬线字体）。

            4. windows 系统中，默认的字体就是微软雅黑。

#### 字体风格 font-style
            1. normal ：正常（默认值）

            2. italic ：斜体（使用字体自带的斜体效果）

            3. oblique ：斜体（强制倾斜产生的斜体效果）



### table属性
```css
/* 控制表格的列宽 */
table-layout: fixed;
/* 控制单元格间距（生效的前提是：不能合并边框） */
border-spacing: 10px;
/* 合并相邻的单元格的边框 */
border-collapse: collapse;
/* 隐藏没有内容的单元格（生效的前提是：不能合并边框） */
empty-cells: hide;
/* 设置表格标题的位置 */
caption-side: top;
```

###  隐藏元素
        display:none;   隐藏不占位

        visibility: hidden;     隐藏占位

### 布局问题解决方法
#### margin塌陷问题解决方法
        方案一： 给父元素设置不为 0 的 padding 。

        方案二： 给父元素设置宽度不为 0 的 border 。

        方案三：给父元素设置 css 样式 overflow:hidden

####  行内元素间距问题解决方法
        给父元素设置 font-size:0 ，再给需要显示文字的元素，单独设置字体大小。

#### 行内块幽灵空白问题解决方法
        方案一： 给行行内块设置 vertical ，值不为 baseline 即可，设置为 middel 、 bottom 、top 均可。

        方案二： 若父元素中只有一张图片，设置图片为 display:block 。

        方案三： 给父元素设置 font-size: 0 。如果该行内块内部还有文本，则需单独设置 font-size 。

#### 解决浮动产生的影响（清除浮动）
        解决方案：

        方案一： 给父元素指定高度。

        方案二： 给父元素也设置浮动，带来其他影响。

        方案三： 给父元素设置 overflow:hidden 。

        方案四： 在所有浮动元素的最后面，添加一个块级元素，并给该块级元素设置 clear:both 。

        方案五： 给浮动元素的父元素，设置伪元素，通过伪元素清除浮动，原理与方案四相同。===> 推荐使用

        **布局中的一个原则：设置浮动的时候，兄弟元素要么全都浮动，要么全都不浮动**

#### 让定位元素的宽充满包含块
        1. 块宽想与包含块一致，可以给定位元素同时设置 left 和 right 为 0 。

        2. 高度想与包含块一致， top 和 bottom 设置为 0 。

#### 让定位元素在包含块中居中
        方案一：

```css
left:0;
right:0;
top:0;
bottom:0;
margin:auto
```

        方案二：

```css
left: 50%;
top: 50%;
margin-left: //负的宽度一半;
margin-top: //负的高度一半;
```

        注意：该定位的元素必须设置宽高！！！



## 布局
    版心的宽度一般是 960 ~ 1200 像素之间。

### 常用类名
        顶部导航条          topbar

        页头                header 、 page-header

        导航                nav 、 navigator 、 navbar

        搜索框              search 、 search-box

        横幅、广告、宣传图   banner

        主要内容            content 、 main

        侧边栏              aside 、 sidebar

        页脚                footer 、 page-foote



个人补充

        内容                item、inner

        版心                container

## html5
###  新增布局标签
        header 整个页面，或部分区域的头部

        footer 整个页面，或部分区域的底部

        nav 导航

        article 文章、帖子、杂志、新闻、博客、评论等。

        section 页面中的某段文字，或文章中的某段文字（里面文字通常里面会包含

        标题）。

        aside 侧边栏

#### 新增状态标签
        meter 标签      定义已知范围内的标量测量

            high 数值 规定高值

            low 数值 规定低值

            max 数值 规定最大值

            min 数值 规定最小值

            optimum 数值 规定最优值

            value 数值 规定当前值

        progress 标签   进度条

            max 数值 规定目标值。

            value 数值 规定当前值。

#### 新增列表标签
        datalist 用于搜索框的关键字提示

        details 用于展示问题和答案，或对专有名词进行解释

        	summary 写在 details 的里面，用于指定问题或专有名词

```html
<input type="text" list="mydata">
<datalist id="mydata">
  <option value="周冬雨">周冬雨</option>
  <option value="周杰伦">周杰伦</option>
  <option value="温兆伦">温兆伦</option>
  <option value="马冬梅">马冬梅</option>
</datalist>
```

```html
<details>
  <summary>如何走上人生巅峰？</summary>
  <p>一步一步走呗</p>
</details>
```



#### 新增文本标签
##### 文本注音
            ruby 包裹需要注音的文字 双

            rt 写注音， rt 标签写在 ruby 的里面 双

```html
<ruby>
  <span>魑魅魍魉</span>
  <rt>chī mèi wǎng liǎng </rt>
</ruby>
```

##### 文本标记
            mark	W3C 建议 mark 用于标记搜索结果中的关键字

####  表单控件新增属性
        placeholder     提示文字（注意：不是默认值， value 是默认值），适用于文字输入类的表

        单控件。

        required        表示该输入项必填， 适用于除按钮外其他表单控件。

        autofocus       自动获取焦点，适用于所有表单控件。

        autocomplete    自动完成，可以设置为 on 或 off ，适用于文字输入类的表单控件。

            注意：密码输入框、多行输入框不可用。

        pattern         填写正则表达式，适用于文本输入类表单控件。

            注意：多行输入不可用，且空的输入框不会验证，往往与 required 配合。

##### input 新增属性值
        email 邮箱类型的输入框，表单提交时会验证格式，输入为空则不验证格式。

        url url 类型的输入框，表单提交时会验证格式，输入为空则不验证格式。

        number 数字类型的输入框，表单提交时会验证格式，输入为空则不验证格式。

        search 搜索类型的输入框，表单提交时不会验证格式。

        tel

        电话类型的输入框，表单提交时不会验证格式，在移动端使用时，会唤起数

        字键盘。

        range 范围选择框，默认值为 50 ，表单提交时不会验证格式。

        color 颜色选择框，默认值为黑色，表单提交时不会验证格式。

        date 日期选择框，默认值为空，表单提交时不会验证格式。

        month 月份选择框，默认值为空，表单提交时不会验证格式。

        week 周选择框，默认值为空，表单提交时不会验证格式。

        time 时间选择框，默认值为空，表单提交时不会验证格式。

        datetime-local 日期+时间选择框，默认值为空，表单提交时不会验证格式。

    

##### form 标签新增属性
        novalidate 如果给 form 标签设置了该属性，表单提交的时候不再进行验证。

#### 新增媒体标签
##### 
##### 视频标签video
###### 媒体参与度
 注意：自动播放必须配合静音属性使用，静音状态才能自动播放。

> 查看媒体参与度
>
> Chrome://media-engagement/
>
> edge://media-engagement/
>

            src URL地址 视频地址

            width 像素值 设置视频播放器的宽度

            height 像素值 设置视频播放器的高度

            controls - 向用户显示视频控件（比如播放/暂停按钮）

            muted - 视频静音

            autoplay - 视频自动播放

            loop - 循环播放

            poster URL地址 视频封面

            preload auto / metadata / none

                视频预加载，如果使用 autoplay ，则忽略该属性。

                none : 不预加载视频。

                metadata : 仅预先获取视频的元数据（例如长

                度）。

                auto : 可以下载整个视频文件，即使用户不希

                望使用它。



##### 音频标签audio
            src URL地址 音频地址

            controls - 向用户显示音频控件（比如播放/暂停按钮）

            autoplay - 音频自动播放

            muted - 音频静音

            loop - 循环播放

            preload 预加载



###  html5新增全局属性
            draggable：开启元素拖动

                true ：可拖动

                false ：不可拖动   

            ondragend：元素拖动结束后触发函数

                ondragend="go()" 



        contenteditable：元素是否可被编辑

            true ：可编辑

            false ：不可编辑



        hidden 隐藏元素

        spellcheck 规定是否对元素进行拼写和语法检查，可选值如下：

            true ：检查

            false ：不检查

        contextmenu 规定元素的上下文菜单，在用户鼠标右键点击元素时显示。



        data-* 用于存储页面的私有定制数据。

###   html5兼容性处理
        一、添加元信息，让浏览器处于最优渲染模式。

            <!--设置IE总是使用最新的文档模式进行渲染-->

            <meta http-equiv="X-UA-Compatible" content="IE=Edge">

            <!--优先使用 webkit ( Chromium ) 内核进行渲染, 



        二、使用 html5shiv 让低版本浏览器认识 H5 的语义化标签。

            <!--[if lt ie 9]>

            <script src="../sources/js/html5shiv.js"></script>

            <![endif]-->

            扩展

                lt 小于

                lte 小于等于

                gt 大于

                gte 大于等于

                ! 逻辑非

            示例

            <!--[if IE 8]>仅IE8可见<![endif]-->

            <!--[if gt IE 8]>仅IE8以上可见<![endif]—>

            <!--[if lt IE 8]>仅IE8以下可见<![endif]—>

            <!--[if gte IE 8]>IE8及以上可见<![endif]—>

            <!--[if lte IE 8]>IE8及以下可见<![endif]—>

            <!--[if !IE 8]>非IE8的IE可见<![endif]-->



## css3
### 私有前缀
```css
div {
  width:400px;
  height:400px;
  -webkit-border-radius: 20px;
}
```



        W3C 标准所提出的某个 CSS 特性，在被浏览器正式支持之前，浏览器厂商会根据浏览器的内核，

        使用私有前缀来测试该 CSS 特性，在浏览器正式支持该 CSS 特性后，就不需要私有前缀了。

        查询 CSS3 兼容性的网站：[https://caniuse.com/](https://caniuse.com/)

        

        常见浏览器私有前缀

            Chrome 浏览器： -webkit

            Safari 浏览器： -webkit

            Firefox 浏览器： -moz

            Edge 浏览器： -webkit

            旧 Opera 浏览器： -o

            旧 IE 浏览器： 



        正常属性写最后，例：

            -webkit-border-radius: 20px;

            -moz-border-radius: 20px;

            -ms-border-radius: 20px;

            -o-border-radius: 20px;

            border-radius: 20px;

        

        自动兼容工具：webpack

###     CSS3 新增长度单位
        1. rem 根元素字体大小的倍数，只与根元素字体大小有关。

        2. vw 视口宽度的百分之多少 10vw 就是视口宽度的 10% 。

        3. vh 视口高度的百分之多少 10vh 就是视口高度的 10% 。

        4. vmax 视口宽高中大的那个的百分之多少。（了解即可）

        5. vmin 视口宽高中小的那个的百分之多少。（了解即可）



###     盒模型相关属性
####  box-sizing 怪异盒模型
            content-box width 和 height 设置的是盒子内容区的大小。（默认值）

            border-box width 和 height 设置的是盒子总大小。（怪异盒模型）

        

####    box-shadow 盒子阴影
            默认值： box-shadow:none 表示没有阴影

            box-shadow: h-shadow v-shadow blur spread color inset;

            h-shadow 水平阴影的位置，必须填写，可以为负值

            v-shadow 垂直阴影的位置，必须填写，可以为负值

            blur 可选，模糊距离

            spread 可选，阴影的外延值

            color 可选，阴影的颜色

            inset 可选，将外部阴影改为内部阴影

```css
/* 写两个值，含义：水平位置、垂直位置 */
box-shadow: 10px 10px;
/* 写三个值，含义：水平位置、垂直位置、颜色 */
box-shadow: 10px 10px red;
/* 写三个值，含义：水平位置、垂直位置、模糊值 */
box-shadow: 10px 10px 10px;
/* 写四个值，含义：水平位置、垂直位置、模糊值、颜色 */
box-shadow: 10px 10px 10px red;
/* 写五个值，含义：水平位置、垂直位置、模糊值、外延值、颜色 */
box-shadow: 10px 10px 10px 10px blue;
/* 写六个值，含义：水平位置、垂直位置、模糊值、外延值、颜色、内阴影 */
box-shadow: 10px 10px 20px 3px blue inset;
```

#### opacity 不透明度
### 背景相关属性
#### background-origin 设置背景图的原点
            1. padding-box ：从 padding 区域开始显示背景图像。—— 默认值

            2. border-box ： 从 border 区域开始显示背景图像。

            3. content-box ： 从 content 区域开始显示背景图像。



#### background-clip 设置背景图的向外裁剪的区域。
            1. border-box ： 从 border 区域开始向外裁剪背景。 —— 默认值

            2. padding-box ： 从 padding 区域开始向外裁剪背景。

            3. content-box ： 从 content 区域开始向外裁剪背景。

            4. text ：背景图只呈现在文字上。

            注意：若值为 text ，那么 backgroun-clip 要加上 -webkit- 前缀。

        

#### background-size 设置背景图的尺寸。
            1. 用长度值指定背景图片大小，不允许负值。

            2. 用百分比指定背景图片大小，不允许负值。

            3. auto ： 背景图片的真实大小。 —— 默认值

            4. contain ： 将背景图片等比缩放，使背景图片的宽或高，与容器的宽或高相等，再将完整

            背景图片包含在容器内，但要注意：可能会造成容器里部分区域没有背景图片。

                background-size: contain;

            5. cover ：将背景图片等比缩放，直到完全覆盖容器，图片会尽可能全的显示在元素上，但要

            注意：背景图片有可能显示不完整。—— 相对比较好的选择

                background-size: cover;



#### backgorund 复合属性
        background: color url repeat position / size origin clip

        1. origin 和 clip 的值如果一样，如果只写一个值，则 origin 和 clip 都设置；

        如果设置了两个值，前面的是 origin ，后面的 clip 。

        2. size 的值必须写在 position 值的后面，并且用 / 分开。



#### 多背景图
            background: url(../images/bg-lt.png) no-repeat,

                        url(../images/bg-rt.png) no-repeat right top,

                        url(../images/bg-lb.png) no-repeat left bottom,

                        url(../images/bg-rb.png) no-repeat right bottom

#### 渐变
            文字渐变需将文字设为透明

            .box5{

                background-image: linear-gradient(20deg,口red 50px,yellow 100px,口green 150px);

                font-size: 80px;

                text-align: center;

                line-height:200px;

                font-weight: bold;

                color: transparent;

            /*text ：背景图只呈现在文字上。*/

                -webkit-background-clip: text;

            }



### 边框相关属性
####  边框圆角
            设置四角

                border-radius:10px;



            分别设置

                border-top-left-radius

                border-top-right-radius

                border-bottom-right-radius

                border-bottom-left-radius

                1. 一个值是正圆半径，

                2. 两个值分别是椭圆的 x 半径、 y 半径



            分别设置综合写法

                border-raidus: 左上角x 右上角x 右下角x 左下角x / 左上y 右上y 右下y 左下y

        

#### 边框外轮廓（了解）
**不参与计算宽高，不占位，会盖住文字**

            outline-width ：外轮廓的宽度。

            outline-color ：外轮廓的颜色。

            outline-style ：外轮廓的风格。

                none ： 无轮廓

                dotted ： 点状轮廓

                dashed ： 虚线轮廓

                solid ： 实线轮廓

                double ： 双线轮廓

            outline-offset 设置外轮廓与边框的距离，正负值都可以设置。

                注意： outline-offset 不是 outline 的子属性，是一个独立的属性。

            outline 复合属性

                outline:50px solid blue



### 文本相关属性
#### 文本阴影
                text-shadow: h-shadow v-shadow blur color

                h-shadow 必需写，水平阴影的位置。允许负值。

                v-shadow 必需写，垂直阴影的位置。允许负值。

                blur 可选，模糊的距离。

                color 可选，阴影的颜色

            

#### 文本换行white-space:
                normal 文本超出边界自动换行，文本中的换行被浏览器识别为一个空格。（默认值）

                **pre 原样输出，与 pre 标签的效果相同。

                pre-wrap 在 pre 效果的基础上，超出元素边界自动换行。

                pre-line 在 pre 效果的基础上，超出元素边界自动换行，且只识别文本中的换行，空格

                会忽略。

                **nowrap 强制不换行 忽略所有回车换行等



### web 字体（暂略）
### 2D变换（暂略）
### 3D变换（暂略）
### 过渡（暂略）
### 动画（暂略）
### *多列布局
专门用于实现类似于报纸的布局。  

常用属性如下： 

column-count ：指定列数，值是数字。 

column-width ：指定列宽，值是长度。 

columns ：同时指定列宽和列数，复合属性；值没有数量和顺序要求。 

column-gap ：设置列边距，值是长度。 

column-rule-style ：设置列与列之间边框的风格，值与 border-style 一致。

column-rule-width ：设置列与列之间边框的宽度，值是长度。 

column-rule-color ：设置列与列之间边框的颜色。 

coumn-rule ：设置列边框，复合属性。 

column-span 指定是否跨列；值: none 、 all 。  

### 伸缩盒模型
####   flex-basis **主轴方向的基准长度**
**设置的是主轴方向的基准长度，会让宽度或高度失。**

        主轴横向：宽度失效；主轴纵向：高度失效

        作用：浏览器根据这个属性设置的值，计算主轴上是否有多余空间，默认值 auto ，即：伸缩项目的宽或高。

#### flex-grow（伸）
            概念： flex-grow 定义伸缩项目的放大比例，默认为 0 ，即：纵使主轴存在剩余空间，也不拉伸（放大）。

            规则：

            1. 若所有伸缩项目的 flex-grow 值都为 1 ，则：它们将等分剩余空间（如果有空间的话）。

            2. 若三个伸缩项目的 flex-grow 值分别为： 1 、 2 、 3 ，则：分别瓜分到： 1/6 、 2/6 、3/6 的空间。

#### flex-shrink（缩）
            例如：

                三个收缩项目，宽度分别为： 200px 、 300px 、 200px ，它们的 flex-shrink 值分别

                为： 1 、 2 、 3

                若想刚好容纳下三个项目，需要总宽度为 700px ，但目前容器只有 400px ，还差 300px

                所以每个人都要收缩一下才可以放下，具体收缩的值，这样计算：

                1. 计算分母： (200×1) + (300×2) + (200×3) = 1400

                2. 计算比例：

                项目一： (200×1) / 1400 = 比例值1

                项目二： (300×2) / 1400 = 比例值2

                项目三： (200×3) / 1400 = 比例值3

                3. 计算最终收缩大小：

                项目一需要收缩： 比例值1 × 300

                项目二需要收缩： 比例值2 × 300

                项目三需要收缩： 比例值3 × 300

#### flex复合属性

  <imageProxy src="https://cdn.nlark.com/yuque/0/2024/png/36126128/1721551201938-109ac799-d7ff-4cf7-af44-fb47b4edc72b.png"/>
            flex 是复合属性，复合了： flex-grow 、 flex-shrink 、 flex-basis 三个属性，默认值为 0 1

            auto 。

            如果写 flex:1 1 auto ，则可简写为： flex:auto

            如果写 flex:1 1 0 ，则可简写为： flex:1

            如果写 flex:0 0 auto ，则可简写为： flex:none

            如果写 flex:0 1 auto ，则可简写为： flex:0 auto —— 即 flex 初始值。

        项目排序

            order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0 。

        单独对齐

            通过 align-self 属性，可以单独调整某个伸缩项目的对齐方式

            默认值为 auto ，表示继承父元素的 align-items 属性。



### 响应式布局
#### 媒体查询
##### 媒体类型
            all 检测所有设备。

            screen 检测电子屏幕，包括：电脑屏幕、平板屏幕、手机屏幕等。

            print 检测打印机。



##### 媒体特性
            width 检测视口宽度。

            max-width 检测视口最大宽度。

            min-width 检测视口最小宽度。

            height 检测视口高度。

            max-height 检测视口最大高度。

            min-height 检测视口最小高度。

            device-width 检测设备屏幕的宽度。

            max-device-width 检测设备屏幕的最大宽度。

            min-device-width 检测设备屏幕的最小宽度。

            orientation 检测视口的旋转方向（是否横屏）。

                1. portrait ：视口处于纵向，即高度大于等于宽度。

                2. landscape ：视口处于横向，即宽度大于高度。



            资料参考：[https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media)



#### 运算符
                and 并且

                , 或 or 或

                not 否定

                only 肯定



            用法一

                <link rel="stylesheet" media="具体的媒体查询" href="mystylesheet.css">

                例：

```html
<link rel="stylesheet" media=" screen and (min-width:992px) and (max-width:1200px)" href="mystylesheet.css">
```

               

            用法二

```css
media screen and (max-width:768px) {
  /*CSS-Code;*/
}
@media screen and (min-width:768px) and (max-width:1200px) {
  /*CSS-Code;*/
}
```

####  常用阈值
```css
@media screen and (max-width:768px) {

}
@media screen and (min-width:768px) and (max-width:992px){

}
@media screen and (min-width:992px) and (max-width:1200px){

}
@media screen and (min-width:1200px) {

}
```

## 扩展&技巧
> vscode 输入lorem随机生成文本
>

### scroll-behavior **丝滑滚动**
**让滚动条丝滑滚动**

> mdn：
>
> 当用户手动导航或者 CSSOM scrolling API 触发滚动操作时，CSS 属性 scroll-behavior 为一个滚动框指定滚动行为，其他任何的滚动，例如那些由于用户行为而产生的滚动，不受这个属性的影响。在根元素中指定这个属性时，它反而适用于视窗。
>

值

auto		滚动框立即滚动。

smooth	滚动框通过一个用户代理预定义的时长、使用预定义的时间函数，来实现平稳的滚动，用户代理应遵循其平台的约定，如果有的话

```css
html{
  scroll-behavior: smooth;
}
```

### cursor <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">鼠标指针样式</font>
<font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">在HTML中，你可以通过CSS来改变鼠标指针的样式。这通常是通过使用</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">cursor</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">属性来实现的。以下是一些常见的</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">cursor</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">属性值：</font>

+ <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">default</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">：默认光标（通常是一个箭头）</font>
+ <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">none</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">：无光标</font>
+ <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">context-menu</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">：上下文菜单光标（通常是一个带有小箭头的圆圈）</font>
+ <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">help</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">：帮助光标（通常是一个带有问号或气球的圆圈）</font>
+ <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">pointer</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">：指针光标（通常是一个小手）</font>
+ <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">progress</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">：表示进度正在进行的光标（通常是一个旋转的圆圈）</font>
+ <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">wait</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">：表示程序正忙的光标（通常是一个沙漏）</font>
+ <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">text</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">：文本选择光标</font>
+ <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">crosshair</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">：十字线光标</font>
+ <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">move</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">：移动光标（可以用来表示对象可以被移动）</font>
+ <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">not-allowed</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">：表示某个操作不被允许的光标（通常是一个圆圈加一个斜线）</font>
+ <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">grab</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);"> </font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">和</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);"> </font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">grabbing</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">：分别表示可以拖动和正在拖动的光标</font>

<font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">此外，你还可以使用自定义的图像作为鼠标指针。例如：</font>

```css
.custom-cursor {  
    cursor: url('cursor.png'), auto;  
}
```

<font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">在这个例子中，</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">cursor</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">属性首先尝试使用</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">cursor.png</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">作为鼠标指针。如果图像无法加载或不存在，则回退到使用默认的</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">auto</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">光标。</font>

<font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">请注意，自定义光标图像有一些限制：</font>

+ <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">图像必须是透明的PNG、CUR或ANI文件。</font>
+ <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">图像大小不能超过32x32像素或128x128像素，具体取决于浏览器。</font>
+ <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">在某些情况下，自定义光标可能不会在所有的浏览器或平台上工作。</font>

<font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">在HTML元素中使用这个CSS类，就可以改变那个元素的鼠标指针样式了：</font>

```html
<div class="custom-cursor">鼠标指针会在这里改变样式</div>
```

### <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">user-select </font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">不可复制</font>
<font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">文本内容不可被用户复制， </font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">user-select</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);"> 用于控制用户是否可以选择文本。</font>

```html
<!DOCTYPE html>  
<html lang="en">  
  <head>  
    <meta charset="UTF-8">  
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <title>不可复制文本示例</title>  
    <style>  
      .unselectable {  
        -webkit-user-select: none; /* Safari */  
        -ms-user-select: none; /* IE10+/Edge */  
        user-select: none; /* Standard syntax */  
      }  
    </style>  
  </head>  
  <body>  
    <p class="unselectable">这段文本是不可复制的。</p>  
    <p>而这段文本是可以复制的。</p>  
  </body>  
</html>
```

### Gird 网格布局
[gap - CSS：层叠样式表 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gap)

[grid网格布局，比flex方便太多了，介绍几种常用的grid布局属性_grid布局,子元素独占一行-CSDN博客](https://blog.csdn.net/qq_18798149/article/details/133872183)


  <imageProxy src="https://cdn.nlark.com/yuque/0/2024/png/36126128/1724405625780-3da35090-a227-445c-b5cf-9f7c01675816.png"/>
#### `grid-template-columns` 参数
1. `fr`平均分配一份宽度

`grid-template-columns: 1fr;`每行1列，平均分布

`grid-template-columns: 1fr 1fr;`每行2列，平均分布

`....`几个`1fr`就是几列，平均分布

`grid-template-columns: 1fr 2fr 1fr;`每行3列，平均分布，第2列占两份

2. 像素值

`grid-template-columns: 1fr 200px 1fr;`每行3列，第2列固定`200px`，其他列平均分别

#### `gap` 参数
gird布局的元素无缝紧挨，需加gap调整。

`gap: 上下 左右;`

`gap: 30px;`

#### <font style="color:#DF2A3F;">响应式布局</font>
根据窗口宽度实时改变每行的个数和宽度。

+ `repeat(auto-fill, ...)`：`auto-fill` 会尽可能多地填充列，自动根据可用空间添加尽量多的列。
+ `minmax(260px, 1fr)`：这个函数定义了每列的最小和最大宽度。
+ 最小宽度是 `260px`，表示每列至少会有 260 像素宽。
+ 最大宽度是 `1fr`，表示当有额外的空间时，每列可以扩展以平分剩余的空间。

```css
.layout {
  width: 80%;
  min-height: 500px;
  backgroud: #fff;
  border-radius: 10px;
  margin: o auto;
  box-shadow: 0 0 20px rgba(0,0,0,0,0.5);
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(260px, 1fr));
  gap: 30px;
}
```


  <imageProxy src="https://cdn.nlark.com/yuque/0/2024/png/36126128/1729588500402-f73376af-9a49-4680-a1cf-1cc93c57a4a4.png"/>
  <imageProxy src="https://cdn.nlark.com/yuque/0/2024/png/36126128/1729588516495-e77984be-8092-43b2-a249-dc48aaae7433.png"/>

#### <font style="color:rgb(79, 79, 79);">grid-row 和 grid-column 元素控制</font>
grid-row 和 grid-column 可以控制某个元素占领几份

参数：

`grid-column: 从第几列开始/本身的1 + 跨几列;`

`grid-column: 1/3;`即`grid-row: 1/1+2;`从第一列跨两列，即第一个元素占两份

`grid-row`相同

```css
.layout .box1{
   	grid-row: 1/3;
    grid-column: 1/3;
}
```


  <imageProxy src="https://cdn.nlark.com/yuque/0/2024/png/36126128/1729589291236-240d1155-a5fa-4a29-bb39-e15efa743060.png"/>


  <imageProxy src="https://cdn.nlark.com/yuque/0/2024/png/36126128/1729589495314-e1dfedaf-705c-467a-803c-409a5b770b2a.png"/>
### 渐变背景
> 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。
>
> 原文链接：[https://blog.csdn.net/qq_18798149/article/details/134389038](https://blog.csdn.net/qq_18798149/article/details/134389038)
>

#### 1.简单的线性渐变

  <imageProxy src="https://cdn.nlark.com/yuque/0/2024/png/36126128/1724501355102-b5ffc650-df17-40da-9045-08bd7a7bd751.png"/>
```css
.layout{
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(#FFE8E9,rgba(0,0,0,0) 200px);
}
```

#### 2.层叠多层的渐变（左右+上下+背景图）

  <imageProxy src="https://cdn.nlark.com/yuque/0/2024/png/36126128/1724501507296-d5059a12-7db2-4a37-908c-90534be860ca.png"/>
  
```css
.layout{
	width: 100%;
	min-height: 100vh;
	background:
	url(/static/bg.png) no-repeat 80% 50px,
	linear-gradient(to bottom, transparent -100px,#fff 300px),
	linear-gradient(to right, #D2EEF9,#FFD1DE);
}
```

#### 3.多重径向渐变，（线性渐变+径向渐变的组合）
  <imageProxy src="https://cdn.nlark.com/yuque/0/2024/png/36126128/1724501501971-c781a461-21a6-4daa-9044-f5eef246bd8e.png"/>

```css
.layout{
	width: 100%;
	min-height: 100vh;
	background: 
	linear-gradient(to bottom,transparent,#fff 400px),
	radial-gradient(90% 300px at left top, #95E0DC, transparent),
	radial-gradient(60% 300px at right top, #D3CBFC, transparent);
}
```

#### 4.更加复杂的混合型渐变背景
  <imageProxy src="https://cdn.nlark.com/yuque/0/2024/png/36126128/1724501492269-cfbfa06d-3136-4b88-9e43-f6c49c601e47.png"/>

```css
.layout{
    width: 100%;
    height: 100vh;
    background: 
    linear-gradient(to bottom, transparent, #fff 260px),
    radial-gradient(20% 150px at 70% 230px, rgba(0,210,255,0.2),transparent),
    radial-gradient(40% 180px at 80% 50px, rgba(249,167,176,0.3),transparent),
    radial-gradient(50% 300px at 90% 100px, rgba(212,230,241,0.8),transparent),            
    radial-gradient(20% 150px at 0px 0px, rgba(162,213,239,0.5),transparent),
    radial-gradient(30% 200px at 100px 50px, rgba(249,167,176,0.5),transparent),
    #FFF0F5;
}
```

### width宽度
`width: fit-content;` 内容撑开，内容多宽，宽度就多宽

### 滤镜
[backdrop-filter - CSS：层叠样式表 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/backdrop-filter)

`backdrop-filter: 属性值;`

属性值：

| 属性 | 效果 | 示例 |
| --- | --- | --- |
| blur | 模糊 | blur(10rpx) |
| | | |


### 字体相关
`line-height: 1em;` 可取消行高

### 响应式布局`@media`
@media 是 CSS 中的媒体查询规则，用来根据设备的特性（如屏幕大小、分辨率）应用不同的样式。

#### 屏幕宽高：
```css
/* 屏幕宽度大于等于 1024px 时应用样式： */
@media (min-width: 1024px) {
  body {
    font-size: 18px;
  }
}
/* 屏幕高度小于或等于 800px 时： */
@media (max-height: 800px) {
  body {
    font-size: 12px;
  }
}


/*宽度大于 1200px（一般为PC）： */
@media (max-width: 768px) {
  body {
    background-color: lightgreen;
  }
}
/* 宽度小于等于 768px（一般为移动端设备）： */
@media (max-width: 768px) {
  body {
    background-color: lightgreen;
  }
}
```

#### 屏幕类型：
```css
/* 横屏设备 */
@media (orientation: landscape) {
  body {
    background-color: lightgreen;
  }
}
/* 竖屏设备 */
@media (orientation: portrait) {
  body {
    background-color: lightcoral;
  }
}
```

#### 设备分辨率高于 2x（Retina 屏幕）：
```css
@media (min-resolution: 2dppx) {
  img {
    max-width: 100%;
  }
}
```

#### 针对打印设备：
```css
@media print {
  body {
    color: black;
    background-color: white;
  }
}
```

