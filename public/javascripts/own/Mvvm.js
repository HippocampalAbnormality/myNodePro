class Mvvm {
  constructor(options) {
    this.$options = options || {}
    let data = this._data = this.$options.data
    let me = this

    Object.keys(data).forEach(function(key) {  
      me._proxyData(key)
    })

    this._initComputed()
    observe(data, this)
    this.$compile = new Compile(options.el || document.body, this)
  }

  $watch(key, cb, options) {
    new Watcher(this, key, cb)
  }

  _proxyData(key, setter, getter) {
    let me = this
    setter = setter || Object.defineProperty(me, key, {
      configurable: false,
      enumerable: true,
      get() {
        return me._data[key]
      },
      set(newVal) {
        me._data[key] = newVal
      }
    })
  }

  _initComputed() {
    let me = this
    let computed = this.$options.computed
    if (typeof computed === 'object') {
      Object.keys(computed).forEach(key => {
        Object.defineProperty(me, key, {
          get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,

          set() {
            
          }
        })
      })
    }
  }
}