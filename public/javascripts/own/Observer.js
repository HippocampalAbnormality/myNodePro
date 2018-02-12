class Observer {
  constructor(data) {
    this.data = data;
    this.transform(data);
  }

  transform(data) {
    Object.keys(data).forEach(function(key) {
      let value = data[key]

      Object.defineProperty(data, key, {
        enumerable: true,
        
        configurable: false,
        
        get() {
          console.log('劫持到了')
          return value
        },
        
        set(newV) {
          console.log('开始设置了')
          if (value === newV) return
          value = newV
        }
      })
    })
  }
}

// 这里是发布者
class Dep {
  constructor() {
    this.subs = []
  }

  // 添加订阅者
  addSub(item) {
    this.subs.push(item)
  }

  // 通知订阅者
  notify() {
    this.subs.forEach(function(item) {
      // 订阅者，此时更新
      // item.update();
    })
  }
}

const obj = Object.create(null)
obj.a = 111
const obs = new Observer(obj)
console.log(obs.data.a)
obs.data.a = 2