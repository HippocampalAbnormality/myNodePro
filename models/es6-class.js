// class产生的意义：新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。
// 对比下es5与es6相同效果

// es5
function Point1(x, y) {
  this.y = y;
  this.x = x;
};
Point1.prototype.toString = function() {
  return '(' + this.x + ',' + this.y + ')';
};
var p = new Point1(1, 2);

// es6
class Point2 {
  // 构造方法
  constructor (x, y) {
    this.x = x;
    this.Y = Y;
  }

  // 注意：方法之间不需要逗号分隔，加了会报错

  toString () {
    return '(' + this.x + ',' + this.y + ')';
  }
}

// ES6 的类，完全可以看作构造函数的另一种写法。
typeof Point2; // function
Point2 === Point2.prototype.constructor; // true

// 构造函数的prototype属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。
class Point3 {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point3.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};

// 注意：类的内部所有定义的方法，都是不可枚举的（non-enumerable）。
class Point {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}

Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]


// 类的属性名，可以采用表达式。
let name = 'get';
class Squ {
  constructor () {
    // ...
  }

  [name] () {
    // ...
  }
}


// 严格模式：类和模块的内部，默认就是严格模式
// 考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。

/**
 * constructor
 * constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。
 * 一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
 * constructor方法默认返回实例对象（即this）
 */
class Point5 {
}

// 等同于
// class Point5 {
//   constructor() {}
// };


// 可以指定返回另外一个对象
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo;
// false
// 上面代码中，constructor函数返回一个全新的对象，结果导致实例对象不是Foo类的实例

// 注意：类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行

/**
 * Class表达式
 * 与函数一样，类也可以使用表达式的形式定义。
 * 注意：类的名字是MyClass而不是Me，Me只在 Class 的内部代码可用，指代当前类。Me只在类内部有定义，外部没有
 */
const Myclass = class Me {
  getClassName() {
    return Me.name;
  }
}
// 如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式。
const Myclass2 = class { /* ... */ }

// 采用 Class 表达式，可以写出立即执行的 Class。
let person = new class {
  constructor(name) {
    this.name = name;
  }

  say() {
    console.log(this.name);
  }
}('张三');

/**
 * 类不存在变量提升（hoist），这一点与 ES5 完全不同。
 */ 
// new Foo2();
// class Foo2{};

{
  let Foo = class {};
  class Bar extends Foo {
  }
}
/**
 * 上面的代码不会报错，因为Bar继承Foo的时候，Foo已经有定义了。
 * 但是，如果存在class的提升，上面代码就会报错，因为class会被提升到代码头部，
 * 而let命令是不提升的，所以导致Bar继承Foo的时候，Foo还没有定义
 */ 


/**
 * 私有方法
 * 利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值
 */
const bar = Symbol('bar');
const snaf = Symbol('snaf');

class myClass{

  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }

  // ...
};

// 上面代码中，bar和snaf都是Symbol值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果

/**
 * this：因有些es6内容暂时没看，等看了再搞这里
 */

/**
 * name属性
 * 由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。
 */  
class Point7 {};
Point7.name; //Point7
// name属性总是返回紧跟在class关键字后面的类名。


/**
 * Class 的取值函数（getter）和存值函数（setter）
 * 与 ES5 一样，在“类”的内部可以使用get和set关键字，对 某个 属性设置存值函数和取值函数，拦截该属性的存取行为。
 */ 
class Myclass3 {
  constructor() {}

  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter:' + value);
  }
}
let inst = new Myclass3();
inst.prop = 123; // setter
inst.prop; // getter

/**
 * 到了12了，以后继续
 */ 