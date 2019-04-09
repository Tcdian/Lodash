## Lodash
##### 为了加强自己对js基础的掌握, 计划仿照lodash的功能, 仿写一个简单的lodash库

最后完成lodash共 298 个函数,其中很多函数的实现没有完整的还原lodash函数的所有功能,并且很多的测试用例都比较少,很多函数的实现存在一些问题,这是我今后需要去修改和完善的地方.<br>

这次lodash的简单实现, 有几个我印象比较深的地方:
##### isEqual / isEqualWith
- isEqual
  ```
  function isEqual(val, other) {
    return _baseIsEqual(val, other)
  }
  ```
- isEqualWith
  ```
  function isEqualWith(val, other, customizer) {
    let customizerResult = customizer && customizer(val, other)
    return customizerResult === void 0
      ? _baseIsEqual(val, other, customizer)
      : !!customizerResult
  }
  ```
- _baseIsEqual 是 isEqual 和 isEqualWith 功能基本类似, 区别在于 isEqualWith 接收一个比较函数customizer, 我将两个函数的功能整合到了 _baseIsEqual 中, 下面是 _baseIsEqual 函数
  ```
  function _baseIsEqual(val, other, customizer, stackMap = new Map()) {

    // _wrapped 对象
    if (val instanceof __) val = val._wrapped
    if (other instanceof __) other = other._wrapped

    // 类型不同, 返回false
    let valType = _objectProto.toString.call(val)
    if (valType != _objectProto.toString.call(other)) {
      return false
    }

    // val === other
    if (val === other) {
      return true
    }

    // `NaN`
    if (val !== val) {
      return other !== other
    }

    if (!isObjectLike(val) && !isObjectLike(other)) {
      return false
    }

    // String Number Date Boolean Symbol 之类的包装对象 和 RegExp
    // String 和 RegExp
    if (valType === _typeMap.String || valType === _typeMap.RegExp) {
      return '' + val === '' + other
    }

    // Number
    if (valType === _typeMap.Number) {
      if (+val !== +val) return +other !== +other
      return +val === +other
    }

    // Boolean Date
    if (valType === _typeMap.Boolean || valType === _typeMap.Date) {
      return +val === +other
    }

    // Symbol
    if (valType === _typeMap.Symbol) {
      _symbolProto.valueOf.call(val) === _symbolProto.valueOf.call(other)
    }

    if (valType !== _typeMap.Array) {
      // 对象的 constructor 是否相同, 这里参考的是　underscore的 源码
      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      if (val.constructor !== other.constructor
        && !(isFunction(val.constructor)
          && val.constructor instanceof val.constructor
          && isFunction(other.constructor)
          && other.constructor instanceof other.constructor)
        && ('constructor' in val && 'constructor' in other)) {
        return false
      }
    }

    // 使用Map存储, 防止出现循环引用问题
    if (stackMap.has(val)) {
      return stackMap.get(val) === other && stackMap.get(other) === val
    }
    stackMap.set(val, other)
    stackMap.set(other, val)

    // _keys 库中实现的内部方法, 和 Object.keys的区别是对数组使用时, 返回的 key 是 number, 而非 string
    let valKeys = _keys(val)
    let otherKeys = _keys(other)

    if (valKeys.length !== otherKeys.length) {
      return false
    }

    // 递归对比每一个属性
    let result = valKeys.every(key => {
      let customizerResult = customizer && customizer(val[key], other[key], key, val, other, stackMap)
      if (customizerResult !== void 0) return customizerResult
      return otherKeys.includes(key) && _baseIsEqual(val[key], other[key], customizer, stackMap)
    })

    stackMap.delete(val)
    stackMap.delete(other)

    return result
  }
  ```
##### clone / cloneWith / cloneDeep / cloneDeepWith <br>
- clone
  ```
  function clone(val) {
    return _baseClone(val)
  }
  ```
- cloneWith
  ```
  function cloneWith(val, customizer) {
    let customizerResult = customizer && customizer(val)
    if (customizerResult !== void 0) return customizerResult
    return _baseClone(val, false, customizer)
  }
  ```
- cloneDeep
  ```
  function cloneDeep(val) {
    return _baseClone(val, true)
  }
  ```
- cloneDeepWith
  ```
  function cloneDeepWith(val, customizer) {
    let customizerResult = customizer && customizer(val)
    if (customizerResult !== void 0) return customizerResult
    return _baseClone(val, true, customizer)
  }
  ```
- _baseClone 以上四个函数的基础函数
  ```
  function _baseClone(val, isDeep, customizer, stackMap = new Map()) {

    // 基础类型, 直接返回 val
    if (!isObject(val)) {
      return val
    }

    let valType = _objectProto.toString.call(val)
    let valConstructor = val.constructor
    let result

    // Date Boolean 包装对象
    if (valType === _typeMap.Date || valType === _typeMap.Boolean) {
      result = new valConstructor(+val)
    }

    // Number String 包装对象
    if (valType === _typeMap.Number || valType === _typeMap.String) {
      result = new valConstructor(val)
    }

    // RegExp
    if (valType === _typeMap.RegExp) {
      result = new valConstructor(val.source, val.flags)
      result.lastIndex = val.lastIndex
    }

    // Symbol 包装对象
    if (valType === _typeMap.Symbol) {
      result = Object(_symbolProto.valueOf.call(val))
    }

    // Function
    if (valType === _typeMap.Function) {
      result = {}
    }

    // Array
    if (valType === _typeMap.Array) {
      result = new valConstructor(val.length)
    }

    // Object
    if (valType === _typeMap.Object) {
      result = Object.create(Object.getPrototypeOf(val))
    }

    // 处理循环引用问题
    if (stackMap.has(val)) {
      return stackMap.get(val)
    }
    stackMap.set(val, result)

    // _keys 库中实现的内部方法, 和 Object.keys的区别是对数组使用时, 返回的 key 是 number, 而非 string
    let keys = _keys(val)
    // 根据 isDeep , 看是否需要深度克隆
    keys.forEach(key => {
      // customizer cloneWith 和 cloneDeepWith 定制值
      let customizerResult = customizer && customizer(val[key], key, val, stackMap)
      if (customizerResult !== void 0) {
        result[key] = customizerResult
      } else if (!isDeep) {
        result[key] = val[key]
      } else {
        result[key] = _baseClone(val[key], isDeep, customizer, stackMap)
      }
    })

    stackMap.delete(val)
    return result
  }
  ```
##### throttle / debounce <br>
- throttle 函数, 额外有一个 options, 两个配置项 leading (首次是否调用) 和 trailing (结尾是否额外调用一次)
  ```
  function throttle(func, wait = 0, options = {}) {
    let {leading = true} = options
    let {trailing = true} = options
    let previous = 0
    let timeoutID = null
    let result

    let throttleFunc = function (...args) {
      let runtime = Date.now()
      if (previous === 0 && leading === false) {
        previous = runtime
      }

      //需要等待多长时间后可以执行
      let remaining = wait - (runtime - previous)
      //remaining > wait 说明时间被调整过
      if (remaining <= 0 || remaining > wait) {
        if (timeoutID) {
          clearTimeout(timeoutID)
          timeoutID = null
        }
        previous = runtime
        result = func.call(this, ...args)
      } else if ( !timeoutID && trailing !== false) {
        timeoutID = setTimeout(() => {
          //leading 为false时,每次触发后一定会延迟wait时间才会调用,如果不把previous重置
          //为0,那么中间间隔长时间remaining就会变为负数,下一次调用就会马上触发,不会延迟
          previous = leading === false ? 0 : Date.now()
          timeoutID = null
          result = func.call(this, ...args)
        }, remaining);
      }
      return result
    }

    throttleFunc.cancel = function () {
      clearTimeout(timeoutID)
      previous = 0
      timeoutID = null
    }

    return throttleFunc
  }
  ```
- debounce 函数, 接收一个 immediate 参数, 函数是否在初始时刻调用
  ```
  function debounce(func, wait, immediate) {
    let timeoutID = null
    let result
    let later = function (context, ...args) {
      timeoutID = null
      result = func.call(context, ...args)
    }
    let debounceFunc = function (...args) {
      if (timeoutID) clearTimeout(timeoutID)
      if (immediate) {
        let callNow = !timeoutID
        timeoutID = setTimeout(() => {
          later(this, ...args)
        }, wait)
        if (callNow) result = func.call(this, ...args)
      } else {
        timeoutID = setTimeout(() => {
          later(this, ...args)
        }, wait);
      }
      return result
    }
    debounceFunc.cancel = function () {
      clearTimeout(timeoutID)
      timeoutID = null
    }
    return debounceFunc
  }
  ```
##### bind / curry
- bind <br>
  ```
  function bind(func, thisArg, ...partials) {
    // 占位符
    let placeholder = bind.placeholder
    let boundFunc = function(...args) {
      if (!isFunction(func)) throw new Error('Bind must be called on a function')
      // _replaceHolders 函数, 处理占位符的情况
      let finalArgs = _replaceHolders(partials, args, placeholder)
      // _executeBound 函数, 处理 new 调用boundFunc ,this失效问题
      return _executeBound(func, boundFunc, thisArg, this, finalArgs)
    }
    return boundFunc
  }

  bind.placeholder = __
  ```
- curry
  ```
  function curry(func, arity = func.length, guard, partial = []) {
    // guard 守卫, 防止传入多余参数
    partial = guard === void 0 ? partial : []
    // 占位符
    let placeholder = curry.placeholder
    let boundFunc = function(...args) {
      let argsLen = args.filter(arg => arg !== placeholder).length
      // _replaceHolders 函数, 处理占位符的情况
      let finalArgs = _replaceHolders(partial, args, placeholder)
      // 判断是否达到指定数量参数
      if (argsLen >= arity) {
        // _executeBound 函数, 处理 new 调用boundFunc ,this失效问题
        return _executeBound(func, boundFunc, this, this, finalArgs)
      } else {
        // 未达到指定数量参数, 返回新的函数, 并将之前参数传递到新函数
        return curry(func, arity - argsLen, void 0, finalArgs)
      }
    }
    return boundFunc
  }

  curry.placeholder = __
  ```
- 下面是 bind 和 curry 中使用的 _replaceHolders 函数和 _executeBound 函数 <br>
  ```
  // _replaceHolders
  // 整合 partials 和 args 为一个 完整的参数数组, 将partials中的 placeholder替换为 args中元素, args中剩余元素放到 数组结尾

  function _replaceHolders(partials, args, placeholder) {
    let separator = 0
    return partials.map(partial => {
      if (partial === placeholder) return args[separator++]
      return partial
    }).concat(args.slice(separator))
  }

  // _executeBound
  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments.

  function _executeBound(func, boundFunc, thisArg, context, args) {
    if (!(context instanceof boundFunc)) return func.call(thisArg, ...args)
    // func 的实例
    let instance = Object.create(func.prototype)
    let result = func.call(instance, ...args)
    if (isObject(result)) return result
    return instance
  }
  ```
##### memoize
  ```
  // 参数 resolver 是个 function, 用来计算 key
  // 如果没有传入 key, 则用 memo 的第一个参数作为当做 key

  function memoize(func, resolver) {
    let memo = function (...args) {
      let { cache } = memo
      let key = resolver ? resolver.call(this, ...args) : args[0]
      if (!cache.has(key)) {
        cache.set(key, func.call(this, ...args))
      }
      return cache.get(key)
    }
    memo.cache = new Map()
    return memo
  }
  ```
##### 还有一些其他的函数不一一列举了, 其中有一些函数在实现的过程中遇到过一些问题, 计划在之后的时间里, 阅读一下lodash的源码,学习lodash作者的代码实现思路和方式, 之后再去重新实现一遍lodash库.我认为很多细节的东西,需要不断去摸索,尝试,才能掌握好.对自己说一声: 加油 !
