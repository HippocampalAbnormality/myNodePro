import './child.scss'
import a from './assets/03.png'
import child from './child.html'

console.log(child)

function fill(tpl) {
  let app = document.getElementById('app')
  app.innerHTML = tpl
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


Test.say()