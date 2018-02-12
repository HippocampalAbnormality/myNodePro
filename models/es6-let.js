// let特点1：
{
  let a = 2;
  var b = 3;
}
// console.log(a) // a is not defined 新增代码块，let只在代码块中有效
// console.log(b)

// 所以let的适用场景之一是for循环
for (let i = 0; i < 3; i++) {
  if (i===3) {
    console.log(i)
  }
}
// console.log(i)

// let特点2：
// 再来个喜闻乐见，思考与var的不同
var arr = [];
for (let i = 0; i < 10; i++) {
  arr[i] = function() {
    console.log(i)
  }
}
// arr[6]();

// let特点3：
// console.log(x);
// var x = 0;
// console.log(y);
// let y = 0;


// let特点4：只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
var tmp = 123;
if (true) {
  tmp = 'abc'; // 因为绑定这个区域了，报错因为特点5
  let tmp;
}

// let特点5：不允许在相同作用域内，重复声明同一个变量。

function func1() { // 报错
  let a = 10;
  var a = 1;
}

function func2() { // 报错
  let a = 10;
  let a = 1;
}

function func3(a) { // 报错
  let a = 10; // 这里也是有了变量a
}

function func4(arg) {
  {
    let arg; // 不报错
  }
}


/** 
 * let特点：
 * 1、与代码块共用的话仅在代码块内生效
 * 2、for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域
 * 3、不存在变量提升
 * 4、暂时性死区
 * 5、let不允许在相同作用域内，重复声明同一个变量。
 * */ 