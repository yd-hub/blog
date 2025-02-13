---
icon: fa-brands:js
date: 2025-02-12
category:
  - JavaScript
  - 前端笔记
tag:
  - JavaScript
---

# JavaScrip 基础
复习所记，并不全面。


##  输入输出
### 输入
> 向 `prompt()` 输入任意内容会以弹窗形式出现在浏览器中，一般提示用户输入一些内容。
>

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 输入输出</title>
</head>
<body>
  
  <script> 
    // 1. 输入的任意数字，都会以弹窗形式展示
    document.write('要输出的内容')
    alert('要输出的内容');

    // 2. 以弹窗形式提示用户输入姓名，注意这里的文字使用英文的引号
    prompt('请输入您的姓名:')
  </script>
</body>
</html>
```

### 输出
console.log()

console.dir()	打印对象 打印出该对象(object)的所有属性和属性值;对于输出 DOM 对象非常有用，因为会显示 DOM 对象的所有属性

```javascript
let div = document.querySelector('div')
console.dir(div)
```

## 变量
### let和var的区别
> let定义的变量是块级的变量。var定义的变量是全局变量或者函数变量。
>
> 作用范围：let定义的变量只对它所在的区域内有效，而var定义的<font style="background-color:#FBDE28;">变量范围最少是一个函数</font>之内。
>
> 变量声明：var可以重复声明，let不能重复声明
>
> 变量赋值：var不赋值默认为undefined，let必须先赋值。
>

### const
> const声明常量后值不可修改。
>
> 注意：复杂数据类型地址不变的情况下可以修改，因为存储的地址没有修改，只是修改了栈的内容。
>
> 建议数组和对象用const声明。
>

```javascript
const arr = ['red','pink']
arr.push('blue')
console.log(arr)	//正常
arr = [1,2,4]
console.log(arr)	//报错
```

###  let、var、const的使用
> 优先使用const，可以后面发现变量要被修改，再改为let。
>

## 数组
### 操作数组
> 数组做为对象数据typora怎么类型，不但有 `length` 属性可以使用，还提供了许多方法：
>
> 1. push 动态向数组的尾部添加一个单元
> 2. unshit 动态向数组头部添加一个单元
> 3. pop 删除最后一个单元
> 4. shift 删除第一个单元
> 5. splice 动态删除任意单元
>
> 使用以上4个方法时，都是直接在原数组上进行操作，即成功调任何一个方法，原数组都跟着发生相应的改变。并且在添加或删除单元时 `length` 并不会发生错乱。
>

```html
<script>
  // 定义一个数组
  let arr = ['html', 'css', 'javascript']

  // 1. push 动态向数组的尾部添加一个单元
  arr.push('Nodejs')
  console.log(arr)
  arr.push('Vue')

  // 2. unshit 动态向数组头部添加一个单元
  arr.unshift('VS Code')
  console.log(arr)

  // 3. splice 动态删除任意单元
  arr.splice(2, 1) // 从索引值为2的位置开始删除1个单元
  console.log(arr)

  // 4. pop 删除最后一个单元
  arr.pop()
  console.log(arr)

  // 5. shift 删除第一个单元
  arr.shift()
  console.log(arr)
</script>
```

## 函数
### 函数命名规范
> 尽量小驼峰命名法
>
> 前缀应该为动词
>

**常用动词约定**

| 动词 | 含义 |
| :--- | --- |
| can | 判断是否可执行某个动作 |
| has | 判断是否含有某个值 |
| is | 判断是否为某个值 |
| get | 获取某个值 |
| set | 设置某个值 |
| load | 加载某些数据 |


> 例如：
>

```javascript
function getName(){}
function addSquares(){}
```

### 匿名函数
函数可以分为具名函数和匿名函数

匿名函数：没有名字的函数,无法直接使用。

#### 函数表达式
必须先声明和赋值，再调用

```javascript
// 声明
let fn = function() { 
   console.log('函数表达式')
}
// 调用
fn()
```

#### 立即执行函数
```javascript
(function(){ xxx  })();
(function(){xxxx}());
```

> 无需调用，立即执行，其实本质已经调用了
>
> 多个立即执行函数之间用分号隔开
>

### 函数返回值
1、没用return默认返回undefined

2、return后的数据不能换行写

### 回调函数
如果将函数 A 做为参数传递给函数 B 时，我们称函数 A 为回调函数。

## 对象
> 对象是 JavaScript 数据类型的一种，之前已经学习了数值类型、字符串类型、布尔类型、undefined。对象数据类型可以被理解成是一种数据集合。它由属性和方法两部分构成。
>

### 语法
声明一个对象类型的变量与之前声明一个数值或字符串类型的变量没有本质上的区别。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象语法</title>
</head>
<body>

  <script>
    // 声明字符串类型变量
    let str = 'hello world!'
    
    // 声明数值类型变量
    let num = 199

    // 声明对象类型变量，使用一对花括号
    // user 便是一个对象了，目前它是一个空对象
    let user = {}
  </script>
</body>
</html>
```

### 属性和访问
数据描述性的信息称为属性，如人的姓名、身高、年龄、性别等，一般是名词性的。

1. 属性都是成 对出现的，包括属性名和值，它们之间使用英文 `:` 分隔
2. 多个属性之间使用英文 `,` 分隔
3. 属性就是依附在对象上的变量
4. 属性名可以使用 `""` 或 `''`，一般情况下省略，除非名称遇到特殊符号如空格、中横线等

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象语法</title>
</head>
<body>

  <script>
    // 通过对象描述一个人的数据信息
    // person 是一个对象，它包含了一个属性 name
    // 属性都是成对出现的，属性名 和 值，它们之间使用英文 : 分隔
    let person = {
      name: '小明', // 描述人的姓名
      age: 18, // 描述人的年龄
      stature: 185, // 描述人的身高
      gender: '男', // 描述人的性别
    }
  </script>
</body>
</html>
```

声明对象，并添加了若干属性后，可以使用 `.` 或 `[]` 获得对象中属性对应的值，我称之为属性访问。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象语法</title>
</head>
<body>

  <script>
    // 通过对象描述一个人的数据信息
    // person 是一个对象，它包含了一个属性 name
    // 属性都是成对出现的，属性名 和 值，它们之间使用英文 : 分隔
    let person = {
      name: '小明', // 描述人的姓名
      age: 18, // 描述人的年龄
      stature: 185, // 描述人的身高
      gender: '男', // 描述人的性别
    };
    
    // 访问人的名字
    console.log(person.name) // 结果为 小明
    // 访问人性别
    console.log(person.gender) // 结果为 男
    // 访问人的身高
    console.log(person['stature']) // 结果为 185
   // 或者
    console.log(person.stature) // 结果同为 185
  </script>
</body>
</html>
```

扩展：也可以动态为对象添加属性，动态添加与直接定义是一样的，只是语法上更灵活。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象语法</title>
</head>
<body>

  <script>
    // 声明一个空的对象（没有任何属性）
  	let user = {}
    // 动态追加属性
    user.name = '小明'
    user['age'] = 18
    
    // 动态添加与直接定义是一样的，只是语法上更灵活
  </script>
</body>
</html>
```

### 方法和调用
数据行为性的信息称为方法，如跑步、唱歌等，一般是动词性的，其本质是函数。

1. 方法是由方法名和函数两部分构成，它们之间使用 : 分隔
2. 多个属性之间使用英文 `,` 分隔
3. 方法是依附在对象中的函数
4. 方法名可以使用 `""` 或 `''`，一般情况下省略，除非名称遇到特殊符号如空格、中横线等

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象方法</title>
</head>
<body>

  <script>
    // 方法是依附在对象上的函数
    let person = {
      name: '小红',
      age: 18,
      // 方法是由方法名和函数两部分构成，它们之间使用 : 分隔
      singing: function () {
        console.log('两只老虎，两只老虎，跑的快，跑的快...')
      },
      run: function () {
        console.log('我跑的非常快...')
      }
    }
  </script>
</body>
</html>
```

声明对象，并添加了若干方法后，可以使用 `.` 或 `[]` 调用对象中函数，我称之为方法调用。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象方法</title>
</head>
<body>

  <script>
    // 方法是依附在对象上的函数
    let person = {
      name: '小红',
      age: 18,
      // 方法是由方法名和函数两部分构成，它们之间使用 : 分隔
      singing: function () {
        console.log('两只老虎，两只老虎，跑的快，跑的快...')
      },
      run: function () {
        console.log('我跑的非常快...')
      }
    }
    
    // 调用对象中 singing 方法
    person.singing()
    // 调用对象中的 run 方法
    person.run()

  </script>
</body>
</html>
```

扩展：也可以动态为对象添加方法，动态添加与直接定义是一样的，只是语法上更灵活。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象方法</title>
</head>
<body>

  <script>
    // 声明一个空的对象（没有任何属性，也没有任何方法）
	let user = {}
    // 动态追加属性
    user.name = '小明'
    user.['age'] = 18
    
    // 动态添加方法
    user.move = function () {
      console.log('移动一点距离...')
    }
    
  </script>
</body>
</html>
```

**注：无论是属性或是方法，同一个对象中出现名称一样的，后面的会覆盖前面的。**

### null
null 也是 JavaScript 中数据类型的一种，通常只用它来表示不存在的对象。使用 typeof 检测它的类型时，结果为 `object`。

### 遍历对象
for in 遍历对象时，k为属性名；遍历数组时，k为数组索引号；

k是字符串类型，<font style="background-color:#FBDE28;">不提倡遍历数组</font>

```javascript
let obj = {
    uname: 'pink'
}
for(let k in obj) {
    // k 属性名  字符串  带引号    obj.'uname'     k ===  'uname'
    // obj[k]  属性值    obj['uname']   obj[k]
}
```

## 内置对象
回想一下我们曾经使用过的 `console.log`，`console`其实就是 JavaScript 中内置的对象，该对象中存在一个方法叫 `log`，然后调用 `log` 这个方法，即 `console.log()`。

除了 `console` 对象外，JavaScritp 还有其它的内置的对象

### Math
`Math` 是 JavaScript 中内置的对象，称为数学对象，这个对象下即包含了属性，也包含了许多的方法。

#### 属性
+ Math.PI，获取圆周率

```javascript
// 圆周率
console.log(Math.PI);
```

#### 方法
+ Math.random，生成 0 到 1 间的随机数

```javascript
// 0 ~ 1 之间的随机数, 包含 0 不包含 1
Math.random()
```

+ Math.ceil，数字向上取整

```javascript
// 舍弃小数部分，整数部分加1
Math.ceil(3.4)
```

+ Math.floor，数字向下取整

```javascript
// 舍弃小数部分，整数部分不变
Math.floor(4.68)
```

+ Math.round，四舍五入取整

```javascript
// 取整，四舍五入原则
Math.round(5.46539)
Math.round(4.849)
```

+ Math.max，在一组数中找出最大的

```javascript
// 找出最大值
Math.max(10, 21, 7, 24, 13)
```

+ Math.min，在一组数中找出最小的

```javascript
// 找出最小值
Math.min(24, 18, 6, 19, 21)
```

+ Math.pow，幂方法

```javascript
// 求某个数的多少次方
Math.pow(4, 2) // 求 4 的 2 次方
Math.pow(2, 3) // 求 2 的 3 次方
```

+ Math.sqrt，平方根

```javascript
// 求某数的平方根
Math.sqrt(16)
```

数学对象提供了比较多的方法，这里不要求强记，通过演示数学对象的使用，加深对对象的理解。

### 随机取数组元素
```javascript
let arr =['张飞','刘备','关羽'];
let random = Math.floor(Math.random() * arr.length);
console.log(arr[random]);
```

### 生成随机数
生成0~10的随机数

```javascript
Math.floor(Math.random() * (10 + 1));
```

生成5~10的随机数

```javascript
Math.floor(Math.random() * (5 + 1)) + 5;
```

生成N~M的随机数

```javascript
Math.floor(Math.random() * (M - N + 1)) + N;
```

## 严格模式
在js文件或函数开头添加 `"use strict";`为开启严格模式。

引入模块的js文件自动开启严格模式。

```javascript
"use strict";
```

1. **<font style="background-color:rgb(253, 253, 254);">变量必须声明</font>**<font style="background-color:rgb(253, 253, 254);">：在严格模式下，如果你试图使用一个没有声明的变量，将会抛出一个错误。而在非严格模式下，这样的变量会被自动创建为全局变量，这可能导致意外的行为。</font>

```javascript
// 严格模式  
"use strict";  
x = 3.14; // 抛出 ReferenceError
```

2. **<font style="background-color:rgb(253, 253, 254);">只读属性不能写</font>**<font style="background-color:rgb(253, 253, 254);">：试图给一个只读属性赋值会抛出错误。</font>

```javascript
"use strict";  
var obj = {};  
Object.defineProperty(obj, 'x', { value: 0, writable: false });  
obj.x = 3.14; // 抛出 TypeError
```

3. **<font style="background-color:rgb(253, 253, 254);">重复的参数名会抛出错误</font>**<font style="background-color:rgb(253, 253, 254);">：在严格模式下，函数不能有重名的参数。</font>

```javascript
"use strict";  
function sum(a, a, c) { // 抛出 SyntaxError  
    return a + a + c;  
}
```

4. **<font style="background-color:rgb(253, 253, 254);">this</font>****<font style="background-color:rgb(253, 253, 254);"> </font>****<font style="background-color:rgb(253, 253, 254);">是</font>****<font style="background-color:rgb(253, 253, 254);"> </font>****<font style="background-color:rgb(253, 253, 254);">undefined</font>**<font style="background-color:rgb(253, 253, 254);">：在全局上下文中，</font><font style="background-color:rgb(253, 253, 254);">this</font><font style="background-color:rgb(253, 253, 254);"> </font><font style="background-color:rgb(253, 253, 254);">是</font><font style="background-color:rgb(253, 253, 254);"> </font><font style="background-color:rgb(253, 253, 254);">undefined</font><font style="background-color:rgb(253, 253, 254);">，而不是全局对象（在浏览器中通常是</font><font style="background-color:rgb(253, 253, 254);"> </font><font style="background-color:rgb(253, 253, 254);">window</font><font style="background-color:rgb(253, 253, 254);">）。在函数内部，如果函数不是作为对象的方法调用，</font><font style="background-color:rgb(253, 253, 254);">this</font><font style="background-color:rgb(253, 253, 254);"> </font><font style="background-color:rgb(253, 253, 254);">也是</font><font style="background-color:rgb(253, 253, 254);"> </font><font style="background-color:rgb(253, 253, 254);">undefined</font><font style="background-color:rgb(253, 253, 254);">。</font>

```javascript
"use strict";  
function f() {  
    return this;  
}  
f(); // 返回 undefined
```

5. **<font style="background-color:rgb(253, 253, 254);">eval</font>****<font style="background-color:rgb(253, 253, 254);"> </font>****<font style="background-color:rgb(253, 253, 254);">和</font>****<font style="background-color:rgb(253, 253, 254);"> </font>****<font style="background-color:rgb(253, 253, 254);">arguments</font>****<font style="background-color:rgb(253, 253, 254);"> </font>****<font style="background-color:rgb(253, 253, 254);">更严格</font>**<font style="background-color:rgb(253, 253, 254);">：</font><font style="background-color:rgb(253, 253, 254);">eval</font><font style="background-color:rgb(253, 253, 254);"> </font><font style="background-color:rgb(253, 253, 254);">和</font><font style="background-color:rgb(253, 253, 254);"> </font><font style="background-color:rgb(253, 253, 254);">arguments</font><font style="background-color:rgb(253, 253, 254);"> </font><font style="background-color:rgb(253, 253, 254);">对象的行为在严格模式下也有所不同。例如，</font><font style="background-color:rgb(253, 253, 254);">eval</font><font style="background-color:rgb(253, 253, 254);"> </font><font style="background-color:rgb(253, 253, 254);">中的变量不能改变外部作用域的变量。</font>
6. **<font style="background-color:rgb(253, 253, 254);">删除了</font>****<font style="background-color:rgb(253, 253, 254);"> </font>****<font style="background-color:rgb(253, 253, 254);">with</font>****<font style="background-color:rgb(253, 253, 254);"> </font>****<font style="background-color:rgb(253, 253, 254);">语句</font>**<font style="background-color:rgb(253, 253, 254);">：在严格模式下，不能使用</font><font style="background-color:rgb(253, 253, 254);"> </font><font style="background-color:rgb(253, 253, 254);">with</font><font style="background-color:rgb(253, 253, 254);"> </font><font style="background-color:rgb(253, 253, 254);">语句，因为它可能导致代码难以理解和维护。</font>

```javascript
"use strict";  
with (Math){ x = cos(2) } // 抛出 SyntaxError
```

7. **<font style="background-color:rgb(253, 253, 254);">八进制字面量语法不再允许</font>**<font style="background-color:rgb(253, 253, 254);">：在严格模式下，八进制字面量（例如</font><font style="background-color:rgb(253, 253, 254);"> </font><font style="background-color:rgb(253, 253, 254);">010</font><font style="background-color:rgb(253, 253, 254);">）不再是合法的语法。</font>

```javascript

"use strict";  
var x = 010; // 抛出 SyntaxError
```

8. **<font style="background-color:rgb(253, 253, 254);">禁止删除变量、函数和函数参数</font>**<font style="background-color:rgb(253, 253, 254);">：在严格模式下，尝试删除变量、函数或函数参数会抛出错误。</font>

```javascript
"use strict";  
var x = 3.14;  
delete x; // 抛出 SyntaxError
```

9. **<font style="background-color:rgb(253, 253, 254);">对</font>****<font style="background-color:rgb(253, 253, 254);"> </font>****<font style="background-color:rgb(253, 253, 254);">this</font>****<font style="background-color:rgb(253, 253, 254);"> </font>****<font style="background-color:rgb(253, 253, 254);">的</font>****<font style="background-color:rgb(253, 253, 254);"> </font>****<font style="background-color:rgb(253, 253, 254);">null</font>****<font style="background-color:rgb(253, 253, 254);"> </font>****<font style="background-color:rgb(253, 253, 254);">或</font>****<font style="background-color:rgb(253, 253, 254);"> </font>****<font style="background-color:rgb(253, 253, 254);">undefined</font>****<font style="background-color:rgb(253, 253, 254);"> </font>****<font style="background-color:rgb(253, 253, 254);">赋值会抛出错误</font>**<font style="background-color:rgb(253, 253, 254);">：在严格模式下，如果你试图将</font><font style="background-color:rgb(253, 253, 254);"> </font><font style="background-color:rgb(253, 253, 254);">null</font><font style="background-color:rgb(253, 253, 254);"> </font><font style="background-color:rgb(253, 253, 254);">或</font><font style="background-color:rgb(253, 253, 254);"> </font><font style="background-color:rgb(253, 253, 254);">undefined</font><font style="background-color:rgb(253, 253, 254);"> </font><font style="background-color:rgb(253, 253, 254);">赋值给</font><font style="background-color:rgb(253, 253, 254);"> </font><font style="background-color:rgb(253, 253, 254);">this</font><font style="background-color:rgb(253, 253, 254);">，将会抛出错误。</font>
10. **<font style="background-color:rgb(253, 253, 254);">函数声明必须在顶层</font>**<font style="background-color:rgb(253, 253, 254);">：在严格模式下，函数声明不能出现在块级作用域（如 if 语句或循环）中。</font>

