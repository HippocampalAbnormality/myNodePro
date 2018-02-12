import { isObject } from "util";

// 是否有效数组索引
export function isValidArrayIndex(val) {
  const n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(n);
}

export function toString(val) {
  return val === null || val === undefined ? '' : typeof val === 'object' ? JSON.stringify(val) : String(val);
}

export function toNumber(val) {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
}

// 建立可查的表
export function makeMap(str, expectsLowerCase) {
  const map = Object.create(null);
  const arr = str.split(',');
  for(let i = 0; i < arr.length; i++) {
    map[arr[i]] = true;
  };

  return expectsLowerCase ? val => map[val.toLowerCase()] : val => map[val];
}

export const isBuiltInTag = makeMap('slot,component', true)

/**
 * 检查是否是已储存的属性
 */
export const isReservedAttribute = makeMap('key, ref, slot, slot-scope, is');

// 删除数组中某一项
export function remove(arr, item) {
  if (arr.length > 0){
    const start =  arr.indexOf(item);
    if (start > 0) {
      // return 的是删除的元素，反正是变异方法
      return arr.splice(start, 1);
    };
  };
}

// 判断是否拥有此属性 
const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

// 给纯函数创建一个存储版本
export function cached(fn) {
  const cache = Object.create(null);
  return (function cacheFn(str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  });
}

// 把字段首字母大写
export const capitalize = cached(str => {
  return str.chartAt(0).toUpperCase() + str.slice(1);
})

// 简单的bind，比原生快（尤大是这么写的）
export function bind(fn, ctx) {
  function boundFn(a) {
    const l = arguments.length;
    return l 
            ? l > 1 
                  ? fn.apply(ctx, arguments)
                  : fn.call(ctx, a)
            : fn.call(ctx);
  };
  // 这个length是函数的形势参数个数，在此记录一下传入的函数的原始参数个数
  boundFn._length = fn.length;
  return boundFn;
}

// 将类数组转成真数组
export function toArray(list, start) {
  start = start || 0;
  let i = list.length - start;
  const ret = new Array(i);
  // 这里对的判断条件用i--来代替，很巧妙，到0自动停
  while(i--) {
    ret[i] = list[i + start];
  };
  return ret;
}

// 把属性混合到目标对象
export function extend(to, _from) {
  // for in这东西会把原型中的可遍历属性也搞下来，这里这么写，估计尤大整个架子做的比较严密，原型中把新加属性都设定了不可遍历
  for (const key in _from) {
    to[key] = _from[key];
  };
  return to;
}

// 将数组中的对象融入一个单体对象
export function toObject(arr) {
  const res = {};
  // 看起来有点疑惑，新的不会把已有的属性重置吗？
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    };
  };
  return res;
}

export function noop(a, b, c) {}

// 总是返回false
export const no = (a, b, c) => false;

// 返回相同的值
export const identify = _ => _;

// 从编译器模块生成静态键字符串
export function genStaticKeys(modules) {
  return modules.reduce((keys, m) => {
    return keys.concat(m.staticKeys || [])
  }, []).join(',');
}

// 检查两个值是否松散相等，即，如果它们是原生对象，它们是否一样（从代码看判断的都是内容是否相等）？
export function looseEqual(a, b) {
  if (a === b) return true;
  const isObjectA = isObject(a);
  const isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a);
      const isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every((e, i) => {
          return looseEqual(e, b[i])
        });
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(key => {
          return looseEqual(a[key], b[key]);
        });
      } else {
        // 其他不几把管了
        return false;
      };
    } catch (e) {
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    // 比较的是松散相等，但这里用的全等，因为都转型成字符串了
    return String(a) === String(b);
  } else {
    // 类型都不等肯定是不等了
    return false;
  };
}

export function looseIndexOf(arr, val) {
  for (let i = 0; i < arr.length; i ++) {
    if (looseEqual(arr[i], val)) return i;
  };
  return -1;
}

export function once(fn) {
  let called = false;
  return function() {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

 