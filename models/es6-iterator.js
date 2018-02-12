/**
 * 遍历器（Iterator）就是这样一种机制。
 * 它是一种接口，为各种不同的数据结构提供统一的访问机制。
 * 任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
 * 
 * Iterator 的作用有三个：
 * 一是为各种数据结构，提供一个统一的、简便的访问接口；
 * 二是使得数据结构的成员能够按某种次序排列；
 * 三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。
 * 
 * Iterator 的遍历过程是这样的。
 * （1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
 * （2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
 * （3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
 * （4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。
 * 每一次调用next方法，都会返回数据结构的当前成员的信息。
 * 具体来说，就是返回一个包含value和done两个属性的对象。
 * 其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。
 */

function makeIterator(arr) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < arr.length ? {value: arr[nextIndex++], done: false} : {value: undefined, done: true};
    }
  }
}

var it = makeIterator(['a', 'b']);

it.next(); // { value: "a", done: false }
it.next(); // { value: "b", done: false }
it.next(); // { value: undefined, done: true }


// 当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。
// 一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是”可遍历的“（iterable）。
// ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，
// 或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）
// 这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内
const obj = {
  [Symbol.iterator] : function () {
    return {
      next: function () {
        return {
          value: 1,
          done: true
        };
      }
    };
  }
};

// 上面代码中，对象obj是可遍历的（iterable），因为具有Symbol.iterator属性。
// 执行这个属性，会返回一个遍历器对象。该对象的根本特征就是具有next方法。
// 每次调用next方法，都会返回一个代表当前成员的信息对象，具有value和done两个属性。

// ES6 的有些数据结构原生具备 Iterator 接口（比如数组），即不用任何处理，就可以被for...of循环遍历。
// 原因在于，这些数据结构原生部署了Symbol.iterator属性（详见下文），另外一些数据结构没有（比如对象）。
// 凡是部署了Symbol.iterator属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。

/**
 * 原生具备 Iterator 接口的数据结构如下。
 * -Array
 * -Map
 * -Set
 * -String
 * -TypedArray
 * -函数的 arguments 对象
 * -NodeList 对象
 */

let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();
iter.next(); // { value: 'a', done: false }
iter.next(); // { value: 'b', done: false }
iter.next(); // { value: 'c', done: false }
iter.next(); // { value: undefined, done: true }

class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator]() { return this; }

  next() {
    var value = this.value;
    if (value < this.stop) {
      this.value++;
      return {done: false, value: value};
    }
    return {done: true, value: undefined};
  }
}

function range(start, stop) {
  return new RangeIterator(start, stop);
}

for (var value of range(0, 3)) {
  console.log(value); // 0, 1, 2
}