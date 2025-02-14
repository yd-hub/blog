---
icon: folder-open
date: 2025-02-12
category:
  - JavaScript
  - 前端笔记
tag:
  - JavaScript
---

# JS 常用方法整理


## Array对象方法
### 常用方法
| 方法 | 作用 |
| --- | --- |
| push( ) | 动态向数组的尾部添加一个单元 |
| unshift( ) | 动态向数组头部添加一个单元 |
| pop( ) | 删除最后一个单元 |
| shift( ) | 删除第一个单元 |
| splice( ) | 动态删除任意单元（<font style="color:rgb(51, 51, 51);"> 删除或替换原数组单元</font>） |


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

  // 2. unshift 动态向数组头部添加一个单元
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

### 拓展方法
| 方法 | 作用 | 说明 |
| --- | --- | --- |
| forEach | 遍历数组 | 不返回数组，经常用于查找遍历数组元素 |
| filter | 过滤数组 | 返回新数组，返回的是筛选满足条件的数组元素 |
| map | 迭代数组 | 返回新数组，返回的是处理之后的数组元素，想要使用返回的新数组 |
| reduce | 累计器 | 返回累计处理的结果，常用于求和 |
| join  | <font style="color:rgb(51, 51, 51);">元素拼接</font> | <font style="color:rgb(51, 51, 51);">数组元素拼接为字符串，返回字符串(重点)</font> |
| find | 查找元素 |  返回符合测试条件的第一个数组元素值，如果没有符合条件的则返回 undefined(重点) |
| every  | <font style="color:rgb(51, 51, 51);">检测数组</font> | 检测数组所有元素是否都符合指定条件，如果所有元素都通过检测返回 true，否则返回 false(重点) |
| some  | <font style="color:rgb(51, 51, 51);">检测数组</font> | 检测数组中的元素是否满足指定条件 如果数组中有元素满足条件返回 true，否则返回 false |
| concat  | 合并数组 | 合并两个数组，返回生成新数组 |
| sort  |  | 对原数组单元值排序 |
| reverse  | 反转数组 |  |
| findIndex  | 查找元素 | 查找元素的索引值 |
| from | 伪数组转真数组 | 伪数组转为真数组，返回新数组 |


#### ![](https://cdn.nlark.com/yuque/0/2023/png/36126128/1699281662358-7c657cf8-518d-4c28-b121-1abf7d1619d4.png)
#### map( ) 迭代数组
**语法：**

```javascript
<body>
  <script>
  const arr = ['red', 'blue', 'pink']
  // 1. 数组 map方法 处理数据并且 返回一个数组
   const newArr = arr.map(function (ele, index) {
    // console.log(ele)  // 数组元素
    // console.log(index) // 索引号
    return ele + '颜色'
	})
console.log(newArr)
</script>
</body>
```

> map 也称为映射。映射是个术语，指两个元素的集之间元素相互“对应”的关系。
>
> map重点在于有返回值，forEach没有返回值（undefined）
>

#### forEach( )  遍历数组
forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数

与map相比，forEach不返回数组。

> 注意：
>
> 1.forEach 主要是遍历数组
>
> 2.参数当前数组元素是必须要写的， 索引号可选。
>

```html
<body>
  <script>
    // forEach 就是遍历  加强版的for循环  适合于遍历数组对象
    const arr = ['red', 'green', 'pink']
    const result = arr.forEach(function (item, index) {
      console.log(item)  // 数组元素 red  green pink
      console.log(index) // 索引号
    })
    // console.log(result)	//undefined
  </script>
</body>
```

#### filter( )  过滤数组
filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素

主要使用场景： 筛选数组符合条件的元素，并返回筛选之后元素的新数组

```html
<body>
  <script>
    const arr = [10, 20, 30]
    // const newArr = arr.filter(function (item, index) {
    //   // console.log(item)
    //   // console.log(index)
    //   return item >= 20
    // })
    // 返回的符合条件的新数组

    const newArr = arr.filter(item => item >= 20)
    console.log(newArr)
  </script>
</body>
```

#### join( ) 元素拼接
**作用：**join() 方法用于把数组中的所有元素转换一个字符串

**语法：**

```html
<body>
  <script>
    const arr = ['red', 'blue', 'pink']

    // 1. 数组 map方法 处理数据并且 返回一个数组
    const newArr = arr.map(function (ele, index) {
      // console.log(ele)  // 数组元素
      // console.log(index) // 索引号
      return ele + '颜色'
    })
    console.log(newArr)

    // 2. 数组join方法  把数组转换为字符串
    // 小括号为空则逗号分割
    console.log(newArr.join())  // red颜色,blue颜色,pink颜色
    // 小括号是空字符串，则元素之间没有分隔符
    console.log(newArr.join(''))  //red颜色blue颜色pink颜色
    console.log(newArr.join('|'))  //red颜色|blue颜色|pink颜色
  </script>
</body>
```

#### find( ) 查找元素
 返回符合测试条件的第一个数组元素值，如果没有符合条件的则返回 undefined(重点)

```html
<body>
  <script>
    const arr = [
      {
        name: '小米',
        price: 1999
      },
      {
        name: '华为',
        price: 3999
      },
      {
        name: '华为',
        price: 3999
      },
    ]
    // 找小米 这个对象，并且返回这个对象
    const mi = arr.find(function (item) {
      // console.log(item)  //
      // console.log(item.name)  //
      // console.log(111)
      return item.name === '华为'
    })
    
    // 1. find 查找
    // const mi = arr.find(item => item.name === '小米')


    console.log(mi)
  </script>
</body>
```

#### every( ) 检测每一个
每一个是否都符合条件，如果都符合返回 true ，否则返回false

```html
// 2. every 每一个是否都符合条件，如果都符合返回 true ，否则返回false
// const arr1 = [10, 20, 30]
// const flag = arr1.every(item => item >= 20)
// console.log(flag)
```

#### reduce( ) 累计器
无初始值时，数组第一个元素作为【上一次的值prev】，第二个元素作为【当前值current】，相加后作为【返回值】，第二次返回值作为【上一次的值prev】；

有初始值时，【初始值】作为【上一次的值prev】，数组第一个元素作为作为【当前值current】，相加后作为【返回值】，第二次返回值作为【上一次的值prev】；

当对象中属性的值相加时，需设【初始值】为0（即【上一次的值prev】为0），【当前值current】为`current.要加的属性名`。 `return prev + current.属性名`。

```html
<body>
  <script>
    const arr = [1, 2, 3]
    // 1. 数组 map方法 处理数据并且 返回一个数组
    const total = arr.reduce(function (prev, current) {
      // console.log(prev)  // 上一次的值
      // console.log(current) // 当前值
      return prev + current
    },10)	//10为初始值
    console.log(total)	//16 （1+2+3 +10）
  </script>
</body>
```

#### <font style="color:rgb(27, 27, 27);">slice( ) 提取元素</font>
[MDN链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

slice() 方法返回一个新的数组对象，这一对象是一个由 start 和 end 决定的原数组的浅拷贝（包括 start，不包括 end），其中 start 和 end 代表了数组元素的索引。原始数组不会被改变

> 语法
>
> slice()
>
> slice(start)
>
> slice(start, end)
>

```javascript
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// Expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(animals.slice(-2));
// Expected output: Array ["duck", "elephant"]

console.log(animals.slice(2, -1));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice());
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]
```

#### <font style="color:rgb(27, 27, 27);">sort( )</font> 排序
[MDN链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

sort() 方法就地对数组的元素进行排序，并返回对相同数组的引用。默认排序是将元素转换为字符串，然后按照它们的 UTF-16 码元值升序排序。

由于它取决于具体实现，因此无法保证排序的时间和空间复杂度。

如果想要不改变原数组的排序方法，可以使用 toSorted()。

> 语法
>
> sort()
>
> sort(compareFn)
>
> 参数
>
> compareFn 可选
>
> 定义排序顺序的函数。返回值应该是一个数字，其正负性表示两个元素的相对顺序。该函数使用以下参数调用：
>
> a 第一个用于比较的元素。不会是 undefined。
>
> b 第二个用于比较的元素。不会是 undefined。
>
> 如果省略该函数，数组元素会被转换为字符串，然后根据每个字符的 Unicode 码位值进行排序。[例子参考](https://juejin.cn/post/6844903876722704397)
>

```javascript
const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);
// Expected output: Array ["Dec", "Feb", "Jan", "March"]

const array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);
// Expected output: Array [1, 100000, 21, 30, 4]


var arr = [10, 20, 1, 2];
arr.sort(function(a,b){
    if(a<b){
        return -1;
    }
    if(a>b){
       return 1;
    }
    return 0;
})
console.log(arr); //[1, 2, 10, 20]
//如上面代码，按照正序（由小到大）排列。
//通常规定，如果a<b,则返回-1；如果a>b,则返回1；如果a==b,则返回0;
//倒序相反。
var arr = [10, 20, 1, 2];
arr.sort(function(a,b){
    return a-b;
})
console.log(arr); //[20, 10, 2, 1]
```

#### some和every
some() 方法测试数组中是否至少有一个元素通过了由提供的函数实现的测试。如果在数组中找到一个元素使得提供的函数返回 true，则返回 true；否则返回 false。它不会修改数组。

```javascript
const array = [1, 2, 3, 4, 5];

// some 只要有一个>4，就返回true
console.log(array.some((item)=>{
  return item > 4	
}));	// true

// every 必须全>4才返回true
console.log(array.every((item)=>{
  return item > 4
}));	// false
```

### 异步问题
#### 1. `forEach`
`forEach`不会等待`async`函数中的`await`完成，异步操作会被并行执行，并不会按照预期的顺序执行。因此，如果你需要顺序执行异步操作，建议使用`for...of`循环而不是`forEach`。

#### 2. `map`
`map`可以配合`async`和`await`使用，但它会返回一个包含`Promise`的数组，因为每次`async`函数调用都会返回一个`Promise`对象。为了等待所有异步操作完成，可以使用`Promise.all`：[Promise.all](https://www.yuque.com/u34561593/ccc/rmpev43t5wt9dp3r#d4fQI)

```javascript
const results = await Promise.all(array.map(async (item) => {
  // 异步操作
  return await asyncFunction(item);
}));
```

#### 3. `filter`
`filter`的返回结果是一个布尔值，判断是否保留当前项。因为`filter`也是并行执行的，返回值不会等待`await`，因此不适合直接在其中使用异步操作。可以配合`map`和`Promise.all`来实现异步过滤：

```javascript
const results = await Promise.all(array.map(async (item) => {
  return await asyncCondition(item) ? item : null;
}));
const filtered = results.filter(item => item !== null);
```

如果你需要顺序执行异步操作，`for...of`会比`forEach`、`map`、`filter`更合适。

## Sring对象方法
| 实例属性/方法 | 说明 |
| --- | --- |
| length | （属性）用来获取字符串长度 |
| split('分隔符') | 用来将字符串拆分成数组 |
| substring（需要截取的第一个字符的索引[,结束的索引号]） | 用于字符串截取，[,结束的索引号]不包含要取的字符 |
| startsWith(检测字符串[, 检测位置索引号]) | 检测是否以某字符开头 |
| includes(搜索的字符串[, 检测位置索引号]) | 判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false（区分大小写） |
| toUpperCase |  用于将字母转换成大写 |
| toLowerCase | 用于将字母转换成小写 |
| indexOf | 检测是否包含某字符 |
| endsWith  | 检测是否以某字符结尾 |
| replace | 用于替换字符串，支持正则匹配 |
| match | 用于查找字符串，支持正则匹配 |
| slice | <font style="color:rgb(5, 7, 59);">slice(0, -1)</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">的含义是从字符串的起始位置（索引0）开始，提取到倒数第二个字符（因为</font><font style="color:rgb(5, 7, 59);">-1</font><font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">表示最后一个字符的位置，但不包括它）。</font> |
| charAt() | <font style="color:rgb(5, 7, 59);">'123'.charAt(2)  结果为3</font><br/><font style="color:rgb(5, 7, 59);">用下标取出一个字符</font> |


```html
<script>
    //1. split 把字符串 转换为 数组  和 join() 相反
    // const str = 'pink,red'
    // const arr = str.split(',')
    // console.log(arr)
    // const str1 = '2022-4-8'
    // const arr1 = str1.split('-')
    // console.log(arr1)
  
    // 2. 字符串的截取   substring(开始的索引号[， 结束的索引号])
    // 2.1 如果省略 结束的索引号，默认取到最后
    // 2.2 结束的索引号不包含想要截取的部分
    // const str = '今天又要做核酸了'
    // console.log(str.substring(5, 7))
  
    // 3. startsWith 判断是不是以某个字符开头
    // const str = 'pink老师上课中'
    // console.log(str.startsWith('pink'))
  
    // 4. includes 判断某个字符是不是包含在一个字符串里面
    const str = '我是pink老师'
    console.log(str.includes('pink')) // true
</script>
```

### trim( ) 删除文本两侧空格
```javascript
let str = '    hello world    '
console.log(str.trim()); //删除文本两侧空格
```

## Number对象方法
### toFixed( ) 保留小数位的长度
Number 是内置的构造函数，用于创建数值，实例方法 toFixed 用于设置保留小数位的长度。

```html
<script>
    // toFixed 方法可以让数字指定保留的小数位数（四舍五入）
    const num = 10.923
    // console.log(num.toFixed())
    console.log(num.toFixed(1))
    const num1 = 10
    console.log(num1.toFixed(2))
</script>
```

## Object对象方法
### Object.keys()
`Object.keys()` 静态方法返回一个由给定对象自身的可枚举的字符串键属性名组成的数组。

```javascript
const object1 = {
  a: 'somestring',
  b: 42,
  c: false,
};

console.log(Object.keys(object1));
// Expected output: Array ["a", "b", "c"]
```

## 时间戳方法
### getTime()
可获取指定时间戳

```javascript
//当前时间戳
const date = new Date()
data.getTime()
```

### +new Date()
可获取将来时间戳

```javascript
//当前时间戳
+new Date()	//相当于Number(new Date())
//指定时间戳
+new Date('2023-10-28 14:45:00')
```

### Date.now()
只能得到当前时间戳，无需实例化（无需new Date()）

```javascript
//当前时间戳
Date.now()
```

### 倒计时
**算法**

> 将来的时间戳 - 现在的时间戳 = 剩余时间毫秒数
>
> 剩余时间毫秒数 转换为 剩余时间 年月日时分秒 就是倒计时时间
>

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
>

```javascript
let h = parseInt(count / 60 / 60 % 24)
h = h < 10 ? '0' + h : h
let m = parseInt(count / 60 % 60)
m = m < 10 ? '0' + m : m
let s = parseInt(count % 60)
s = s < 10 ? '0' + s : s
console.log(h, m, s)
```

## 
## 
