import './child.scss'
import a from './assets/03.png'
import child from './child.html'
// import { _ } from './module.js'

console.log(child)

function fill(tpl) {
  let app = document.getElementById('app')
  app.innerHTML = tpl
  app.querySelector('.btn').addEventListener('click', function() {
    // 验证动态代码分割
    // import()我的浏览器报错说不支持，暂且用require.ensure吧
    // import(/* webpackChunkName: "module" */ './module.js').then(_ => {
    //   console.log(_)
    // }).catch(error => 'error')

    // 关于这个方法，直接看webpack的API文档
    require.ensure([], require => {
      let _ = require('./module.js'),
          ha = require('./testDep.js');
      console.log(_._)
      ha.ha()
    }, 'module')
    .then(() => console.log('succ'))
    .catch(err => console.log(err))
  }, false)
}

fill(child)

class Test {
  constructor(age) {
    this.age = age
  }

  static say() {
    console.log('aaaaa')

    // 这个观察dev-tool工具
    // cosole.error('I get called from print.js!')
  }
}

console.log(12)
Test.say()