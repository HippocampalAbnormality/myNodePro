function * foo (x,y) {
  yield 'aa';
  yield 'zz';
  return 'ending'
};

let f = foo(1, 2);
let a = f.next();
console.log(a)