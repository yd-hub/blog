---
icon: e
date: 2025-02-12
category:
  - JavaScript
  - 前端笔记
tag:
  - JavaScript
  - ES6+
---

# ES6+

## Symbol 数据类型
### Symbol基本使用  
ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，是一种类似于字符串的数据类型。

Symbol特点 

1) Symbol的值是唯一的，用来解决命名冲突的问题 

2) Symbol值不能与其他数据进行运算 

3) Symbol定义的对象属性不能使用for…in循环遍历，但是可以使用 Reflect.ownKeys来获取对象的所有键名  

```javascript
//创建 Symbol 
let s1 = Symbol(); 
console.log(s1, typeof s1);  //false

//添加标识的 Symbol 
let s2 = Symbol('尚硅谷'); //‘尚硅谷’是标识 
let s2_2 = Symbol('尚硅谷'); 
console.log(s2 === s2_2); //false 

//使用 Symbol for 定义 
let s3 = Symbol.for('尚硅谷'); 
let s3_2 = Symbol.for('尚硅谷'); 
console.log(s3 === s3_2); //true
```

### 为对象添加Symbol类型的属性
<font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">由于Symbol是唯一的，所以不会存在两个相同的Symbol。如果为同一个对象添加两个相同的Symbol属性，第二个属性将会覆盖第一个属性。</font>

```javascript
// age 1：方法1
let myObject = {}; // 创建一个空对象  
let mySymbol = Symbol('mySymbol'); // 创建一个Symbol  
myObject[mySymbol] = 'Hello, world!'; // 在对象上添加一个Symbol属性
// 访问myObject的mySymbol属性
console.log(myObject[mySymbol]); // 输出 'Hello, world!'

// age 2：应用
let game = {
	... //对象game中已有up和down属性
};
// 向game对象添加up、down两个属性，而不影响原有的属性
let methods = {
	up: Symbol(),
  down: Symbol()
};
game[methods.up] = function(){
  console.log('up');
}
game[methods.up] = function(){
  consoloe.log('down);
}
console.log(game);

// age3
// 调用 [Symbol('say')]方法的错误写法
let youxi = {
  name:'狼人杀',
  [Symbol('say')]: function(){
    console.log('发言');
  }
}
game[Symbol('say')](); 
// 会报错，不会输出 "say"，因为这是一个新的Symbol
// 因为game[Symbol('say')]尝试访问的是一个使用新创建的Symbol作为键的属性，
// 而这个新Symbol与定义在对象game中的那个Symbol是不同的。
// 由于它们是不同的Symbol，所以JavaScript引擎无法找到
// 与这个新Symbol相关联的函数，因此不会调用任何函数，也不会输出任何内容。

// ***正确写法
// 创建一个Symbol并将其存储在变量中以便稍后使用  
let saySymbol = Symbol('say');  
let nameSymbol = Symbol('name');  
let game = {  
  name: 'youxi',  
  [saySymbol]: function() {  
    console.log('say');  
  },  
  [nameSymbol]: 'syname'  
};  
// 使用之前存储的Symbol来访问属性  
game[saySymbol](); // 现在会输出 "say"

```

### Symbol内置值
除了定义自己使用的 Symbol 值以外，ES6 还提供了11个内置的Symbol值，指向语言内部使用的方法。可以称这些方法为魔术方法，因为它们会在特定的场 景下自动执行。  

| Symbol.hasInstance   | 当其他对象使用instanceof运算符，判断是否为该对 象的实例时，会调用这个方法   |
| --- | --- |
| Symbol.isConcatSpreadable   | 对象的Symbol.isConcatSpreadable属性等于的是一个 布尔值，表示该对象用于Array.prototype.concat()时， 是否可以展开。   |
| Symbol.species   | 创建衍生对象时，会使用该属性   |
| Symbol.match   | 当执行str.match(myObject) 时，如果该属性存在，会 调用它，返回该方法的返回值。   |
| Symbol.replace   | 当该对象被str.replace(myObject)方法调用时，会返回 该方法的返回值。   |
| Symbol.search   |  当该对象被str. search (myObject)方法调用时，会返回 该方法的返回值。   |
| Symbol.split   | 当该对象被str. split (myObject)方法调用时，会返回该 方法的返回值。   |
| Symbol.iterator   | 对象进行for...of循环时，会调用Symbol.iterator方法， 返回该对象的默认遍历器   |
| Symbol.toPrimitive   | 该对象被转为原始类型的值时，会调用这个方法，返 回该对象对应的原始类型值。   |
| Symbol. toStringTag   | 在该对象上面调用toString方法时，返回该方法的返 回值   |
| Symbol. unscopables   | 该对象指定了使用with关键字时，哪些属性会被with 环境排除。   |


```javascript
class Person{
    static [Symbol.hasInstance](param){
        console.log(param);
        console.log("我被用来检测类型了");
        return false;
    }
}

let o = {};
console.log(o instanceof Person);

const arr = [1,2,3];
const arr2 = [4,5,6];
console.log(arr.concat(arr2)); //[1,2,3,4,5,6]
arr2[Symbol.isConcatSpreadable] = false;
console.log(arr.concat(arr2));	//[1,2,3,[4,5,6]]
```

## Iterator 迭代器
迭代器、遍历器（Iterator）就是一种机制。它是一种接口，为各种不同的数据结构提

供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作。

### 工作原理
1. ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of消费

```javascript
const xiyou = ['唐僧','孙悟空','猪八戒','沙僧'];
for(let v of xiyou){
	console.log(v);
}
```

2. 原生具备iterator接口的数据(可用for of遍历) 
+ Array 
+ Arguments 
+ Set 
+ Map 
+ String 
+ TypedArray 
+ NodeList
3.  工作原理 
+ 创建一个指针对象，指向当前数据结构的起始位置 
+ 第一次调用对象的next方法，指针自动指向数据结构的第一个成员

```javascript
let iterator = xiyou[Symbol.iterator]();
console.log(iterator);
```

<imageProxy src="https://cdn.nlark.com/yuque/0/2024/png/36126128/1704604232865-3765e92e-e169-416a-b7a6-23b39cf2eeda.png"/>

+ 接下来不断调用next方法，指针一直往后移动，直到指向最后一个成员

```javascript
const xiyou = ['唐僧','孙悟空','猪八戒','沙僧'];
for(let v of xiyou){
	console.log(v);
}

let iterator = xiyou[Symbol.iterator]();
// console.log(iterator);  //查看next方法

// 调用对象的next方法
// 每次都指向下一个元素，返回一个对象，包含值和是否遍历完成
console.log(iterator.next());	// {value:"唐僧",done:false}
console.log(iterator.next()); // {value:"孙悟空",done:false}
console.log(iterator.next()); // {value:"猪八戒",done:false}
console.log(iterator.next()); // {value:"沙僧",done:false}
console.log(iterator.next()); // {value:"undefined",done:true}
```

+ 每调用next方法返回一个包含value和done属性的对象

### 自定义遍历数据
```javascript
const banji = {
  name: "一班",
  stus: [
    '张三',
    '李四',
    '王五'
  ],
  //直接遍历会报错，因为没有iterator接口，需要添加接口
  [Symbol.iterator]() {
    // 索引变量
    let index = 0;
    // 保存this，或者直接用箭头函数
    // let _this = this;
    //返回一个对象
    return {
      // 使用普通匿名函数
      // next: function () {
      //     if (index < _this.stus.length) {
      //         const result = { value: _this.stus[index], done: false }
      //         // 下标自增
      //         index++;
      //         // 返回结果
      //         return result;
      //     } else {
      //         return { value: undefined, done: true};
      //     }
      // }

      // 使用箭头函数
      // next方法返回对象
      next: ()=>{
        if (index < this.stus.length) {
          const result = { value: this.stus[index], done: false }
          // 下标自增
          index++;
          // 返回结果
          return result;
        } else {
          return { value: undefined, done: true};
        }
      }
    };
  }
}

// 遍历这个对象
for (let v of banji) {
  console.log(v);
}

```

## 生成器
生成器是一个特殊函数，是ES6提供的一种异步编程解决方案，语法行为与传统函数完全不同

### 基本使用
```javascript
// 两点特殊性
// 1. 声明必须有 * 
function * gen(){
  console.log('hello generator')
}
let iterator = gen();
// 2. 直接调用无法运行
console.log(iterator); // 输出为迭代器对象
iterator.next();  // 需要通过next对象调用

```

### yield
yield是函数的分隔符，把函数分为几个部分，每个部分返回一个值，通过next()方法依次执行，每次执行一块。

yield关键字用于暂停和恢复生成器函数的执行。在执行到yield语句时，生成器函数的执行会暂停，并将函数的内部状态保存起来。然后，你可以通过调用生成器的next()方法来恢复执行。

<imageProxy src="https://cdn.nlark.com/yuque/0/2024/png/36126128/1704618321080-13a66fd5-8230-4213-8d07-0a37bc59bd79.png"/>

+ next()方法返回的对象，value为执行代码块下方的yield值，
+ next()传入的参数，作为执行代码块的上方的yield的返回值。

```javascript
function* gen() {
  // 第零块
  console.log(111)
  yield '一部分';
  // 第一块
  console.log(222)
  yield '二部分';
  // 第二块
  console.log(333)
  yield '三部分';
  // 第三块
  console.log(444);
}

let iterator = gen();
// 通过next方法每次执行一块代码
iterator.next();	//111
iterator.next();	//222
iterator.next();	//333
iterator.next();	//444
/*
console.log(iterator.next()); 
{value:"一部分",done:false}
 ... 
{value:"undefined",done:true}
*/

// 遍历，输出yield值 和 执行代码块
for(let v of gen()){
  console.log(v);
}
/*输出为
  111
  一部分
  222
  二部分
  333
  三部分
  444
*/

```

### 参数传递
生成器函数开始可传入实参，后续从第二个next()方法调用开始，next中传入的参数作为yield的返回值。

```javascript
function* gen(arg) {	//AAA传入arg
  // 第一次next调用，next不传值，使用初始传入的arg
  console.log(arg)	//AAA
  
  let one = yield '一部分';
  // 第二次next调用，BBB传入作为yield的返回值
  console.log(one);	//BBB
  
  let two = yield '二部分';
  // 第三次next调用，CCC传入作为yield的返回值
  console.log(two);	//CCC
  
  let three = yield '三部分';
  // 第三次next调用，DDD传入作为yield的返回值
  console.log(three);	//DDD
}
// 生成器函数，可传入参数
let iterator = gen('AAA');
console.log(iterator.next(''));
/*第一次next调用输出：
AAA
{value: '一部分', done: false}
*/
console.log(iterator.next('BBB'));
/*第二次next，传入参数'BBB'调用输出：
BBB
{value: '二部分', done: false}
*/
console.log(iterator.next('CCC'));
/*第三次next，传入参数'CCC'调用输出：
CCC
{value: '三部分', done: false}
*/
console.log(iterator.next('DDD'));
/*第四次next，传入参数'DDD'调用输出：
CCC
{value: 'undefined', done: true}
*/
```

### 异步编程应用
如：文件操作、网络操作（ajax、request）、数据库操作、定时器

#### 基本应用：解决回调地狱
```javascript
// 定时器案例:回调地狱问题
// 1s输出111，2s输出222，3s输出333
setTimeout(() => {
  console.log(111);
  setTimeout(() => {
    console.log(222);
    setTimeout(() => {
      console.log(333);
      // ...
    }, 1000)
  }, 1000)
}, 1000)

// 通过生成器函数解决回调地狱问题
function one(){
	 setTimeout(() => {
      console.log(111);
    	iterator.next();
    }, 1000)
}
function two(){
	 setTimeout(() => {
      console.log(222);
     	iterator.next();
    }, 2000)
}
function three(){
	 setTimeout(() => {
      console.log(333);
     	iterator.next();
    }, 3000)
}
function * gen(){
  yield one();
  yield two();
  yield three();
}
// 调用生成器函数
let iterator = gen();
iterator.next();
```

#### 实例：获取数据 伪代码
模拟获取：用户数据、订单数据、商品数据

```javascript
function getUsers(){
  setTimeout(() => {
    	let data = '用户数据';
      // 调用next方法，并传入数据，作为生成器函数yield的返回值
     	iterator.next(data);
    }, 1000)
}
function getOrders(){
  setTimeout(() => {
    	let data = '订单数据';
     	iterator.next(data);
    }, 1000)
}
function getGoods(){
  setTimeout(() => {
    	let data = '商品数据';
     	iterator.next(data);
    }, 1000)
}
function * gen(){
  let users =  yield getUsers();
  // console.log(users); //测试输出：用户数据
  let orders =  yield getOrders();
  // console.log(users); //测试输出：订单数据
  let goods =  yield getGoods();
  // console.log(users); //测试输出：商品数据
}
// 调用生成器函数
let iterator = gen();
iterator.next();
```

## *Promise
Promise 是ES6引入的异步编程的新解决方案。语法上Promise是一个构造函数， 用来封装异步操作并可以获取其成功或失败的结果。  

### 基本使用
Promise 的状态有三种：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。

1. then(): 用于处理 Promise 对象的状态为 fulfilled（已成功）时的情况。
2. catch(): 用于处理 Promise 对象的状态为 rejected（已失败）时的情况。
3. finally(): 无论 Promise 的状态是什么，都会执行这个函数。
4. resolve(): 将 Promise 对象的状态从 pending（进行中）变为 fulfilled（已成功），并指定其结果值。
5. reject(): 将 Promise 对象的状态从 pending（进行中）变为 rejected（已失败），并指定其失败原因。
6. then()返回的是 Promise 对象，如果写return返回非Promise对象，Promise的状态为成功，值为return的值，如果return返回的是Promise对象，then()返回的Promise对象状态和值与return一致。

```javascript
// 实例化promise对象
const p = new Promise(function(resolve,reject){
  setTimeout(function(){
    // let data = '成功读取的数据';
    // 调用resolve函数，promise函数变为成功状态
    // resolve(data)
    
    let err = '读取数据失败';
    // 调用resolve函数，promise函数变为失败状态
    reject(err)
  },1000)
})

// 调用promise对象的then方法
// then 用于处理 Promise 对象的状态为 fulfilled（已成功）时的情况。
// p.then(参一,参二) 两个参数时分别为成功与失败时执行的函数
// 即resolve(data)和reject(err)
p.then(function(data){
  console.log(data);
},function(err){
  console.error(err);
})

// catch 用于处理 Promise 对象的状态为 rejected（已失败）时的情况
p.catch(function(err){
  console.error(err);
})

// 链式调用
p.then(data=>{
  console.log('成功');
}).catch(err=>{
  console.log('失败');
})
```

### premise案例
#### 封装文件读取
```javascript
// 需要nodejs环境
// 引入模块
const fs = require('fs');

// 读入文件
// fs.readFile('./ts5.html',(err,data)=>{
//   if(err) throw err;
//   console.log(data.toString());
// })

// promise封装
const p = new Promise((resolve,reject)=>{
  fs.readFile('./ts5.html',(err,data)=>{
    if(err) throw reject(err);
    resolve(data.toString());
  })
})

p.then(data=>{
  console.log('读取成功:\t' + data);
}).catch(err=>{
  console.log('读取失败:\t' + err);
})

```

#### 封装AJAX请求
接口地址 [https://api.apiopen.top/getJoke](https://api.apiopen.top/getJoke)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>发送 AJAX 请求</title>
  </head>
  <body>
    <script>
      // 接口地址: https://api.apiopen.top/getJoke
      const p = new Promise((resolve, reject) => {
        //1. 创建对象
        const xhr = new XMLHttpRequest();
        //2. 初始化
        xhr.open("GET", "https://api.apiopen.top/getJ");
        //3. 发送
        xhr.send();
        //4. 绑定事件, 处理响应结果
        xhr.onreadystatechange = function () {
          //判断
          if (xhr.readyState === 4) {
            //判断响应状态码 200-299
            if (xhr.status >= 200 && xhr.status < 300) {
              //表示成功
              resolve(xhr.response);
            } else {
              //如果失败
              reject(xhr.status);
            }
          }
        }
      })
      //指定回调
      p.then(function(value){
        console.log(value);
      }, function(reason){
        console.error(reason);
      });
    </script>
  </body>
</html>
```

#### 解决回调地狱
```javascript
//引入 fs 模块
const fs = require("fs");

// fs.readFile('./resources/为学.md', (err, data1)=>{
//     fs.readFile('./resources/插秧诗.md', (err, data2)=>{
//         fs.readFile('./resources/观书有感.md', (err, data3)=>{
//             let result = data1 + '\r\n' +data2  +'\r\n'+ data3;
//             console.log(result);
//         });
//     });
// });

//使用 promise 实现
const p = new Promise((resolve, reject) => {
  fs.readFile("./resources/为学.md", (err, data) => {
    resolve(data);
  });
});

p.then(value => {
  return new Promise((resolve, reject) => {
    fs.readFile("./resources/插秧诗.md", (err, data) => {
      resolve([value, data]);
    });
  });
}).then(value => {
  return new Promise((resolve, reject) => {
    fs.readFile("./resources/观书有感.md", (err, data) => {
      //压入
      value.push(data);
      resolve(value);
    });
  })
}).then(value => {
  console.log(value.join('\r\n'));
});
```

## Set 集合
<font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">ES6 提供了新的数据结构 Set（集合）。它类似于数组，但成员的值都是唯 一的，集合实现了iterator接口，所以可以使用『扩展运算符』和『for…of…』进 行遍历。</font>

### <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">基本使用</font>
<font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">集合的属性和方法：</font>

1. `size` 返回集合的元素个数 
2. `add` 增加一个新元素，返回当前集合
3. `delete` 删除元素，返回boolean 值
4. `has` 检测集合中是否包含某个元素，返回boolean值
5. `clear` 清空集合，返回undefined

```javascript
// 声明一个set
let s = new Set();
// set接受可迭代数据，一般传入数组
let s2 = new Set(['雷伊','盖亚','卡修斯','布莱克','布莱克']);
// 输出s值和变量类型
console.log(s, typeof s);		//Set(0){}  "object"
// 输出s2值，集合会自动去重
console.log(s2);		//Set(4){'雷伊','盖亚','卡修斯','布莱克'} 

// 属性与方法
// 元素个数
console.log(s2.size);		//4
// 新增元素
s2.add('缪斯');
console.log(s2);		//Set(4){'雷伊','盖亚','卡修斯','布莱克','缪斯'} 
// 删除元素
s2.delete('缪斯');
// 检测元素
console.log(s2.has('雷伊'));		//true
console.log(s2.has('缪斯'));		//false
// 清空集合
s2.clear();
console.log(s);		//Set(0){}

// 集合实现了iterator接口，可for of遍历
for(let v of s2){
  console.log(v);
}
```

### 应用
```javascript
let  arr = [1,2,3,4,5,5,2,1,3,4];

// 1.去重
let result1 = [...new Set(arr)];
console.log(result1);		//1,2,3,4,5

// 2.交集
let arr2 = [4,5,6,5,6];
// 用去重后的数组，用filter()方法过滤
// let result = [..new Set(arr)].filter(item => {
//   let s2 = new Set(arr2);
//   if(s2.has(item)){
//     return true;
//   }else{
//     return false;
//   }
// })
// 简化
 let result2 = [...new Set(arr)].filter(item => new Set(arr2).has(item));
console.log(result2);		//4,5

// 3.并集
let result3 = [...new Set([...arr,...arr2])];

// 4.差集(交集的取反) 即集合一中有，而集合二中没有的数据
// 1,2,3,4,5
// 4,5,6
let result4 = [...new Set(arr)].filter(item => !(new Set(arr2).has(item)));
console.log(result4);		//1,2,3

```

## Map <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">数据结构</font>
<font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合。但是“键” 的范围不限于字符串，各种类型的值（包括对象）都可以当作键。Map也实现了 iterator接口，所以可以使用『扩展运算符』和『for…of…』进行遍历。Map的属性和方法： </font>

1. <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">size 返回Map的元素个数 </font>
2. <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">set 增加一个新元素，返回当前Map</font>
3. <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">get 返回键名对象的键值</font>
4. <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">has 检测Map中是否包含某个元素，返回boolean值</font>
5. <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">clear 清空集合，返回undefined  </font>

```javascript
//声明 Map
let m = new Map();

//添加元素
m.set('name','尚硅谷');
m.set('change', function(){
  console.log("我们可以改变你!!");
});
let key = {
  school : 'ATGUIGU'
};
m.set(key, ['北京','上海','深圳']);

//size
// console.log(m.size);

//删除
// m.delete('name');

//获取
// console.log(m.get('change'));
// console.log(m.get(key));

//清空
// m.clear();

//遍历
for(let v of m){
  console.log(v);
}

// console.log(m);
```

## class 类
<font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。基本上，ES6 的class可以看作只是 一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象 原型的写法更加清晰、更像面向对象编程的语法而已。</font>

<font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">知识点： </font>

1. <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">class声明类</font>
2. <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">constructor构造方法，定义构造函数初始化</font>
3. <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">extends继承父类</font>
4. <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">super调用父级构造方法</font>
5. <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">static定义静态方法和属性</font>
6. <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">父类方法可以重写</font>

### 基本使用
```javascript
// ES6 class写法
class Phone{
  brand = 
  // 构造方法constructor，名字不能修改
  // 在使用new实例化对象时（new Phone时）会执行此方法
  constructor(brand,price){
    this.brand = brand;
    this.price = price;
  }
  // 方法必须使用该语法，不能使用ES5的call:function(){}
  // 小括号中写形参，花括号中写代码体
  call(){
    // 代码体
  	console.log("打电话");
  }
}

// 比较：ES5 构造函数写法
function Phone(brand,price){
  this.brand = brand;
  this.price = price;
}
// 添加方法
Phone.prototype.call = function(){
  console.log("打电话");
}
// 实例化对象
let Huawei = new Phone('华为',1999)
Huawei.call();
console.log(Huawei);
```

### <font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">static </font>静态成员
静态成员不属于实例对象，无法被new的对象使用

```javascript
class Phone{
  static name = '手机';
  static change(){
    console.log("改变世界");
  }
}
let nokia = new Phone();
// 静态成员不属于实例对象，无法使用
console.log(nokia.name);	//undefined

// 只能通过类名来修改和调用
Phone.name = 'pc';
Phone.change()


// 比较：ES5写法
function Phone(){
}
Phone.name = '手机';
Phone.change = function(){
  console.log("改变世界");
}
let nokia = new Phone();
console.log(nokia.name);	//undefined
```

### 继承与重写 extends & super
#### ES5 构造函数继承
```javascript
// 手机
function Phone(brand, price){
  this.brand = brand;
  this.price = price;
}
Phone.prototype.call = function(){
  console.log("我可以打电话");
}

// 智能手机 继承手机
function SmartPhone(brand,price,color,size){
  // 用call方法继承手机构造函数的brand和price属性
  // 注意：call方法不是Phone的call方法
  Phone.call(this, brand, price);
  this.color = color;
  this.size = size;
}
// 设置子级构造函数的原型
SmartPhone.prototype = new Phone();
SmartPhone.prototype.constructor = SmartPhone;

// 声明子类的方法
SmartPhone.prototype.photo = function(){
  console.log('我可以拍照');
}
SmartPhone.prototype.playGame = function(){
  console.log('我可以玩游戏');
}
const chuizi = new SmartPhone('锤子',2499,'黑色','5.5inch');
console.log(chuizi);
```

#### ES6 类继承 与 重写 
使用super继承父类的方法，子类可以重写父类中的方法

```javascript
class Phone{
  // 构造方法
  constructor(brand, price){
    this.brand = brand;
    this.price = price;
  }
  // 父类的成员属性
  call(){
    console.log("我可以打电话");
  }
}

class SmartPhone extends Phone{
  // 构造方法
  constructor(brand,price,color,size){
    // 使用super继承父类的方法
    super(brand,price);	// 调用父类的构造函数
    this.color = color;
    this.size = size;
  }
  photo(){
    console.log('我可以拍照');
    super.call();	// 调用父类的方法

  }
  playGame (){
    console.log('我可以玩游戏');
  }
  // 重写父类的call方法
  // 注意子类方法不能用super调父类的同名方法
  call(){
    console.log("我可以打电话");
  }
}
const xiaomi = new SmartPhone('小米',799,'黑色','4.7inch')
xiaomi.call();
xiaomi.photo();
xiaomi.playGame();

```

### get 与 set
+ get与set用于方法绑定
+ 当对某属性获取时，执行get绑定的方法，获取的属性值就是get绑定方法的返回值。
+ 当对某属性赋值时，执行set绑定的方法，方法必须有一个形参。
+ 注意不能在get与set中写this.绑定的属性，会陷入递归导致栈溢出。
+ 在class中声明变量之后，在get与set中写this.绑定的属性则不会栈溢出。

```javascript
class Phone{
  // price; //声明price后可在get与set中使用this.price
  // 可以没有构造方法
  constructor(brand, price){
    this.brand = brand;
    this.price = price;
  }
  get price(){
    console.log('价格属性被读取了');
    return 'price';
    // return this.price;  陷入递归导致栈溢出
  }
  set price(newValue){
    console.log('价格属性被改变了');
		// this.price = newValue;   陷入递归导致栈溢出
  }

}
let s  = new Phone('100');
s.price = 'free';			//价格属性被改变了
console.log(s.price);		//价格属性被读取了 //price
```

### private
在 JS 中只有 private，没有其他修饰符，TS有 private、protected、readonly

> 来自ChatGPT
>

在现代 JavaScript（ES6+）中，确实支持私有成员（`private`）。使用 `#` 前缀可以定义私有字段和方法，这些成员只能在类内部访问，不能在类的外部直接访问。

以下是一个简单的例子：

```javascript
class MyClass {
  // 私有字段
  #privateField = 10;

  // 私有方法
  #privateMethod() {
    console.log("This is a private method.");
  }

  // 公共方法访问私有成员
  publicMethod() {
    console.log(`Private field value: ${this.#privateField}`);
    this.#privateMethod();  // 调用私有方法
  }

  // 公共方法访问和修改私有字段
  publicMethod() {
    console.log(`Private field value before change: ${this.#privateField}`);
    this.#modifyPrivateField();
    console.log(`Private field value after change: ${this.#privateField}`);
  }

  // 私有方法修改私有字段
  #modifyPrivateField() {
    this.#privateField = 100;
  }
}

const obj = new MyClass();
obj.publicMethod();  // 正常调用公共方法

// 尝试在类外部访问私有成员会报错
console.log(obj.#privateField);  // 报错：SyntaxError: Private field '#privateField' must be declared in an enclosing class
```

在这个示例中，`#privateField` 和 `#privateMethod` 是私有成员，不能在类外部访问。如果尝试在类外部访问这些私有成员，JavaScript 会抛出错误。

因此，`#` 前缀是实现 JavaScript 私有成员的方式，用于保护类的内部实现不被外部直接操作。

### 检测对象类型
```javascript
class Person {
  // ...
}
const per = new	Person()

// 检测 per 是不是 Person 的实例
console.log(per instanceof Person)	// true

// typeof 只能检测基本数据类型, 对象实例检测时都返回 object
console.log(typeof per)	// object
```

### TS 差异
js 中可以<font style="color:#DF2A3F;">定义属性不赋初值、且不在构造函数中初始化。</font>

```javascript
class Person {
    name = 'jack'; // 给 name 赋初值
    food; // food 不赋初值，默认为 undefined

    constructor(name) {
        this.name = name; // 在构造函数中赋值
    }
}

const person1 = new Person('rose');
console.log(person1.name); // rose
console.log(person1.food); // undefined

```

ts 中不可以<font style="color:#DF2A3F;">定义属性不赋初值、且不在构造函数中初始化。</font>

需要<font style="color:#DF2A3F;">设为可选属性</font>或<font style="color:#DF2A3F;">在构造函数中初始化</font>

```javascript
// 错误 定义属性不赋初值、且不在构造函数中初始化。
class Person {
    name: string = 'jack';
    food: string;	// 不赋初值
  
    constructor(name: string) {
        this.name= name; // 在构造函数中赋值
    }
}

// 正确 不赋初值,设为可选属性
class Person {
    name: string = 'jack';
    food?: string;	// 不赋初值,设为可选属性
  
    constructor(name: string, food?: string) {
        this.name= name; 
        this.food = food; // 可以不传值
    }
}

// 正确 不赋初值,在构造函数中初始化
class Person {
    name: string = 'jack';
    food: string;	

  constructor(food: string) {
        this.food= food; // 在构造函数中初始化
    }
}

```

## ES6 数值扩展
### Number.EPSILON 最小精度值
Number.EPSILON 是 JavaScript 中表示的最小精度

EPSILON 的属性值接近于 2.2204460492503130808472633361816E-16

```javascript
function equal(a, b)
if(Math.abs(a-b)<Number.EPSILON){
  return true;
}else{
  return false;
}
console.log(0.1 + 0.2 === 0.3)		//false
console.log(equal(0.1 + 0.2, 0.3))	//true
```

### 二进制和八进制
ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b和0o表示（零b和零o）。

```javascript
let b = 0b1010;		//二进制
let o = 0o777;		//八进制
let d = 100;		//十进制
let x = 0xff;		//十六进制
```

### Number方法
#### Number.isFinite 检查是否为有限数
Number.isFinite() 用来检查一个数值是否为有限的 

```javascript
console.log(Number.isFinite(100));		//true
console.log(Number.isFinite(100/0));		//false
console.log(Number.isFinite(Infinity));		//false

// 扩展：Infinity为无穷
console.log(100/0 === Infinity);	//true
```

#### Number.isNaN 检查是否为NaN
Number.isNaN() 用来检查一个值是否为NaN

```javascript
console.log(Number.isNaN(123));		//false
```

#### Number.parseInt Number.parseFloat字符串转整数
```javascript
//Number.parseInt Number.parseFloat字符串转整数
console.log(Number.parseInt('5211314love'));		//5211314
console.log(Number.parseFloat('3.1415926神奇'));		//3.1415926
```

#### Number.isInteger 判断是否为整数
```javascript
//Number.isInteger 判断一个数是否为整数
console.log(Number.isInteger(5));		//true
console.log(Number.isInteger(2.5));		//false
```

### Math方法
#### Math.trunc 将数字的小数部分抹掉  
```javascript
//Math.trunc 将数字的小数部分抹掉  
console.log(Math.trunc(3.5));		//3
```

#### Math.sign 判断数为正数 负数 还是零
```javascript
//Math.sign 判断一个数到底为正数 负数 还是零
console.log(Math.sign(100));			//1
console.log(Math.sign(0));				//0
console.log(Math.sign(-20000));		//-1
```

## ES6 对象方法扩展
### Object.is 判断两个值是否完全相等 
```javascript
console.log(Object.is(120, 120));// true 
console.log(120 === 120);// true
console.log(Object.is(NaN, NaN));// true 
console.log(NaN === NaN);// false
```

### Object.assign 对象的合并
把参数二合并到参数一，已存在的属性会覆盖，不存在的属性会添加，此合并为浅拷贝。

```javascript
const config1 = {
  host: 'localhost',
  port: 3306,
  name: 'root',
  pass: 'root',
  test: 'test'
};
const config2 = {
  host: 'http://atguigu.com',
  port: 33060,
  name: 'atguigu.com',
  pass: 'iloveyou',
  test2: 'test2'
}
console.log(Object.assign(config1, config2));
```

###  Object.setPrototypeOf 设置原型对象  Object.getPrototypeof 获取原型对象
#### Object.setPrototypeOf 方法设置原型对象
> PS：我觉得这里应该是对象原型更为合适？构造函数的prototype才是原型对象吧，挂载的方法是实例对象的对象原型
>

setPrototypeOf可以设置原型对象，但是一般使用create()方法在创建对象时直接设置。

```javascript
const school = {
  name: '尚硅谷'
}
const cities = {
  xiaoqu: ['北京','上海','深圳']
}
//  Object.setPrototypeOf 设置原型对象
Object.setPrototypeOf(school, cities);
//  Object.getPrototypeof 获取原型对象
console.log(Object.getPrototypeOf(school));
console.log(school);
```

#### Object.create 方法 创建对象并设置原型对象
Object.create() 是 JavaScript 中的一个方法，用于创建一个新对象，使用现有的对象来提供新创建的对象的 __proto__。

语法：`Object.create(proto, [propertiesObject])`

+ proto为原型对象，没有可写null
+ propertiesObject 为描述对象，属性值也必须为对象

> 描述对象属性：{  
>
> value: "John", 		//值
>
> writable: false ,		//是否可写
>
> configurable: true,	//是否可删除
>
> enumerable: true	//是否可枚举
>
>  }  
>



```javascript
// 1.创建一个新对象，并设置原型：
let proto = {  
  greet: function() {  
    console.log("Hello from prototype");  
  }  
};  

let obj = Object.create(proto);  
obj.greet(); // 输出: "Hello from prototype

// 2.创建一个新对象，并设置原型以及定义属性：
let proto = {  
  greet: function() {  
    console.log("Hello from prototype");  
  }  
};  
  
let obj = Object.create(proto, {  
  name: {  
    value: "John",  
    writable: false  
  }  
});  
  
obj.greet(); // 输出: "Hello from prototype"  
console.log(obj.name); // 输出: "John"

```

#### 直接用__proto__设置原型对象
```javascript
// 创建对象
let school = {
  name: '尚硅谷'
}
let cities = {
  xiaoqu: ['北京', '上海', '深圳']
}
school.__proto__.cities = cities
console.log(school);
```

#### 区分 构造函数设置原型对象
需要先有一个构造函数，然后设置原型对象prototype，<font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">通过在原型对象上定义方法，这些方法可以在所有使用该构造函数的实例之间共享。</font>

```javascript
function Person(name) {  
  this.name = name;  
}  
  
Person.prototype.greet = function() {  
  console.log("Hello, " + this.name);  
};  
  
let john = new Person("John");  
john.greet(); // 输出: "Hello, John"
```

## 模块化
模块化的优势有以下几点：防止命名冲突、代码复用、高维护性

### 模块化规范及对应产品
+ CommonJS  =>  NodeJS、Browserify 
+ AMD  =>  requireJS 
+ CMD  =>  seaJS 

### ES6 模块化语法 
模块功能主要由两个命令构成：export和import。 

+ export 命令用于规定模块的对外接口 
+ import 命令用于输入其他模块提供的功能

#### 浏览器使用ES6模块化引用模块 方法一
引入：通过 ` import * as m1 from "./src/js/m1.js";` 引入，将js文件作为变量存在m1中

暴露：要暴露的js文件中，将要暴露的数据在前面加上`export`

```html
<!-- 旧版非模块化引用形式 -->
<script src="./src/js/app.js" type="module"></script>

<!-- ES6 模块化语法  -->
<script type="module">
  import * as m1 from "./src/js/m1.js";
  console.log(m1);
</script>
```

```javascript
// 分别暴露
export let school = '尚硅谷';
export function teach() {
  console.log("我们可以教给你开发技能");
}
```

#### 暴露语法与引入解构
1. 分别暴露

```javascript
export let school = '尚硅谷';
export function teach() {
  console.log("我们可以教给你开发技能");
}
// 通用引入
// import * as m1 from "./src/js/m1.js";
// 引入并解构赋值
import {school,teach} from "./src/js/m1.js" 
```

2. 统一暴露

```javascript
let school = '尚硅谷';
function findJob(){
  console.log('帮你找工作')
}
export {school, findJob};
// 通用引入
// import * as m2 from "./src/js/m2.js";
// 引入并解构赋值
import {school as guigu, findJob} from "./src/js/m2.js";
```

3. 默认暴露

默认暴露可以使用简便形式`import m3 from "./src/js/m3.js";`引入，其他暴露不能使用简便形式。

```javascript
export default {
  // 可以是任意数据，对象居多
	school:'guigu',
  function findJob(){
  	console.log('帮你找工作')
  }
}
// 通用引入
// import * as m3 from "./src/js/m3.js";
// 引入并解构赋值
import {default as m3} from "./src/js/m3.js";
// 简便引入形式
import m3 from "./src/js/m3.js";
```

#### 浏览器使用ES6模块化引用模块 方法二
```javascript
// js入口文件 app.js
// 模块引入
import * as m1 from "./m1.js"
import * as m2 from "./m2.js"
import * as m3 from "./m3.js"
// ...
```

```html
<script src="./src/js/app.js" type="module"></script>
```

### ES11 模块动态引入
动态引入允许你在代码运行时按需加载模块，而不是在编译时全部加载  

打包时动态引入的模块会被单独打包成一个文件。

```javascript
import('module-name')
  .then(module => {
    // 使用模块
  })
  .catch(error => {
    // 处理错误
  });
```

### Bable对ES6模块化代码转换
由于不是所有浏览器都支持ES6模块化语法，通过Bable是一个JavaScript的编译器，可以将ES6模块化代码转为ES5支持的语法，打包形成单独的文件。

中文网：[https://babel.nodejs.cn/](https://babel.nodejs.cn/)

官网：[https://babel.docschina.org/](https://babel.docschina.org/)

1. 安装工具babel-cli babel-preset-env browserify，命令：`npm i babel-cli babel-preset-env browserify -D`
+ babel-cli： babel的命令号工具
+ babel-preset-env： 预设包，用于把最新的ES6转为ES5
+ browserify： 打包工具，项目中一般使用webpack，browserify比较简单在此用于演示
2. 编译 npx babel src/js -d dist/js --presets=babel-preset-env
+ npx ：若全局安装可省略
+ src/js： 源代码路径
+ -d： 转换完的结果存在哪里
+ dist/js： 转换完的结果存放位置
+ --presets=babel-preset-env： 参数
3. 打包 npx browserify dist/js/app.js -o dist/bundle.js
+ dist/js/app.js： 入口文件
+ -o：指定输出位置
+ dist/bundle.js：输出位置
4. 浏览器中引入

```html
<script src="dist/bundle.js"></script>
```

### ES6 模块化引入npm包
在以上案例基础上，以jquery为例引入npm包。

1. 安装jquery： `npm i jquery`
2. 引入jquery：在js文件中添加`import $ from 'jquery' ` 

相当于CommonJS 语法的 `const $ = require("jquery")`

3. 重新转换打包： 

`npx babel src/js -d dist/js --presets=babel-preset-env`

`npx browserify dist/js/app.js -o dist/bundle.js`

4. 使用：在js文件中添加`$('body').css('background','pink')`

## ES7
### Array.prototype.includes
includes 判断元素是否在数组内，返回true和flase

与indexof的区别是，indexof返回出现位置的下标，不存在返回-1

```javascript
const mingzhu = ['红楼梦','西游记','三国演义','水浒传'];
console.loh(mingzhu.includes('西游记'));	//true
console.log(mingzhu.includes('金瓶梅'));	//false
```

### ** 幂运算符
相当于Math.pow()

```javascript
console.log(2 ** 10);		//1024
console.log(Math.pow(2,10))	//1024
```

## ES8
### async和await
async、await两种语法结合可以让异步代码像同步代码一样

#### async
1. 返回值为promise对象
2. promise对象的结果由async函数执行的返回值决定
3. 只要返回的不是promise类型的对象，结果为成功状态的promise
4. 如果抛出错误对象，结果为失败的promise
5. 返回结果如果是一个promise对象，结果和返回的promise一致

```javascript
//async函数
async function fn(){
    // return '尚硅谷';
    throw new Error('出错啦')
}
const result = fn();
console.log(result);
```

#### await
1. await 必须写在async函数中 (async中可以没有await)
2. await右侧的表达式一般为promise对象 (即一般用于调用返回值为promise对象的函数)
3. await返回的是promise成功的值 
4. await的promise失败了, 就会抛出异常, 需要通过try...catch捕获处理 

```javascript
// 创建promise对象
const p = new Promise((resolve,reject)=>{
  // resolve("用户数据");
  reject("失败");
})
// await要放在async函数中
async function main(){
  try{
    let result = await p;
    // 如果await右侧的promise状态为成功，往后执行try中代码，输出result
    console.log(result);
  }catch(e){
    // 如果await右侧返回的promise状态为失败，用catch捕获输出错误
    console.log(e);
  }
}


```

#### async和await结合使用
结合读取文件内容

```javascript
const fs = require("fs");

function readWeiXue(){
  return new Promise((resolve,reject)=>{
    fs.readFile("./resources/为学.txt",(err,data)=>{
      // 失败
      if(err) reject(err);
      // 成功
      resolve(data);
    })
  })
}

function readChaYangShi(){
  return new Promise((resolve,reject)=>{
    fs.readFile("./resources/插秧诗.txt",(err,data)=>{
      if(err) reject(err);
      resolve(data);
    })
  })
}
function readGuanShu(){
  return new Promise((resolve,reject)=>{
    fs.readFile("./resources/观书有感.txt",(err,data)=>{
      if(err) reject(err);
      resolve(data);
    })
  })
}

async function main(){
  // 获取文件内容
  let weixue = await readWeiXue();
  let chayang = await readChaYangShi();
  let guanshu - await readGuanShu();
  console.log(weixue.toString());
  console.log(chayang.toString());
  console.log(guanshu.toString());
}
main();
```

结合发送ajax请求

```javascript
// 发送AJAX请求，返回Promise对象
function sendAJAX(url){
  return new Promise((resolve,reject)=>{
    // 1 创建对象
    const x = new XMLHttpRequest();
    // 2 初始化
    x.open('GET',url);
    // 3 发送
    x.send();
    // 4 事件绑定
    x.onreadystatechange = function(){}
    if(x.readyState === 4){
      if(x.status >= 200 && x.status < 300){
        resolve(x.response);
      }else{
        reject(x.status);
      }
    }
  })
}

// 测试
sendAJAX("https://api.apiopen.top/getJoke").then(value=>{
  console.log(value);
}, reason=>{})
// async与await测试
async function main(){
  let result = await sendAJAX("https://api.apiopen.top/getJoke")
  console.log(result;)
}
```

### 对象方法扩展
#### Object.key()  	
方法返回一个给定对象的属性名的数组

<imageProxy src="https://cdn.nlark.com/yuque/0/2024/png/36126128/1705660917960-0d48a3d6-005e-4f9f-8177-e3b58abad4ad.png"/>

#### Object.values() 	
方法返回一个给定对象的所有可枚举属性值的数组  

<imageProxy src="https://cdn.nlark.com/yuque/0/2024/png/36126128/1705660952845-1099f69c-757f-4dfe-82d6-a8fe5ecd11ad.png"/>

#### Object.entries()   
方法返回一个给定对象自身可遍历属性 [key,value] 的数组  

数组的每个元素是键值组成的数组，属性值也是数组。其主要作用是方便创建Map对象。

<imageProxy src="https://cdn.nlark.com/yuque/0/2024/png/36126128/1705661015750-6ef9ec13-2d45-4768-abd6-c9a855f1617a.png"/>

#### Object.getOwnPropertyDescriptors  
 该方法返回指定对象所有自身属性的描述对象  

<imageProxy src="https://cdn.nlark.com/yuque/0/2024/png/36126128/1705661167663-e45e4adb-caec-4468-8fe3-91b47fad5434.png"/>

```javascript
//声明对象
const school = {
  name:"尚硅谷",
  cities:['北京','上海','深圳'],
  xueke: ['前端','Java','大数据','运维']
};

//获取对象所有的键
// console.log(Object.keys(school));
//获取对象所有的值
// console.log(Object.values(school));
//entries
// console.log(Object.entries(school));
//创建 Map
// const m = new Map(Object.entries(school));
// console.log(m.get('cities'));

//对象属性的描述对象
// console.log(Object.getOwnPropertyDescriptors(school));

// const obj = Object.create(null, {
//     name: {
//         //设置值
//         value: '尚硅谷',
//         //属性特性
//         writable: true,
//         configurable: true,
//         enumerable: true
//     } 
// });
```

## ES9
### 扩展运算符与rest剩余参数
Rest剩余参数与spread扩展运算符在ES6中已经引入，不过ES6中只针对于数组，在ES9中为对象提供了像数组一样的rest参数和扩展运算符

```javascript
//rest 参数
function connect({host, port, ...user}){
  console.log(host);
  console.log(port);
  //多余参数都会存入user:{username:'root',password:'root',type:'master'}
  console.log(user);
}
connect({
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'root',
  type: 'master'
});


//对象的展开
//...skillOne   =>  q: '天音波', w: '金钟罩'

//对象合并
const skillOne = {
  q: '天音波'
}
const skillTwo = {
  w: '金钟罩'
}
const skillThree = {
  e: '天雷破'
}
const skillFour = {
  r: '猛龙摆尾'
}
//合并为mangseng:{q:'天音波',w:'金钟罩',e:'天雷破',r:'猛龙摆尾'}
const mangseng = {...skillOne, ...skillTwo, ...skillThree, ...skillFour};
console.log(mangseng)

```

### 正则扩展
#### 命名捕获分组
exec()可以正则匹配并返回匹配到的数组，命名捕获分组可以<font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">使用该名称来引用匹配的文本。</font>

<font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">正则匹配需求改变后，数组下标可能会发生改变，使用命名捕获可以方便代码后期维护，下标改变，而命名的名称是不变的。</font>

<imageProxy title="exec()原返回结果" src="https://cdn.nlark.com/yuque/0/2024/png/36126128/1705662562643-95c9fd66-886d-4954-b768-69d340acfde9.png"/>
<imageProxy title="命名捕获分组后的返回结果" src="https://cdn.nlark.com/yuque/0/2024/png/36126128/1705662598372-b90414c2-9215-4c20-b198-ca6b25fa362a.png"/>

```javascript
// 1 原写法
//声明一个字符串
// let str = '<a href="http://www.atguigu.com">尚硅谷</a>';

// //提取 url 与 『标签文本』
// const reg = /<a href="(.*)">(.*)<\/a>/;

// //执行
// const result = reg.exec(str);

// console.log(result);
// // console.log(result[1]);
// // console.log(result[2]);

// 2 捕获分组写法
let str = '<a href="http://www.atguigu.com">尚硅谷</a>';
//分组命名
const reg = /<a href="(?<url>.*)">(?<text>.*)<\/a>/;

const result = reg.exec(str);
console.log(result);
console.log(result.groups.url);
console.log(result.groups.text);
```

#### 反向断言
ES9支持反向断言，通过对匹配结果前面的内容进行判断，对匹配进行筛选。

```javascript
let str = 'JS5211314啊啊哈哈么555啦啦'
// 正向断言
const reg = /\d+(?=啦)/;	//匹配前面是“数字”，后面是“啦”（\d+ 匹配一个或多个数字）
const result = reg.exec(str);
console.log(result);	//555

// 反向断言 根据目标内容的前后做唯一性识别
//const reg = /()\d+/;	//正常：5211314，表示匹配一个或多个数字
const reg = /(?<=么)\d+/		//反向断言 555，表示 “数字”前面是不是“么”
const result = reg.exec(str);
console.log(result);
```

#### dotAll模式
dot  .  元字符，”.“匹配除回车外的任何单字符，dotAll模式标记“s”改变这种行为，允许行终止符出现

```javascript
//dot  .  元字符  除换行符以外的任意单个字符
let str = `
        <ul>
            <li>
                <a>肖生克的救赎</a>
                <p>上映日期: 1994-09-10</p>
            </li>
            <li>
                <a>阿甘正传</a>
                <p>上映日期: 1994-07-06</p>
            </li>
        </ul>`;

// 在非dotAll模式下，需要写多个\s+匹配换行
// const reg = /<li>\s+<a>(.*?)<\/a>\s+<p>(.*?)<\/p>/;

// dotAll模式标记“s”,无需写多个\s+
//单个匹配
// const reg = /<li>.*?<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/s;	
// const result = reg.exec(str);
// console.log(result);

// 多个匹配
const reg = /<li>.*?<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/gs;
let result;
let data = [];
while(result = reg.exec(str)){	//无匹配结果为null，结束循环
  console.log(result);
  data.push({title: result[1], time: result[2]});
}
//输出结果
console.log(data);
```

<imageProxy title="dotAll模式 多个匹配" src="https://cdn.nlark.com/yuque/0/2024/png/36126128/1705670272401-f7f830ef-d56b-403d-8e38-b72bade1a4fb.png"/>

## ES10
### Object.fromEntries  二维数组/Map转对象
用于创建一个对象，参数为二维数组或Map

```javascript
// 二维数组
const result = Object.fromEntries([
  ['name','尚硅谷'],
  ['xueke','java,前端,云计算']
]);

// Map
const m = new Map();
m.set('name','ATGUIGU');
const result = Object.fromEntries(m);
console.log(result);

// ES8中：Object.Entries 方法 对象转数组 
// 这两个方法互为逆运算
```

### trimStart 和 trimEnd 字符串方法扩展
清除字符串左/右的空格

```javascript
// trim
let str = '   iloveyou   ';
console.log(str);		//'   iloveyou   '
console.log(str.trimStart());		//'iloveyou   '
console.log(str.trimEnd());		//'   iloveyou'
console.log(str.trimEnd().trimStart());		//'iloveyou'
console.log(str.trim());		//'iloveyou'

```

### Array.prototype.flat、flatMap
Array.prototype.flat()  数组降维，参数为深度，默认为1，降低一维

Array.prototype.flat(2)  从三维降到一维

Array.prototype.flatMap() 将map的结果维度降低，相当于进行map+flat操作，若map返回结果是多维数组，可直接变成一维。

```javascript
//flat
//将多维数组转化为低位数组
// const arr = [1,2,3,4,[5,6]];
// const arr = [1,2,3,4,[5,6,[7,8,9]]];
//参数为深度 是一个数字
// console.log(arr.flat(2));  

//flatMap
const arr = [1,2,3,4];
const result = arr.map(item => [item * 10]);	//[10,20,30,40]
//若map返回结果是多维数组，可直接变成一维
const result = arr.flatMap(item => [item * 10]);	
console.log(result);
```

### Symbol.prototype.description
获取Symbol的描述字符串

```javascript
//创建 Symbol
let s = Symbol('尚硅谷');
console.log(s.description);	//尚硅谷
```

## ES11
### 私有属性 #
#开头为私有属性

```javascript
class Person{
  // 公有属性
  name;
  // 私有属性
  #age;
  #weight;
  // 构造方法
  constructor(name, age, weight){
    this.name = name;
    this.#age = age;
    this.#weight = weight;
  }
  intor(){
    // 内部可使用
    console.log(this.name);
    console.log(this.age);
    console.log(this.weight);
  }
}
// 实例化
const girl = new Person('晓红',18,'45kg');
// 私有属性无法输出
console.log(girl.name);
console.log(girl.age);
console.log(girl.weight);
// 可通过调用内部方法使用
girl.intor();
```

### Promise.allSettled、all
1. `Promise.allSettled`接收一个Promise数组，返回Promise对象，返回值为数组、成功状态。

返回的数组内为对象，每个对象包含Promise参数的状态与结果。
<imageProxy src="https://cdn.nlark.com/yuque/0/2024/png/36126128/1705680846489-bf3d22de-2f0e-4dbc-bfd1-5e9683db68e3.png"/>

2. `Promise.all`接收一个Promise数组，传入的Promise返回全为成功，`all`的返回值状态为成功，否则状态为失败。

若返回值状态为失败，值为传入参数中失败的Promise的值。

若返回值状态为成功，值为传入参数Promise结果组成的数组。

![](https://cdn.nlark.com/yuque/0/2024/png/36126128/1705681201988-e30d2f24-f332-47a7-a9f5-3cfea2225873.png)

```javascript
//声明两个promise对象
const p1 = new Promise((resolve, reject)=>{
  setTimeout(()=>{
    resolve('商品数据 - 1');
  },1000)
});

const p2 = new Promise((resolve, reject)=>{
  setTimeout(()=>{
    resolve('商品数据 - 2');
    // reject('出错啦!');
  },1000)
});

//调用 allsettled 方法
// const result = Promise.allSettled([p1, p2]);

// const res = Promise.all([p1, p2]);

console.log(res);

```

### String.prototype.matchAll 正则批量提取
用于正则的批量提取

```javascript
let str = `<ul>
            <li>
                <a>肖生克的救赎</a>
                <p>上映日期: 1994-09-10</p>
            </li>
            <li>
                <a>阿甘正传</a>
                <p>上映日期: 1994-07-06</p>
            </li>
        </ul>`;

//声明正则
const reg = /<li>.*?<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/sg

//调用方法
const result = str.matchAll(reg);

// for(let v of result){
//     console.log(v);
// }

const arr = [...result];

console.log(arr);
```

### 可选链操作符 ？.
```javascript
// ?.
function main(config){
  // const dbHost = config && config.db && config.db.host;
  // ?.用于判断是否有传入config
  //config?.db为 config.db存在才会取db，
  //config?.db?.host为 config.db.host存在才会取host，
  const dbHost = config?.db?.host;

  console.log(dbHost);
}

main({
  db: {
    host:'192.168.1.100',
    username: 'root'
  },
  cache: {
    host: '192.168.1.200',
    username:'admin'
  }
})
```

### 空值合并运算符
`??` 是 JavaScript 中的 空值合并运算符（Nullish Coalescing Operator）。它用于在两个表达式之间返回第一个不为 null 或 undefined 的值。

```javascript
let result = a ?? b;	// a为null 或 undefined时返回b
let n = null
console.log(n ?? '123') 	// n为空时输出123
```

与`||`的区别

`||`处理一切假值，`??`只处理 null 或 undefined。

+ `0 || 100`时，0为假返回100
+ `null || 100`时，null 为假返回100
+ `0 ?? 100`时，0非空（null 或 undefined），返回0
+ `null ?? 100`时，null 为空（null 或 undefined），返回100

```javascript
let result1 = 0 || 100;   // result1 为 100
let result2 = null || 100;   // result2 为 100

let result3 = 0 ?? 100;   // result3 为 0
let result4 = null ?? 100;   // result4 为 100
```

### 动态import 导入
静态import导入是在文件开始导入大量模块文件，而动态import导入可以实现懒加载，按需导入。

动态引入需要使用import(路径)，此方法的返回值是Promise对象。

```html
<body>
  <button id="btn">点击</button>
  <script src="./js/app.js" type="module"></script>
</body>
```

```javascript
// import * as m1 from "./hello.js";
//获取元素
const btn = document.getElementById('btn');

btn.onclick = function(){
  import('./hello.js').then(module => {
    module.hello();
  });
}
```

```javascript
export function hello(){
  alert('Hello');
}
```

### BigInt类型
大整型用于大数值运算，在数值后加n，如`let n = 521n;`，BigInt只能和BigInt相运算，不能和字符串、浮点数等运算。

BigInt(n)：此方法将普通整型转为大整型，不能传入浮点数等。

Number.MAX_SAFE_INTEGER：最大安全整数，9007199254740991。

```javascript
//大整形
// let n = 521n;
// console.log(n, typeof(n));	//521n bigint

//函数
// let n = 123;
// console.log(BigInt(n));
// console.log(BigInt(1.2));

//大数值运算
let max = Number.MAX_SAFE_INTEGER;	//最大安全数值
console.log(max);		//9007199254740991
console.log(max + 1);		//9007199254740992
console.log(max + 2);		//9007199254740992 运算不正确

console.log(BigInt(max))		//9007199254740991n
console.log(BigInt(max) + BigInt(1))		//9007199254740992n
console.log(BigInt(max) + BigInt(2))		//9007199254740993n
```

### globalThis 绝对全局对象
无论运行环境，globalThis始终指向全局对象

```javascript
// 浏览器环境
console.log(globalThis);	//windows
// nodejs环境
console.log(globalThis);	//global
```

