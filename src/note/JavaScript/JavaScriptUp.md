---
icon: fa-brands:js
date: 2025-02-12
category:
  - JavaScript
  - 前端笔记
tag:
  - JavaScript
---

# JavaScrip 进阶

## 作用域
> 了解作用域对程序执行的影响及作用域链的查找机制，使用闭包函数创建隔离作用域避免全局变量污染。
>

作用域（scope）规定了变量能够被访问的“范围”，离开了这个“范围”变量便不能被访问，作用域分为全局作用域和局部作用域。

### 局部作用域（Local）
局部作用域分为函数作用域和块作用域。

#### 函数作用域
在函数内部声明的变量只能在函数内部被访问，外部无法直接访问。

```html
<script>
  // 声明 counter 函数
  function counter(x, y) {
    // 函数内部声明的变量
    const s = x + y
    console.log(s) // 18
  }
  // 设用 counter 函数
  counter(10, 8)
  // 访问变量 s
  console.log(s)// 报错
</script>
```

总结：

1. 函数内部声明的变量，在函数外部无法被访问
2. 函数的参数也是函数内部的局部变量
3. 不同函数内部声明的变量无法互相访问
4. 函数执行完毕后，函数内部的变量实际被清空了

#### 块作用域
在 JavaScript 中使用 `{}` 包裹的代码称为代码块，代码块内部声明的变量外部将【有可能】无法被访问。

```html
<script>
  {
    // age 只能在该代码块中被访问
    let age = 18;
    console.log(age); // 正常
  }
  
  // 超出了 age 的作用域
  console.log(age) // 报错
  
  let flag = true;
  if(flag) {
    // str 只能在该代码块中被访问
    let str = 'hello world!'
    console.log(str); // 正常
  }
  
  // 超出了 age 的作用域
  console.log(str); // 报错
  
  for(let t = 1; t <= 6; t++) {
    // t 只能在该代码块中被访问
    console.log(t); // 正常
  }
  
  // 超出了 t 的作用域
  console.log(t); // 报错
</script>
```

JavaScript 中除了变量外还有常量，常量与变量本质的区别是【常量必须要有值且不允许被重新赋值】，常量值为对象时其属性和方法允许重新赋值。

```html
<script>
  // 必须要有值
  const version = '1.0.0';

  // 不能重新赋值
  // version = '1.0.1';

  // 常量值为对象类型
  const user = {
    name: '小明',
    age: 18
  }

  // 不能重新赋值
  user = {};

  // 属性和方法允许被修改
  user.name = '小小明';
  user.gender = '男';
</script>
```

总结：

1. `let` 声明的变量会产生块作用域，`var` 不会产生块作用域
2. `const` 声明的常量也会产生块作用域
3. 不同代码块之间的变量无法互相访问
4. 推荐使用 `let` 或 `const`

注：开发中 `let` 和 `const` 经常不加区分的使用，如果担心某个值会不小被修改时，则只能使用 `const` 声明成常量。

### 全局作用域（Global）
`<script>` 标签和 `.js` 文件的【最外层】就是所谓的全局作用域，在此声明的变量在函数内部也可以被访问。

```html
<script>
  // 此处是全局
  
  function sayHi() {
    // 此处为局部
  }

  // 此处为全局
</script>
```

全局作用域中声明的变量，任何其它作用域都可以被访问，如下代码所示：

```html
<script>
    // 全局变量 name
    const name = '小明'
  
  	// 函数作用域中访问全局
    function sayHi() {
      // 此处为局部
      console.log('你好' + name)
    }

    // 全局变量 flag 和 x
    const flag = true
    let x = 10
  
  	// 块作用域中访问全局
    if(flag) {
      let y = 5
      console.log(x + y) // x 是全局的
    }
</script>
```

总结：

1. 为 `window` 对象动态添加的属性默认也是全局的，不推荐！
2. 函数中未使用任何关键字声明的变量为全局变量，不推荐！！！
3. 尽可能少的声明全局变量，防止全局变量被污染

JavaScript 中的作用域是程序被执行时的底层机制，了解这一机制有助于规范代码书写习惯，避免因作用域导致的语法错误。

### 作用域链
在解释什么是作用域链前先来看一段代码：

```html
<script>
  // 全局作用域
  let a = 1
  let b = 2
  // 局部作用域
  function f() {
    let c
    // 局部作用域
    function g() {
      let d = 'yo'
    }
  }
</script>
```

函数内部允许创建新的函数，`f` 函数内部创建的新函数 `g`，会产生新的函数作用域，由此可知作用域产生了嵌套的关系。

如下图所示，父子关系的作用域关联在一起形成了链状的结构，作用域链的名字也由此而来。

<font style="color:#DF2A3F;background-color:#FBDE28;">作用域链本质上是底层的变量查找机制</font>，在函数被执行时，会优先查找当前函数作用域中查找变量，如果当前作用域查找不到则会依次逐级查找父级作用域直到全局作用域，如下代码所示：

```html
<script>
  // 全局作用域
  let a = 1
  let b = 2

  // 局部作用域
  function f() {
    let c
    // let a = 10;
    console.log(a) // 1 或 10
    console.log(d) // 报错
    
    // 局部作用域
    function g() {
      let d = 'yo'
      // let b = 20;
      console.log(b) // 2 或 20
    }
    
    // 调用 g 函数
    g()
  }

  console.log(c) // 报错
  console.log(d) // 报错
  
  f();
</script>
```

总结：

1. 嵌套关系的作用域串联起来形成了作用域链
2. 相同作用域链中按着从小到大的规则查找变量
3. 子作用域能够访问父作用域，父级作用域无法访问子级作用域

### 垃圾回收机制
 JS环境中分配的内存, 一般有如下生命周期： 

1. 内存分配：当我们声明变量、函数、对象的时候，系统会自动为他们分配内存 

2. 内存使用：即读写内存，也就是使用变量、函数等 

3. 内存回收：使用完毕，由垃圾回收自动回收不再使用的内存  

4. 说明

 全局变量一般不会回收(关闭页面回收)； 

 一般情况下局部变量的值, 不用了, 会被自动回收掉

#### 引用计数（现浏览器多使用第二种）
IE采用的引用计数算法, 定义“内存不再使用”，就是看一个对象是否有指向它的引用，没有引用了就回收对象

算法：

1. 跟踪记录被引用的次数

2. 如果被引用了一次，那么就记录次数1,多次引用会累加 ++

3. 如果减少一个引用就减1 --

4. 如果引用次数是0 ，则释放内

```javascript
let arr = [1, 2, 3, 4] 
arr = nul  
```

它存在一个致命的问题：

嵌套引用（循环引用） 如果两个对象相互引用，尽管他们已不再使用，垃圾回收器不会进行回收，导致内存泄露。 因为他们的引用次数永远不会是0。这样的相互引用如果说很大量的存在就会导致大量的内存泄露。

```javascript
function fn() { 
  let o1 = {} 
  let o2 = {} 
  o1.a = o2 
  o2.a = o1 
  return '引用计数无法回收' 
} 
fn()   
```

#### 标记清除法 
现代的浏览器已经<font style="color:#DF2A3F;">不再使用引用计数算法</font>了。

现代浏览器通用的大多是基于标记清除算法的某些改进算法，总体思想都是一致的。

核心：

1. 标记清除算法将“不再使用的对象”定义为“无法达到的对象”。

2. 就是从根部（在JS中就是全局对象）出发定时扫描内存中的对象。 凡是能从根部到达的对象，都是还需要使用的。

3. 那些无法由根部出发触及到的对象被标记为不再使用，稍后进行回收

总结：

<font style="color:#DF2A3F;background-color:#FBDE28;"> 1. 标记清除法核心思路是什么？ 从根部扫描对象，能查找到的就是使用的，查找不到的就要回收  </font>

### 闭包（Closure）
闭包是一种比较特殊和函数，使用闭包能够访问函数作用域中的变量。从代码形式上看闭包是一个做为返回值的函数，如下代码所示：

<font style="color:rgb(51, 51, 51);">1.怎么理解闭包？</font>

+ <font style="color:rgb(51, 51, 51);">闭包 = 内层函数 + 外层函数的变量</font>

<font style="background-color:#FBDE28;">（函数套函数，且内层函数用到外层函数的变量）</font>

<font style="color:rgb(51, 51, 51);">2.闭包的作用？</font>

+ <font style="color:rgb(51, 51, 51);">封闭数据，实现数据私有，外部也可以访问函数内部的变量</font>
+ <font style="color:rgb(51, 51, 51);">闭包很有用，因为它允许将函数与其所操作的某些数据（环境）关联起来</font>

<font style="color:rgb(51, 51, 51);">3.闭包可能引起的问题？</font>

+ <font style="color:rgb(51, 51, 51);">内存泄漏</font>

<font style="color:#DF2A3F;background-color:#FBDE28;">内层函数的局部变量不会被回收</font>

```html
<body>
  <script>
    // 1. 闭包 : 内层函数 + 外层函数变量
    // function outer() {
    //   const a = 1
    //   function f() {
    //     console.log(a)
    //   }
    //   f()
    // }
    // outer()

    // 2. 闭包的应用： 实现数据的私有。统计函数的调用次数
    // let count = 1
    // function fn() {
    //   count++
    //   console.log(`函数被调用${count}次`)
    // }

    // 3. 闭包的写法  统计函数的调用次数
    function outer() {
      let count = 1
      function fn() {
        count++
        console.log(`函数被调用${count}次`)
      }
      return fn
    }
    const re = outer()
    // const re = function fn() {
    //   count++
    //   console.log(`函数被调用${count}次`)
    // }
    re()
    re()
    // const fn = function() { }  函数表达式
    // 4. 闭包存在的问题： 可能会造成内存泄漏
  </script>
</body>
```

### 变量提升
js的缺陷，仅存在于var声明的变量，<font style="color:rgb(51, 51, 51);">它允许在变量声明之前即被访问</font>

<font style="color:rgb(51, 51, 51);">会把当前作用域内var声明的变量，提升到当前的作用域最前面。（只提升声明，不提升赋值）</font>

```javascript
<script>
  // 访问变量 str1
  console.log(str1 + 'world!');	//undefinedworld
	// 声明变量 str1
	var str1 = 'hello ';

  // 访问变量 str2
  console.log(str2 + 'world!');	//报错
	// 声明变量 str
	let str2 = 'hello ';
</script>
```

## <font style="color:rgb(51, 51, 51);">函数进阶</font>
### 函数提升
<font style="color:rgb(51, 51, 51);">会把所有函数提升到当前的作用域最前面。（只提升函数声明，不提升函数调用）</font>

<font style="color:rgb(51, 51, 51);">函数表达式必须先声明和赋值，再调用</font>

### <font style="color:rgb(51, 51, 51);">函数参数</font>
#### 动态参数 arguments
<font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">arguments</font><font style="color:rgb(51, 51, 51);"> 是函数内部内置的</font><font style="color:#DF2A3F;">伪数组</font><font style="color:rgb(51, 51, 51);">变量，它包含了调用函数时传入的所有实参。</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">arguments</font><font style="color:rgb(51, 51, 51);"> </font>只存在于函数里。

```html
<script>
  // 求生函数，计算所有参数的和
  function sum() {
    // console.log(arguments)
    let s = 0
    for(let i = 0; i < arguments.length; i++) {
      s += arguments[i]
    }
    console.log(s)
  }
  // 调用求和函数
  sum(5, 10)// 两个参数
  sum(1, 2, 4) // 两个参数
</script>
```

#### 剩余参数 ...arr
1. `...` 是语法符号，置于最末函数形参之前，用于获取多余的实参
2. 借助 `...` 获取的剩余实参，是个<font style="color:#DF2A3F;">真数组</font>

```html
<script>
  function config(baseURL, ...other) {	//other是任意变量名
    console.log(baseURL) // 得到 'http://baidu.com'
    console.log(other)  // other  得到 ['get', 'json']
  }
  // 调用函数
  config('http://baidu.com', 'get', 'json');
</script>
```

#### 展开运算符 ...
展开运算符不会修改数组

```html
<script>
  const arr = [1,2,3,4]
  console.log(...arr)	//1 2 3 4
</script>
```

一般用于求最大值、合并数组。

由于数组没有求最大值的方法，展开后用Math方法求最大值。

```html
<script>
  //1.求最大值
  const arr1 = [1,2,3,4]
  //Math.max(1,2,3,4)参数需要逗号隔开,
  //但直接输出...arr是无逗号的，官方给出的说明是...arr逗号隔开
  console.log(Math.max(...arr1))	//4
  console.log(Math.min(...arr1))	//1

  //2.合并数组
  const arr2 = [5,6,7]
  const arr = [...arr1, ...arr2]
  console.log(arr)	//[1,2,3,4,5,6,7]
</script>
```

### 箭头函数
<font style="color:rgb(51, 51, 51);">箭头函数是一种声明函数的简洁语法，它与普通函数并无本质的区别，差异性更多体现在语法格式上。</font>

**<font style="color:rgb(51, 51, 51);">目的：</font>**<font style="color:rgb(51, 51, 51);">引入箭头函数的目的是更简短的函数写法并且不绑定this，箭头函数的语法比函数表达式更简洁</font>

**<font style="color:rgb(51, 51, 51);">使用场景：</font>**<font style="color:rgb(51, 51, 51);">箭头函数更适用于那些本来需要匿名函数的地方</font>

<font style="color:rgb(51, 51, 51);">1. 箭头函数属于表达式函数，因此不存在函数提升</font>

<font style="color:rgb(51, 51, 51);">2. 箭头函数只有一个参数时可以省略圆括号 `()`</font>

<font style="color:rgb(51, 51, 51);">3. 箭头函数函数体只有一行代码时可以省略花括号 `{}`，并自动做为返回值被返回</font>

```html
<body>
  <script>
    // const fn = function () {
    //   console.log(123)
    // }
    // 1. 箭头函数 基本语法
    // const fn = () => {
    //   console.log(123)
    // }
    // fn()
    // const fn = (x) => {
    //   console.log(x)
    // }
    // fn(1)
    // 2. 只有一个形参的时候，可以省略小括号
    // const fn = x => {
    //   console.log(x)
    // }
    // fn(1)
    // // 3. 只有一行代码的时候，我们可以省略大括号
    // const fn = x => console.log(x)
    // fn(1)
    // 4. 只有一行代码的时候，可以省略return
    // const fn = x => x + x
    // console.log(fn(1))
    // 5. 箭头函数可以直接返回一个对象
    // const fn = (uname) => ({ uname: uname })
    // console.log(fn('刘德华'))

  </script>
</body>
```

#### 箭头函数参数
<font style="color:rgb(51, 51, 51);">箭头函数中没有 </font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">arguments</font><font style="color:rgb(51, 51, 51);">，只能使用 </font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">...arr</font><font style="color:rgb(51, 51, 51);"> 动态获取实参</font>取实参

```html
<body>
  <script>
    // 1. 利用箭头函数来求和
    const getSum = (...arr) => {
      let sum = 0
      for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
      }
      return sum
    }
    const result = getSum(2, 3, 4)
    console.log(result) // 9
  </script>
```

#### <font style="color:rgb(51, 51, 51);">箭头函数 this</font>
<font style="color:rgb(51, 51, 51);">箭头函数不会创建自己的this，它只会从自己的作用域链的上一层沿用this。</font>

```html
<script>
    // 以前this的指向：  谁调用的这个函数，this 就指向谁
    // console.log(this)  // window
    // // 普通函数
    // function fn() {
    //   console.log(this)  // window
    // }
    // window.fn()
    // // 对象方法里面的this
    // const obj = {
    //   name: 'andy',
    //   sayHi: function () {
    //     console.log(this)  // obj
    //   }
    // }
    // obj.sayHi()

    // 2. 箭头函数的this  是上一层作用域的this 指向
    // const fn = () => {
    //   console.log(this)  // window
    // }
    // fn()
    // 对象方法箭头函数 this
    // const obj = {
    //   uname: 'pink老师',
    //   sayHi: () => {
    //     console.log(this)  // this 指向谁？ window
    //   }
    // }
    // obj.sayHi()

    const obj = {
      uname: 'pink老师',
      sayHi: function () {
        console.log(this)  // obj
        let i = 10
        const count = () => {
          console.log(this)  // obj 
        }
        count()
      }
    }
    obj.sayHi()

</script>
```

## 解构赋值
> 知道解构的语法及分类，使用解构简洁语法快速为变量赋值。
>

解构赋值是一种快速为变量赋值的简洁语法，本质上仍然是为变量赋值，分为数组解构、对象解构两大类型。

### 数组解构
数组解构是将数组的单元值快速批量赋值给一系列变量的简洁语法，如下代码所示：

```html
<script>
  // 普通的数组
  let arr = [1, 2, 3]
  // 批量声明变量 a b c 
  // 同时将数组单元值 1 2 3 依次赋值给变量 a b c
  let [a, b, c] = arr
  //let [a, b, c] = [1, 2, 3]
  console.log(a); // 1
  console.log(b); // 2
  console.log(c); // 3

  //交换变量
  let c = 1
  let d = 2;	//要加分号
  [c, d] = [d, c]

  //变量多，值少
  //let [a1, a2, a3, a4] = [1, 2, 3]
  //console.log(a1)	//1
  //console.log(a2)	//2
  //console.log(a3)	//3
  //console.log(a4)	//undefind
	//给默认值，防止传递undefind
	let [a1=0, a2=0, a3=0, a4=0] = [1, 2, 3]
  console.log(a1)	//1
  console.log(a2)	//2
  console.log(a3)	//3
  console.log(a4)	//0
  
   //变量少，值多 可用剩余参数
   let [b1, b2, ...b3] = [1, 2, 3, 4]
   console.log(b1)	//1
   console.log(b2)	//2
   console.log(b3)	//[3, 4] 真数组
  
   //按需导入赋值
   let [c1, c2, , c3] = [1, 2, 3, 4]
   console.log(c1)	//1
   console.log(c2)	//2
   console.log(c3)	//4
  
   //多维数组解构
   //let [d1, d2, d3] = [1, 2, [3, 4]]
   //console.log(c1)	//1
   //console.log(c2)	//2
   //console.log(c3)	//[3, 4]
   let [d1, d2, [d3, d4]] = [1, 2, [3, 4]]
   console.log(c1)	//1
   console.log(c2)	//2
   console.log(c3)	//3
   console.log(c4)	//4
    
</script>
```

总结：

1. 赋值运算符 `=` 左侧的 `[]` 用于批量声明变量，右侧数组的单元值将被赋值给左侧的变量
2. 变量的顺序对应数组单元值的位置依次进行赋值操作
3. 变量的数量大于单元值数量时，多余的变量将被赋值为  `undefined`
4. 变量的数量小于单元值数量时，可以通过 `...` 获取剩余单元值，但只能置于最末位
5. 允许初始化变量的默认值，且只有单元值为 `undefined` 时默认值才会生效

注：支持多维解构赋值，比较复杂后续有应用需求时再进一步分析

### 对象解构
对象解构是将对象属性和方法快速批量赋值给一系列变量的简洁语法，如下代码所示：

```html
<script>
  // 普通对象
  const user = {
    name: '小明',
    age: 18
  };
  // 批量声明变量 name age
  // 同时将数组单元值 小明  18 依次赋值给变量 name  age
  //const {name, age} = user
  //必须变量名和属性名相同
  const {name, age} = {name: '小明', age: 18} 
	console.log(name) // 小明
  console.log(age) // 18
  
  //变量更名
  const {name: uname, age} = {name: '小明', age: 18} //必须变量名和属性名相同
  console.log(uname)  // 小明
  
	//数组对象解构
  // let a = [{
  //   name: '张三'，
  //   age: 18
  // }]
  // let [{name, age}] = a

  let a = [{
    name: '张三',
    age: 18
  },{
    name: '李四',
    age: 19
  }]
  let [a1={name, age}, a2={name, age}] = a
  //a1，a2输出两个对象
  //let b = [{name, age},{name, age}] = a
  //b[0],b[1]输出两个对象
  
  //多级对象解构 
  let b = {
    name: '佩奇'，
  	family: {
      mother: '猪妈妈',
      father: '猪爸爸',
      sister: '乔治'
    },
    age: 18
  }
  let {name, family: {mother, father, sister}, age} = b
  
</script>
```

总结：

1. 赋值运算符 `=` 左侧的 `{}` 用于批量声明变量，右侧对象的属性值将被赋值给左侧的变量
2. <font style="color:#DF2A3F;">对象属性的值将被赋值给与属性名相同的变量</font>
3. 对象中找不到与变量名一致的属性时变量值为 `undefined`
4. 允许初始化变量的默认值，属性不存在或单元值为 `undefined` 时默认值才会生效

注：支持多维解构赋值

```html
<body>
  <script>
    // 1. 这是后台传递过来的数据
    const msg = {
      "code": 200,
      "msg": "获取新闻列表成功",
      "data": [
        {
          "id": 1,
          "title": "5G商用自己，三大运用商收入下降",
          "count": 58
        },
        {
          "id": 2,
          "title": "国际媒体头条速览",
          "count": 56
        },
        {
          "id": 3,
          "title": "乌克兰和俄罗斯持续冲突",
          "count": 1669
        },

      ]
    }

    // 需求1： 请将以上msg对象  采用对象解构的方式 只选出  data 方面后面使用渲染页面
    // const { data } = msg
    // console.log(data)
    // 需求2： 上面msg是后台传递过来的数据，我们需要把data选出当做参数传递给 函数
    // const { data } = msg
    // msg 虽然很多属性，但是我们利用解构只要 data值
    function render({ data }) {
      // const { data } = arr
      // 我们只要 data 数据
      // 内部处理
      console.log(data)

    }
    render(msg)

    // 需求3， 为了防止msg里面的data名字混淆，要求渲染函数里面的数据名改为 myData
    function render({ data: myData }) {
      // 要求将 获取过来的 data数据 更名为 myData
      // 内部处理
      console.log(myData)

    }
    render(msg)

  </script>
```

## 深入对象
### 创建对象的三种方法
```html
<body>
  <script>
    // 1.字面量创建
    const obj = {
      uname = '张三'
      age = 18
    }

    // 2.用系统自带的构造函数new Object创建
    	// 用new创建空对象
    const obj = new Object()
    	// 追加属性
    obj.uname = '张三'
    // 或
    const obj = new Object({name:'张三'})
   
  	// 3.自定义构造函数创建
    
  </script>
</body>
```

### 构造函数
构造函数是专门用于创建对象的函数，如果一个函数使用 `new` 关键字调用，那么这个函数就是构造函数。

构造函数可以快速创建多个类似的对象

<imageProxy src="https://cdn.nlark.com/yuque/0/2023/png/36126128/1699269097961-0a6e692b-eeac-4302-b391-8f33a66e7ea5.png"/>

```html
<script>
  // 定义函数
  function foo() {
    console.log('通过 new 也能调用函数...');
  }
  // 调用函数
  new foo;
</script>
```

总结：

2. 使用 `new` 关键字调用函数的行为被称为实例化（构造函数只能用new操作）
3. 实例化构造函数时没有参数时可以省略 `()`
4. 构造函数的返回值即为新创建的对象
5. 构造函数内部的 `return` 返回的值无效！

注：实践中为了从视觉上区分构造函数和普通函数，习惯将构造函数的首字母大写。

### 内置构造函数
在 JavaScript 中**最主要**的数据类型有 6 种，分别是字符串、数值、布尔、undefined、null 和 对象，常见的对象类型数据包括数组和普通对象。其中字符串、数值、布尔、undefined、null 也被称为简单类型或基础类型，对象也被称为引用类型。

在 JavaScript 内置了一些构造函数，绝大部的数据处理都是基于这些构造函数实现的，JavaScript 基础阶段学习的 `Date` 就是内置的构造函数。

```html
<script>
  // 实例化
	let date = new Date();
  
  // date 即为实例对象
  console.log(date);
</script>
```

甚至字符串、数值、布尔、数组、普通对象也都有专门的构造函数，用于创建对应类型的数据。

#### Object
`Object` 是内置的构造函数，用于创建普通对象。

```html
<script>
  // 通过构造函数创建普通对象
  const user = new Object({name: '小明', age: 15})

  // 这种方式声明的变量称为【字面量】
  let student = {name: '杜子腾', age: 21}
  
  // 对象语法简写
  let name = '小红';
  let people = {
    // 相当于 name: name
    name,
    // 相当于 walk: function () {}
    walk () {
      console.log('人都要走路...');
    }
  }

  console.log(student.constructor);
  console.log(user.constructor);
  console.log(student instanceof Object);
</script>
```

总结：

1. 推荐使用字面量方式声明对象，而不是 `Object` 构造函数
2. `Object.assign` 静态方法创建新的对象（拷贝对象）
3. `Object.keys` 静态方法获取对象中所有属性
4. `Object.values` 表态方法获取对象中所有属性值

```html
<script>
  const o = {name:'佩奇',age:6}
  // 1.获取属性名
  let	arr = Object.key(o)
  console.log(arr);	//数组  [name,age]
  // 2.获取属性值
  let	arr = Object.values(o)
  console.log(arr);	//数组  ['佩奇',6]

  // 3.对象拷贝
  const oo = {}
  Object.assgin(oo,o)
	// 4.添加新属性、追加属性、合并对象
  Object.assign(o,{gender:'女'})
</script>
```

#### Array
`Array` 是内置的构造函数，用于创建数组。

```html
<script>
  // 构造函数创建数组
  let arr = new Array(5, 7, 8);

  // 字面量方式创建数组
  let list = ['html', 'css', 'javascript']

</script>
```

数组赋值后，无论修改哪个变量另一个对象的数据值也会相当发生改变。

总结：

1.  推荐使用字面量方式声明数组，而不是 `Array` 构造函数 
2.  实例方法 `forEach` 用于遍历数组，替代 `for` 循环 (重点) 
3.  实例方法 `filter` 过滤数组单元值，生成新数组(重点) 
4.  实例方法 `map` 迭代原数组，生成新数组(重点) 
5.  实例方法 `join` 数组元素拼接为字符串，返回字符串(重点) 
6.  实例方法  `find`  查找元素， 返回符合测试条件的第一个数组元素值，如果没有符合条件的则返回 undefined(重点) 
7.  实例方法`every` 检测数组所有元素是否都符合指定条件，如果**所有元素**都通过检测返回 true，否则返回 false(重点) 
8.  实例方法`some` 检测数组中的元素是否满足指定条件   **如果数组中有**元素满足条件返回 true，否则返回 false 
9.  实例方法 `concat`  合并两个数组，返回生成新数组 
10.  实例方法 `sort` 对原数组单元值排序 
11.  实例方法 `splice` 删除或替换原数组单元 
12.  实例方法 `reverse` 反转数组 
13.  实例方法 `findIndex`  查找元素的索引值 

#### 包装类型
在 JavaScript 中的字符串、数值、布尔具有对象的使用特征，如具有属性和方法，如下代码举例：

```html
<script>
  // 字符串类型
  const str = 'hello world!'
 	// 统计字符的长度（字符数量）
  console.log(str.length)
  
  // 数值类型
  const price = 12.345
  // 保留两位小数
  price.toFixed(2) // 12.34
</script>
```

之所以具有对象特征的原因是字符串、数值、布尔类型数据是 JavaScript 底层使用 Object 构造函数“包装”来的，被称为包装类型。

##### String
`String` 是内置的构造函数，用于创建字符串。

```html
<script>
  // 使用构造函数创建字符串
  let str = new String('hello world!');

  // 字面量创建字符串
  let str2 = '你好，世界！';

  // 检测是否属于同一个构造函数
  console.log(str.constructor === str2.constructor); // true
  console.log(str instanceof String); // true
</script>
```

总结：

1. 实例属性 `length` 用来获取字符串的度长(重点)
2. 实例方法 `split('分隔符')` 用来将字符串拆分成数组(重点)
3. 实例方法 `substring（需要截取的第一个字符的索引[,结束的索引号]）` 用于字符串截取(重点)
4. 实例方法 `startsWith(检测字符串[, 检测位置索引号])` 检测是否以某字符开头(重点)
5. 实例方法 `includes(搜索的字符串[, 检测位置索引号])` 判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false(重点)
6. 实例方法 `toUpperCase` 用于将字母转换成大写
7. 实例方法 `toLowerCase` 用于将就转换成小写
8. 实例方法 `indexOf`  检测是否包含某字符
9. 实例方法 `endsWith` 检测是否以某字符结尾
10. 实例方法 `replace` 用于替换字符串，支持正则匹配
11. 实例方法 `match` 用于查找字符串，支持正则匹配

注：String 也可以当做普通函数使用，这时它的作用是强制转换成字符串数据类型。

##### Number
`Number` 是内置的构造函数，用于创建数值。

```html
<script>
  // 使用构造函数创建数值
  let x = new Number('10')
  let y = new Number(5)

  // 字面量创建数值
  let z = 20

</script>
```

总结：

1. 推荐使用字面量方式声明数值，而不是 `Number` 构造函数
2. 实例方法 `toFixed` 用于设置保留小数位的长度

### 实例成员
通过构造函数创建的对象称为实例对象，实例对象中的属性和方法称为实例成员。

```html
<script>
  // 构造函数
  function Person() {
    // 构造函数内部的 this 就是实例对象
    // 实例对象中动态添加属性
    this.name = '小明'
    // 实例对象动态添加方法
    this.sayHi = function () {
      console.log('大家好~')
    }
  }
  // 实例化，p1 是实例对象
  // p1 实际就是 构造函数内部的 this
  const p1 = new Person()
  console.log(p1)
  console.log(p1.name) // 访问实例属性
  p1.sayHi() // 调用实例方法
</script>
```

总结：

1. 构造函数内部 `this` 实际上就是实例对象，为其动态添加的属性和方法即为实例成员
2. 为构造函数传入参数，动态创建结构相同但值不同的对象

注：构造函数创建的实例对象彼此独立互不影响。

### 静态成员
在 JavaScript 中底层函数本质上也是对象类型，因此允许直接为函数动态添加属性或方法，构造函数的属性和方法被称为静态成员。

例如Math().PI是3.14.....，PI就是静态属性

```html
<script>
  // 构造函数
  function Person(name, age) {
    // 省略实例成员
  }
  // 静态属性
  Person.eyes = 2
  Person.arms = 2
  // 静态方法
  Person.walk = function () {
    console.log('^_^人都会走路...')
    // this 指向 Person
    console.log(this.eyes)
  }
</script>
```

总结：

1. 静态成员指的是添加到构造函数本身的属性和方法
2. 一般公共特征的属性或方法静态成员设置为静态成员
3. 静态成员方法中的 `this` 指向构造函数本身

## 深入面向对象
### 编程思想
> 学习 JavaScript 中基于原型的面向对象编程序的语法实现，理解面向对象编程的特征。
>

#### 面向过程
面向过程就是分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候再一个一个的依次调用就可以了。

举个栗子：蛋炒饭

<imageProxy src="https://cdn.nlark.com/yuque/0/2023/png/36126128/1699342070168-d06de18c-9951-4214-9397-b5448bd83631.png"/>

#### 面向对象
面向对象是把事务分解成为一个个对象，然后由对象之间分工与合作。

<imageProxy src="https://cdn.nlark.com/yuque/0/2023/png/36126128/1699342074233-4a4f10be-70ac-417e-8119-2534b4864ee2.png"/>

在面向对象程序开发思想中，每一个对象都是功能中心，具有明确分工。

面向对象编程具有灵活、代码可复用、容易维护和开发的优点，更适合多人合作的大型软件项目。

面向对象的特性：

+  封装性 
+  继承性 
+  多态性 

### 构造函数
封装是面向对象思想中比较重要的一部分，js面向对象可以通过构造函数实现的封装。

前面我们学过的构造函数方法很好用，但是 存在`浪费内存`的问题（相同的静态成员在new不同对象时，会被重复实例化）

> 总结：
>
> 1. 构造函数体现了面向对象的封装特性
> 2. 构造函数实例创建的对象彼此独立、互不影响
>

通过面向对象的构造函数实现的封装：

```html
<script>
  function Person() {
    this.name = '佚名'
    // 设置名字
    this.setName = function (name) {
      this.name = name
    }
    // 读取名字
    this.getName = () => {
      console.log(this.name)
    }
  }

  // 实例对像，获得了构造函数中封装的所有逻辑
  let p1 = new Person()
  p1.setName('小明')
  console.log(p1.name)

  // 实例对象
  let p2 = new Person()
  console.log(p2.name)
</script>
```

### <font style="color:rgb(51, 51, 51);">原型对象</font>
构造函数通过原型分配的函数是所有对象所 共享的。

+ JavaScript 规定，每一个构造函数都有一个 prototype 属性，指向另一个对象，所以我们也称为原型对象
+ 这个对象可以挂载函数，对象实例化不会多次创建原型上函数，节约内存
+ 我们可以把那些不变的方法，直接定义在 prototype 对象上，这样所有对象的实例就可以共享这些方法。
+ 构造函数和原型对象中的this 都指向 实例化的对象

<font style="color:rgb(51, 51, 51);">JavaScript 中对象的工作机制：</font>**当访问对象的属性或方法时，先在当前实例对象是查找，然后再去原型对象查找，并且原型对象被所有实例共享。**

**<font style="color:rgb(51, 51, 51);">公共属性写在构造函数，公共方法写在原型。</font>**

```html
<script>
  function Person() {
    
  }

  // 每个函数都有 prototype 属性
  console.log(Person.prototype)
  
	// prototype对象挂载函数，对象实例化不会多次创建原型上函数，节约内存
  function People(uname,age) {
    this.uname = uname
    this.age = age
    
  }
  People.prototype.sayHi = function(){
    console.log('Hi~')
  }
	const ls = new People('李四', 18)
  const zs = new People('张三', 20)
  console.log(ls == zs)	//false
  console.log(ls.sayHi == zs.sayHi)	//true

  
</script>
```

<font style="color:rgb(51, 51, 51);">构造函数 </font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">Person</font><font style="color:rgb(51, 51, 51);"> 中未定义任何方法，这时实例对象调用了原型对象中的方法 </font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">sayHi</font><font style="color:rgb(51, 51, 51);"></font>

```html
<script>
  function Person() {
    // 此处未定义任何方法
  }

  // 为构造函数的原型对象添加方法
  Person.prototype.sayHi = function () {
    console.log('Hi~');
  }
	
  // 实例化
  let p1 = new Person();
  p1.sayHi(); // 输出结果为 Hi~
</script>
```

<font style="color:rgb(51, 51, 51);">构造函数 </font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">Person</font><font style="color:rgb(51, 51, 51);"> 中定义与原型对象中相同名称的方法，这时实例对象调用则是构造函中的方法 </font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">sayHi</font><font style="color:rgb(51, 51, 51);">。</font>

```html
<script>
  function Person() {
    // 此处定义同名方法 sayHi
    this.sayHi = function () {
      console.log('嗨!');
    }
  }

  // 为构造函数的原型对象添加方法
  Person.prototype.sayHi = function () {
    console.log('Hi~');
  }

  let p1 = new Person();
  p1.sayHi(); // 输出结果为 嗨!
</script>
```

####  给数组扩展方法 
 给数组扩展求最大值方法和求和方法

<imageProxy src="https://cdn.nlark.com/yuque/0/2023/png/36126128/1699362291479-7a292694-0b2b-4cce-9b1b-f0228b0bab29.png"/>

#### constructor 属性
 每个原型对象里面都有个constructor 属性（constructor 构造函数）

作用：该属性指向该原型对象的构造函数， 简单理解，就是指向我的爸爸，我是有爸爸的孩子

**使用场景：**

如果有多个对象的方法，我们可以给原型对象采取对象形式赋值。

但是这样就会覆盖构造函数原型对象原来的内容，这样修改后的原型对象 constructor 就不再指向当前构造函数了

此时，我们可以在修改后的原型对象中，添加一个 constructor 指向原来的构造函数。

<imageProxy src="https://cdn.nlark.com/yuque/0/2023/png/36126128/1699363002937-47bedf8c-ecd1-43e1-8175-e5012a66fb61.png"/>

```html
<script>
  // constructor  单词 构造函数

  // Star.prototype.sing = function () {
  //   console.log('唱歌')
  // }
  // Star.prototype.dance = function () {
  //   console.log('跳舞')
  // }
  function Star() {
  }
  // console.log(Star.prototype)
  Star.prototype = {
    // 从新指回创造这个原型对象的 构造函数
    constructor: Star,
    sing: function () {
      console.log('唱歌')
    },
    dance: function () {
      console.log('跳舞')
    },
  }
  console.log(Star.prototype)
  // console.log(Star.prototype.constructor)

  // const ldh = new Star()
  // console.log(Star.prototype.constructor === Star)
</script>
```

#### 对象原型__proto__
__proto__在谷歌等一些浏览器显示为[[prototype]]，是只读属性 

<imageProxy src="https://cdn.nlark.com/yuque/0/2023/png/36126128/1699366577794-ccb3f49c-1758-4c12-932d-c8ecdfa46faa.png"/>

```html
<script>
    function Star() {

    }
    const ldh = new Star()
    // （实例对象的）对象原型__proto__ 指向 构造函数的原型对象prototype
    console.log(ldh.__proto__)
  	// console.log(ldh.__proto__ === Star.prototype)	//true
  
    // 对象原型里面有constructor 指向 构造函数 Star
    console.log(ldh.__proto__.constructor === Star)

</script>
```

...

> [JavaScript原型链.drawio.doc](https://www.yuque.com/attachments/yuque/0/2024/doc/36126128/1733218693022-0b028f15-936f-4a2f-b1c5-97b5c9043269.doc) 去掉doc后缀
>
> <imageProxy src="https://cdn.nlark.com/yuque/0/2024/png/36126128/1733218556212-3e81c891-2ee1-4698-8774-b6194a7fbcd1.png"/>
>


#### 原型继承
<imageProxy src="https://cdn.nlark.com/yuque/0/2023/png/36126128/1699442526564-b1211bcc-0bd6-40b7-b16c-84b729c0c866.png"/>

构造函数的原型对象还是构造函数，分别是：父构造函数（父类），子构造函数（子类）

```html
<body>
  <script>
    // 继续抽取   公共的部分放到原型上
    // const Person1 = {
    //   eyes: 2,
    //   head: 1
    // }
    // const Person2 = {
    //   eyes: 2,
    //   head: 1
    // }
    // 构造函数  new 出来的对象 结构一样，但是对象不一样
    function Person() {
      this.eyes = 2
      this.head = 1
    }
    // console.log(new Person)
    // 女人  构造函数   继承  想要 继承 Person
    function Woman() {

    }
    // Woman 通过原型来继承 Person
    // 父构造函数（父类）   子构造函数（子类）
    // 子类的原型 =  new 父类  
    Woman.prototype = new Person()   // {eyes: 2, head: 1} 
    // 指回原来的构造函数
    Woman.prototype.constructor = Woman

    // 给女人添加一个方法  生孩子
    Woman.prototype.baby = function () {
      console.log('宝贝')
    }
    const red = new Woman()
    console.log(red)
    // console.log(Woman.prototype)
    // 男人 构造函数  继承  想要 继承 Person
    function Man() {

    }
    // 通过 原型继承 Person
    Man.prototype = new Person()
    Man.prototype.constructor = Man
    const pink = new Man()
    console.log(pink)
  </script>
</body>
```

#### 原型链
基于原型对象的继承使得不同构造函数的原型对象关联在一起，并且这种关联的关系是一种链状的结构，我们将原型对象的链状结构关系称为原型链

<imageProxy src="https://cdn.nlark.com/yuque/0/2023/png/36126128/1699444767802-52f8deeb-fef8-440a-95a1-796a15d4d534.png"/>


<imageProxy src="https://cdn.nlark.com/yuque/0/2023/png/36126128/1699444957564-f1a2a5ef-db53-41a0-b2bd-5493d5e25d2d.png"/>

```html
<body>
  <script>
    // function Objetc() {}
    console.log(Object.prototype)
    console.log(Object.prototype.__proto__)

    function Person() {

    }
    const ldh = new Person()
    // console.log(ldh.__proto__ === Person.prototype)
    // console.log(Person.prototype.__proto__ === Object.prototype)
    console.log(ldh instanceof Person)
    console.log(ldh instanceof Object)
    console.log(ldh instanceof Array)
    console.log([1, 2, 3] instanceof Array)
    console.log(Array instanceof Object)
  </script>
</body>
```

① 当访问一个对象的属性（包括方法）时，首先查找这个对象自身有没有该属性。

② 如果没有就查找它的原型（也就是 **proto**指向的 prototype 原型对象）

③ 如果还没有就查找原型对象的原型（Object的原型对象）

④ 依此类推一直找到 Object 为止（null）

⑤ **proto**对象原型的意义就在于为对象成员查找机制提供一个方向，或者说一条路线

⑥ 可以使用 instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上

##### instanceof
检测是否在原型链，返回true/false

<imageProxy src="https://cdn.nlark.com/yuque/0/2023/png/36126128/1699449585950-a78b28d9-8837-484e-a5e2-92ab6068386a.png"/>
<imageProxy src="https://cdn.nlark.com/yuque/0/2023/png/36126128/1699449651532-5884b31f-a24c-44c5-ba0b-7b02018e7b18.png"/>


## 深浅拷贝
### 浅拷贝
首先浅拷贝和深拷贝 只针对引用类型

浅拷贝：拷贝的是地址<font style="color:rgb(51, 51, 51);">（只拷贝最外面一层的地址，引用数据类型里的引用数据类型不会拷贝，赋值后修改还会受影响）</font>

常见方法：

1. 拷贝对象：Object.assgin() 或者 展开运算符 {...obj} 拷贝对象

```html
<script>
    //obj的age为18
    const obj = {
      uname: 'pink',
      age: 18,
      family: {
        mom: '1',
        baby: '2'
      }
    }
  
    // const o = obj
    // console.log(o)		//o.age:18
    // o.age = 20				//o.age=20
    // console.log(o)		//o.age=20
    // console.log(obj)	//obj.age=20

  	// 浅拷贝 用展开运算符实现 不影响原对象
    const o = { ...obj }
    console.log(o)
    o.age = 20
    console.log(o)		//obj.age=20
    console.log(obj)	//obj.age=18

  	// 浅拷贝 用Object.assgin()实现 不影响原对象
    const o = {}
    Object.assign(o, obj)
    o.age = 20
    o.family.mom = '老pink'		//o和obj的mom都变成了老pink
    console.log(o)				//obj.age=20
    console.log(obj)			//obj.age=18
</script>
```

2. 拷贝数组：Array.prototype.concat() 或者 [...arr]

> 如果是简单数据类型拷贝值，引用数据类型拷贝的是地址 (简单理解： 如果是单层对象，没问题，如果有多层就有问题)
>

### 深拷贝
首先浅拷贝和深拷贝只针对引用类型

深拷贝：拷贝的是对象，不是地址

常见方法：

1. 通过递归实现深拷贝
2. lodash/cloneDeep
3. 通过JSON.stringify()实现

#### 递归实现深拷贝
函数递归：

如果一个函数在内部可以调用其本身，那么这个函数就是递归函数

+ 简单理解:函数内部自己调用自己, 这个函数就是递归函数
+ 递归函数的作用和循环效果类似
+ 由于递归很容易发生“栈溢出”错误（stack overflow），所以必须要加退出条件 return

```html
<body>
  <script>
    const obj = {
      uname: 'pink',
      age: 18,
      hobby: ['乒乓球', '足球'],
      family: {
        baby: '小pink'
      }
    }
    const o = {}
    // 拷贝函数
    function deepCopy(newObj, oldObj) {
      debugger
      for (let k in oldObj) {
        // 处理数组的问题  一定先写数组 在写 对象 不能颠倒
        if (oldObj[k] instanceof Array) {
          newObj[k] = []
          //  newObj[k] 接收 []  hobby
          //  oldObj[k]   ['乒乓球', '足球']
          deepCopy(newObj[k], oldObj[k])
        } else if (oldObj[k] instanceof Object) {
          newObj[k] = {}
          deepCopy(newObj[k], oldObj[k])
        }
        else {
          //  k  属性名 uname age    oldObj[k]  属性值  18
          // newObj[k]  === o.uname  给新对象添加属性
          newObj[k] = oldObj[k]
        }
      }
    }
    deepCopy(o, obj) // 函数调用  两个参数 o 新对象  obj 旧对象
    console.log(o)
    o.age = 20
    o.hobby[0] = '篮球'
    o.family.baby = '老pink'
    console.log(obj)
    console.log([1, 23] instanceof Object)
    // 复习
    // const obj = {
    //   uname: 'pink',
    //   age: 18,
    //   hobby: ['乒乓球', '足球']
    // }
    // function deepCopy({ }, oldObj) {
    //   // k 属性名  oldObj[k] 属性值
    //   for (let k in oldObj) {
    //     // 处理数组的问题   k 变量
    //     newObj[k] = oldObj[k]
    //     // o.uname = 'pink'
    //     // newObj.k  = 'pink'
    //   }
    // }
  </script>
</body>
```

#### js库lodash里面cloneDeep内部实现了深拷贝
> lodash中文文档 [https://www.lodashjs.com/](https://www.lodashjs.com/)
>
> 官网 [https://lodash.com/](https://lodash.com/)
>

```html
<body>
  <!-- 先引用 -->
  <script src="./lodash.min.js"></script>
  <script>
    const obj = {
      uname: 'pink',
      age: 18,
      hobby: ['乒乓球', '足球'],
      family: {
        baby: '小pink'
      }
    }
    const o = _.cloneDeep(obj)
    console.log(o)
    o.family.baby = '老pink'
    console.log(obj)
  </script>
</body>
```

#### JSON序列化
```html
<body>
  <script>
    const obj = {
      uname: 'pink',
      age: 18,
      hobby: ['乒乓球', '足球'],
      family: {
        baby: '小pink'
      }
    }
    // 把对象转换为 JSON 字符串
    // console.log(JSON.stringify(obj))
    const o = JSON.parse(JSON.stringify(obj))
    console.log(o)
    o.family.baby = '123'
    console.log(obj)
  </script>
</body>
```

## 异常处理
> 了解 JavaScript 中程序异常处理的方法，提升代码运行的健壮性。
>

### throw
（会中断程序）

异常处理是指预估代码执行过程中可能发生的错误，然后最大程度的避免错误的发生导致整个程序无法继续运行

总结：

1. throw 抛出异常信息，程序也会终止执行
2. throw 后面跟的是错误提示信息
3. Error 对象配合 throw 使用，能够设置更详细的错误信息

```html
<script>
  function counter(x, y) {

    if(!x || !y) {
      // throw '参数不能为空!';
      throw new Error('参数不能为空!')
    }

    return x + y
  }

  counter()
</script>
```

总结：

1. `throw` 抛出异常信息，程序也会终止执行
2. `throw` 后面跟的是错误提示信息
3. `Error` 对象配合 `throw` 使用，能够设置更详细的错误信息

### try ... catch
（不会中断程序，需要return中断程序）

**语法：**

> try {
>
> 【可能会错的代码】
>
> } catch (error) {	//error名可以自定
>
> 【 try 代码段中执行有错误时，会执行 catch 代码段】
>
> 
>
> 【message查看错误信息】
>
> console.log(error.message)       
>
> 【return中断程序】
>
> return
>
>  }
>
> finally {
>
> 【finally中的代码不管try对不对都会执行】
>
> }
>

```html
<script>
   function foo() {
      try {
        // 查找 DOM 节点
        const p = document.querySelector('.p')
        p.style.color = 'red'
      } catch (error) {
        // try 代码段中执行有错误时，会执行 catch 代码段
        // 查看错误信息
        console.log(error.message)
        // 终止代码继续执行
        return

      }
      finally {
        //finally不管代码对不对都会执行
          alert('执行')
      }
      console.log('如果出现错误，我的语句不会执行')
    }
    foo()
</script>
```

总结：

1. `try...catch` 用于捕获错误信息
2. 将预估可能发生错误的代码写在 `try` 代码段中
3. 如果 `try` 代码段中出现错误后，会执行 `catch` 代码段，并截获到错误信息

### async/await语法
<font style="color:rgb(5, 7, 59);">async/await</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">是JavaScript ES7引入的一种处理异步操作的新语法，使得异步操作的书写和理解更为直观和便捷。这种语法是基于Promise对象的，用于简化Promise的使用。</font>

+ **<font style="color:rgb(79, 31, 26);background-color:rgb(253, 253, 254);">async</font>**<font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">：放在函数前面，表示这个函数是异步的。一个async函数表示一个返回Promise的函数，不管这个函数有没有</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">await</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">关键字。</font>
+ **<font style="color:rgb(79, 31, 26);background-color:rgb(253, 253, 254);">await</font>**<font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">：只能在async函数中使用。await后面一般放一个Promise对象，表示等待这个Promise的结果。</font>

```javascript
//使用async关键字声明一个异步函数，该函数自动返回一个promise。
//如果在函数中返回一个值，它将被包装在一个解决的promise中。
async function myFunction() {  
  return "Hello, World!";  
}
//await关键字只能在async函数内部使用。
//它使JavaScript引擎等待直到promise完成并返回其结果。
async function fetchData() {  
  try {  
    const response = await fetch('https://api.example.com/data'); // 等待fetch完成  
    const data = await response.json(); // 等待解析JSON完成  
    return data;  
  } catch (error) {  
    console.error('Error:', error);  
  }  
}
```

### debugger
相当于断点调试

```javascript
debugger
```

## 处理this
> 了解函数中 this 在不同场景下的默认值，知道动态指定函数 this 值的方法。
>

`this` 是 JavaScript 最具“魅惑”的知识点，不同的应用场合 `this` 的取值可能会有意想不到的结果，在此我们对以往学习过的关于【 `this` 默认的取值】情况进行归纳和总结。

### 普通函数
**普通函数**的调用方式决定了 `this` 的值，即【谁调用 `this` 的值指向谁】，如下代码所示：

```html
<script>
  // 普通函数
  function sayHi() {
    console.log(this)  
  }
  // 函数表达式
  const sayHello = function () {
    console.log(this)
  }
  // 函数的调用方式决定了 this 的值
  sayHi() // window
  window.sayHi()
	

// 普通对象
  const user = {
    name: '小明',
    walk: function () {
      console.log(this)
    }
  }
  // 动态为 user 添加方法
  user.sayHi = sayHi
  uesr.sayHello = sayHello
  // 函数调用方式，决定了 this 的值
  user.sayHi()
  user.sayHello()
</script>
```

注： 普通函数没有明确调用者时 `this` 值为 `window`，严格模式下没有调用者时 `this` 的值为 `undefined`。

### 箭头函数
**箭头函数**中的 `this` 与普通函数完全不同，也不受调用方式的影响，事实上箭头函数中并不存在 `this` ！箭头函数中访问的 `this` 不过是箭头函数所在作用域的 `this` 变量。

```html
<script>
    
  console.log(this) // 此处为 window
  // 箭头函数
  const sayHi = function() {
    console.log(this) // 该箭头函数中的 this 为函数声明环境中 this 一致
  }
  // 普通对象
  const user = {
    name: '小明',
    // 该箭头函数中的 this 为函数声明环境中 this 一致
    walk: () => {
      console.log(this)
    },
    
    sleep: function () {
      let str = 'hello'
      console.log(this)
      let fn = () => {
        console.log(str)
        console.log(this) // 该箭头函数中的 this 与 sleep 中的 this 一致
      }
      // 调用箭头函数
      fn();
    }
  }

  // 动态添加方法
  user.sayHi = sayHi
  
  // 函数调用
  user.sayHi()
  user.sleep()
  user.walk()
</script>
```

在开发中【使用箭头函数前需要考虑函数中 `this` 的值】，**事件回调函数**使用箭头函数时，`this` 为全局的 `window`，因此DOM事件回调函数不推荐使用箭头函数，如下代码所示：

```html
<script>
  // DOM 节点
  const btn = document.querySelector('.btn')
  // 箭头函数 此时 this 指向了 window
  btn.addEventListener('click', () => {
    console.log(this)
  })
  // 普通函数 此时 this 指向了 DOM 对象
  btn.addEventListener('click', function () {
    console.log(this)
  })
</script>
```

同样由于箭头函数 `this` 的原因，**基于原型的面向对象也不推荐采用箭头函数**，如下代码所示：

```html
<script>
  function Person() {
  }
  // 原型对像上添加了箭头函数
  Person.prototype.walk = () => {
    console.log('人都要走路...')
    console.log(this); // window
  }
  const p1 = new Person()
  p1.walk()
</script>
```

### 改变this指向
以上归纳了普通函数和箭头函数中关于 `this` 默认值的情形，不仅如此 JavaScript 中还允许指定函数中 `this` 的指向，有 3 个方法可以动态指定普通函数中 `this` 的指向：

#### call
使用 `call` 方法调用函数，同时指定函数中 `this` 的值，使用方法如下代码所示：

> 语法：函数名.call(指定this，参数1， 参数2， ...， 参数N)
>

```html
<script>
  // 普通函数
  function sayHi() {
    console.log(this);
  }

  let user = {
    name: '小明',
    age: 18
  }

  let student = {
    name: '小红',
    age: 16
  }

  // 1、调用函数并指定 this 的值
  sayHi.call(user); // this 值为 user
  sayHi.call(student); // this 值为 student

  // 2、调用 counter 函数，并传入参数
  //例：求和函数
  function counter(x, y) {
    return x + y;
  }
  let result = counter.call(null, 5, 10);
  console.log(result);
  
</script>
```

总结：

1. `call` 方法能够在调用函数的同时指定 `this` 的值
2. 使用 `call` 方法调用函数时，第1个参数为 `this` 指定的值
3. `call` 方法的其余参数会依次自动传入函数做为函数的参数

#### apply
**apply传入的参数必须是数组（也可以传入单个变量、对象），其余和call一样**

使用 `apply` 方法**调用函数**，同时指定函数中 `this` 的值，使用方法如下代码所示：

```html
<script>
  // 普通函数
  function sayHi() {
    console.log(this)
  }

  let user = {
    name: '小明',
    age: 18
  }

  let student = {
    name: '小红',
    age: 16
  }

  //1、调用函数并指定 this 的值
  sayHi.apply(user) // this 值为 user
  sayHi.apply(student) // this 值为 student

  
  // 2、调用 counter 函数，并传入参数
  //例：求和函数
  function counter(x, y) {
    return x + y
  }
  let result = counter.apply(null, [5, 10])
  console.log(result)


  //3、apply和Math结合用法，例Math.max()用法
  //Math基本用法：Math.max(1,2,3,4)
  //展开运算符写法：Math.max(...arr)
  //早期没有展开运算符"..."的时候，用apply实现
  const arr = [1,2,3,4]
  console.log(Math.max.apply(Math,arr))
</script>
```

总结：

1. `apply` 方法能够在调用函数的同时指定 `this` 的值
2. 使用 `apply` 方法调用函数时，第1个参数为 `this` 指定的值
3. `apply` 方法第2个参数为数组，数组的单元值依次自动传入函数做为函数的参数

#### bind
`bind` 方法并**不会调用函数**，而是创建一个指定了 `this` 值的新函数，使用方法如下代码所示：

```html
<script>
  // 普通函数
  function sayHi() {
    console.log(this)
  }
  let user = {
    name: '小明',
    age: 18
  }
  // 调用 bind 指定 this 的值
  let sayHello = sayHi.bind(user);
  // 调用使用 bind 创建的新函数
  sayHello()
</script>
```

注：`bind` 方法创建新的函数，与原函数的唯一的变化是改变了 `this` 的值。

## 防抖节流

<imageProxy src="https://cdn.nlark.com/yuque/0/2023/png/36126128/1699704437773-f73dc5ef-8610-4666-9d02-5138ac7ac82a.png"/>
<imageProxy src="https://cdn.nlark.com/yuque/0/2023/png/36126128/1699704449186-7988927e-f215-490b-b041-d95ba6125a05.png"/>

### 防抖（debounce）
所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间

```html
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <style>
    .box {
      width: 500px;
      height: 500px;
      background-color: #ccc;
      color: #fff;
      text-align: center;
      font-size: 100px;
    }
  </style>
</head>
<body>
  <div class="box"></div>
  <script src="lodash.min.js"></script>
  <script>
    const box = document.querySelector('.box')
    let i = 1  // 让这个变量++
    // 鼠标移动函数
    function mouseMove() {
      box.innerHTML = ++i
      // 如果里面存在大量操作 dom 的情况，可能会卡顿
    }

    
    // 1、手写防抖函数
    function debounce(fn, t) {
      let timeId
      //必须写return
      return function () {
        // 如果有定时器就清除
        if (timeId) clearTimeout(timeId)
        // 开启定时器 200
        timeId = setTimeout(function () {
          fn()
        }, t)
      }
    }
    // 由于事件调用的函数有“（ ）”参数，开始会执行一次之后就不会执行了
    // 所以事件调用的函数必须写return返回一个匿名函数
    // 相当于监听事件的回调函数设为return这个函数
    // 相当于以下代码
    box.addEventListener('mousemove', debounce(mouseMove, 200))
  	let timeId
      box.addEventListener('mousemove',function(){
        // 如果有定时器就清除
        if (timeId) clearTimeout(timeId)
          // 开启定时器 200
          timeId = setTimeout(function () {
            mouseMove()
          }, 200)
      })

    // 2、lodash 防抖写法
		//在前面引入 lodash.min.js
    box.addEventListener('mousemove', _.debounce(mouseMove, 200))
  </script>
</body>
```

### 节流（throttle）
所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数

```html
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <style>
    .box {
      width: 500px;
      height: 500px;
      background-color: #ccc;
      color: #fff;
      text-align: center;
      font-size: 100px;
    }
  </style>
</head>

<body>
  <div class="box"></div>
  <script>
    const box = document.querySelector('.box')
    let i = 1  // 让这个变量++
    // 鼠标移动函数
    function mouseMove() {
      box.innerHTML = ++i
      // 如果里面存在大量操作 dom 的情况，可能会卡顿
    }

    // console.log(mouseMove)

   	// 1、手写节流函数 throttle
    function throttle(fn, t) {
      let timer = null
      return function () {
        // 判断有没有定时器
        if (!timer) {
          timer = setTimeout(function(){
            fn()
            //时间到了，清空定时器
            //在setTimeout中无法用clearTimeout清除定时器，要用null
            timer = null
          },t)
        }
      }
    }
    box.addEventListener('mousemove', throttle(mouseMove, 200))
    // 由于事件调用的函数有“（ ）”参数，开始会执行一次之后就不会执行了
    // 所以事件调用的函数必须写return返回一个匿名函数
    // 相当于监听事件的回调函数设为return这个函数
    // 相当于以下代码
    let timer = null
    box.addEventListener('mousemove', function(){
      // 判断有没有定时器
      if (!timer) {
          timer = setTimeout(function(){
            mouseMove()
            //时间到了，清空定时器
            //在setTimeout中无法用clearTimeout清除定时器，要用null
            timer = null
          },200)
        }
    })


    // 2、lodash 节流写法
    //在前面引入 lodash.min.js
    // box.addEventListener('mousemove', _.throttle(mouseMove, 500))

    
    // 3、其他写法
    function throttle(fn, t) {
      // 起始时间
      let startTime = 0
      return function () {
        // 得到当前的时间
        let now = Date.now()
        // 判断如果大于等于 500 采取调用函数
        if (now - startTime >= t) {
          // 调用函数
          fn()
          // 起始的时间 = 现在的时间   写在调用函数的下面 
          startTime = now
        }
      }
    }
    box.addEventListener('mousemove', throttle(mouseMove, 500))
    // 相当于
    let startTime = 0
    box.addEventListener('mousemove', function () {
      // 得到当前的时间
      let now = Date.now()
      // 判断如果大于等于 500 采取调用函数
      if (now - startTime >= 500) {
        // 调用函数
        mouseMove()
        // 起始的时间 = 现在的时间   写在调用函数的下面 
        startTime = now
      }
    })

  </script>
</body>
```

### 节流案例 video进度记录
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="referrer" content="never" />
  <title>综合案例</title>
  <style>
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    .container {
      width: 1200px;
      margin: 0 auto;
    }

    .video video {
      width: 100%;
      padding: 20px 0;
    }

    .elevator {
      position: fixed;
      top: 280px;
      right: 20px;
      z-index: 999;
      background: #fff;
      border: 1px solid #e4e4e4;
      width: 60px;
    }

    .elevator a {
      display: block;
      padding: 10px;
      text-decoration: none;
      text-align: center;
      color: #999;
    }

    .elevator a.active {
      color: #1286ff;
    }

    .outline {
      padding-bottom: 300px;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <a href="http://pip.itcast.cn">
        <img src="https://pip.itcast.cn/img/logo_v3.29b9ba72.png" alt="" />
      </a>
    </div>
    <div class="video">
      <video src="https://v.itheima.net/LapADhV6.mp4" controls></video>
    </div>
    <div class="elevator">
      <a href="javascript:;" data-ref="video">视频介绍</a>
      <a href="javascript:;" data-ref="intro">课程简介</a>
      <a href="javascript:;" data-ref="outline">评论列表</a>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
  <script>
    // 1. 获取元素  要对视频进行操作
    const video = document.querySelector('video')
    video.ontimeupdate = _.throttle(() => {
      // console.log(video.currentTime) 获得当前的视频时间
      // 把当前的时间存储到本地存储
      localStorage.setItem('currentTime', video.currentTime)
    }, 1000)

    // 打开页面触发事件，就从本地存储里面取出记录的时间， 赋值给  video.currentTime
    video.onloadeddata = () => {
      // console.log(111)
      video.currentTime = localStorage.getItem('currentTime') || 0
    }

  </script>
</body>

</html>
```

