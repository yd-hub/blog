---
icon: fa-brands:edge-legacy
date: 2025-02-12
category:
  - JavaScript
  - 前端笔记
tag:
  - JavaScript
  - Web APIs
---

# Web APIs

## 获取DOM对象 querySelector

1. querySelector   满足条件的第一个元素
`querySelector('css选择器')`

2. querySelectorAll  满足条件的元素集合 返回伪数组
3. 其他方式
`getElementById`、`getElementsByTagName`

## 操作元素内容 innerText/innerHTML

通过修改 DOM 的文本内容，动态改变网页的内容。

1. `innerText` 将文本内容添加/更新到任意标签位置，**文本中包含的标签不会被解析。**

```html
<script>
  // innerText 将文本内容添加/更新到任意标签位置
  const intro = document.querySelector('.intro')
  // intro.innerText = '嗨~ 我叫李雷！'
  // intro.innerText = '<h4>嗨~ 我叫李雷！</h4>'
</script>
```

2. `innerHTML` 将文本内容添加/更新到任意标签位置，**文本中包含的标签会被解析。**

```html
<script>
  // innerHTML 将文本内容添加/更新到任意标签位置
  const intro = document.querySelector('.intro')
  intro.innerHTML = '嗨~ 我叫韩梅梅！'
  intro.innerHTML = '<h4>嗨~ 我叫韩梅梅！</h4>'
</script>
```

总结：如果文本内容中包含 `html` 标签时推荐使用 `innerHTML`，否则建议使用 `innerText` 属性。

## 操作元素属性

有3种方式可以实现对属性的修改：

### 常用属性修改

1. 直接能过属性名修改，最简洁的语法

```html
<script>
  // 1. 获取 img 对应的 DOM 元素
  const pic = document.querySelector('.pic')
	// 2. 修改属性
  pic.src = './images/lion.webp'
  pic.width = 400;
  pic.alt = '图片不见了...'
</script>
```

### 控制样式属性

#### 通过修改行内样式 `style` 属性，实现对样式的动态修改。

通过元素节点获得的 `style` 属性本身的数据类型也是对象，如 `box.style.color`、`box.style.width` 分别用来获取元素节点 CSS 样式的 `color` 和 `width` 的值。

任何标签都有 `style` 属性，通过 `style` 属性可以动态更改网页标签的样式，如要遇到 `css` 属性中包含字符 `-` 时，要将 `-` 去掉并将其后面的字母改成大写，如 `background-color` 要写成 `box.style.backgroundColor`

```javascript
// 获取 DOM 节点
const box = document.querySelector('.intro')
box.style.color = 'red'
box.style.width = '300px'
// css 属性的 - 连接符与 JavaScript 的 减运算符
// 冲突，所以要改成驼峰法
box.style.backgroundColor = 'pink'
```

#### 通过className 操作类控制CSS

如果修改的样式比较多，直接通过style属性修改比较繁琐，我们可以通过借助于css类名的形式。

> 注意：
>
> 1.由于class是关键字, 所以使用className去代替
>
> 2.className是使用新值换旧值, 如果需要添加一个类,需要保留之前的类名

#### 通过 classList 操作类控制CSS

为了解决className 容易覆盖以前的类名，我们可以通过classList方式追加和删除类名

```javascript
// 1.获取元素
// let box = document.querySelector('css选择器')
let box = document.querySelector('div')
// add是个方法 添加  追加
// box.classList.add('active')
// remove() 移除 类
// box.classList.remove('one')
// 切换类 (有就删除，没有就增加)
box.classList.toggle('one')
// 检测类 (包含返回true，没有返回false)
box.classList.contains('one')
```

### 操作表单元素属性

表单很多情况，也需要修改属性，比如点击眼睛，可以看到密码，本质是把表单类型转换为文本框

正常的有属性有取值的跟其他的标签属性没有任何区别

获取:DOM对象.属性名

设置:DOM对象.属性名= 新值

<font style="background-color:#FBDE28;">innerHTML无法获取input值</font>

### 自定义属性 data-、dataset

标准属性: 标签天生自带的属性 比如class id title等, 可以直接使用点语法操作比如： disabled、checked、selected

自定义属性：

在html5中推出来了专门的data-自定义属性 

在标签上一律以data-开头

在DOM对象上一律以dataset对象方式获取

```html
<div data-id="1"> 自定义属性 </div>
<script>
  // 1. 获取元素
  let div = document.querySelector('div')
  // 2. 获取自定义属性值
  console.log(div.dataset.id)
</script>
```

### 元素尺寸与位置

获取元素的自身宽高、包含元素自身设置的宽高、padding、border

offsetWidth和offsetHeight 

获取出来的是数值,方便计算

注意: 获取的是可视宽高, 如果盒子是隐藏的,获取的结果是0

## 事件

### 事件监听 addEventListener

`addEventListener` 是 DOM 对象专门用来添加事件监听的方法，它的两个参数分别为【事件类型】和【事件回调】。

完成事件监听分成3个步骤：

1. 获取 DOM 元素
2. 通过 `addEventListener` 方法为 DOM 节点添加事件监听
3. 等待事件触发，如用户点击了某个按钮时便会触发 `click` 事件类型
4. 事件触发后，相对应的回调函数会被执行

> addEventListener(事件,事件处理函数,捕获/冒泡触发)

> **DOM L0 老写法**
>
> 事件源.on事件 = function(){ }

> **OM L2 写法**
>
> 事件源.addEventListener(事件type,事件处理函数listener)
>
> 事件源.addEventListener(type, listener, options);
>
> 事件源.addEventListener(type, listener, useCapture);

区别：on方式会覆盖，addEvenntListener可绑定多次。

```html
<body>
    <h3>事件监听</h3>
    <p id="text">为 DOM 元素添加事件监听，等待事件发生，便立即执行一个函数。</p>
    <button id="btn">点击改变文字颜色</button>
    <script>
      // 1. 获取 button 对应的 DOM 对象
      const btn = document.querySelector('#btn')

      // 2. 添加事件监听
      btn.addEventListener('click', function () {
        console.log('等待事件被触发...')
        // 改变 p 标签的文字颜色
        let text = document.getElementById('text')
        text.style.color = 'red'
      })

      // 3. 只要用户点击了按钮，事件便触发了！！！
    </script>
</body>

```

### 事件解绑 removeEventListener

> **DOM L0 老写法**
>
> <font style="color:rgb(119, 119, 119);">事件源.on事件 = null</font>

> **OM L2 写法**
>
> <font style="color:rgb(119, 119, 119);">事件源.removeEventListener(type, listener);</font>
>
> <font style="color:rgb(119, 119, 119);">事件源.removeEventListener(type, listener, options);</font>
>
> <font style="color:rgb(119, 119, 119);">事件源.removeEventListener(type, listener, useCapture);</font>

### 事件类型

#### 常用事件

> <font style="color:rgb(119, 119, 119);">鼠标经过事件：</font>
>
> <font style="color:rgb(119, 119, 119);">mouseover 和 mouseout 会有冒泡效果</font>
>
> <font style="color:rgb(119, 119, 119);">mouseenter 和 mouseleave 没有冒泡效果 (推荐)</font>

| mouseenter  | 鼠标是否移入 | focus   | 获得焦点     |
| ------------------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------- |
| mouseleave  | 鼠标是否移出 | blur    | 失去焦点     |
| click                                                   | 鼠标单击                                                 | keydown | 键盘按下触发 |
| dblclick                                                | 鼠标双击                                                 | keyup   | 键盘抬起触发 |
| input       | 只要输入就触发                                           | submit                                              | 提交事件                                                 |


#### 其他事件

##### 页面加载事件 **load**

加载外部资源（如图片、外联CSS和JavaScript等）加载完毕时触发的事件

有些时候需要等页面资源全部处理完了做一些事情

###### **事件名：load**

监听页面所有资源加载完毕：

```javascript
window.addEventListener('load', function() {
  // xxxxx
})
```

###### **事件名：DOMContentLoaded**

监听页面dom加载完毕：

```javascript
window.addEventListener('DOMContentLoaded', function() {
  // xxxxx
})
```

##### 元素滚动事件 scroll

滚动条在滚动的时候持续触发的事件

```javascript
window.addEventListener('scroll', function() {
  // xxxxx
})
```

##### 页面尺寸事件 resize

会在窗口尺寸改变的时候触发事件：

```javascript
window.addEventListener('resize', function() {
  // xxxxx
})
```

#### M端事件（移动端）

| **触屏touch事件** | **说明**                      |
| ----------------- | ----------------------------- |
| touchstart        | 手指触摸到一个DOM元素时触发   |
| touchmove         | 手指在一个DOM元素上滑动时触发 |
| touchend          | 手指从一个DOM元素上移开时触发 |


### 事件对象 `event`

任意事件类型被触发时与事件相关的信息会被以对象的形式记录下来，我们称这个对象为事件对象。

事件回调函数的【第1个参数】即所谓的事件对象，通常习惯性的命名为 `event`、`ev` 、`e`。

```javascript
<script>
  const input = document.querySelector('input')

	// 添加事件监听
	input.addEventListener('keyup', function (e) {
  console.log('任意事件类型被触发后，相关信息会以对象形式被记录下来...');
  // 事件回调函数的第1个参数即所谓的事件对象
  console.log(e)
  console.log(e.key) //显示按下的按键
  if(e.key === 'Enter'){
    console.log('按下了回车') //显示按下的按键
  }
})
  </script>
```

### 环境对象 this

环境对象指的是函数内部特殊的变量 `this` ，它代表着当前函数运行时所处的环境。

直接调用函数时，this指向window；事件监听函数时，this指向事件绑定的事件源；箭头函数无this。

<font style="background-color:#FBDE28;">this指向函数的调用者</font>

```javascript
<script>
  const btn = document.querySelector('button')

	// 添加事件监听
	btn.addEventListener('click', function () {
  console.log('任意事件类型被触发后，相关信息会以对象形式被记录下来...');
  // 事件回调函数的第1个参数即所谓的事件对象
   this.style.backgroundColor = 'red'
})
</script>
```

### 事件流

#### 捕获和冒泡

1. `addEventListener` 第3个参数决定了事件是在捕获阶段触发还是在冒泡阶段触发
2. `addEventListener` 第3个参数为 `true` 表示捕获阶段触发，`false` 表示冒泡阶段触发，默认值为 `false`
3. 事件流只会在父子元素具有相同事件类型时才会产生影响
4. 绝大部分场景都采用默认的冒泡模式（其中一个原因是早期 IE 不支持捕获）

捕获：从父元素到子元素

冒泡：从子元素到父元素

#### 阻止冒泡 stopPropagation 

阻止冒泡是指阻断事件的流动，保证事件只在当前元素被执行，而不再去影响到其对应的祖先元素。

事件对象中的 `ev.stopPropagation` 方法，专门用来阻止事件冒泡（也可以阻止捕获）。

```html
<body>
  <h3>阻止冒泡</h3>
  <p>阻止冒泡是指阻断事件的流动，保证事件只在当前元素被执行，而不再去影响到其对应的祖先元素。</p>
  <div class="outer">
    <div class="inner">
      <div class="child"></div>
    </div>
  </div>
  <script>
    // 获取嵌套的3个节点
    const outer = document.querySelector('.outer')
    const inner = document.querySelector('.inner')
    const child = document.querySelector('.child')

    // 外层的盒子
    outer.addEventListener('click', function () {
      console.log('outer...')
    })

    // 中间的盒子
    inner.addEventListener('click', function (ev) {
      console.log('inner...')

      // 阻止事件冒泡
      ev.stopPropagation()
    })

    // 内层的盒子
    child.addEventListener('click', function (ev) {
      console.log('child...')

      // 借助事件对象，阻止事件向上冒泡
      ev.stopPropagation()
    })
  </script>
</body>
```

#### 阻止元素默认行为 preventDefault

`preventDefault()`

```html
<body>
  <a href="http://www.baidu.com"> </a>
  <script>
    const a = document.querySelector('a')
    a.addEventListener('click', function (e) {
       e.preventDefault()
    })

  </script>
</body>
```

#### 事件委托

利用事件流的特征，事件的的冒泡模式总是会将事件流向其父元素的，如果父元素监听了相同的事件类型，那么父元素的事件就会被触发并执行。只对祖先元素添加事件监听，相比对 10000 个子元素添加事件监听执行效率要高许多。

```html
e.target.tagName
e.target.dataset.属性值
```

## 元素尺寸与位置

### **获取宽高**

#### **clientWidth/clientHeight**

获取元素可见部分宽高，不包含border，margin，滚动条等（包含padding）， 用于js 获取元素大小，只读属性。

#### **offsetWidth/offsetHeight**

获取元素自身宽高， 包含border、padding，滚动条等，只读，获取结果是数值

### **获取位置**

#### **元素位置offsetLeft/offsetTop**

获取元素距离自己最近的定位父级元素的左、上距离，offsetLeft/offsetTop是只读属性

如父级有定位，取距离父级左、上距离，否则找最近的有定位的祖先元素取距离。

 获取元素位置的时候使用，只读属性。

<imageProxy hasBorder title="粉盒子无定位" src="https://cdn.nlark.com/yuque/0/2023/png/36126128/1698395919689-55d6e49e-8de4-41d8-b7a0-652257dcd16b.png"/>
<imageProxy hasBorder  title="粉盒子有定位" src="https://cdn.nlark.com/yuque/0/2023/png/36126128/1698395949239-b2ac4c0f-f1e4-4b2c-9739-875b93d1c3ec.png"/>
#### **滚动事件获取位置：** scrollLeft/scrollTop 左/上 已卷去多少

> 获取html固定写法：document.documentElement
>
> 获取html向上滚动的长度（卷去多少）：document.documentElement.scrollTop

```javascript
window.addEventListener('scroll',function(){
  //获取html向上滚动的长度(而不是获取body)
  console.log(document.documentElement.scrollTop)
})
```

滚动到指定位置：scrollTo(x,y)

```javascript
//让页面滚到y轴1000像素的位置
window.scrollTo(0,1000) 
```

#### 相对于视口位置 getBoundingClientRect

 element.getBoundingClientRect()  

 方法返回元素的大小及其相对于视口的位置  

## 日期对象的使用

### 得到当前日期

```javascript
//得到当前日期
const date = new Date()
console.log(data)
```

### 指定时间

```javascript
//指定时间
const date1 = new Date('2023-10-28 14:45:00')
console.log(data1)
```

### 日期对象方法

| 方法          | 作用               | 说明           |
| ------------- | ------------------ | -------------- |
| getFullYear() | 获取年份           | 获取四位数年份 |
| getMonth()    | 获取月份           | 取值0~11       |
| getDate()     | 获取月份中的每一天 | 获取当前是几号 |
| getDay()      | 获取星期           | 取值为0~6      |
| getHours()    | 获取小时           | 取值为0~23     |
| getMinutes    | 获取分钟           | 取值为0~59     |
| getSeconds()  | 获取秒             | 取值为0~59     |
| getTime()     | 获取时间戳         |                |


### 日期格式化方法

```javascript
const date = new Date()
data.toLocaleString()	//2023/10/28 09:41:21
data.toLocaleDateString()	//2023/10/28
data.toLocaleTimeString()	//2023/10/28
```

### 时间戳

时间戳是指1970年01月01日00时00分00秒起至现在的总秒数或毫秒数，它是一种特殊的计量时间的方式。

注：ECMAScript 中时间戳是以毫秒计的。

#### 获取时间戳方法

##### new Date().getTime()

可获取指定时间戳

```javascript
//当前时间戳
const date = new Date()
data.getTime()
```

##### +new Date()

可获取将来时间戳

```javascript
//当前时间戳
+new Date()	//相当于Number(new Date())
//指定时间戳
+new Date('2023-10-28 14:45:00')
```

##### Date.now()

只能得到当前时间戳，无需实例化（无需new Date()）

```javascript
//当前时间戳
Date.now()
```

#### 倒计时

**算法**

> 将来的时间戳 - 现在的时间戳 = 剩余时间毫秒数
>
> 剩余时间毫秒数 转换为 剩余时间 年月日时分秒 就是倒计时时间

**公式**

> 时间戳得到毫秒，需转成秒再计算
>
> 天数：d=parseInt(总秒数/60/60/24);	
>
> 小时：h=parseInt(总秒数/60/60%24);
>
> 分数：m=parseInt(总秒数/60%60);
>
> 秒数：s=parseInt(总秒数%60)；

```javascript
let h = parseInt(count / 60 / 60 % 24)
h = h < 10 ? '0' + h : h
let m = parseInt(count / 60 % 60)
m = m < 10 ? '0' + m : m
let s = parseInt(count % 60)
s = s < 10 ? '0' + s : s
console.log(h, m, s)
```

## DOM节点操作

### 查找节点

#### **父节点查找 parentNode**

parentNode：

返回最近一级的父节点，找不到返回为null

子元素.parentNode：

子元素.parentNode.parentNode //返回爷爷节点

#### **子节点查找 childNodes/** **<font style="color:#DF2A3F;">childern</font>**

childNodes：

获得所有子节点，包括文本节点（空格、换行），注释节点等

childern<font style="color:#DF2A3F;">（重点）：</font>

获得所有元素节点（亲儿子节点），返回的是一个伪数组

#### **兄弟关系查找 nextElementSibling/previousElementSibling**

nextElementSibling：

下一个兄弟节点

previousElementSibling：

上一个兄弟节点

### 增加节点

#### 创建节点

document.createElement('标签名')

#### 追加节点

插入到父亲最后一个子元素：

父元素.appendChild(要插入的元素)

插入到父元素的某个子元素前：

父元素.insertBefore(要插入的元素，在哪个元素前)

#### 克隆节点

元素.cloneNode(true) //true为深克隆，子孙节点都克隆

```plain
<body>
  <button class="btn1">所有的子节点</button>
  <!-- 获取 ul 的子节点 -->
  <ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript 基础</li>
    <li>Web APIs</li>
  </ul>
  <script>
      // 父节点
      const ul = document.querySelector('ul')

      // 1 克隆节点 元素.cloneNode(true)
      const li1 = ul.children[0].cloneNode(true)
      // 2 追加
      ul.appendChild(li1)

    })
  </script>
</body>
```

#### 删除节点

必须经过父元素删除子元素，如果无父元素则无法删除

父元素.removeChild(要删除的子元素)

## JS插件swiper

 熟悉官网,了解这个插件可以完成什么需求 [https://www.swiper.com.cn/](https://www.swiper.com.cn/) 

看在线演示,找到符合自己需求的[demo https://www.swiper.com.cn/demo/index.html](demo https://www.swiper.com.cn/demo/index.html)

查看基本使用流程 [https://www.swiper.com.cn/usage/index.html ](https://www.swiper.com.cn/usage/index.html )

查看APi文档,去配置自己的插件 [https://www.swiper.com.cn/api/index.html](https://www.swiper.com.cn/api/index.html)

 注意: 多个swiper同时使用的时候, 类名需要注意区分

## window对象

### BOM浏览器对象模型

BOM包含DOM，window是全局对象，JavaScript的顶级对象

document、console.log等，都是属于window的对象，只是省略了`<font style="background-color:#EFF0F0;">window.</font>`

var定义在全局作用域中的变量、函数都会变成window对象的属性和方法，window的属性和方法可以省略`<font style="background-color:#EFF0F0;">window.</font>`

### 定时器

#### 间歇函数

##### 开启定时器 setInterval

> 知道间歇函数的作用，利用间歇函数创建定时任务。

`setInterval` 是 JavaScript 中内置的函数，它的作用是间隔固定的时间自动重复执行另一个函数，也叫定时器函数。

setInterval(函数名, 间隔时间)

setInterval(函数, 间隔时间)

setInterval('函数()', 间隔时间)	//不常用

```html
<script>
  // 1. 定义一个普通函数
  function repeat() {
    console.log('不知疲倦的执行下去....')
  }

  // 2. 使用 setInterval 调用 repeat 函数
  // 间隔 1000 毫秒，重复调用 repeat
  setInterval(repeat, 1000)
</script>
```

##### 关闭定时器 clearInterval

每个定时器都有一个不同的编号

```html
<script>
  
  function repeat() {
    console.log('不知疲倦的执行下去....')
  }

  let a = setInterval(repeat, 1000)
  let b = setInterval(repeat, 1000)
  console.log(a) //显示1
  console.log(b) //显示2

  //关闭定时器
  clearInterval(a)
  clearInterval(b)
</script>
```

#### 延时函数

##### 延时函数 setTimeout

setTimeout(回调函数,等待毫秒数)	只会执行一次

```html
<script>
  function repeat() {
    console.log('执行了函数')
  }
  setTimeout(repeat, 1000)
</script>
```

##### 清除延时函数 clearTimeout()

```html
<script>
  let timer = setTimeout(repeat, 1000)
	clearTimeout(timer)
</script>
```

### *JS执行机制

JavaScript的一大特点是单线程

<imageProxy  title="答案全为：1111 3333 2222"  src="https://cdn.nlark.com/yuque/0/2023/png/36126128/1698545519366-31dd973b-ad7e-4073-a141-241251e5cb8f.png"/>
#### **同步任务**

同步任务都在主线程上执行，形成一个<font style="color:#DF2A3F;">执行栈</font>

#### **异步任务**

JS的异步是通过回调函数实现的，一般异步任务有以下三种类型：

1、普通事件，如click、resize等

2、资源加载，如load，error等

3、定时器，包括setInterval、setTimeout等

异步任务相关添加到<font style="color:#DF2A3F;">任务队列</font>中（也称消息队列）

#### *事件循环（event loop）

[Promise - 宏任务与微任务](https://www.yuque.com/u34561593/ccc/rmpev43t5wt9dp3r#qQL4o)



面试常问

1. 先执行执行栈中的同步任务。 

2. 异步任务放入任务队列中。 

3. 一旦执行栈中的所有同步任务执行完毕，系统就会按次序读取任务队列中的异步任务，于是被读取的异步任务结束等待 状态，进入执行栈，开始执行


<imageProxy  src="https://cdn.nlark.com/yuque/0/2023/png/36126128/1698546945146-838cb183-558d-4ab6-b399-7abad8ac104b.png"/>

<imageProxy  src="https://cdn.nlark.com/yuque/0/2023/png/36126128/1698547063779-7b61abac-fc17-44aa-a2a6-ad62d11fa279.png"/>
### location对象 

location (地址) 它拆分并保存了 URL 地址的各个组成部分， 它是一个对象

| **属性/方法** | **说明**         |
| :-------------------------------------------------------- | :----------------------------------------------------------- |
| href          | 属性，获取完整的 URL 地址，赋值时用于地址的跳转 |
| search        | 属性，获取地址中携带的参数，符号 ？后面部分 |
| hash          | 属性，获取地址中的啥希值，符号 # 后面部分 |
| reload()      | 方法，用来刷新当前页面，传入参数 true 时表示强制刷新（不从本地获取文件，而从网络重新获取） |


```html
<body>
  <form>
    <input type="text" name="search"> <button>搜索</button>
  </form>
  <a href="#/music">音乐</a>
  <a href="#/download">下载</a>

  <button class="reload">刷新页面</button>
  <script>
    // location 对象  
    // 1. href属性 （重点） 得到完整地址，赋值则是跳转到新地址
    console.log(location.href)
    // location.href = 'http://www.itcast.cn'

    // 2. search属性  得到 ? 后面的地址 
    console.log(location.search)  // ?search=笔记本

    // 3. hash属性  得到 # 后面的地址
    console.log(location.hash)

    // 4. reload 方法  刷新页面
    const btn = document.querySelector('.reload')
    btn.addEventListener('click', function () {
      // location.reload() // 页面刷新
      location.reload(true) // 强制页面刷新 ctrl+f5
    })
  </script>
</body>
```

### navigator对象

navigator是对象，该对象下记录了浏览器自身的相关信息

常用属性和方法：

```javascript
// 检测 userAgent（浏览器信息）
(function () {
  const userAgent = navigator.userAgent
  // 验证是否为Android或iPhone
  const android = userAgent.match(/(Android);?[\s\/]+([\d.]+)?/)
  const iphone = userAgent.match(/(iPhone\sOS)\s([\d_]+)/)
  // 如果是Android或iPhone，则跳转至移动站点
  if (android || iphone) {
    location.href = 'http://m.itcast.cn'
}})();
```

### histroy对象

history (历史)是对象，主要管理历史记录， 该对象与浏览器地址栏的操作相对应，如前进、后退等

| **histroy方法** | **作用**         |
| :---------------------------------------------------------- | :----------------------------------------------------------- |
| back()          | 后退功能         |
| forward()       | 前进功能         |
| go(参数)        | 前进后退功能，参数1前进1个页面，-1后退1个页面 |


**使用场景**

history对象一般在实际开发中比较少用，但是会在一些OA 办公系统中见到。

常见方法：

```html
<body>
  <button class="back">←后退</button>
  <button class="forward">前进→</button>
  <script>
    // histroy对象

    // 1.前进
    const forward = document.querySelector('.forward')
    forward.addEventListener('click', function () {
      // history.forward() 
      history.go(1)
    })
    // 2.后退
    const back = document.querySelector('.back')
    back.addEventListener('click', function () {
      // history.back()
      history.go(-1)
    })
  </script>
</body>
```

## *本地存储（重点）

1、数据存储在用户浏览器中

2、页面刷新或者关闭不丢失数据，实现数据持久化

3、容量较大，sessionStorage和localStorage约 5M 左    
 常见的使用场景：[https://todomvc.com/examples/vanilla-es6/](https://todomvc.com/examples/vanilla-es6/) 页面刷新数据不丢失

**本地存储只能存放字符串类型**

### localStorage（重点）

**作用:** 数据可以长期保留在本地浏览器中，刷新页面和关闭页面，数据也不会丢失

**特性:** 以键值对的形式存储，并且存储的是字符串， 省略了window

语法

存储数据：localStorage.setItem('key', value)

读取数据：localStorage.getItem('key')

删除数据：localStorage.removeItem('key' )

### sessionStorage

生命周期为关闭浏览器窗口，使用方法同localStorage

### 存储复杂数据类型

本地存储只能存字符串，所以存复杂数据类型时，用`JSON.stringify()`转为JSON，把对象以字符串的形式存入

取出时用`JSON.parse()`将JSON转为对象

JSON对象：属性和值都有引号，而且统一都是双引号

```javascript
const obj = {
  uname:'pink',
  age:18,
  gender：'女'
}
//复杂数据类型转为JSON存储
localStorage.setItem('obj',JSON.stringify(obj))
//把JSON转为对象取出
console.log(JSON.parse(localStorage.getItem(obj)))
```

## 正则表达式

### 正则基本使用

#### 定义规则 

```javascript
const reg =  /表达式/
```

其中`/ /`是正则表达式字面量

正则表达式也是`对象`

#### 使用正则 

##### test()方法

`test()方法`   用来查看正则表达式与指定的字符串是否匹配

语法：规则.test('被检查的文本')

如果正则表达式与指定的字符串匹配 ，返回`true`，否则`false`

##### exec()方法

`exec()方法`   用来查看正则表达式与指定的字符串是否匹配

语法：规则.exec('被检查的文本')

找到返回一个数组，否则返回null

<imageProxy src="https://cdn.nlark.com/yuque/0/2023/png/36126128/1698720063306-7eb5f505-02ed-4b61-816d-ec4d4e3225c9.png"/>

```html
<body>
  <script>
    // 正则表达式的基本使用
    const str1 = 'web前端开发'
    // 1. 定义规则
    const reg1 = /web/

    // 2. 使用正则  test()
    console.log(reg1.test(str1))  // true  如果符合规则匹配上则返回true
    console.log(reg1.test('java开发'))  // false  如果不符合规则匹配上则返回 false

     // 3. 使用正则  exec()
    const str2 = '我在学习前端，真好玩'
    const reg2 = /前端/
    console.log(reg2.exec(str2))
    // 返回数组：['前端', index: 4, input: '我在学习前端，真好玩', groups: undefined]
    console.log(reg2.exec(str2))  

  </script>
</body>
```

### 元字符

#### **普通字符**

大多数的字符仅能够描述它们本身，这些字符称作普通字符，例如所有的字母和数字。

普通字符只能够匹配字符串中与它们相同的字符。 

比如，规定用户只能输入英文26个英文字母，普通字符的话 /[abcdefghijklmnopqrstuvwxyz]/

#### **元字符(特殊字符）**

是一些具有特殊含义的字符，可以极大提高了灵活性和强大的匹配功能。

比如，规定用户只能输入英文26个英文字母，换成元字符写法： /[a-z]/ 

MDN：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions) 

正则测试工具: [http://tool.oschina.net/regex](http://tool.oschina.net/regex )

#### 边界符

正则表达式中的边界符（位置符）用来提示字符所处的位置，主要有两个字符

| **边界符** | **说明**                 |
| ---------- | ------------------------ |
| ^          | 匹配行首文本（以谁开始） |
| $          | 匹配行尾文本（以谁结束） |


> 如果 ^ 和 $ 在一起，表示必须是精确匹配

```html
<body>
  <script>
    // 元字符之边界符
    // 1. 匹配开头的位置 ^
    const reg = /^web/
    console.log(reg.test('web前端'))  // true
    console.log(reg.test('前端web'))  // false
    console.log(reg.test('前端web学习'))  // false
    console.log(reg.test('we'))  // false

    // 2. 匹配结束的位置 $
    const reg1 = /web$/
    console.log(reg1.test('web前端'))  //  false
    console.log(reg1.test('前端web'))  // true
    console.log(reg1.test('前端web学习'))  // false
    console.log(reg1.test('we'))  // false  

    // 3. 精确匹配 ^ $
    const reg2 = /^web$/
    console.log(reg2.test('web前端'))  //  false
    console.log(reg2.test('前端web'))  // false
    console.log(reg2.test('前端web学习'))  // false
    console.log(reg2.test('we'))  // false 
    console.log(reg2.test('web'))  // true
    console.log(reg2.test('webweb'))  // flase 
  </script>
</body>
```

#### 量词

量词用来设定<font style="color:#DF2A3F;">某个模式重复次数</font>

| **量词** | **说明**           |
| -------- | ------------------ |
| *        | 重复零次或者更多次 |
| +        | 重复一次或者更多次 |
| ？       | 重复零次或一次     |
| {n}      | 重复n次            |
| \{n,\}     | 重复n次或更多次    |
| \{n,m\}    | 重复n到m次         |


> 注意： 逗号左右两侧千万不要出现空格

```html
<body>
  <script>
    // 元字符之量词
    // 1. * 重复次数 >= 0 次
    const reg1 = /^w*$/
    console.log(reg1.test(''))  // true
    console.log(reg1.test('w'))  // true
    console.log(reg1.test('ww'))  // true
    console.log(reg1.test('wqw'))  // false 精确匹配 ^ $，只能有w
    console.log('-----------------------')

    // 2. + 重复次数 >= 1 次
    const reg2 = /^w+$/
    console.log(reg2.test(''))  // false
    console.log(reg2.test('w'))  // true
    console.log(reg2.test('ww'))  // true
    console.log('-----------------------')

    // 3. ? 重复次数  0 || 1 
    const reg3 = /^w?$/
    console.log(reg3.test(''))  // true
    console.log(reg3.test('w'))  // true
    console.log(reg3.test('ww'))  // false
    console.log('-----------------------')


    // 4. {n} 重复 n 次
    const reg4 = /^w{3}$/
    console.log(reg4.test(''))  // false
    console.log(reg4.test('w'))  // flase
    console.log(reg4.test('ww'))  // false
    console.log(reg4.test('www'))  // true
    console.log(reg4.test('wwww'))  // false
    console.log('-----------------------')

    // 5. {n,} 重复次数 >= n 
    const reg5 = /^w{2,}$/
    console.log(reg5.test(''))  // false
    console.log(reg5.test('w'))  // false
    console.log(reg5.test('ww'))  // true
    console.log(reg5.test('www'))  // true
    console.log('-----------------------')

    // 6. {n,m}   n =< 重复次数 <= m
    const reg6 = /^w{2,4}$/
    console.log(reg6.test('w'))  // false
    console.log(reg6.test('ww'))  // true
    console.log(reg6.test('www'))  // true
    console.log(reg6.test('wwww'))  // true
    console.log(reg6.test('wwwww'))  // false

    // 7. 注意事项： 逗号两侧千万不要加空格否则会匹配失败

  </script>
```

#### 范围

 [ ] 里面加上 - 连字符，使用连字符 - 表示一个范围

定义的规则限定在某个范围，比如只能是英文字母，或者数字等等，用表示范围

<imageProxy src="https://cdn.nlark.com/yuque/0/2023/png/36126128/1698735063762-43de965c-9bbe-499d-aa0e-3b6a0c28f695.png"/>

```html
<body>
  <script>
    // 元字符之范围  []  
    // 1. [abc] 匹配包含的单个字符， 多选1
    const reg1 = /^[abc]$/
    console.log(reg1.test('a'))  // true
    console.log(reg1.test('b'))  // true
    console.log(reg1.test('c'))  // true
    console.log(reg1.test('d'))  // false
    console.log(reg1.test('ab'))  // false

    // 2. [a-z] 连字符 单个
    const reg2 = /^[a-z]$/
    console.log(reg2.test('a'))  // true
    console.log(reg2.test('p'))  // true
    console.log(reg2.test('0'))  // false
    console.log(reg2.test('A'))  // false
    // 想要包含小写字母，大写字母 ，数字
    const reg3 = /^[a-zA-Z0-9]$/
    console.log(reg3.test('B'))  // true
    console.log(reg3.test('b'))  // true
    console.log(reg3.test(9))  // true
    console.log(reg3.test(','))  // flase

    // 用户名可以输入英文字母，数字，可以加下划线，要求 6~16位
    const reg4 = /^[a-zA-Z0-9_]{6,16}$/
    console.log(reg4.test('abcd1'))  // false 
    console.log(reg4.test('abcd12'))  // true
    console.log(reg4.test('ABcd12'))  // true
    console.log(reg4.test('ABcd12_'))  // true

    // 3. [^a-z] 取反符
    const reg5 = /^[^a-z]$/
    console.log(reg5.test('a'))  // false 
    console.log(reg5.test('A'))  // true
    console.log(reg5.test(8))  // true

  </script>
</body>
```

#### 字符类

某些常见模式的简写方式，区分字母和数字

| **字符类** | **说明**                                                   |
| ----------- | ---------------------------------------------------------- |
| \d          | 匹配0-9之间任一数字，相当于[0-9]                           |
| \D          | 匹配所有0-9以外的字符，相当于[^0-9]                        |
| \w          | 匹配任意的字母、数字、下划线、相当于[A-Za-z0-9]            |
| \W          | 除所有字母、数字、下划线以外的字符、相当于[^A-Za-z0-9]     |
| \s          | 匹配空格（包括换行符、制表符、空格等），相当于[\t\r\n\v\f] |
| \S          | 匹配非空格的字符，相当于[^\t\r\n\v\f]                      |


> 例：
>
> 腾讯QQ号：^[1-9][0-9]{4,}$ （腾讯QQ号从10000开始）
>
> \^\[1-9\] 表示开头第一个字符必须 1-9 的数字
>
> \[0-9\]{4,}$ 表示 ≥4 位的 0-9 数字
>
> 日期格式：^\d\{4\}-\d\{1,2\}-\d\{1,2\}

| **字符类** | **说明**                       |
| ----------- | ------------------------------ |
| ^           | 取反（在[ ]内表示取反）        |
| .           | 匹配除换行符之外的任何单个字符 |
|  \|          |     或 例如 /java|JAVA/ 匹配java或JAVA  |


## 替换和修饰符

### 替换

replace 替换方法，可以完成字符的替换

```html
<body>
  <script>
    // 替换和修饰符
    const str = '欢迎大家学习前端，相信大家一定能学好前端，都成为前端大神'
    // 1. 替换  replace  需求：把前端替换为 web
    // 1.1 replace 返回值是替换完毕的字符串
    // const strEnd = str.replace(/前端/, 'web') 只能替换一个
  </script>
</body>
```

### 修饰符

修饰符约束正则执行的某些细节行为，如是否区分大小写、是否支持多行匹配等

格式：/表达式/修饰符

+ i 是单词 ignore（忽视）的缩写，正则匹配时字母不区分大小写

也有说法是insensitive（不敏感的）的缩写

+ g 是单词 global（全面的） 的缩写，匹配所有满足正则表达式的结果

```html
<body>
  <script>
    // 替换和修饰符
    const str = '欢迎大家学习前端，相信大家一定能学好前端，都成为前端大神'
    // 1. 替换  replace  需求：把前端替换为 web
    // 1.1 replace 返回值是替换完毕的字符串
    // const strEnd = str.replace(/前端/, 'web') 只能替换一个

    // 2. 修饰符 g 全部替换
    const strEnd = str.replace(/前端/g, 'web')
    console.log(strEnd) 
  </script>
</body>
```

## 扩展

### URL.createObjectURL()

[URL.createObjectURL() - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL_static#%E8%A7%84%E8%8C%83)

主要用于上传文件后，生成本地浏览所用的URL

```javascript
objectURL = URL.createObjectURL(object);
// 假设获取了img元素，即可直接设置图片src
img.src = objectURL
```

### FileReader()

使用` FileReader() `构造器去创建一个新的 FileReader.

[FileReader - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)

**FileReader** 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 [File](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 或 [Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象指定要读取的文件或数据。

#### FileReader.readAsDataURL()

readAsDataURL 方法会读取指定的 [Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 或 [File](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 对象。读取操作完成的时候，[readyState](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readyState) 会变成已完成DONE，并触发 [loadend](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/loadend_event) 事件，同时 [<font style="background-color:#FBDE28;">result</font>](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/result)<font style="color:rgb(27, 27, 27);background-color:#FBDE28;"> 属性将包含一个</font><font style="color:rgb(27, 27, 27);background-color:#FBDE28;">data:</font><font style="color:rgb(27, 27, 27);background-color:#FBDE28;">URL 格式的字符串（base64 编码）</font>以表示所读取文件的内容。

```javascript
const onSelectFile = (uploadFile) =>{//基于FileReader读取图片做预览
  const reader = new FileReader() //创建FileReader对象
  //FileReader对象的readAsDataURL方法 把图片转为base64
  reader.readAsDataURL(uploadFile.raw) 
  reader.onload=()=>{
    imgUrl.value = reader.result
  }
}
```

### FormData

[https://developer.mozilla.org/zh-CN/docs/Web/API/FormData](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)

