// ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构

// ES6 允许写成下面这样 
let [a, b, c] = [1, 2, 3];

// 本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。下面是一些使用嵌套数组进行解构的例子。
let [foo, [[bar], baz]] = [1, [[2], 3]];


let [x, , y] = [1, 2, 3];
// x:1  y:3

let [head, ...tail] = [1, 2, 3, 4];
// head: 1   tail: [2, 3, 4]

let [u, ...z] = ['a'];
// u: undefined
// z: []

// 如果解构不成功，变量的值就等于undefined。

/**
 * 不完全解构
 */ 
let [x1, y1] = [1, 2, 3];

// 如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。
let [foo] = 1; // 报错

/**
 * 默认值 
 */ 
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
// 注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。
let [x = 1] = [null]; //x null


function f() {
  console.log('aaa');
}

let [x = f()] = [1];
// 上面代码中，因为x能取到值，所以函数f根本不会执行。上面的代码其实等价于下面的代码。
let x;
if ([1][0] === undefined) {
  x = f();
} else {
  x = [1][0];
}

// 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
let [x = 1, y = x] = [];     // x=1; y=1


/**
 * 对象的解构赋值
 */ 

let { foo, bar } = { foo: "aaa", bar: "bbb" };

// 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

let { bar, foo } = { foo: "aaa", bar: "bbb" };
// foo: "aaa"  bar: "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
// baz: undefined

// 如果变量名与属性名不一致，必须写成下面这样。
let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
// f: 'hello'    l: 'world


let obj = { p: ['Hello', { y: 'World' }] };
let { p: [x, { y }] } = obj;
// x: "Hello"   y: "World"

// 注意，这时p是模式，不是变量，因此不会被赋值。如果p也要作为变量赋值，可以写成下面这样。
let obj = { p: ['Hello', { y: 'World' }] };
let { p, p: [x, { y }] } = obj;
// x: "Hello"   y: "World"   p: ["Hello", {y: "World"}]


const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};

let { loc, loc: { start }, loc: { start: { line }} } = node;
/**
 * 这是个高级货
 * line // 1
 * loc  // Object {start: Object}
 * start // Object {line: 1, column: 5}
 */


/**
 * 函数参数的解构赋值
 */
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
// 上面代码中，函数add的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量x和y。对于函数内部的代码来说，它们能感受到的参数就是x和y。
[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]