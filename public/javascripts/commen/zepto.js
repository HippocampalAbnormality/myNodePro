var Zepto = (function() {
  var undefined, key, $, classList, emptyArray = [],
  concat = emptyArray.concat, filter = emptyArray.filter,
  slice = emptyArray.slice,
  document = window.document,
  elementDisplay = {}, classCache = {},
  cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
  fragmentRE = /^\s*<(\w+|!)[^>]*>/,
  singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
  tagExpanderRE,
  rootNodeRE,
  capitalRE,

  methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

  adjacencyOperators = ['after', 'prepend', 'before', 'append'],
  table = document.createElement('table'),
  tableRow = document.createElement('tr'),
  containers = {
    'tr': document.createElement('tbody'),
    'tbody': table, 'thead': table, 'tfoot': table,
    'td': tableRow, 'th': tableRow,
    '*': document.createElement('div')
  },
  simpleSelectorRE = /^[\w-]*$/,
  class2type = {},
  toString = class2type.toString,
  zepto = {},
  camelize, uniq,
  tempParent = document.createElement('div'),
  propMap = {
    'tabindex': 'tabIndex',
    'readonly': 'readOnly',
    'for': 'htmlFor',
    'class': 'className',
    'maxlength': 'maxLength',
    'cellspacing': 'cellSpacing',
    'cellpadding': 'cellPadding',
    'rowspan': 'rowSpan',
    'colspan': 'colSpan',
    'usemap': 'useMap',
    'frameborder': 'frameBorder',
    'contenteditable': 'contentEditable'
  },
  isArray = Array.isArray || function(obj) {
    return obj instanceof Array;
  };

  zepto.matches = function(element, selector) {
    if (!selector || !element || element.nodeType !== 1) {
      return false;
    };
    var matchesSelector = element.matches || element.webkitMatchesSelector || 
        element.mozMatchesSelector || element.oMatchesSelector ||
        element.matchesSelector;
    if (matchesSelector) {
      return matchesSelector.call(element, selector);
    };
    var match, parent = element.parentNode, temp = !parent;
    if (temp) {
      (parent = tempParent).appendChild(element);
    };
    // 按位取反运算符
    match = ~zepto.qsa(parent, selector).indexOf(element);
    temp && tempParent.removeChild(element);
    return matches;
  };

  function type(obj) {
    // undefined和null时。我一直弄不清那些nan之类
    return obj == null ? String(obj) : class2type[toString.call(obj)] || 'object'; 
  };

  function isFunction(value) {
    return type(value) == 'function';
  };

  // 有点困惑
  function isWindow(obj) {
    return obj != null && obj == obj.window;
  };

  function isDocument(obj) {
    return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
  };

  function isObject(obj) {
    return type(obj) == 'object';
  };

  function isPlainObject(obj) {
    // Object.getPrototypeOf(Object) === Function.prototype
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
  };

  function likeArray(obj) {
    var length = !!obj && 'length' in obj && obj.length,
        type = $.type(obj);
    
    return 'function' != type && !isWindow(obj) && ('array' == type || length === 0 || (typeof length == 'number' && length > 0 && (length - 1) in obj));
  };

  function compact(array) {
    return filter.call(array, function(item) {
      return item != null;
    });
  };

  function flatten(array) {
    return array.length > 0 ? $.fn.concat.apply([], array) : array;
  };
  
  // 转换驼峰命名
  camelize = function(str) {
    return str.replace(/-+(.)?/g, function(match, chr) {
      return chr ? chr.toUpperCase() : '';
    });
  };

  function dasherize(str) {
    return str.replace(/::/g, '/')
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
            .replace(/([a-z\d])([A-Z])/g, '$1_$2')
            .replace(/_/g, '-')
            .toLowerCase();
  };

  uniq = function(array) {
    return filter.call(array, function(item, idx) {
      return array.indexOf(item) == idx;
    });
  };

  function classRE(name) {
    return name in classCache ? classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'));
  };

  function maybeAddPx(name, value) {
    return (typeof value == 'number' && !cssNumber[dasherize(name)]) ? value + 'px' : value;
  };

  function defaultDisplay(nodeName) {
    var element, display;
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName);
      document.body.appendChild(element);
      display = getComputedStyle(element, '').getPropertyValue('display');
      element.parentNode.removeChild(element);
      display == 'none' && (display = 'block');
      elementDisplay[nodeName] = display;
    };
    return elementDisplay[nodeName];
  };

  function children(element) {
    return 'children' in element ? slice.call(element.children) : $.map(element.childNodes, function(node) {
      if (node.nodeType == 1) {
        return node;
      };
    });
  };

  function Z(dom, selector) {
    var i, len = dom ? dom.length : 0;
    for (i = 0; i < len; i++) this[i] = dom[i];
    this.length = len;
    this.selector = selector || '';
  };

  zepto.fragment = function(html, name, properties) {
    var dom, nodes, container;

    if (!dom) {
      if (html.replace) html = html.replace(tagExpanderRE, '<$1></$2>');
      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1;  
      if (!(name in containers)) name = '*';

      container = containers[name];
      container.innerHTML = '' + html;
      dom = $.each(slice.call(container.childNodes), function() {
        container.removeChild(this);
      });
    };

    if (isPlainObject(properties)) {
      nodes = $(dom);
      $.each(properties, function(key, value) {
        if (methodAttributes.indexOf(key) > -1) nodes[key](value);
        else nodes.attr(key, value);
      });
    };

    return dom;
  };
  
  zepto.Z = function(dom, selector) {
    return new Z(dom, selector);
  };

  // 这里有点不明白，这样不应该永远是false？函数中返回的实例是Z函数的实例，而不是zepto.Z的
  // 可能是还没在合适场合使用，未发现原因
  zepto.isZ = function(object) {
    return object instanceof zepto.Z;
  };

  zepto.init = function(selector, context) {
    var dom;
    if (!selector) return zepto.Z();
    else if (typeof selector == 'string') {
      selector = selector.trim();
      if (selector[0] == '<' && fragmentRE.test(selector))
        dom = zepto.fragment(selector, RegExp.$1, context), selector = null;
      else if (context !== undefined) return $(context).find(selector);
      else dom = zepto.qsa(document, selector);
    } else if (isFunction(selector)) {
      return $(document).ready(selector);
    } else if (zepto.isZ(selector)) {
      return selector;
    } else {
      if (isArray(selector)) dom = compact(selector);
      else if (isObject(selector)) dom = [selector], selector = null;
      else if (fragmentRE.test(selector)) dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null;
      else if (context !== undefined) return $(context).find(selector);
      else dom = zepto.qsa(document, selector);
    };
    return zepto.Z(dom, selector);
  };

  $ = function(selector, context) {
    return zepto.init(selector, context);
  };

  function extend(target, source, deep) {
    for (key in source) {
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
          target[key] = {};
        };
        if (isArray(source[key]) && !isArray(target[key])) {
          target[key] = [];
        };
        extend(target[key], source[key], deep);
      } else if (source[key] !== undefined) {
        target[key] = source[key];
      };
    };
  };

  $.extend = function(target) {
    var deep, args = slice.call(arguments, 1);
    if (typeof target == 'bolean') {
      deep = target;
      target = args.shift();
    };
    args.forEach(function(arg) {
      extend(target, arg, deep);
    });
    return target;
  };

  zepto.qsa = function(element, selector) {
    var found,
        maybeID = selector[0] == '#',
        maybeClass = !maybeID && selector[0] == '.',
        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector,
        isSimple = simpleSelectorRE.test(nameOnly);
    
    return (element.getElementById && isSimple && maybeID) ? ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
        (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) ? [] :
        slice.call(
          isSimple && !maybeID && element.getElementsByClassName ?
          maybeClass ? element.getElementsByClassName(nameOnly) :
          element.getElementsByTagName(selector) :
          element.querySelectorAll(selector)
        );
  };

  function filtered(nodes, selector) {
    return selector == null ? $(nodes) : $(nodes).filter(selector);
  };

  $.contains = document.documentElement.contains ?
    function(parent, node) {
      return parent !== node && parent.contains(node);
    } :
    function(parent, node) {
      while (node && (node = node.parentNode))
        if (node === parent) return true;
      return false;
    };
  
  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg;
  };

  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value);
  };

  function className(node, value) {
    var klass = node.className || '',
        // 这里不懂，和上面那个一样感觉结果是定值
        svg = klass && klass.baseVal !== undefined;
    
    if (value === undefined) return svg ? klass.baseVal : klass;
    svg ? (klass.baseVal = value) : (node.className = value);
  };

  // 暂时懒得写
  function deserializeValue(value) {
    
  };

  $.type = type;
  $.isFunction = isFunction;
  $.isWindow = isWindow;
  $.isArray = isArray;
  $.isPlainObject = isPlainObject;

  // 这段代码很神奇，需要研究
  // 晕，就是普通for in循环
  $.isEmptyObject = function(obj) {
    var name;
    for (name in obj) return false;
    return true;
  };

  $.isNumeric = function(val) {
    var num = Number(val), type = typeof val;
    return val != null && type != 'boolean' && (type != 'string' || val.length) && !isNaN(num) && isFinite(num) || false;
  };

  $.inArray = function(elem, array, i) {
    return emptyArray.indexOf.call(array, elem, i);
  };

  $.camelCase = camelize;

  // 非字符串如对象、布尔传入，就和调用toString似的，有待考察
  $.trim = function(str) {
    return str == null ? '' : String.prototype.trim.call(str);
  };

  $.uuid = 0;
  $.support = {};
  $.expr = {};
  $.noop = function() {};

  $.map = function(elements, callback) {
    var value, values = [], i, key;
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++) {
        value = callback(elements[i], i);
        if (value != null) {
          values.push(value);
        };
      };
    } else {
      for (key in elements) {
        value = callback(elements[key], key);
        if (value != null) {
          values.push(value);
        };
      };
    };
    return flatten(values);
  };

  $.each = function(elements, callback) {
    var i, key;
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++) {
        if (callback.call(elements[i], i, elements[i]) === false) {
          return elements;
        };
      };
    } else {
      for (key in elements) {
        if (callback.call(elements[key], key, elements[key]) === false) {
          return elements;
        };
      };
    };

    return elements;
  };

  $.grep = function(elements, callback) {
    return filter.call(elements, callback);
  };

  if (window.JSON) {
    $.parseJSON = JSON.parse;
  };

  $.each('Boolean Number String Function Array Date RegExp Object Error'.split(' '), function(i, name) {
    class2type['[object ' + name + ']'] = name.toLowerCase();
  });

  $.fn = {
    // 原来构造函数是Z啊
    constructor: zepto.Z,
    length: 0,

    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    splice: emptyArray.splice,
    indexOf: emptyArray.indexOf,
    concat: function() {
      var i, value, args = [];
      for (i = 0; i < arguments.length; i++) {
        value = arguments[i];
        args[i] = zepto.isZ(value) ? value.toArray() : value;
      };
      return concat.apply(zepto.isZ(this) ? this.toArray() : this, args);
    },

    map: function(fn) {
      return $($.map(this, function(el, i) {
        return fn.call(el, i, el);
      }));
    },

    ready: function(callback) {
      if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
        setTimeout(function() {
          callback($)
        }, 0);
      } else {
        var handler = function() {
          document.removeEventListener('DOMContentLoaded', handler, false);
          window.removeEventListener('load', handler, false);
          callback($);
        };
        // 为什么一次帮两个，这俩不会执行两次吗？？
        // 不会，一个执行就会把事件清理掉，这么写大概也是为了兼容低版本
        document.addEventListener('DOMContentLoaded', handler, false);
        window.addEventListener('load', handler, false);
      };
      return this;
    },

    get: function(idx) {
      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length];
    },

    toArray: function() { return this.get(); },

    size: function() {
      return this.length;
    },

    remove: function() {
      return this.each(function() {
        if (this.parentNode != null) {
          this.parentNode.removeChild(this);
        };
      })
    },

    each: function(callback) {
      emptyArray.every.call(this, function(el, idx) {
        return callback.call(el, idx, el) !== false;
      }); 
      return this;
    },

    filter: function(selector) {
      if (isFunction(selector)) return this.not(this.not(selector));
      return $(filter.call(this, function(element) {
        return zepto.matches(element, selector);
      }))
    },

    add: function(selector, context) {
      return $(uniq(this.concat($(selector, context))));
    },

    is: function(selector) {
      return typeof selector == 'string' ? this.length > 0 && zepto.matches(this[0], selector) :
        selector && this.selector == selector.selector;
    },

    not: function(selector) {
      var nodes = [];
      if (isFunction(selector) && selector.call !== undefined) {
        this.each(function(idx) {
          if (!selector.call(this, idx)) nodes.push(this);
        });
      } else {
        var excludes = typeof selector == 'string' ? this.filter(selector) : (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector);
        this.forEach(function(el) {
          if (excludes.indexOf(el) < 0) nodes.push(el);
        });
      };
      return $(nodes);
    },

    has: function(selector) {
      return this.filter(function() {
        return isObject(selector) ? $.contains(this, selector) : $(this).find(selector).size();
      });
    }
  }
})();








