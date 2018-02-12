/**
 * ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，
 * 以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。
 * 比如，CommonJS 模块就是对象，输入时必须查找对象属性。
 */

// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;

/**
 * 上面代码的实质是整体加载fs模块（即加载fs的所有方法），
 * 生成一个对象（_fs），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，
 * 因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。
 */

//  ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。

// ES6模块
import { stat, exists, readFile } from 'fs';
/**
 * 优势：
 * 
 * 上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。
 * 这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，
 * 效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。
 * 
 * 由于 ES6 模块是编译时加载，使得静态分析成为可能。有了它，
 * 就能进一步拓宽 JavaScript 的语法，比如引入宏（macro）和
 * 类型检验（type system）这些只能靠静态分析实现的功能。
 * 
 * -不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。
 * -将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。
 */

//  ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict"

// 严格模式主要有以下限制。

// -变量必须声明后再使用
// -函数的参数不能有同名属性，否则报错
// -不能使用with语句
// -不能对只读属性赋值，否则报错
// -不能使用前缀 0 表示八进制数，否则报错
// -不能删除不可删除的属性，否则报错
// -不能删除变量delete prop，会报错，只能删除属性delete global[prop]
// -eval不会在它的外层作用域引入变量
// -eval和arguments不能被重新赋值
// -arguments不会自动反映函数参数的变化
// -不能使用arguments.callee
// -不能使用arguments.caller
// -禁止this指向全局对象
// -不能使用fn.caller和fn.arguments获取函数调用的堆栈
// -增加了保留字（比如protected、static和interface）


/**
 * 模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
 */

export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

// 上下这两种是等价的，推荐下面这种

var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;
export {firstName, lastName, year};

// 通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名。
function v1() {}
function v2() {}
export {
  v1 as newName1,
  v2 as newName2
}

// 需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

// 想想为啥错
// 报错
export 1;

// 报错
var m = 1;
export m;

// 正确做法
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};
// 它们的实质是，在接口名与模块内部变量之间，建立了一一对应的关系。

// ##另外，export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
// 上面代码输出变量foo，值为bar，500 毫秒之后变成baz。
// 这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新

/**
 * 最后，export命令可以出现在模块的任何位置，只要处于模块顶层就可以。
 * 如果处于块级作用域内，就会报错，下一节的import命令也是如此。
 * 这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。
 */


 /**
  * import
  * import命令接受一对大括号，里面指定要从其他模块导入的变量名。
  * 大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同。
  */
  import {firstName, lastName, year} from './profile';

  // 如果想重命名，用as
  import { lastName as surname } from './profile';

  // 注意，import命令具有提升效果，会提升到整个模块的头部，首先执行。

foo();
import { foo } from 'my_module';
// 上面的代码不会报错，因为import的执行早于foo的调用。这种行为的本质是，import命令是编译阶段执行的，在代码运行之前。

// 由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。

// 报错
import { 'f' + 'oo' } from 'my_module';
// 报错
let module = 'my_module';
import { foo } from module;
// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}


// 最后，import语句会执行所加载的模块，因此可以有下面的写法。
import 'lodash';
// 上面代码仅仅执行lodash模块，但是不输入任何值。

// 如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次。
import { foo } from 'my_module';
import { bar } from 'my_module';
// 等同于
import { foo, bar } from 'my_module';


/**
 * 目前阶段，通过 Babel 转码，CommonJS 模块的require命令和 ES6 模块的import命令，
 * 可以写在同一个模块里面，但是最好不要这样做。
 * 因为import在静态解析阶段执行，所以它是一个模块之中最早执行的。
 * 下面的代码可能不会得到预期结果。
 */
require('core-js/modules/es6.symbol');
require('core-js/modules/es6.promise');
import React from 'React';


/**
 * 模块的整体加载
 * 除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。
 */ 

// circle.js
export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}

// 此为逐一指定要加载的方法
import { area, circumference } from './circle';
// 整体加载，加载到对象circle中
import * as circle from './circle';
// 注意，模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，所以不允许运行时改变。下面的写法都是不允许的。
// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};


/**
 * export default
 * 为模块指定默认输出
 */ 
// export-default.js
export default function () {
  console.log('foo');
}
// 上面代码是一个模块文件export-default.js，它的默认输出是一个函数。
// 其他模块加载该模块时，import命令可以为该匿名函数指定  任意  名字。
// import-default.js
import customName from './export-default';
customName(); // 'foo'

// 此时，并未使用  大括号  ，而普通引入是需要的，下面有比较
// 第一组
export default function crc32() { // 输出
  // ...
}
// 第二组
export function crc32() { // 输出
  // ...
};

/**
 * export default命令用于指定模块的默认输出。
 * 显然，一个模块只能有一个默认输出，因此export default命令只能使用一次。
 * 所以，import命令后面才不用加大括号，因为只可能对应一个方法。
 */ 

// 本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';


// 如果想在一条import语句中，同时输入默认方法和其他接口，可以写成下面这样。
import _, { each, each as forEach } from 'lodash';


/**
 * export 与 import 的复合写法
 * 如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。
 */ 
export { foo, bar } from 'my_module';

// 等同于
import { foo, bar } from 'my_module';
export { foo, bar };

// 模块的接口改名和整体输出，也可以采用这种写法。
// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';

// 默认接口的写法如下。
export { default } from 'foo';

// 具名接口改为默认接口的写法如下。
export { es6 as default } from './someModule';

// 等同于
import { es6 } from './someModule';
export default es6;

// 同样地，默认接口也可以改名为具名接口。
export { default as es6 } from './someModule';


// 下面三种import语句，没有对应的复合写法。
import * as someIdentifier from "someModule";
import someIdentifier from "someModule";
import someIdentifier, { namedIdentifier } from "someModule";


/**
 * 模块的继承
 * 
 * 
 */ 