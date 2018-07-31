var tcdian = __ = (function () {

  // Used to restore the original `_` reference in `_.noConflict`.
  var root = this
  var _tcdian = root

  // unique id : idCounter
  var idCounter = 1

  // unique value : Symbol(0)
  var  _flagSymbol = Symbol(0)

  // Used for built-in method references.
  var _arrayProto = Array.prototype,
      _funcProto = Function.prototype,
      _objectProto = Object.prototype;

  // type 类型判断 map.
  var _typeMap = {
    Arguments: '[object Arguments]',
    Array: '[object Array]',
    AsyncFunction: '[object AsyncFunction]',
    Boolean: '[object Boolean]',
    Date: '[object Date]',
    DOMException: '[object DOMException]',
    Error: '[object Error]',
    Function: '[object Function]',
    HTMLCollection: "[object HTMLCollection]",
    GeneratorFunction: '[object GeneratorFunction]',
    Map: '[object Map]',
    Number: '[object Number]',
    Null: '[object Null]',
    Object: '[object Object]',
    Promise: '[object Promise]',
    Proxy: '[object Proxy]',
    RegExp: '[object RegExp]',
    Set: '[object Set]',
    String: '[object String]',
    Symbol: '[object Symbol]',
    Undefined: '[object Undefined]',
    WeakMap: '[object WeakMap]',
    WeakSet: '[object WeakSet]',
    ArrayBuffer: '[object ArrayBuffer]',
    DataView: '[object DataView]',
    Float32Array: '[object Float32Array]',
    Float64Array: '[object Float64Array]',
    Int8Array: '[object Int8Array]',
    Int16Array: '[object Int16Array]',
    Int32Array: '[object Int32Array]',
    Uint8Array: '[object Uint8Array]',
    Uint8ClampedArray: '[object Uint8ClampedArray]',
    Uint16Array: '[object Uint16Array]',
    Uint32Array: '[object Uint32Array]'
  }

  // Used to map characters to HTML entities.
  var _htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }

  // Used to map HTML entities to characters.
  var _htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  }
  // Demilitarized zone
  var DMZ = Object.create(null)

  // keys
  function _keys(obj) {
    let keys
    if (isArray(obj)) {
      keys = new Array(obj.length).fill(1).map((it, index) => index)
    } else {
      keys = Object.keys(obj)
    }
    return keys
  }

  //values
  function _values(obj) {
    return _keys(obj).map(key => obj[key])
  }

  // entries
  function _entries(obj) {
    if (!isObject(obj)) return []
    if (isSet(obj) || isMap(obj)) return obj.entries()
    if (isArray(obj)) return obj.map((item, index) => [index, item])
    return Object.entries(obj)
  }

  // _baseWordSeparate
  function _baseWordSeparate(str) {
    let pattern = /[\-_\s]+/g
    if (pattern.test(str)) return str.split(pattern).filter(it => it !== '')
    return str.split(/(?=[A-Z])/)
  }

  // _baseAssign
  function _baseAssign(obj, coverDefalult, prototypeChain, deep, customizer, sources) {
    sources.forEach(items => {
      for (let key in items) {
        let value = items[key]

        //是否有customizer
        if (customizer) {
          let customizerResult = customizer(obj[key], value, key, obj, items)
          if (customizerResult) value = customizerResult
        }

        //是否深度复制
        if (deep && isObject(obj[key])) {
          value = _baseAssign(obj[key], coverDefalult, prototypeChain, deep, customizer, [value])
        }

        //是非覆盖已有属性
        if (!coverDefalult && obj.hasOwnProperty(key)) {
          continue
        }

        //是否复制source原型链上属性
        if (prototypeChain) {
          obj[key] = value
        } else if (items.hasOwnProperty(key)) {
          obj[key] = value
        }
      }
    })
    return obj
  }

  // _baseGetValue
  function _baseGetValue(obj, path, prototypeChain, defaultValue) {
    let pathArr = toPath(path)
    let result = obj
    let flag = pathArr.every(item => {
      let tmpResult = prototypeChain && (item in root.Object(result)) || result.hasOwnProperty(item)
      result = result[item]
      return tmpResult
    })
    return flag ? result : defaultValue
  }

  //_baseGetPaths
  function _baseGetPaths(obj, prototypeChain, paths = [], path = []) {
    // 只考虑普通对象和数组
    for (let key in obj) {
      if(prototypeChain || obj.hasOwnProperty(key)) {
        path.push(key)
        if(!isObject(obj[key])) {
          paths.push(path.slice())
        } else {
          _baseGetPaths(obj[key], prototypeChain, paths, path)
        }
        path.pop()
      }
    }
    return paths
  }

  // _baseAddProperty
  function _baseAddProperty(prop, value, obj, updater = identity, customizer) {
    let pathArr = toPath(prop)
    function addProperty(obj, k = 0) {
      if (k === pathArr.length) {
        return updater(value)
      }
      let isNum = /^\d+$/.test(pathArr[k])
      obj = obj || (isNum ? [] : {})
      obj = (customizer && customizer(obj[pathArr[k]], pathArr[k], obj)) || obj
      obj[pathArr[k]] = addProperty(obj[pathArr[k]], k + 1)
      return obj
    }
    return addProperty(obj)
  }

  // _optimizeCb
  function _optimizeCb(func, context, argCount) {
    if (context === void 0)
      return func
    if (argCount === 1) {
      return function (value) {
        return func.call(context, value)
      }
    }
    if (argCount === 2) {
      return function (value, index) {
        return func.call(context, value, index)
      }
    }
    if (argCount === 3) {
      return function (value, index, Collection) {
        return func.call(context, value, index, Collection)
      }
    }
    if (argCount === 4) {
      return function (accumulator, value, index, Collection) {
        return func.call(context, accumulator, value, index, Collection)
      }
    }
    return function (...args) {
      return func.apply(context, args)
    }
  }

  // _baseMatchesProperty
  function _baseMatchesProperty(path, value) {
    return function (obj) {
      return _baseGetValue(obj, path, true, _flagSymbol) === value
    }
  }

  // 正则 test
  function _baseregexpTest(value) {
    return function (obj) {
      return value.test(obj)
    }
  }

  // _cb
  function _cb(value, context, argCount) {
    if (isNil(value)) return identity
    if (isFunction(value)) return _optimizeCb(value, context, argCount)
    if (isObject(value)) {
      if (isArray(value)) return _baseMatchesProperty(value[0], value[1])
      if (isRegExp(value)) return _baseregexpTest(value)
      return matches(value)
    }
    return property(value)
  }

  //merge sort
  function _mergeSort(arr, left = 0, right = arr.length - 1, iteratee = identity, order = 'asc') {
    if (left === right) {
      return arr.slice(left, left + 1)
    }
    let mid = Math.floor((left + right) / 2)
    let leftArr = _mergeSort(arr, left, mid, iteratee, order)
    let rightArr = _mergeSort(arr, mid + 1, right, iteratee, order)
    let resultArr = []
    let leftLen = leftArr.length
    let rightLen = rightArr.length
    let leftIndex = 0
    let rightIndex = 0
    while (leftIndex < leftLen && rightIndex < rightLen) {
      if (order !== 'desc') {
        if (iteratee(leftArr[leftIndex]) <= iteratee(rightArr[rightIndex])) {
          resultArr.push(leftArr[leftIndex])
          leftIndex ++
        } else {
          resultArr.push(rightArr[rightIndex])
          rightIndex ++
        }
      } else {
        if (iteratee(leftArr[leftIndex]) >= iteratee(rightArr[rightIndex])) {
          resultArr.push(leftArr[leftIndex])
          leftIndex++
        } else {
          resultArr.push(rightArr[rightIndex])
          rightIndex++
        }
      }
    }
    resultArr.push(...leftArr.slice(leftIndex), ...rightArr.slice(rightIndex))
    return resultArr
  }

  // _exchange
  function _exchange(arr, x, y) {
    let tmp = arr[x]
    arr[x] = arr[y]
    arr[y] = tmp
  }

  //------------------------------------Array-----------------------------------------
  // _.chunk-----------------------------------------------------------------//

  /**
    * Creates an array of elements split into groups the length of size.If array can 't be split evenly, the final chunk will be the remaining elements.
    * Arguments
      array(Array): The array to process.
      [size = 1](number): The length of each chunk
    * Returns
      (Array): Returns the new array of chunks.
  **/

  function chunk(arr, size = 1) {
    let len = arr === null ? 0 : arr.length
    size = isSafeInteger(size) ? size : 0
    if(len === 0 || size < 1) {
      return []
    }
    let result = []
    for(let i = 0; i < len; i += size) {
      result.push(arr.slice(i, i + size))
    }
    return result
  }

  // _.compact---------------------------------------------------------------//

  /**
    * Creates an array with all falsey values removed.The values false, null, 0, "", undefined, and NaN are falsey.
    * Arguments
      array(Array): The array to compact.
    * Returns
      (Array): Returns the new array of filtered values.
  **/

  function compact(arr) {
    return arr.filter(val => !!identity(val))
  }

  // _.concat----------------------------------------------------------------//

  /**
    * Creates a new array concatenating array with any additional arrays and / or values.
    * Arguments
      array (Array): The array to concatenate.
      [values] (...*): The values to concatenate.
    * Returns
      (Array): Returns the new concatenated array.
  **/

  function concat(arr, ...others) {
    return arr.concat(...others)
  }

  // _.difference------------------------------------------------------------//

  /**
    * Creates an array of array values not included in the other given arrays using SameValueZero
      for equality comparisons.The order and references of result values are determined by the first array.

      Note: Unlike _.pullAll, this method returns a new array.
    * Arguments
      array(Array): The array to inspect.
      [values](...Array): The values to exclude.
    * Returns
      (Array): Returns the new array of filtered values.
  **/

  function difference(arr, ...others) {
    let compareArr = flatten(others)
    return arr.filter(val => !compareArr.includes(val))
  }

  // _.differenceBy----------------------------------------------------------//

  /**
    * This method is like _.difference except that it accepts iteratee which is invoked for each element of array and values to generate the criterion by which they're compared. The order and references of result values are
      determined by the first array. The iteratee is invoked with one argument:(value).

      Note: Unlike _.pullAllBy, this method returns a new array.
    * Arguments
      array(Array): The array to inspect.
      [values](...Array): The values to exclude.
      [iteratee = _.identity](Function): The iteratee invoked per element.
    * Returns
      (Array): Returns the new array of filtered values.
  **/

  function differenceBy(array, ...values) {
    let iteratee = last(values)
    if (isArrayLikeObject(iteratee)) return difference(array, ...values)
    iteratee = _cb(iteratee, DMZ, 1)
    let compareArr = flatten(initial(values))
    return filter(array, item => !compareArr.some(val => iteratee(val) === iteratee(item)))
  }

  // _.differenceWith--------------------------------------------------------//

  /**
    * This method is like _.difference except that it accepts comparator which is invoked to compare elements of array to values.The order and references of result values are determined by the first array.The comparator is invoked with two arguments: (arrVal, othVal).

      Note: Unlike _.pullAllWith, this method returns a new array.
    * Arguments
      array(Array): The array to inspect.
      [values](...Array): The values to exclude.
      [comparator](Function): The comparator invoked per element.
    * Returns
      (Array): Returns the new array of filtered values.
  **/

  function differenceWith(array, ...values) {
    let comparator = last(values)
    if (isArrayLikeObject(comparator)) return difference(array, ...values)
    let compareArr = flatten(initial(values))
    return filter(array,item => !compareArr.some(val => comparator(item, val)))
  }

  // _.drop------------------------------------------------------------------//

  /**
    * Creates a slice of array with n elements dropped from the beginning.
    * Arguments
      array(Array): The array to query.
      [n = 1](number): The number of elements to drop.
    * Returns
      (Array): Returns the slice of array.
  **/

  function drop(arr, n = 1) {
    let startIndex = n < 0 ? 0 : n
    return arr.slice(startIndex)
  }

  // _.dropRight-------------------------------------------------------------//

  /**
    * Creates a slice of array with n elements dropped from the end.
    * Arguments
      array(Array): The array to query.
      [n = 1](number): The number of elements to drop.
    * Returns
      (Array): Returns the slice of array.
  **/

  function dropRight(arr, n = 1) {
    let endIndex = arr.length - Math.floor(n)
    endIndex = endIndex < 0 ? 0 : endIndex
    return arr.slice(0, endIndex)
  }

  // _.dropRightWhile--------------------------------------------------------//

  /**
    * Creates a slice of array excluding elements dropped from the end.Elements are dropped until predicate returns falsey.The predicate is invoked with three arguments: (value, index, array).
    * Arguments
      array (Array): The array to query.
      [predicate=_.identity] (Function): The function invoked per iteration.
    * Returns
      (Array): Returns the slice of array.
  **/

  function dropRightWhile(arr, predicate = identity) {
    let tmp = arr.slice()
    return dropWhile(tmp.reverse(), predicate).reverse()
  }

  // _.dropWhile-------------------------------------------------------------//

  /**
    * Creates a slice of array excluding elements dropped from the beginning.Elements are dropped until predicate returns falsey.The predicate is invoked with three arguments: (value, index, array).
    * Arguments
      array (Array): The array to query.
      [predicate=_.identity] (Function): The function invoked per iteration.
    * Returns
      (Array): Returns the slice of array.
  **/

  function dropWhile(arr, predicate = identity) {
    predicate = _cb(predicate, DMZ, 3)
    return arr.slice(findIndex(arr, (item, index, collection) => !predicate(item, index, collection)))
  }

  // _.fill------------------------------------------------------------------//

  /**
    * Fills elements of array with value from start up to, but not including, end.

      Note: This method mutates array.
    * Arguments
      array(Array): The array to fill.
      value( * ): The value to fill array with.
      [start = 0](number): The start position.
      [end = array.length](number): The end position.
    * Returns
      (Array): Returns array.
  **/

  function fill(arr, value, start = 0, end = arr.length) {
    for(let i = start; i < end; i++) {
      arr[i] = value
    }
    return arr
  }

  // _.findIndex-------------------------------------------------------------//

  /**
    * This method is like _.find except that it returns the index of the first element predicate returns truthy for instead of the element itself.
    * Arguments
      array (Array): The array to inspect.
      [predicate=_.identity] (Function): The function invoked per iteration.
      [fromIndex=0] (number): The index to search from.
    * Returns
      (number): Returns the index of the found element, else -1.
  **/

  function findIndex(array, predicate = identity, fromIndex = 0) {
    predicate = _cb(predicate, DMZ, 3)
    let pos = -1
    let len = array.length
    fromIndex = fromIndex < 0 ? len + fromIndex : fromIndex
    for (let i = fromIndex; i < array.length; i++) {
      if (predicate(array[i], i, array)) {
        pos = i
        break
      }
    }
    return pos
  }

  // _.findLastIndex---------------------------------------------------------//

  /**
    * This method is like _.findIndex except that it iterates over elements of collection from right to left.
    * Arguments
      array (Array): The array to inspect.
      [predicate=_.identity] (Function): The function invoked per iteration.
      [fromIndex=array.length-1] (number): The index to search from.
    * Returns
      (number): Returns the index of the found element, else -1.
  **/

  function findLastIndex(array, predicate = identity, fromIndex = array.length - 1) {
    predicate = _cb(predicate, DMZ, 3)
    let pos = -1
    let len = array.length
    fromIndex = fromIndex < 0 ? len + fromIndex : fromIndex
    for (let i = fromIndex; i >= 0; i--) {
      if (predicate(array[i], i, array)) {
        pos = i
        break
      }
    }
    return pos
  }

  // _.first - > head--------------------------------------------------------//

  /**
    * Gets the first element of array.
    * Arguments
      array(Array): The array to query.
    * Returns
      ( * ): Returns the first element of array.
  **/

  function first(arr) {
    return (arr && arr.length) ? arr[0] : void 0
  }
  // _.flatten---------------------------------------------------------------//

  /**
    * Flattens array a single level deep.
    * Arguments
      array(Array): The array to flatten.
    * Returns
      (Array): Returns the new flattened array.
  **/

  function flatten(arr) {
    return flattenDepth(arr, 1)
  }

  // _.flattenDeep-----------------------------------------------------------//

  /**
    * Recursively flattens array.
    * Arguments
      array(Array): The array to flatten.
    * Returns
      (Array): Returns the new flattened array.
  **/

  function flattenDeep(arr) {
    return flattenDepth(arr, Infinity)
  }

  // _.flattenDepth----------------------------------------------------------//

  /**
    * Recursively flatten array up to depth times.
    * Arguments
      array(Array): The array to flatten.
      [depth = 1](number): The maximum recursion depth.
    * Returns
      (Array): Returns the new flattened array.
  **/

  function flattenDepth(arr, depth = 1) {
    depth = depth < 0 ? 0 : Math.floor(depth)
    let result = []
    function flat(arr, depth) {
      for(let i = 0; i < arr.length; i++) {
        if (isArray(arr[i]) && depth > 0) {
          flat(arr[i], depth - 1)
        } else {
          result.push(arr[i])
        }
      }
      return result
    }
    return flat(arr, depth)
  }

  // _.fromPairs-------------------------------------------------------------//

  /**
    * The inverse of _.toPairs;
      this method returns an object composed from key - value pairs.
    * Arguments
      pairs(Array): The key - value pairs.
    * Returns
      (Object): Returns the new object.
  **/

  function fromPairs(pairs) {
    let len = pairs == null ? 0 : pairs.length
    let result = {}
    for(let i = 0; i < len; i++) {
      result[pairs[i][0]] = pairs[i][1]
    }
    return result
  }

  // _.head------------------------------------------------------------------//

  /**
    * Gets the first element of array.
    * Arguments
      array(Array): The array to query.
    * Returns
      ( * ): Returns the first element of array.
  **/

  function head(arr) {
    return first(arr)
  }

  // _.indexOf---------------------------------------------------------------//

  /**
    * Gets the index at which the first occurrence of value is found in array using SameValueZero
      for equality comparisons.If fromIndex is negative, it 's used as the offset from the end of array.
    * Arguments
      array(Array): The array to inspect.
      value( * ): The value to search for.
      [fromIndex = 0](number): The index to search from.
    * Returns
      (number): Returns the index of the matched value, else -1.
  **/

  function indexOf(arr, val, fromIndex = 0) {
    return arr.indexOf(val, fromIndex)
  }

  // _.initial---------------------------------------------------------------//

  /**
    * Gets all but the last element of array.
    * Arguments
      array(Array): The array to query.
    * Returns
      (Array): Returns the slice of array.
  **/

  function initial(arr) {
    let len = arr == null ? 0 : arr.length
    return len ? arr.slice(0, len - 1) : []
  }

  // _.intersection----------------------------------------------------------//

  /**
    * Creates an array of unique values that are included in all given arrays using SameValueZero
      for equality comparisons.The order and references of result values are determined by the first array.
    * Arguments
      [arrays](...Array): The arrays to inspect.
    * Returns
      (Array): Returns the new array of intersecting values.
  **/

  function intersection(...arrays) {
    let initialArr = arrays[0]
    let otherArrs = arrays.slice(1)
    return filter(initialArr, (item, index, collection) => {
      return collection.indexOf(item) === index && every(otherArrs, otherArr => otherArr.includes(item))
    })
  }

  // _.intersectionBy--------------------------------------------------------//

  /**
    * This method is like _.intersection except that it accepts iteratee which is invoked for each element of each arrays to generate the criterion by which they're compared.
      The order and references of result values are determined by the first array. The iteratee is invoked with one argument:(value).
    * Arguments
      [arrays](...Array): The arrays to inspect.
      [iteratee = _.identity](Function): The iteratee invoked per element.
    * Returns
      (Array): Returns the new array of intersecting values.
  **/

  function intersectionBy(...arrays) {
    let iteratee = last(arrays)
    if (isArrayLikeObject(iteratee)) return intersection(...arrays)
    let initialArr = first(arrays)
    let otherArrs = tail(initial(arrays))
    iteratee = _cb(iteratee, DMZ, 1)
    return filter(initialArr, (item, index, collection) => {
      return collection.indexOf(item) === index
        && every(otherArrs, otherArr => some(otherArr, it => iteratee(it) === iteratee(item)))
    })
  }

  // _.intersectionWith------------------------------------------------------//

  /**
    * This method is like _.intersection except that it accepts comparator which is invoked to compare elements of arrays.The order and references of result values are determined by the first array.The comparator is invoked with two arguments: (arrVal, othVal).
    * Arguments
      [arrays](...Array): The arrays to inspect.
      [comparator](Function): The comparator invoked per element.
    * Returns
      (Array): Returns the new array of intersecting values.
  **/

  function intersectionWith(...arrays) {
    let comparator = last(arrays)
    if (isArrayLikeObject(comparator)) return intersection(...arrays)
    let initialArr = first(arrays)
    let otherArrs = tail(initial(arrays))
    return filter(initialArr, (item, index, collection) => {
      return collection.indexOf(item) === index &&
        every(otherArrs, otherArr => otherArr.some(it => comparator(item, it)))
    })
  }

  // _.join------------------------------------------------------------------//

  /**
    * Converts all elements in array into a string separated by separator.
    * Arguments
      array(Array): The array to convert.
      [separator = ','](string): The element separator.
    * Returns
      (string): Returns the joined string.
  **/

  function join(arr, separator = ',') {
    return arr == null ? '' : arr.join(separator)
  }

  // _.last------------------------------------------------------------------//

  /**
    * Gets the last element of array.
    * Arguments
      array(Array): The array to query.
    * Returns
      ( * ): Returns the last element of array.
  **/

  function last(arr) {
    return (arr && arr.length) ? arr[arr.length - 1] : void 0
  }

  // _.lastIndexOf-----------------------------------------------------------//

  /**
    * This method is like _.indexOf except that it iterates over elements of array from right to left.
    * Arguments
      array(Array): The array to inspect.
      value( * ): The value to search for.
      [fromIndex = array.length - 1](number): The index to search from.
    * Returns
      (number): Returns the index of the matched value, else -1.
  **/

  function lastIndexOf(arr, val, fromIndex = arr.length - 1) {
    return arr.lastIndexOf(val, fromIndex)
  }

  // _.nth-------------------------------------------------------------------//

  /**
    * Gets the element at index n of array.If n is negative, the nth element from the end is returned.
    * Arguments
      array(Array): The array to query.
      [n = 0](number): The index of the element to return .
    * Returns
      ( * ): Returns the nth element of array.
  **/

  function nth(arr, n = 0) {
    return (arr && arr.length) ? arr[n < 0 ? arr.length + n: n] : void 0
  }

  // _.pull------------------------------------------------------------------//

  /**
    * Removes all given values from array using SameValueZero for equality comparisons.

      Note: Unlike _.without, this method mutates array.Use _.remove to remove elements from an array by predicate.
    * Arguments
      array(Array): The array to modify.
      [values](... * ): The values to remove.
    * Returns
      (Array): Returns array.
  **/

  function pull(arr, ...values) {
    for (let i = 0; i < arr.length; i++) {
      if (values.includes(arr[i])) {
        arr.splice(i, 1)
        i--
      }
    }
    return arr
  }

  // _.pullAll---------------------------------------------------------------//

  /**
    * This method is like _.pull except that it accepts an array of values to remove.

      Note: Unlike _.difference, this method mutates array.
    * Arguments
      array(Array): The array to modify.
      values(Array): The values to remove.
    * Returns
      (Array): Returns array.
  **/

  function pullAll(arr, values) {
    return pull(arr, ...values)
  }

  // _.pullAllBy-------------------------------------------------------------//

  /**
    * This method is like _.pullAll except that it accepts iteratee which is invoked for each element of array and values to generate the criterion by which they're compared. The iteratee is invoked with one argument: (value).

      Note: Unlike _.differenceBy, this method mutates array.
    * Arguments
      array(Array): The array to modify.
      values(Array): The values to remove.
      [iteratee = _.identity](Function): The iteratee invoked per element.
    * Returns
      (Array): Returns array.
  **/

  function pullAllBy(array, values, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ, 1)
    for (let i = 0; i < array.length; i++) {
      if (some(values, val => iteratee(val) === iteratee(array[i]))) {
        array.splice(i, 1)
        i--
      }
    }
    return array
  }

  // _.pullAllWith-----------------------------------------------------------//

  /**
    * This method is like _.pullAll except that it accepts comparator which is invoked to compare elements of array to values.The comparator is invoked with two arguments: (arrVal, othVal).

      Note: Unlike _.differenceWith, this method mutates array.
    * Arguments
      array(Array): The array to modify.
      values(Array): The values to remove.
      [comparator](Function): The comparator invoked per element.
    * Returns
      (Array): Returns array.
  **/

  function pullAllWith(array, values, comparator) {
    if (comparator === void 0) return pullAll(array, values)
    for (let i = 0; i < array.length; i++) {
      if (some(values, val => comparator(array[i], val))) {
        array.splice(i, 1)
        i--
      }
    }
    return array
  }

  // _.pullAt----------------------------------------------------------------//

  /**
    * Removes elements from array corresponding to indexes and returns an array of removed elements.

      Note: Unlike _.at, this method mutates array.
    * Arguments
      array(Array): The array to modify.
      [indexes](...(number | number[])): The indexes of elements to remov
    * Returns
      (Array): Returns the new array of removed elements.
  **/

  function pullAt(arr, indexs) {
    indexs.sort(function (a, b) {
      return b - a
    })
    let result = []
    for(let i = 0; i < indexs.length; i++) {
      let index = indexs[i]
      result.unshift(...arr.splice(index, 1))
    }
    return result
  }

  // _.remove----------------------------------------------------------------//

  /**
    * Removes all elements from array that predicate returns truthy
      for and returns an array of the removed elements.The predicate is invoked with three arguments: (value, index, array).

      Note: Unlike _.filter, this method mutates array.Use _.pull to pull elements from an array by value.
    * Arguments
      array (Array): The array to modify.
      [predicate=_.identity] (Function): The function invoked per iteration.
    * Returns
      (Array): Returns the new array of removed elements.
  **/

  function remove(arr, predicate = identity) {
    predicate = _cb(predicate, DMZ, 3)
    let result = []
    for(let i = 0; i < arr.length; i++) {
      if(predicate(arr[i], i, arr)) {
        result.push(...arr.splice(i--, 1))
      }
    }
    return result
  }

  // _.reverse---------------------------------------------------------------//

  /**
    * Reverses array so that the first element becomes the last, the second element becomes the second to last, and so on.

      Note: This method mutates array and is based on Array# reverse.
    * Arguments
      array(Array): The array to modify.
    * Returns
      (Array): Returns array.
  **/

  function reverse(array) {
    return array == null ? array : array.reverse()
  }

  // _.slice-----------------------------------------------------------------//

  /**
    * Creates a slice of array from start up to, but not including, end.

      Note: This method is used instead of Array# slice to ensure dense arrays are returned.
    * Arguments
      array(Array): The array to slice.
      [start = 0](number): The start position.
      [end = array.length](number): The end position.
    * Returns
      (Array): Returns the slice of array.
  **/

  function slice(arr, start = 0, end = arr.length) {
    return arr.slice(start, end)
  }

  // _.sortedIndex-----------------------------------------------------------//

  /**
    * Uses a binary search to determine the lowest index at which value should be inserted into array in order to maintain its sort order.
    * Arguments
      array(Array): The sorted array to inspect.
      value( * ): The value to evaluate.
    * Returns
      (number): Returns the index at which value should be inserted into array.
  **/

  function sortedIndex(arr, val) {
    let left = 0
    let right = arr.length - 1
    while(left < right) {
      let mid = Math.floor((left + right) / 2)
      if (arr[mid] < val) {
        left = mid + 1
      } else {
        right = mid
      }
    }
    return left
  }

  // _.sortedIndexBy---------------------------------------------------------//

  /**
    * This method is like _.sortedIndex except that it accepts iteratee which is invoked for value and each element of array to compute their sort ranking. The iteratee is invoked with one argument: (value).
    * Arguments
      array(Array): The sorted array to inspect.
      value( * ): The value to evaluate.
      [iteratee = _.identity](Function): The iteratee invoked per element.
    * Returns
      (Array): Returns the new array of chunks.
  **/

  function sortedIndexBy(arr, val, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ, 1)
    let left = 0
    let right = arr.length - 1
    while (left < right) {
      let mid = Math.floor((left + right) / 2)
      if (iteratee(arr[mid]) < iteratee(val)) {
        left = mid + 1
      } else {
        right = mid
      }
    }
    return left
  }

  // _.sortedIndexOf---------------------------------------------------------//

  /**
    * This method is like _.indexOf except that it performs a binary search on a sorted array.
    * Arguments
      array(Array): The array to inspect.
      value( * ): The value to search for.
    * Returns
      (number): Returns the index of the matched value, else -1.
  **/

  function sortedIndexOf(arr, val) {
    let index =sortedIndex(arr, val)
    return arr[index] === val ? index : -1
  }

  // _.sortedLastIndex-------------------------------------------------------//

  /**
    * This method is like _.sortedIndex except that it returns the highest index at which value should be inserted into array in order to maintain its sort order.
    * Arguments
      array(Array): The sorted array to inspect.
      value( * ): The value to evaluate.
    * Returns
      (number): Returns the index at which value should be inserted into array.
  **/

  function sortedLastIndex(arr, val) {
    let left = 0
    let right = arr.length - 1
    while(left < right) {
      let mid = Math.ceil((left + right) / 2)
      if (arr[mid] > val) {
        right = mid - 1
      } else {
        left = mid
      }
    }
    return left + 1
  }

  // _.sortedLastIndexBy-----------------------------------------------------//

  /**
    * This method is like _.sortedLastIndex except that it accepts iteratee which is invoked
      for value and each element of array to compute their sort ranking.The iteratee is invoked with one argument: (value).
    * Arguments
      array (Array): The sorted array to inspect.
      value (*): The value to evaluate.
      [iteratee=_.identity] (Function): The iteratee invoked per element.
    * Returns
      (number): Returns the index at which value should be inserted into array.
  **/

  function sortedLastIndexBy(arr, val, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ, 1)
    let left = 0
    let right = arr.length - 1
    while (left < right) {
      let mid = Math.ceil((left + right) / 2)
      if (iteratee(arr[mid]) > iteratee(val)) {
        right = mid - 1
      } else {
        left = mid
      }
    }
    return left + 1
  }

  // _.sortedLastIndexOf-----------------------------------------------------//

  /**
    * This method is like _.lastIndexOf except that it performs a binary search on a sorted array.
    * Arguments
      array(Array): The array to inspect.
      value( * ): The value to search for.
    * Returns
      (number): Returns the index of the matched value, else -1.
  **/

  function sortedLastIndexOf(arr, val) {
    let index = sortedLastIndex(arr, val) - 1
    return arr[index] === val ? index : -1
  }

  // _.sortedUniq------------------------------------------------------------//

  /**
    * This method is like _.uniq except that it 's designed and optimized for sorted arrays.
    * Arguments
      array(Array): The array to inspect.
    * Returns
      (Array): Returns the new duplicate free array.
  **/

  function sortedUniq(arr) {
    return arr.filter((item, index, collection) => item !== collection[index - 1])
  }

  // _.sortedUniqBy----------------------------------------------------------//

  /**
    * This method is like _.uniqBy except that it 's designed and optimized for sorted arrays.
    * Arguments
      array(Array): The array to inspect.
      [iteratee](Function): The iteratee invoked per element.
    * Returns
      (Array): Returns the new duplicate free array.
  **/

  function sortedUniqBy(arr, iteratee) {
    iteratee = _cb(iteratee, DMZ, 1)
    return arr.filter((item, index, collection) => iteratee(item) !== iteratee(collection[index - 1]))
  }

  // _.tail------------------------------------------------------------------//

  /**
    * Gets all but the first element of array.
    * Arguments
      array(Array): The array to query.
    * Returns
      (Array): Returns the slice of array.
  **/

  function tail(arr) {
    let len = arr == null ? 0 : arr.length
    return len ? arr.slice(1, len) : []
  }

  // _.take------------------------------------------------------------------//

  /**
    * Creates a slice of array with n elements taken from the beginning.
    * Arguments
      array(Array): The array to query.
      [n = 1](number): The number of elements to take.
    * Returns
      (Array): Returns the slice of array.
  **/

  function take(arr, n = 1) {
    return (arr && arr.length) ? arr.slice(0, n < 0 ? 0 : n) : []
  }

  // _.takeRight-------------------------------------------------------------//

  /**
    * Creates a slice of array with n elements taken from the end.
    * Arguments
      array(Array): The array to query.
      [n = 1](number): The number of elements to take.
    * Returns
      (Array): Returns the slice of array.
  **/

  function takeRight(arr, n = 1) {
    return (arr && arr.length)
      ? arr.slice(arr.length - n < 0 ? 0 : arr.length - n, arr.length)
      : []
  }

  // _.takeRightWhile--------------------------------------------------------//

  /**
    * Creates a slice of array with elements taken from the end.Elements are taken until predicate returns falsey.The predicate is invoked with three arguments: (value, index, array).
    * Arguments
      array (Array): The array to query.
      [predicate=_.identity] (Function): The function invoked per iteration.
    * Returns
      (Array): Returns the slice of array.
  **/

  function takeRightWhile(arr, predicate = identity) {
    let tmp = arr.slice()
    return takeWhile(tmp.reverse(), predicate).reverse()
  }

  // _.takeWhile-------------------------------------------------------------//

  /**
    * Creates a slice of array with elements taken from the beginning.Elements are taken until predicate returns falsey.The predicate is invoked with three arguments: (value, index, array).
    * Arguments
      array (Array): The array to query.
      [predicate=_.identity] (Function): The function invoked per iteration.
    * Returns
      (Array): Returns the slice of array.
  **/

  function takeWhile(arr, predicate = identity) {
    predicate = _cb(predicate, DMZ, 3)
    return arr.slice(0, findIndex(arr, (item, index, collection) => !predicate(item, index, collection)))
  }

  // _.union-----------------------------------------------------------------//

  /**
    * Creates an array of unique values, in order, from all given arrays using SameValueZero for equality comparisons.
    * Arguments
      [arrays](...Array): The arrays to inspect.
    * Returns
      (Array): Returns the new array of combined values.
  **/

  function union(...arrays) {
    return uniq(flatten(arrays))
  }

  // _.unionBy---------------------------------------------------------------//

  /**
    * This method is like _.union except that it accepts iteratee which is invoked for each element of each arrays to generate the criterion by which uniqueness is computed.
      Result values are chosen from the first array in which the value occurs. The iteratee is invoked with one argument:(value).
    * Arguments
      [arrays](...Array): The arrays to inspect.
      [iteratee = _.identity](Function): The iteratee invoked per element.
    * Returns
      (Array): Returns the new array of combined values.
  **/

  function unionBy(...args) {
    let iteratee = last(args)
    if(isArrayLikeObject(iteratee)) return union(...args)
    let arrays = initial(args)
    return uniqBy(flatten(arrays), iteratee)
  }

  // _.unionWith-------------------------------------------------------------//

  /**
    * This method is like _.uniq except that it accepts comparator which is invoked to compare elements of array.The order of result values is determined by the order they occur in the array.The comparator is invoked with two arguments: (arrVal, othVal).
    * Arguments
      array(Array): The array to inspect.
      [comparator](Function): The comparator invoked per element.
    * Returns
      (Array): Returns the new duplicate free array.
  **/

  function unionWith(...args) {
    let comparator = last(args)
    if(isArrayLikeObject(comparator)) return union(...args)
    let arrays = initial(args)
    return uniqWith(flatten(arrays), comparator)
  }

  // _.uniq------------------------------------------------------------------//

  /**
    * Creates a duplicate - free version of an array, using SameValueZero
      for equality comparisons, in which only the first occurrence of each element is kept.The order of result values is determined by the order they occur in the array.
    * Arguments
      array(Array): The array to inspect.
    * Returns
      (Array): Returns the new duplicate free array.
  **/

  function uniq(arr) {
    return filter(arr, (item, index, collection) => collection.indexOf(item) === index)
  }

  // _.uniqBy----------------------------------------------------------------//

  /**
    * This method is like _.uniq except that it accepts iteratee which is invoked for each element in array to generate the criterion by which uniqueness is computed. The order of result
      values is determined by the order they occur in the array. The iteratee is invoked with one argument:(value).
    * Arguments
      array(Array): The array to inspect.
      [iteratee = _.identity](Function): The iteratee invoked per element.
    * Returns
      (Array): Returns the new duplicate free array.
  **/

  function uniqBy(arr, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ, 1)
    return filter(arr, (item, index, collection) => {
      return findIndex(collection, it => iteratee(it) === iteratee(item)) === index
    })
  }

  // _.uniqWith--------------------------------------------------------------//

  /**
    * This method is like _.uniq except that it accepts comparator which is invoked to compare elements of array.The order of result values is determined by the order they occur in the array.The comparator is invoked with two arguments: (arrVal, othVal).
    * Arguments
      array(Array): The array to inspect.
      [comparator](Function): The comparator invoked per element.
    * Returns
      (Array): Returns the new duplicate free array.
  **/

  function uniqWith(arr, comparator) {
    if (comparator === void 0) return uniq(arr)
    return filter(arr, (item, index, collection) => {
      return findIndex(collection, it => comparator(item, it)) === index
    })
  }

  // _.unzip-----------------------------------------------------------------//

  /**
    * This method is like _.zip except that it accepts an array of grouped elements and creates an array regrouping the elements to their pre - zip configuration.
    * Arguments
      array(Array): The array of grouped elements to process.
    * Returns
      (Array): Returns the new array of regrouped elements.
  **/

  function unzip(arr) {
    return zip(...arr)
  }

  // _.unzipWith-------------------------------------------------------------//

  /**
    * This method is like _.unzip except that it accepts iteratee to specify how regrouped values should be combined.The iteratee is invoked with the elements of each group: (...group).
    * Arguments
      array (Array): The array of grouped elements to process.
      [iteratee=_.identity] (Function): The function to combine regrouped values.
    * Returns
      (Array): Returns the new array of regrouped elements.
  **/

  function unzipWith(arr, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ)
    return map(unzip(arr), it => iteratee(...it))
  }

  // _.without---------------------------------------------------------------//

  /**
    * Creates an array excluding all given values using SameValueZero for equality comparisons.

      Note: Unlike _.pull, this method returns a new array.
    * Arguments
      array(Array): The array to inspect.
      [values](... * ): The values to exclude.
    * Returns
      (Array): Returns the new array of filtered values.
  **/

  function without(arr, ...values) {
    return difference(arr, values)
  }

  // _.xor-------------------------------------------------------------------//

  /**
    * Creates an array of unique values that is the symmetric difference of the given arrays.The order of result values is determined by the order they occur in the arrays.
    * Arguments
      [arrays](...Array): The arrays to inspect.
    * Returns
      (Array): Returns the new array of filtered values.
  **/

  function xor(...arrays) {
    let flatArr = flatten(map(arrays, arr => {
      return filter(arr, (item, index, collection) => collection.indexOf(item) === index)
    }))
    let compareArr = filter(flatArr, (item, index, collection) => collection.indexOf(item) !== index)
    return filter(flatArr, item => !compareArr.includes(item))
  }

  // _.xorBy-----------------------------------------------------------------//

  /**
    * This method is like _.xor except that it accepts iteratee which is invoked for each element of each arrays to generate the criterion by which by which they're compared. The order of result values
      is determined by the order they occur in the arrays. The iteratee is invoked with one argument: (value).
    * Arguments
      [arrays](...Array): The arrays to inspect.
      [iteratee = _.identity](Function): The iteratee invoked per element.
    * Returns
      (Array): Returns the new array of filtered values.
  **/

  function xorBy(...args) {
    let iteratee = last(args)
    if(isArrayLikeObject(iteratee)) return xor(...args)
    iteratee = _cb(iteratee, DMZ, 1)
    let arrays = initial(args)
    let flatArr = flatten(map(arrays, arr => {
      return filter(arr, (item, index, collection) => {
        return findIndex(collection, it => iteratee(it) === iteratee(item)) === index
      })
    }))
    let compareArr = filter(flatArr, (item, index, collection) => {
      return findIndex(collection, it => iteratee(it) === iteratee(item)) !== index
    })
    return filter(flatArr, item => {
      return every(compareArr, it => iteratee(it) !== iteratee(item))
    })
  }

  // _.xorWith---------------------------------------------------------------//

  /**
    * This method is like _.xor except that it accepts comparator which is invoked to compare elements of arrays.The order of result values is determined by the order they occur in the arrays.The comparator is invoked with two arguments: (arrVal, othVal).
    * Arguments
      [arrays](...Array): The arrays to inspect.
      [comparator](Function): The comparator invoked per element.
    * Returns
      (Array): Returns the new array of filtered values.
  **/

  function xorWith(...args) {
    let comparator = last(args)
    if (isArrayLikeObject(comparator)) return xor(...args)
    let arrays = initial(args)
    let flatArr = flatten(map(arrays, arr => {
      return filter(arr, (item, index, collection) => {
        return findIndex(collection, it => comparator(item, it)) === index
      })
    }))
    let compareArr = filter(flatArr, (item, index, collection) => {
      return findIndex(collection, it => comparator(item, it)) !== index
    })
    return filter(flatArr, item => {
      return every(compareArr, it => !comparator(item, it))
    })
  }

  // _.zip-------------------------------------------------------------------//

  /**
    * Creates an array of grouped elements, the first of which contains the first elements of the given arrays, the second of which contains the second elements of the given arrays, and so on.
    * Arguments
      [arrays](...Array): The arrays to process.
    * Returns
      (Array): Returns the new array of grouped elements.
  **/

  function zip(...arrays) {
    if(arrays.length === 0 || arrays[0].length === 0) return []
    let result = new Array(arrays[0].length).fill(1).map(it => [])
    for(let i = 0; i < arrays.length; i++) {
      for(let j = 0; j < arrays[i].length; j++) {
        result[j][i] = arrays[i][j]
      }
    }
    return result
  }

  // _.zipObject-------------------------------------------------------------//

  /**
    * This method is like _.fromPairs except that it accepts two arrays, one of property identifiers and one of corresponding values.
    * Arguments
      [props = []](Array): The property identifiers.
      [values = []](Array): The property values.
    * Returns
      (Object): Returns the new object.
  **/

  function zipObject(props = [], values = []) {
    let result = {}
    for(let i = 0; i < props.length; i++) {
      result[props[i]] = values[i]
    }
    return result
  }

  // _.zipObjectDeep---------------------------------------------------------//

  /**
    * This method is like _.zipObject except that it supports property paths.
    * Arguments
      [props = []](Array): The property identifiers.
      [values = []](Array): The property values.
    * Returns
      (Object): Returns the new object.
  **/

  function zipObjectDeep(props = [], values = []) {
    return props.reduce((accumulator, path, index) => {
      return _baseAddProperty(path, values[index], accumulator)
    },null)
  }

  // _.zipWith---------------------------------------------------------------//

  /**
    * This method is like _.zip except that it accepts iteratee to specify how grouped values should be combined.The iteratee is invoked with the elements of each group: (...group).
    * Arguments
      [arrays] (...Array): The arrays to process.
      [iteratee=_.identity] (Function): The function to combine grouped values.
    * Returns
      (Array): Returns the new array of grouped elements.
  **/

  function zipWith(...args) {
    let iteratee = last(args)
    if(isArrayLikeObject(iteratee)) return zip(...args)
    iteratee = _cb(iteratee, DMZ)
    let arrays = initial(args)
    return map(zip(...arrays), it => iteratee(...it))
  }

  //------------------------------------Collection------------------------------------
  // _.countBy---------------------------------------------------------------//

  /**
    * Creates an object composed of keys generated from the results of running each element of collection thru iteratee.The corresponding value of each key is the number of times the key was returned by iteratee.The iteratee is invoked with one argument: (value).
    * Arguments
      collection(Array | Object): The collection to iterate over.
      [iteratee = _.identity](Function): The iteratee to transform keys.
    * Returns
      (Object): Returns the composed aggregate object.
  **/

  function countBy(collection, iteratee = identity) {
    let result = {}
    let values = _values(collection)
    iteratee = _cb(iteratee, DMZ, 1)
    forEach(values,val => {
      val = iteratee(val)
      if (result.hasOwnProperty(val)) {
        result[val] += 1
      } else {
        result[val] = 1
      }
    })
    return result
  }

  // _.each - > forEach------------------------------------------------------//

  /**
    * Iterates over elements of collection and invokes iteratee for each element. The iteratee is invoked with three arguments: (value, index|key, collection). Iteratee functions may exit iteration early by explicitly returning false.

      Note: As with other "Collections" methods, objects with a "length" property are iterated like arrays. To avoid this behavior use _.forIn or _.forOwn for object iteration.
    * Arguments
      collection (Array|Object): The collection to iterate over.
      [iteratee=_.identity] (Function): The function invoked per iteration.
    * Returns
      ( * ): Returns collection.
  **/

  function each(collection, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ, 3)
    let keys = _keys(collection)
    keys.every(key => {
      return iteratee(collection[key], key, collection) !== false
    })
    return collection
  }

  // _.eachRight - > forEachRight--------------------------------------------//

  /**
    * This method is like _.forEach except that it iterates over elements of collection from right to left.
    * Arguments
      collection (Array|Object): The collection to iterate over.
      [iteratee=_.identity] (Function): The function invoked per iteration.
    * Returns
      ( * ): Returns collection.
  **/

  function eachRight(collection, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ, 3)
    let keys = _keys(collection)
    keys.reverse().every(key => {
      return iteratee(collection[key], key, collection) !== false
    })
    return collection
  }

  // _.every-----------------------------------------------------------------//

  /**
    * Checks if predicate returns truthy for all elements of collection. Iteration is stopped once predicate returns falsey. The predicate is invoked with three arguments: (value, index|key, collection).

      Note: This method returns true for empty collections because everything is true of elements of empty collections.
    * Arguments
      collection (Array|Object): The collection to iterate over.
      [predicate=_.identity] (Function): The function invoked per iteration.
    * Returns
      (boolean): Returns true if all elements pass the predicate check, else false.
  **/

  function every(collection, predicate = identity) {
    predicate = _cb(predicate, DMZ, 3)
    let keys = _keys(collection)
    return keys.every(key => predicate(collection[key], key, collection))
  }

  // _.filter----------------------------------------------------------------//

  /**
    * Iterates over elements of collection, returning an array of all elements predicate returns truthy
      for.The predicate is invoked with three arguments: (value, index | key, collection).

      Note: Unlike _.remove, this method returns a new array.
    * Arguments
      collection (Array|Object): The collection to iterate over.
      [predicate=_.identity] (Function): The function invoked per iteration.
    * Returns
      (Array): Returns the new filtered array.
  **/

  function filter(collection, predicate = identity) {
    predicate = _cb(predicate, DMZ, 3)
    let keys = _keys(collection)
    return keys.filter(key => predicate(collection[key], key, collection)).map(key => collection[key])
  }

  // _.find------------------------------------------------------------------//

  /**
    * Iterates over elements of collection, returning the first element predicate returns truthy for. The predicate is invoked with three arguments: (value, index|key, collection).
    * Arguments
      collection (Array|Object): The collection to inspect.
      [predicate=_.identity] (Function): The function invoked per iteration.
      [fromIndex=0] (number): The index to search from.
    * Returns
      (*): Returns the matched element, else undefined.
  **/

  function find(collection, predicate = identity, fromIndex = 0) {
    predicate = _cb(predicate, DMZ, 3)
    let keys = _keys(collection)
    let resultKey = keys.slice(fromIndex).find(key => predicate(collection[key], key, collection))
    return collection[resultKey]
  }

  // _.findLast--------------------------------------------------------------//

  /**
    * This method is like _.find except that it iterates over elements of collection from right to left.
    * Arguments
      collection (Array|Object): The collection to inspect.
      [predicate=_.identity] (Function): The function invoked per iteration.
      [fromIndex=collection.length-1] (number): The index to search from.
    * Returns
      (*): Returns the matched element, else undefined.
  **/

  function findLast(collection, predicate = identity, fromIndex = collection.length - 1) {
    predicate = _cb(predicate, DMZ, 3)
    let keys = _keys(collection)
    let resultKey = keys.slice(0, fromIndex + 1).reverse().find(key => predicate(collection[key], key, collection))
    return collection[resultKey]
  }

  // _.flatMap---------------------------------------------------------------//

  /**
    * Creates a flattened array of values by running each element in collection thru iteratee and flattening the mapped results.The iteratee is invoked with three arguments: (value, index | key, collection).
    * Arguments
      collection (Array|Object): The collection to iterate over.
      [iteratee=_.identity] (Function): The function invoked per iteration.
    * Returns
      (Array): Returns the new flattened array.
  **/

  function flatMap(collection, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ, 3)
    let keys = _keys(collection)
    return flatten(keys.map(key => iteratee(collection[key], key, collection)))
  }

  // _.flatMapDeep-----------------------------------------------------------//

  /**
    * This method is like _.flatMap except that it recursively flattens the mapped results.
    * Arguments
      collection (Array|Object): The collection to iterate over.
      [iteratee=_.identity] (Function): The function invoked per iteration.
    * Returns
      (Array): Returns the new flattened array.
  **/

  function flatMapDeep(collection, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ, 3)
    let keys = _keys(collection)
    return flattenDeep(keys.map(key => iteratee(collection[key], key, collection)))
  }

  // _.flatMapDepth----------------------------------------------------------//

  /**
    * This method is like _.flatMap except that it recursively flattens the mapped results up to depth times.
    * Arguments
      collection (Array|Object): The collection to iterate over.
      [iteratee=_.identity] (Function): The function invoked per iteration.
      [depth=1] (number): The maximum recursion depth.
    * Returns
      (Array): Returns the new flattened array.
  **/

  function flatMapDepth(collection, iteratee = identity, depth = 1) {
    iteratee = _cb(iteratee, DMZ, 3)
    let keys = _keys(collection)
    return flattenDepth(keys.map(key => iteratee(collection[key], key, collection)), depth)
  }

  // _.forEach---------------------------------------------------------------//

  /**
    * Iterates over elements of collection and invokes iteratee for each element. The iteratee is invoked with three arguments: (value, index|key, collection). Iteratee functions may exit iteration early by explicitly returning false.

      Note: As with other "Collections" methods, objects with a "length" property are iterated like arrays. To avoid this behavior use _.forIn or _.forOwn for object iteration.
    * Arguments
      collection (Array|Object): The collection to iterate over.
      [iteratee=_.identity] (Function): The function invoked per iteration.
    * Returns
      ( * ): Returns collection.
  **/

  function forEach(collection, iteratee = identity) {
    return each(collection, iteratee)
  }

  // _.forEachRight----------------------------------------------------------//

  /**
    * This method is like _.forEach except that it iterates over elements of collection from right to left.
    * Arguments
      collection (Array|Object): The collection to iterate over.
      [iteratee=_.identity] (Function): The function invoked per iteration.
    * Returns
      ( * ): Returns collection.
  **/

  function forEachRight(collection, iteratee = identity) {
    return eachRight(collection, iteratee)
  }

  // _.groupBy---------------------------------------------------------------//

  /**
    * Creates an object composed of keys generated from the results of running each element of collection thru iteratee. The order of grouped values is determined by the order they occur in collection.
      The corresponding value of each key is an array of elements responsible for generating the key. The iteratee is invoked with one argument: (value).
    * Arguments
      collection(Array | Object): The collection to iterate over.
      [iteratee = _.identity](Function): The iteratee to transform keys.
    * Returns
      (Object): Returns the composed aggregate object.
  **/

  function groupBy(collection, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ, 1)
    let result = {}
    forEach(collection, val => {
      let resultKey = iteratee(val)
      if (result.hasOwnProperty(resultKey)) {
        result[resultKey].push(val)
      } else {
        result[resultKey] = [val]
      }
    })
    return result
  }

  // _.includes--------------------------------------------------------------//

  /**
    * Checks if value is in collection. If collection is a string, it's checked for a substring of value, otherwise SameValueZero is used for equality comparisons. If fromIndex is negative, it's used as the offset from the end of collection.
    * Arguments
      collection (Array|Object|string): The collection to inspect.
      value (*): The value to search for.
      [fromIndex=0] (number): The index to search from.
    * Returns
      (boolean): Returns true if value is found, else false.
  **/

  function includes(collection, value, fromIndex = 0) {
    if (!isArrayLike(collection)) collection = values(collection)
    if (fromIndex < 0) fromIndex = Math.max(0, collection.length + fromIndex)
    return collection.includes(value, fromIndex)
  }

  // _.invokeMap-------------------------------------------------------------//

  /**
    * Invokes the method at path of each element in collection, returning an array of the results of each invoked method.Any additional arguments are provided to each invoked method.If path is a
      function, it 's invoked for, and this bound to, each element in collection.
    * Arguments
      collection (Array|Object): The collection to iterate over.
      path (Array|Function|string): The path of the method to invoke or the function invoked per iteration.
      [args] (...*): The arguments to invoke each method with.
    * Returns
      (Array): Returns the array of results.
  **/

  function invokeMap(collection, path, ...args) {
    let values = _values(collection)
    if (isFunction(path)) {
      return values.map(val => path.call(val, ...args))
    } else {
      return values.map(val => {
        let method = _baseGetValue(val, path, true, _flagSymbol)
        if (method === _flagSymbol) throw new Error('invokeMap must call on a function')
        return method.call(val, ...args)
      })
    }
  }

  // _.keyBy-----------------------------------------------------------------//

  /**
    * Creates an object composed of keys generated from the results of running each element of collection thru iteratee.
      The corresponding value of each key is the last element responsible for generating the key. The iteratee is invoked with one argument: (value).
    * Arguments
      collection(Array | Object): The collection to iterate over.
      [iteratee = _.identity](Function): The iteratee to transform keys.
    * Returns
      (Object): Returns the composed aggregate object.
  **/

  function keyBy(collection, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ, 1)
    let values = _values(collection)
    let result = {}
    values.forEach(val => {
      let resultKey = iteratee(val)
      result[resultKey] = val
    })
    return result
  }

  // _.map-------------------------------------------------------------------//

  /**
    * Creates an array of values by running each element in collection thru iteratee. The iteratee is invoked with three arguments:(value, index|key, collection).

      Many lodash methods are guarded to work as iteratees for methods like _.every, _.filter, _.map, _.mapValues, _.reject, and _.some.

      The guarded methods are:
        ary, chunk, curry, curryRight, drop, dropRight, every, fill, invert, parseInt, random, range, rangeRight, repeat, sampleSize, slice, some, sortBy, split, take, takeRight, template, trim, trimEnd, trimStart, and words
    * Arguments
      collection (Array|Object): The collection to iterate over.
      [iteratee=_.identity] (Function): The function invoked per iteration.
    * Returns
      (Array): Returns the new mapped array.
  **/

  function map(collection, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ, 3)
    let keys = _keys(collection)
    return keys.map(key => iteratee(collection[key], key, collection))
  }

  // _.orderBy---------------------------------------------------------------//

  /**
    * This method is like _.sortBy except that it allows specifying the sort orders of the iteratees to sort by. If orders is unspecified,
      all values are sorted in ascending order. Otherwise, specify an order of "desc" for descending or "asc" for ascending sort order of corresponding values.
    * Arguments
      collection(Array | Object): The collection to iterate over.
      [iteratees = [_.identity]](Array[] | Function[] | Object[] | string[]): The iteratees to sort by.
      [orders](string[]): The sort orders of iteratees.
    * Returns
      (Array): Returns the new sorted array.
  **/

  function orderBy(collection, iteratees = [identity], orders = ['asc']) {
    let values = _values(collection)
    let valuesLen = values.length
    let iterateesCopy = iteratees.slice()
    let ordersCopy = orders.slice().reverse()
    iterateesCopy.reverse().forEach((iteratee, index) => {
      iteratee = _cb(iteratee, DMZ, 1)
      values = _mergeSort(values, 0, valuesLen - 1, iteratee, ordersCopy[index])
    })
    return values
  }

  // _.partition-------------------------------------------------------------//

  /**
    * Creates an array of elements split into two groups, the first of which contains elements predicate returns truthy for, the second of which contains elements predicate returns falsey for. The predicate is invoked with one argument: (value).
    * Arguments
      collection (Array|Object): The collection to iterate over.
      [predicate=_.identity] (Function): The function invoked per iteration.
    * Returns
      (Array): Returns the array of grouped elements.
  **/

  function partition(collection, predicate = identity) {
    let filterArr = filter(collection, predicate)
    let rejectArr = reject(collection, predicate)
    return [filterArr, rejectArr]
  }

  // _.reduce----------------------------------------------------------------//

  /**
    * Reduces collection to a value which is the accumulated result of running each element in collection thru iteratee, where each successive invocation is supplied the return value of the previous. If accumulator is not given, the first element
      of collection is used as the initial value. The iteratee is invoked with four arguments:(accumulator, value, index|key, collection).

    Many lodash methods are guarded to work as iteratees for methods like _.reduce, _.reduceRight, and _.transform.

    The guarded methods are:
      assign, defaults, defaultsDeep, includes, merge, orderBy, and sortBy
    * Arguments
      collection (Array|Object): The collection to iterate over.
      [iteratee=_.identity] (Function): The function invoked per iteration.
      [accumulator] (*): The initial value.
    * Returns
      ( * ): Returns the accumulated value.
  **/

  function reduce(collection, iteratee = identity, initialVal) {
    iteratee = _cb(iteratee, DMZ, 4)
    let keys = _keys(collection)
    if (initialVal === void 0)
      return keys.slice(1).reduce((accumulator, key) => iteratee(accumulator, collection[key], key, collection), collection[keys[0]])
    return keys.reduce((accumulator, key) => iteratee(accumulator, collection[key], key, collection), initialVal)
  }

  // _.reduceRight-----------------------------------------------------------//

  /**
    * This method is like _.reduce except that it iterates over elements of collection from right to left.
    * Arguments
      collection (Array|Object): The collection to iterate over.
      [iteratee=_.identity] (Function): The function invoked per iteration.
      [accumulator] (*): The initial value.
    * Returns
      ( * ): Returns the accumulated value.
  **/

  function reduceRight(collection, iteratee = identity, initialVal) {
    iteratee = _cb(iteratee, DMZ, 4)
    let keys = _keys(collection).reverse()
    if (initialVal === void 0)
      return keys.slice(1).reduce((accumulator, key) => iteratee(accumulator, collection[key], key, collection), collection[keys[0]])
    return keys.reduce((accumulator, key) => iteratee(accumulator, collection[key], key, collection), initialVal)
  }

  // _.reject----------------------------------------------------------------//

  /**
    * The opposite of _.filter; this method returns the elements of collection that predicate does not return truthy for.
    * Arguments
      collection (Array|Object): The collection to iterate over.
      [predicate=_.identity] (Function): The function invoked per iteration.
    * Returns
      (Array): Returns the new filtered array.
  **/

  function reject(collection, predicate = identity) {
    predicate = _cb(predicate, DMZ, 3)
    let keys = _keys(collection)
    return keys.filter(key => !predicate(collection[key], key, collection)).map(key => collection[key])
  }

  // _.sample----------------------------------------------------------------//

  /**
    * Gets a random element from collection.
    * Arguments
      collection(Array | Object): The collection to sample.
    * Returns
      ( * ): Returns the random element.
  **/

  function sample(collection) {
    let initialCollection = isArrayLike(collection) ? collection : values(collection)
    return initialCollection[Math.floor(Math.random() * initialCollection.length)]
  }

  // _.sampleSize------------------------------------------------------------//

  /**
    * Gets n random elements at unique keys from collection up to the size of collection.
    * Arguments
      collection(Array | Object): The collection to sample.
      [n = 1](number): The number of elements to sample.
    * Returns
      (Array): Returns the random elements.
  **/

  function sampleSize(collection, n = 1) {
    let shuffledArr = shuffle(collection)
    let size = n < 0 ? 0 : n
    return shuffledArr.slice(0, n)
  }

  // _.shuffle---------------------------------------------------------------//

  /**
    * Creates an array of shuffled values, using a version of the Fisher - Yates shuffle.
    * Arguments
      collection(Array | Object): The collection to shuffle.
    * Returns
      (Array): Returns the new shuffled array.
  **/

  function shuffle(collection) {
    let values = _values(collection)
    //洗牌算法
    let len = values.length
    for (let i = 0; i < len - 1; i++) {
      let randomIndex = Math.floor(Math.random() * (len - i)) + i
      _exchange(values, i, randomIndex)
    }
    return values
  }

  // _.size------------------------------------------------------------------//

  /**
    * Gets the size of collection by returning its length for array-like values or the number of own enumerable string keyed properties for objects.
    * Arguments
      collection(Array | Object | string): The collection to inspect.
    * Returns
      (number): Returns the collection size.
  **/

  function size(collection) {
    if (collection == null) return 0
    return isArrayLike(collection) ? collection.length : keys(collection).length
  }

  // _.some------------------------------------------------------------------//

  /**
    * Checks if predicate returns truthy for any element of collection. Iteration is stopped once predicate returns truthy. The predicate is invoked with three arguments: (value, index|key, collection).
    * Arguments
      collection (Array|Object): The collection to iterate over.
      [predicate=_.identity] (Function): The function invoked per iteration.
    * Returns
      (boolean): Returns true if any element passes the predicate check, else false.
  **/

  function some(collection, predicate = identity) {
    predicate = _cb(predicate, DMZ, 3)
    let keys = _keys(collection)
    return keys.some(key => predicate(collection[key], key, collection))
  }

  // _.sortBy----------------------------------------------------------------//

  /**
    * Creates an array of elements, sorted in ascending order by the results of running each element in a collection thru each iteratee.
      This method performs a stable sort, that is, it preserves the original sort order of equal elements.The iteratees are invoked with one argument: (value).
    * Arguments
      collection(Array | Object): The collection to iterate over.
      [iteratees = [_.identity]](...(Function | Function[])): The iteratees to sort by.
    * Returns
      (Array): Returns the new sorted array.
  **/

  function sortBy(collection, iteratees = [identity]) {
    let values = _values(collection)
    let valuesLen = values.length
    let iterateesCopy = iteratees.slice()
    iterateesCopy.reverse().forEach(iteratee => {
      iteratee = _cb(iteratee, DMZ, 1)
      values = _mergeSort(values, 0, valuesLen - 1, iteratee, 'asc')
    })
    return values
  }

  //------------------------------------Date------------------------------------------
  // _.now-------------------------------------------------------------------//

  /**
    * Gets the timestamp of the number of milliseconds that have elapsed since the Unix epoch(1 January 1970 00: 00: 00 UTC).
    * Returns
      (number): Returns the timestamp.
  **/

  function now() {
    return Date.now()
  }

  //------------------------------------Function--------------------------------------
  // _.after-----------------------------------------------------------------//

  /**
    * The opposite of _.before; this method creates a function that invokes func once it's called n or more times.
    * Arguments
      n (number): The number of calls before func is invoked.
      func (Function): The function to restrict.
    * Returns
      (Function): Returns the new restricted function.
  **/

  function after(timers, func) {
    return function(...args) {
      if(--timers <= 0) {
        return func.call(this, ...args)
      }
    }
  }

  // _.ary-------------------------------------------------------------------//

  /**
    * Creates a function that invokes func, with up to n arguments, ignoring any additional arguments.
    * Arguments
      func (Function): The function to cap arguments for.
      [n=func.length] (number): The arity cap.
    * Returns
      (Function): Returns the new capped function.
  **/

  function ary(func, argsCount = func.length) {
    return function(...args) {
      return func.apply(this, args.slice(0, argsCount))
    }
  }

  // _.before----------------------------------------------------------------//

  /**
    * Creates a function that invokes func, with the this binding and arguments of the created function,
      while it's called less than n times. Subsequent calls to the created function return the result of the last func invocation.
    * Arguments
      n (number): The number of calls at which func is no longer invoked.
      func (Function): The function to restrict.
    * Returns
      (Function): Returns the new restricted function.
  **/

  function before(times, func) {
    let memo
    return function (...args) {
      if(--times > 0) {
        memo = func.call(this, ...args)
      }
      return memo
    }
  }

  // _.bind------------------------------------------------------------------//

  /**
    * Creates a function that invokes func with the this binding of thisArg and partials prepended to the arguments it receives.

      The _.bind.placeholder value, which defaults to _ in monolithic builds, may be used as a placeholder for partially applied arguments.

      Note: Unlike native Function#bind, this method doesn't set the "length" property of bound functions.
    * Arguments
      func (Function): The function to bind.
      thisArg (*): The this binding of func.
      [partials] (...*): The arguments to be partially applied.
    * Returns
      (Function): Returns the new bound function.
  **/

  function bind(func, thisArg, ...partials) {
    return function(...args) {
      if (!isFunction(func)) throw new Error('Bind must be called on a function')
      let separator = 0
      let finalArgs = partials.map(partial => {
        if(partial === __) return args[separator++]
        return partial
      }).concat(args.slice(separator))
      return func.call(thisArg, ...finalArgs)
    }
  }

  // _.bindKey---------------------------------------------------------------//

  /**
    * Creates a function that invokes the method at object[key] with partials prepended to the arguments it receives.

      This method differs from _.bind by allowing bound functions to reference methods that may be redefined or don't yet exist. See Peter Michaux's article for more details.

      The _.bindKey.placeholder value, which defaults to _ in monolithic builds, may be used as a placeholder for partially applied arguments.
    * Arguments
      object(Object): The object to invoke the method on.
      key(string): The key of the method.
      [partials](... * ): The arguments to be partially applied.
    * Returns
      (Function): Returns the new bound function.
  **/

  function bindKey(obj, key, ...partials) {
    return function (...args) {
      let func = obj[key]
      if (!isFunction(func)) throw new Error('bindKey must be called on a function')
      let separator = 0
      let finalArgs = partials.map(partial => {
        if (partial === __) return args[separator++]
        return partial
      }).concat(args.slice(separator))
      return func.call(obj, ...finalArgs)
    }
  }

  // _.curry-----------------------------------------------------------------//

  /**
    * Creates a function that accepts arguments of func and either invokes func returning its result, if at least arity number of
      arguments have been provided, or returns a function that accepts the remaining func arguments, and so on. The arity of func may be specified if func.length is not sufficient.

      The _.curry.placeholder value, which defaults to _ in monolithic builds, may be used as a placeholder for provided arguments.

      Note: This method doesn't set the "length" property of curried functions.
    * Arguments
      func (Function): The function to curry.
      [arity=func.length] (number): The arity of func.
    * Returns
      (Function): Returns the new curried function.
  **/

  function curry(func, arity = func.length) {
    return function(...args) {
      let argsLen = args.filter(arg => arg !== __).length
      if (argsLen >= arity) {
        return bind(func, this, ...args)()
      } else {
        return curry(bind(func, this, ...args), arity - argsLen)
      }
    }
  }

  // _.curryRight------------------------------------------------------------//

  /**
    * This method is like _.curry except that arguments are applied to func in the manner of _.partialRight instead of _.partial.

      The _.curryRight.placeholder value, which defaults to _ in monolithic builds, may be used as a placeholder for provided arguments.

      Note: This method doesn't set the "length" property of curried functions.
    * Arguments
      func (Function): The function to curry.
      [arity=func.length] (number): The arity of func.
    * Returns
      (Function): Returns the new curried function.
  **/

  function curryRight(func, arity = func.length) {
    return function (...args) {
      let argsLen = args.filter(arg => arg !== __).length
      let finalArgs = new Array(arity - args.length).fill(__).concat(args)
      if (argsLen >= arity) {
        return bind(func, this, ...finalArgs)()
      } else {
        return curryRight(bind(func, this, ...finalArgs), arity - argsLen)
      }
    }
  }

  // _.debounce--------------------------------------------------------------//

  /**
    * Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked.
      The debounced function comes with a cancel method to cancel delayed func invocations and a flush method to immediately invoke them.
      Provide options to indicate whether func should be invoked on the leading and/or trailing edge of the wait timeout. The func is invoked with the
      last arguments provided to the debounced function. Subsequent calls to the debounced function return the result of the last func invocation.

      Note: If leading and trailing options are true, func is invoked on the trailing edge of the timeout only if the debounced function is invoked
            more than once during the wait timeout.

      If wait is 0 and leading is false, func invocation is deferred until to the next tick, similar to setTimeout with a timeout of 0.

      See David Corbacho's article for details over the differences between _.debounce and _.throttle.
    * Arguments
      func (Function): The function to debounce.
      [wait=0] (number): The number of milliseconds to delay.
      [options={}] (Object): The options object.
      [options.leading=false] (boolean): Specify invoking on the leading edge of the timeout.
      [options.maxWait] (number): The maximum time func is allowed to be delayed before it's invoked.
      [options.trailing=true] (boolean): Specify invoking on the trailing edge of the timeout.
    * Returns
      (Function): Returns the new debounced function.
  **/

  // _.defer-----------------------------------------------------------------//

  /**
    * Defers invoking the func until the current call stack has cleared.Any additional arguments are provided to func when it 's invoked.
    * Arguments
      func (Function): The function to defer.
      [args] (...*): The arguments to invoke func with.
    * Returns
      (number): Returns the timer id.
  **/

  function defer(func, ...args) {
    return delay(func, 0, ...args)
  }

  // _.delay-----------------------------------------------------------------//

  /**
    * Invokes func after wait milliseconds.Any additional arguments are provided to func when it 's invoked.
    * Arguments
      func (Function): The function to delay.
      wait (number): The number of milliseconds to delay invocation.
      [args] (...*): The arguments to invoke func with.
    * Returns
      (number): Returns the timer id.
  **/

  function delay(func, wait, ...args) {
    return setTimeout(() => {
      return func.apply(DMZ, args)
    }, wait);
  }

  // _.flip------------------------------------------------------------------//

  /**
    * Creates a function that invokes func with arguments reversed.
    * Arguments
      func (Function): The function to flip arguments for.
    * Returns
      (Function): Returns the new flipped function.
  **/

  function flip(func) {
    return function(...args) {
      return func.apply(this, args.reverse())
    }
  }

  // _.memoize---------------------------------------------------------------//

  /**
    * Creates a function that memoizes the result of func. If resolver is provided,
      it determines the cache key for storing the result based on the arguments provided to the memoized function.
      By default, the first argument provided to the memoized function is used as the map cache key. The func is invoked with the this binding of the memoized function.

      Note: The cache is exposed as the cache property on the memoized function. Its creation may be customized
      by replacing the _.memoize.Cache constructor with one whose instances implement the Map method interface of clear, delete, get, has, and set.
    * Arguments
      func (Function): The function to have its output memoized.
      [resolver] (Function): The function to resolve the cache key.
    * Returns
      (Function): Returns the new memoized function.
  **/

  function memoize(func, resolver) {
    let memo = function (...args) {
      let cache = memo.cache
      let key = resolver ? resolver.call(this, ...args) : args[0]
      if(!(cache.has(key))) {
        let value = func.call(this, ...args)
        cache.set(key, value)
      }
      return cache.get(key)
    }
    memo.cache = new Map()
    return memo
  }

  // _.negate----------------------------------------------------------------//

  /**
    * Creates a function that negates the result of the predicate func. The func predicate is invoked with the this binding and arguments of the created function.
    * Arguments
      predicate(Function): The predicate to negate.
    * Returns
      (Function): Returns the new negated function.
  **/

  function negate(predicate) {
    return function (...args) {
      return !predicate.apply(this, args)
    }
  }

  // _.once------------------------------------------------------------------//

  /**
    * Creates a function that is restricted to invoking func once. Repeat calls to the function return the value of the first invocation. The func is invoked with the this binding and arguments of the created function.
    * Arguments
      func (Function): The function to restrict.
    * Returns
      (Function): Returns the new restricted function.
  **/

  function once(func) {
    return before(2, func)
  }

  // _.overArgs--------------------------------------------------------------//

  /**
    * Creates a function that invokes func with its arguments transformed.
    * Arguments
      func (Function): The function to wrap.
      [transforms=[_.identity]] (...(Function|Function[])): The argument transforms.
    * Returns
      (Function): Returns the new function.
  **/

  function overArgs(func, transforms) {
    return function (...args) {
      let finalArgs = args.map((arg, index) => transforms[index](arg))
      return func.call(this, ...finalArgs)
    }
  }

  // _.partial---------------------------------------------------------------//

  /**
    * Creates a function that invokes func with partials prepended to the arguments it receives. This method is like _.bind except it does not alter the this binding.

      The _.partial.placeholder value, which defaults to _ in monolithic builds, may be used as a placeholder for partially applied arguments.

      Note: This method doesn't set the "length" property of partially applied functions.
    * Arguments
      func (Function): The function to partially apply arguments to.
      [partials] (...*): The arguments to be partially applied.
    * Returns
      (Function): Returns the new partially applied function.
  **/

  function partial(func, ...partials) {
    return function (...args) {
      if (!isFunction(func)) throw new Error('partial must be called on a function')
      let separator = 0
      let finalArgs = partials.map(partial => {
        if (partial === __) return args[separator++]
        return partial
      }).concat(args.slice(separator))
      return func.call(this, ...finalArgs)
    }
  }

  // _.partialRight----------------------------------------------------------//
  /**
    * This method is like _.partial except that partially applied arguments are appended to the arguments it receives.

      The _.partialRight.placeholder value, which defaults to _ in monolithic builds, may be used as a placeholder for partially applied arguments.

      Note: This method doesn't set the "length" property of partially applied functions.
    * Arguments
      func (Function): The function to partially apply arguments to.
      [partials] (...*): The arguments to be partially applied.
    * Returns
      (Function): Returns the new partially applied function.
  **/

  function partialRight(func, ...partivals) {
    return function (...args) {
      if (!isFunction(func)) throw new Error('partialRight must be called on a function')
      let separator = 0
      args.reverse()
      let finalArgs = partivals.reverse().map(partial => {
        if(partial === __) return args[separator++]
        return partial
      }).concat(args.slice(separator)).reverse()
      return func.call(this, ...finalArgs)
    }
  }

  // _.rearg-----------------------------------------------------------------//

  /**
    * Creates a function that invokes func with arguments arranged according to the specified indexes where the argument value at the
      first index is provided as the first argument, the argument value at the second index is provided as the second argument, and so on.
    * Arguments
      func (Function): The function to rearrange arguments for.
      indexes (...(number|number[])): The arranged argument indexes.
    * Returns
      (Function): Returns the new function.
  **/

  function rearg(func, indexes) {
    return function (...args) {
      let finalArgs = new Array(indexes.length)
      indexes.forEach((item, i) => {
        finalArgs[i] = args[item]
      })
      return func.call(this, ...finalArgs)
    }
  }

  // _.rest------------------------------------------------------------------//

  /**
    * Creates a function that invokes func with the this binding of the created function and arguments from start and beyond provided as an array.

      Note: This method is based on the rest parameter.
    * Arguments
      func (Function): The function to apply a rest parameter to.
      [start=func.length-1] (number): The start position of the rest parameter.
    * Returns
      (Function): Returns the new function.
  **/

  function rest(func, start = func.length - 1) {
    return function (...args) {
      let args1 = args.slice(0, start)
      let args2 = args.slice(start)
      return func.call(this, ...args1, args2)
    }
  }

  // _.spread----------------------------------------------------------------//

  /**
    * Creates a function that invokes func with the this binding of the create function and an array of arguments much like Function#apply.

      Note: This method is based on the spread operator.
    * Arguments
      func (Function): The function to spread arguments over.
      [start=0] (number): The start position of the spread.
    * Returns
      (Function): Returns the new function.
  **/

  function spread(func, start = 0) {
    return function (argsArr) {
      return func.call(this, ...argsArr.slice(start))
    }
  }

  // _.throttle--------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.unary-----------------------------------------------------------------//

  /**
    * Creates a function that accepts up to one argument, ignoring any additional arguments.
    * Arguments
      func (Function): The function to cap arguments for.
    * Returns
      (Function): Returns the new capped function.
  **/

  function unary(func) {
    return ary(func, 1)
  }

  // _.wrap------------------------------------------------------------------//

  /**
    * Creates a function that provides value to wrapper as its first argument. Any additional arguments provided to the function are appended to those provided to the wrapper.
      The wrapper is invoked with the this binding of the created function.
    * Arguments
      value (*): The value to wrap.
      [wrapper=identity] (Function): The wrapper function.
    * Returns
      (Function): Returns the new function.
  **/

  function wrap(val, wrapper = identity) {
    return function (...args) {
      return wrapper.call(this, val, ...args)
    }
  }

  //------------------------------------Lang------------------------------------------
  // _.castArray-------------------------------------------------------------//

  /**
    * Casts value as an array if it's not one.
    * Arguments
      value( * ): The value to inspect.
    * Returns
      (Array): Returns the cast array.
  **/

  function castArray(...values) {
    if(values.length === 0) return []
    let val = values[0]
    return isArray(val) ? val : [val]
  }

  // _.clone-----------------------------------------------------------------//

  /**
    * Creates a shallow clone of value.

      Note: This method is loosely based on the structured clone algorithm and supports cloning arrays, array buffers, booleans, date objects, maps, numbers, Object objects, regexes, sets, strings,
      symbols, and typed arrays. The own enumerable properties of arguments objects are cloned as plain objects. An empty object is returned for uncloneable values such as error objects, functions, DOM nodes, and WeakMaps.
    * Arguments
      value( * ): The value to clone.
    * Returns
      ( * ): Returns the cloned value.
  **/

  function clone(val) {

    //原型问题没考虑~
    if (!isObject(val)) {
      return val
    }
    if (isElement(val) || isFunction(val) || isWeakMap(val) || isWeakSet(val) || isError(val) || _objectProto.toString.call(val) === _typeMap.HTMLCollection) {
      return {}
    }
    if (isArray(val) || isTypedArray(val) || isArrayBuffer(val) || isArguments(val)) {
      return _arrayProto.slice.call(val)
    }
    if (isMap(val)) {
      let result = new Map()
      val.forEach((item, key) => {
        result.set(key, item)
      })
      return result
    }
    if(isSet(val)) {
      return new Set(val)
    }
    let result = Object.create(Object.getPrototypeOf(val))
    return Object.assign(result, val)
  }

  // _.cloneDeep-------------------------------------------------------------//

  /**
    * This method is like _.clone except that it recursively clones value.
    * Arguments
      value( * ): The value to recursively clone.
    * Returns
      ( * ): Returns the deep cloned value.
  **/

  function cloneDeep(val, loopHash = new Map()) {
    //循环引用问题 ?
    //非enumerable问题 ?
    //原型链问题 ?

    //避免过于复杂,仅考虑基础类型, 数组, 对象, 正则
    if (!isObject(val)) {
      return val
    }
    if (isRegExp(val)) {
      return new RegExp(val)
    }
    if (loopHash.has(val)) {
      return val
    }
    loopHash.set(val, 'exist')
    let keys = _keys(val)
    let result = isArray(val) ? [] : {}
    Object.setPrototypeOf(result, Object.getPrototypeOf(val))
    keys.forEach(key => {
      result[key] = cloneDeep(val[key], loopHash)
    })
    return result
  }

  // _.cloneDeepWith---------------------------------------------------------//
  /**
    * This method is like _.cloneWith except that it recursively clones value.
    * Arguments
      value (*): The value to recursively clone.
      [customizer] (Function): The function to customize cloning.
    * Returns
      ( * ): Returns the deep cloned value.
  **/

  function cloneDeepWith(val, customizer, loopHash = new Map()) {
    if (customizer === void 0) return cloneDeep(val)
    //避免过于复杂,仅考虑 普通值, 数组, 对象, 正则
    let customizerResult = customizer(val)
    if (customizerResult !== void 0) return customizerResult
    if (!isObject(val)) {
      return val
    }
    if (isRegExp(val)) {
      return new RegExp(val)
    }
    if (loopHash.has(val)) {
      return val
    }
    loopHash.set(val, 'exist')
    let keys = _keys(val)
    let result = isArray(val) ? [] : {}
    Object.setPrototypeOf(result, Object.getPrototypeOf(val))
    keys.forEach(key => {
      let tmp = customizer(val[key], key, val, loopHash)
      if(tmp === void 0)
        result[key] = cloneDeepWith(val[key], customizer, loopHash)
      result[key] = tmp
    })
    return result

  }

  // _.cloneWith-------------------------------------------------------------//

  /**
    * This method is like _.clone except that it accepts customizer which is invoked to produce the cloned value. If customizer returns undefined, cloning is handled by the method instead. The customizer is invoked with up to four arguments; (value [, index|key, object, stack])
    * Arguments
      value (*): The value to clone.
      [customizer] (Function): The function to customize cloning.
    * Returns
      ( * ): Returns the cloned value.
  **/

  function cloneWith(val, customizer) {
    if (customizer === void 0 || customizer(val) === void 0) return clone(val)
    return customizer(val)
  }

  // _.conformsTo------------------------------------------------------------//

  /**
    * Checks if object conforms to source by invoking the predicate properties of source with the corresponding property values of object.

      Note: This method is equivalent to _.conforms when source is partially applied.
    * Arguments
      object(Object): The object to inspect.
      source(Object): The object of property predicates to conform to.
    * Returns
      (boolean): Returns true if object conforms, else false.
  **/

  function conformsTo(obj, source) {
    return _keys(source).every(item => source[item].call(DMZ, obj[item]))
  }

  // _.eq--------------------------------------------------------------------//

  /**
    * Performs a SameValueZero comparison between two values to determine if they are equivalent.
    * Arguments
      value( * ): The value to compare.
      other( * ): The other value to compare.
    * Returns
      (boolean): Returns true if the values are equivalent, else false.
  **/

  function eq(value, other) {
    return value === other || (isNaN(value) && isNaN(other))
  }

  // _.gt--------------------------------------------------------------------//

  /**
    * Checks if value is greater than other.
    * Arguments
      value( * ): The value to compare.
      other( * ): The other value to compare.
    * Returns
      (boolean): Returns true if value is greater than other, else false.
  **/

  function gt(value, other) {
    return value > other
  }

  // _.gte-------------------------------------------------------------------//

  /**
    * Checks if value is greater than or equal to other.
    * Arguments
      value( * ): The value to compare.
      other( * ): The other value to compare.
    * Returns
      (boolean): Returns true if value is greater than or equal to other, else false.
  **/

  function gte(value, other) {
    return value >= other
  }

  // _.isArguments-----------------------------------------------------------//

  /**
    * Checks if value is likely an arguments object.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is an arguments object, else false.
  **/

  function isArguments(obj) {
    return _objectProto.toString.call(obj) === _typeMap.Arguments
  }

  // _.isArray---------------------------------------------------------------//

  /**
    * Checks if value is classified as an Array object.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is an array, else false.
  **/

  function isArray(obj) {
    return Array.isArray ? Array.isArray(obj) : _objectProto.toString.call(obj) === _typeMap.Array
  }

  // _.isArrayBuffer---------------------------------------------------------//

  /**
    * Checks
    if value is classified as an ArrayBuffer object.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is an array buffer, else false.
  **/

  function isArrayBuffer(obj) {
    return _objectProto.toString.call(obj) === _typeMap.ArrayBuffer
  }

  // _.isArrayLike-----------------------------------------------------------//

  /**
    * Checks if value is array-like. A value is considered array-like if it's not a function and has a value.length that's an integer greater than or equal to 0 and less than or equal to Number.MAX_SAFE_INTEGER.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is array-like, else false.
  **/

  function isArrayLike(obj) {
    let len = obj['length']
    return !isFunction(obj) && len >= 0 && len <= Number.MAX_SAFE_INTEGER
  }

  // _.isArrayLikeObject-----------------------------------------------------//

  /**
    * This method is like _.isArrayLike except that it also checks if value is an object.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is an array-like object, else false
  **/

  function isArrayLikeObject(obj) {
    return isArrayLike(obj) && isObjectLike(obj)
  }

  // _.isBoolean-------------------------------------------------------------//

  /**
    * Checks if value is classified as a boolean primitive or object.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is a boolean, else false.
  **/

  function isBoolean(obj) {
    return _objectProto.toString.call(obj) === _typeMap.Boolean
  }

  // _.isBuffer--------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.isDate----------------------------------------------------------------//

  /**
    * Checks if value is classified as a Date object.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is a date object, else false.
  **/

  function isDate(obj) {
    return _objectProto.toString.call(obj) === _typeMap.Date
  }
  // _.isElement-------------------------------------------------------------//

  /**
    * Checks if value is likely a DOM element.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true
      if value is a DOM element,
      else false.
  **/

  function isElement(obj) {
    return !!(obj && obj.nodeType === 1)
  }

  // _.isEmpty---------------------------------------------------------------//

  /**
    * Checks if value is an empty object, collection, map, or set.

      Objects are considered empty if they have no own enumerable string keyed properties.

      Array-like values such as arguments objects, arrays, buffers, strings, or jQuery-like collections are considered empty if they have a length of 0. Similarly, maps and sets are considered empty if they have a size of 0.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is empty, else false.
  **/

  function isEmpty(obj) {
    if (obj == null) return true
    if ( isArrayLike(obj) && (isArguments(obj) || isArray(obj) || isString(obj) || isTypedArray(obj))) {
      return obj.length === 0
    }
    if (isMap(obj) || isSet(obj)) {
      return obj.size === 0
    }
    return _keys(obj).length === 0
  }

  // .isEqual----------------------------------------------------------------//

  /**
    * Performs a deep comparison between two values to determine if they are equivalent.

      Note: This method supports comparing arrays, array buffers, booleans, date objects, error objects, maps, numbers, Object objects, regexes, sets, strings, symbols, and typed arrays.
      Object objects are compared by their own, not inherited, enumerable properties. Functions and DOM nodes are compared by strict equality, i.e. ===.
    * Arguments
      value( * ): The value to compare.
      other( * ): The other value to compare.
    * Returns
      (boolean): Returns true if the values are equivalent, else false.
  **/

  function isEqual(val, other, loopHash = new Map()) {
    if (_objectProto.toString.call(val) != _objectProto.toString.call(other)) {
      return false
    }
    //简单考虑, 只考虑 基本类型 , 数组, 正则, 对象
    if (!isObject(val)) {
      return val === other
    }
    if (isRegExp(val)) {
      return val.toString() === other.toString()
    }
    if (loopHash.has(val)) {
      return true
    }
    loopHash.set(val, 'exist')
    let keys = _keys(val)
    let otherKeys = _keys(other)
    return keys.length === otherKeys.length && keys.every(key => isEqual(val[key], other[key], loopHash))
  }

  // .isEqualWith------------------------------------------------------------//

  /**
    * This method is like _.isEqual except that it accepts customizer which is invoked to compare values.If customizer returns undefined,
      comparisons are handled by the method instead.The customizer is invoked with up to six arguments: (objValue, othValue[, index | key, object, other, stack]).
    * Arguments
      value (*): The value to compare.
      other (*): The other value to compare.
      [customizer] (Function): The function to customize comparisons.
    * Returns
      (boolean): Returns true if the values are equivalent, else false.
  **/

  function isEqualWith(val, other, customizer, loopHash = new Map()) {
    if (customizer === void 0) return isEqual(val, other, loopHash)
    let result = customizer(val, other)
    if (result !== void 0) return result
    if (_objectProto.toString.call(val) != _objectProto.toString.call(other)) {
      return false
    }
    //简单考虑, 只考虑 基本类型 , 数组, 正则, 对象
    if (!isObject(val)) {
      return val === other
    }
    if (isRegExp(val)) {
      return val.toString() === other.toString()
    }
    if (loopHash.has(val)) {
      return true
    }
    loopHash.set(val, 'exist')
    let keys = _keys(val)
    let otherKeys = _keys(other)
    return keys.length === otherKeys.length && keys.every(key => {
      let tmp = customizer(val[key], other[key], key, val, other, loopHash)
      if (tmp === void 0)
        return isEqualWith(val[key], other[key], customizer, loopHash)
      return tmp
    })
  }

  // _.isError---------------------------------------------------------------//

  /**
    * Checks if value is an Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, or URIError object.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is an error object, else false.
  **/

  function isError(obj) {
    return _objectProto.toString.call(obj) === _typeMap.Error
  }

  // _.isFinite--------------------------------------------------------------//

  /**
    * Checks if value is a finite primitive number.

      Note: This method is based on Number.isFinite.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is a finite number, else false.
  **/

  function isFinite(obj) {
    return Number.isFinite(obj)
  }

  // _.isFunction------------------------------------------------------------//

  /**
    * Checks if value is classified as a Function object.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is a function, else false.
  **/

  function isFunction(obj) {
    return _objectProto.toString.call(obj) === _typeMap.Function
  }

  // _.isInteger------------------------------------------------------------//

  /**
    * Checks if value is an integer.

      Note: This method is based on Number.isInteger.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is an integer, else false.
  **/

  function isInteger(obj) {
    return Number.isInteger(obj)
  }

  // _.isLength--------------------------------------------------------------//

  /**
    * Checks if value is a valid array-like length.

      Note: This method is loosely based on ToLength.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is a valid length, else false.
  **/

  function isLength(obj) {
    return Number.isSafeInteger(obj) && obj >= 0
  }

  // _.isMap-----------------------------------------------------------------//

  /**
    * Checks if value is classified as a Map object.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is a map, else false.
  **/

  function isMap(obj) {
    return _objectProto.toString.call(obj) === _typeMap.Map
  }

  // _.isMatch---------------------------------------------------------------//

  /**
    * Performs a partial deep comparison between object and source to determine if object contains equivalent property values.

      Note: This method is equivalent to _.matches when source is partially applied.

      Partial comparisons will match empty array and empty object source values against any array or object value, respectively. See _.isEqual for a list of supported value comparisons.
    * Arguments
      object(Object): The object to inspect.
      source(Object): The object of property values to match.
    * Returns
      (boolean): Returns true if object is a match, else false.
  **/

  function isMatch(obj, source) {
    let compareObj = Object.assign({}, obj, source)
    return isEqual(obj, compareObj)
  }

  // _.isMatchWith-----------------------------------------------------------//

  /**
    * This method is like _.isMatch except that it accepts customizer which is invoked to compare values.If customizer returns undefined,
      comparisons are handled by the method instead.The customizer is invoked with five arguments: (objValue, srcValue, index | key, object, source).
    * Arguments
      object (Object): The object to inspect.
      source (Object): The object of property values to match.
      [customizer] (Function): The function to customize comparisons.
    * Returns
      (boolean): Returns true if object is a match, else false.
  **/

    function isMatchWith(obj, source, customizer) {
      let compareObj = assign({}, obj, source)
      return isEqualWith(obj, compareObj, customizer)
    }

  // _.isNaN-----------------------------------------------------------------//

  /**
    * Checks if value is NaN.

      Note: This method is based on Number.isNaN and is not the same as global isNaN which returns true for undefined and other non-number values.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is NaN, else false.
  **/

  function isNaN(obj) {
    return isNumber(obj) && obj != +obj
  }

  // _.isNative--------------------------------------------------------------//

  /**
    * Checks if value is a pristine native function.

      Note: This method can't reliably detect native functions in the presence of the core-js package because core-js circumvents this kind of detection. Despite multiple requests, the core-js maintainer has made it clear: any attempt to fix the detection will be obstructed.
            As a result, we're left with little choice but to throw an error. Unfortunately, this also affects packages, like babel-polyfill, which rely on core-js.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is a native function, else false.
  **/

  function isNative(obj) {
    return isFunction(obj) && /\[native code\]/.test('' + obj)
  }

  // _.isNil-----------------------------------------------------------------//

  /**
    * Checks if value is null or undefined.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is nullish, else false.
  **/

  function isNil(obj) {
    return obj == void 0
  }

  // _.isNull----------------------------------------------------------------//

  /**
    * Checks if value is null.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is null, else false.
  **/

  function isNull(obj) {
    return _objectProto.toString.call(obj) === _typeMap.Null
  }

  // _.isNumber--------------------------------------------------------------//

  /**
    * Checks if value is classified as a Number primitive or object.

      Note: To exclude Infinity, -Infinity, and NaN, which are classified as numbers, use the _.isFinite method.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is a number, else false.
  **/

  function isNumber(obj) {
    return _objectProto.toString.call(obj) === _typeMap.Number
  }

  // _.isObject--------------------------------------------------------------//

  /**
    * Checks if value is the language type of Object. (e.g. arrays, functions, objects, regexes, new Number(0), and new String(''))
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is an object, else false.
  **/

  function isObject(obj) {
    let type = typeof obj
    return !isNull(obj) && (type == 'object' || type == 'function')
  }

  // _.isObjectLike----------------------------------------------------------//

  /**
    * Checks if value is object-like. A value is object-like if it's not null and has a typeof result of "object".
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is object-like, else false.
  **/

  function isObjectLike (obj) {
    return !isNull(obj) && typeof obj == 'object'
  }

  // _.isPlainObject---------------------------------------------------------//

  /**
    * Checks if value is a plain object, that is, an object created by the Object constructor or one with a [[Prototype]] of null.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is a plain object, else false.
  **/

  function isPlainObject(obj) {
    if (!isObjectLike(obj) || _objectProto.toString.call(obj) !== _typeMap.Object)
      return false
    let proto = Object.getPrototypeOf(obj)
    return proto === null || proto === Object.prototype
  }

  // _.isRegExp--------------------------------------------------------------//

  /**
    * Checks if value is classified as a RegExp object.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is a regexp, else false.
  **/

  function isRegExp(obj) {
    return _objectProto.toString.call(obj) === _typeMap.RegExp
  }

  // _.isSafeInteger---------------------------------------------------------//

  /**
    * Checks if value is a safe integer. An integer is safe if it's an IEEE-754 double precision number which isn't the result of a rounded unsafe integer.

      Note: This method is based on Number.isSafeInteger.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is a safe integer, else false.
  **/

  function isSafeInteger(obj) {
    return Number.isSafeInteger(obj)
  }

  // _.isSet-----------------------------------------------------------------//

  /**
    * Checks if value is classified as a Set object.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is a set, else false.
  **/

  function isSet(obj) {
    return _objectProto.toString.call(obj) === _typeMap.Set
  }

  // _.isString--------------------------------------------------------------//

  /**
    * Checks if value is classified as a String primitive or object.
    * Arguments
      value (*): The value to check.
    * Returns
      (boolean): Returns true if value is a string, else false.
  **/

  function isString(obj) {
    return _objectProto.toString.call(obj) === _typeMap.String
  }

  // _.isSymbol--------------------------------------------------------------//

  /**
    * Checks if value is classified as a Symbol primitive or object.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is a symbol, else false.
  **/

  function isSymbol(obj) {
    return _objectProto.toString.call(obj) === _typeMap.Symbol
  }

  // _.isTypedArray----------------------------------------------------------//

  /**
    * Checks if value is classified as a typed array.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is a typed array, else false.
  **/

  function isTypedArray(obj) {
    return /\[object Uint(8|16|32)Array\]/.test(Object.prototype.toString.call(obj))
  }

  // _.isUndefined-----------------------------------------------------------//

  /**
    * Checks if value is undefined.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is undefined, else false.
  **/

  function isUndefined(obj) {
    return obj === void 0
  }

  // _.isWeakMap-------------------------------------------------------------//

  /**
    * Checks if value is classified as a WeakMap object.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is a weak map, else false.
  **/

  function isWeakMap(obj) {
    return isObjectLike(obj) && _objectProto.toString.call(obj) === _typeMap.WeakMap
  }

  // _.isWeakSet-------------------------------------------------------------//

  /**
    * Checks if value is classified as a WeakSet object.
    * Arguments
      value( * ): The value to check.
    * Returns
      (boolean): Returns true if value is a weak set, else false.
  **/

  function isWeakSet(obj) {
    return isObjectLike(obj) && _objectProto.toString.call(obj) === _typeMap.WeakSet
  }

  // _.lt--------------------------------------------------------------------//

  /**
    * Checks if value is less than other.
    * Arguments
      value( * ): The value to compare.
      other( * ): The other value to compare.
    * Returns
      (boolean): Returns true if value is less than other, else false.
  **/

  function lt(value, other) {
    return value < other
  }

  // _.lte-------------------------------------------------------------------//

  /**
    * Checks if value is less than or equal to other.
    * Arguments
      value( * ): The value to compare.
      other( * ): The other value to compare.
    * Returns
      (boolean): Returns true if value is less than or equal to other, else false.
  **/

  function lte(value, other) {
    return value <= other
  }

  // _.toArray---------------------------------------------------------------//

  /**
    * Converts value to an array.
    * Arguments
      value( * ): The value to convert.
    * Returns
      (Array): Returns the converted array.
  **/

  function toArray(value) {
    if (isString(value))
      return value.split('')
    if (!isObject(value))
      return []
    if (isArray(value) || isTypedArray(value) || isArrayBuffer(value))
      return value.slice()
    if (isArrayLike(value))
      return _arrayProto.slice.call(value)
    if (isSet(value) || isMap(value))
      return Array.from(value.values())
    return values(value)
  }

  // _.toFinite--------------------------------------------------------------//

  /**
    * Converts value to a finite number.
    * Arguments
      value( * ): The value to convert.
    * Returns
      (number): Returns the converted number.
  **/

  function toFinite(value) {
    if (value === Infinity) return Number.MAX_VALUE
    if (value === -Infinity) return Number.MIN_VALUE
    let result = Number(value)
    return isNaN(result) ? 0 : result
  }

  // _.toInteger-------------------------------------------------------------//
  /**
    * Converts value to an integer.

      Note: This method is loosely based on ToInteger.
    * Arguments
      value( * ): The value to convert.
    * Returns
      (number): Returns the converted integer.
  **/

  function toInteger(value) {
    let result = toFinite(value)
    return result - result % 1
  }

  // _.toLength--------------------------------------------------------------//

  /**
    * Converts value to an integer suitable for use as the length of an array-like object.

      Note: This method is based on ToLength.
    * Arguments
      value( * ): The value to convert.
    * Returns
      (number): Returns the converted integer.
  **/

  function toLength(value) {
    let result = toInteger(value)
    return result < 0 ? 0 : (result > 4294967295 ? 4294967295 : result)
  }

  // _.toNumber--------------------------------------------------------------//

  /**
    * Converts value to a number.
    * Arguments
      value( * ): The value to process.
    * Returns
      (number): Returns the number.
  **/

  function toNumber(value) {
    return Number(value)
  }

  // _.toPlainObject---------------------------------------------------------//

  /**
    * Converts value to a plain object flattening inherited enumerable string keyed properties of value to own properties of the plain object.
    * Arguments
      value( * ): The value to convert.
    * Returns
      (Object): Returns the converted plain object.
  **/

  function toPlainObject(value) {
    let result = {}
    if(!isString(value) && !isObject(value)) {
      return result
    }
    for(let key in value) {
      result[key] = value[key]
    }
    return result
  }

  // _.toSafeInteger---------------------------------------------------------//

  /**
    * Converts value to a safe integer.A safe integer can be compared and represented correctly.
    * Arguments
      value( * ): The value to convert.
    * Returns
      (number): Returns the converted integer.
  **/

  function toSafeInteger(value) {
    var result = toInteger(value)
    if (result >= Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER
    if (result <= Number.MIN_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER
    return result
  }

  // _.toString--------------------------------------------------------------//

  /**
    * Converts value to a string. An empty string is returned for null and undefined values. The sign of -0 is preserved.
    * Arguments
      value( * ): The value to convert.
    * Returns
      (string): Returns the converted string.
  **/

  function toString(value) {
    if (value == void 0) return ''
    if (isString(value)) return value
    if (isArray(value)) return value.join()
    if (isSymbol(value)) return value.toString()
    if (Object.is(value, -0)) return '-0'
    return '' + value
  }

  //------------------------------------Math------------------------------------------
  // _.add-------------------------------------------------------------------//

  /**
    * Adds two numbers.
    * Arguments
      augend(number): The first number in an addition.
      addend(number): The second number in an addition.
    * Returns
      (number): Returns the total.
  **/

  function add(augend, addend) {
    return augend + addend
  }

  // _.ceil------------------------------------------------------------------//

  /**
    * Computes number rounded up to precision.
    * Arguments
      number(number): The number to round up.
      [precision = 0](number): The precision to round up to.
    * Returns
      (number): Returns the rounded up number.
  **/

  function ceil(number, precision = 0) {
    var digit = Math.pow(10, precision)
    return Math.ceil(number * digit) / digit
  }

  // _.divide----------------------------------------------------------------//

  /**
    * Divide two numbers.
    * Arguments
      dividend(number): The first number in a division.
      divisor(number): The second number in a division.
    * Returns
      (number): Returns the quotient.
  **/

  function divide(dividend, dividor) {
    return dividend / dividor
  }

  // _.floor-----------------------------------------------------------------//

  /**
    * Computes number rounded down to precision.
    * Arguments
      number(number): The number to round down.
      [precision = 0](number): The precision to round down to.
    * Returns
      (number): Returns the rounded down number.
  **/

  function floor(number, precision = 0) {
    var digit = Math.pow(10, precision)
    return Math.floor(number * digit) / digit
  }

  // _.max-------------------------------------------------------------------//

  /**
    * Computes the maximum value of array.If array is empty or falsey, undefined is returned.
    * Arguments
      array(Array): The array to iterate over.
    * Returns
      ( * ): Returns the maximum value.
  **/

  function max(arr) {
    var max = Math.max(...arr)
    return max === -Infinity ? undefined : max
  }

  // _.maxBy-----------------------------------------------------------------//

  /**
    * This method is like _.max except that it accepts iteratee which is invoked for each element in array to generate the criterion by which the value is ranked. The iteratee is invoked with one argument: (value).
    * Arguments
      array(Array): The array to iterate over.
      [iteratee = _.identity](Function): The iteratee invoked per element.
    * Returns
      ( * ): Returns the maximum value.
  **/

  function maxBy(arr, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ, 1)
    let max = -Infinity
    let result
    forEach(arr, val => {
      let tmp = iteratee(val)
      if (max < tmp) {
        result = val
        max = tmp
      }
    })
    return result
  }

  // _.mean------------------------------------------------------------------//

  /**
    * Computes the mean of the values in array.
    * Arguments
      array(Array): The array to iterate over.
    * Returns
      (number): Returns the mean.
  **/

  function mean(arr) {
    return arr.reduce((accumulator, currentVal) => accumulator + currentVal) / arr.length
  }

  // _.meanBy----------------------------------------------------------------//

  /**
    * This method is like _.mean except that it accepts iteratee which is invoked for each element in array to generate the value to be averaged. The iteratee is invoked with one argument: (value).
    * Arguments
      array(Array): The array to iterate over.
      [iteratee = _.identity](Function): The iteratee invoked per element.
    * Returns
      (number): Returns the mean.
  **/

  function meanBy(arr, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ, 1)
    return arr.reduce((accumulator, item) => iteratee(item) + accumulator, 0) / arr.length
  }

  // _.min-------------------------------------------------------------------//

  /**
    * Computes the minimum value of array.If array is empty or falsey, undefined is returned.
    * Arguments
      array(Array): The array to iterate over.
    * Returns
      ( * ): Returns the minimum value.
  **/

  function min(arr) {
    var min = Math.min(...arr)
    return min === Infinity ? undefined : min
  }

  // _.minBy-----------------------------------------------------------------//

  /**
    * This method is like _.min except that it accepts iteratee which is invoked for each element in array to generate the criterion by which the value is ranked. The iteratee is invoked with one argument: (value).
    * Arguments
      array(Array): The array to iterate over.
      [iteratee = _.identity](Function): The iteratee invoked per element.
    * Returns
      ( * ): Returns the minimum value.
  **/

  function minBy(arr, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ, 1)
    let min = Infinity
    let result
    forEach(arr, val => {
      let tmp = iteratee(val)
      if (min > tmp) {
        result = val
        min = tmp
      }
    })
    return result
  }

  // _.multiply--------------------------------------------------------------//

  /**
    * Multiply two numbers.
    * Arguments
      multiplier(number): The first number in a multiplication.
      multiplicand(number): The second number in a multiplication.
    * Returns
      (number): Returns the product.
  **/

  function multiply(multiplier, multiplicand) {
    return multiplier * multiplicand
  }

  // _.round-----------------------------------------------------------------//

  /**
    * Computes number rounded to precision.
    * Arguments
      number(number): The number to round.
      [precision = 0](number): The precision to round to.
    * Returns
      (number): Returns the rounded number.
  **/

  function round(number, precision = 0) {
    var digit = Math.pow(10, precision)
    return Math.round(number * digit) / digit
  }

  // _.subtract--------------------------------------------------------------//

  /**
    * Subtract two numbers.
    * Arguments
      minuend(number): The first number in a subtraction.
      subtrahend(number): The second number in a subtraction.
    * Returns
      (number): Returns the difference.
  **/

  function subtract(minuend, subtrahend) {
    return minuend - subtrahend
  }

  // _.sum-------------------------------------------------------------------//

  /**
    * Computes the sum of the values in array.
    * Arguments
      array(Array): The array to iterate over.
    * Returns
      (number): Returns the sum.
  **/

  function sum(arr) {
    return arr.reduce((accumulator, currentVal) => accumulator + currentVal)
  }

  // _.sumBy-----------------------------------------------------------------//

  /**
    * This method is like _.sum except that it accepts iteratee which is invoked for each element in array to generate the value to be summed. The iteratee is invoked with one argument: (value).
    * Arguments
      array(Array): The array to iterate over.
      [iteratee = _.identity](Function): The iteratee invoked per element.
    * Returns
      (number): Returns the sum.
  **/

  function sumBy(arr, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ, 1)
    return arr.reduce((accumulator, item) => iteratee(item) + accumulator, 0)
  }

  //------------------------------------Number----------------------------------------
  // _.clamp-----------------------------------------------------------------//

  /**
    * Clamps number within the inclusive lower and upper bounds.
    * Arguments
      number (number): The number to clamp.
      [lower] (number): The lower bound.
      upper (number): The upper bound.
    * Returns
      (number): Returns the clamped number.
  **/

  function clamp(number, lower, upper) {
    let lowerBoundary = upper ? lower : -Infinity
    let upperBoundary = upper ? upper : lower
    return number > upperBoundary
      ? upperBoundary
      : number < lowerBoundary ? lowerBoundary : number
  }

  // _.inRange---------------------------------------------------------------//

  /**
    * Checks if n is between start and up to, but not including, end. If end is not specified,
      it's set to start with start then set to 0. If start is greater than end the params are swapped to support negative ranges.
    * Arguments
      number (number): The number to check.
      [start=0] (number): The start of the range.
      end (number): The end of the range.
    * Returns
      (boolean): Returns true if number is in the range, else false.
  **/

  function inRange(number, start, end) {
    if (start === void 0 && end === void 0) {
      return false
    }
    let startBoundary = end ? start : 0
    let endBoundary = end ? end : start
    if (startBoundary > endBoundary) {
      [startBoundary, endBoundary] = [endBoundary, startBoundary]
    }
    return number < endBoundary && number > startBoundary
  }

  // _.random----------------------------------------------------------------//

  /**
    * Produces a random number between the inclusive lower and upper bounds. If only one argument is provided a number between 0 and the given number is returned.
      If floating is true, or either lower or upper are floats, a floating-point number is returned instead of an integer.

      Note: JavaScript follows the IEEE-754 standard for resolving floating-point values which can produce unexpected results.
    * Arguments
      [lower = 0](number): The lower bound.
      [upper = 1](number): The upper bound.
      [floating](boolean): Specify returning a floating - point number.
    * Returns
      (number): Returns the random number.
  **/

  function random(lower = 0, upper = 1, floating) {
    let isFloat = floating || isInteger(lower) || isInteger(upper)
    let result = Math.random() * (upper - lower) + lower
    return isFloat ? Math.floor(result) : result
  }

  //------------------------------------Object----------------------------------------
  // _.assign----------------------------------------------------------------//

  /**
    * Assigns own enumerable string keyed properties of source objects to the destination object.Source objects are applied from left to right.Subsequent sources overwrite property assignments of previous sources.

      Note: This method mutates object and is loosely based on Object.assign.
    * Arguments
      object(Object): The destination object.
      [sources](...Object): The source objects.
    * Returns
      (Object): Returns object.
  **/

  function assign(obj, ...sources) {
    return _baseAssign(obj, true, false, false, void 0, sources)
  }

  // _.assignIn--------------------------------------------------------------//

  /**
    * This method is like _.assign except that it iterates over own and inherited source properties.

      Note: This method mutates object.
    * Arguments
      object(Object): The destination object.
      [sources](...Object): The source objects.
    * Returns
      (Object): Returns object.
  **/

  function assignIn(obj, ...sources) {
    return _baseAssign(obj, true, true, false, void 0, sources)
  }

  // _.assignInWith----------------------------------------------------------//

  /**
    * This method is like _.assignIn except that it accepts customizer which is invoked to produce the assigned values.If customizer returns undefined,
      assignment is handled by the method instead.The customizer is invoked with five arguments: (objValue, srcValue, key, object, source).

      Note: This method mutates object.
    * Arguments
      object (Object): The destination object.
      sources (...Object): The source objects.
      [customizer] (Function): The function to customize assigned values.
    * Returns
      (Object): Returns object.
  **/

  function assignInWith(obj, ...sources) {
    if (isFunction(sources[sources.length - 1])) {
      customizer = sources.pop()
    } else {
      customizer = void 0
    }
    return _baseAssign(obj, true, true, false, customizer, sources)
  }

  // _.assignWith------------------------------------------------------------//

  /**
    * This method is like _.assign except that it accepts customizer which is invoked to produce the assigned values.If customizer returns undefined, assignment is handled by the method instead.
      The customizer is invoked with five arguments: (objValue, srcValue, key, object, source).

      Note: This method mutates object.
    * Arguments
      object (Object): The destination object.
      sources (...Object): The source objects.
      [customizer] (Function): The function to customize assigned values.
    * Returns
      (Object): Returns object.
  **/

  function assignWith(obj, ...sources) {
    if (isFunction(sources[sources.length - 1])) {
      customizer = sources.pop()
    } else {
      customizer = void 0
    }
    return _baseAssign(obj, true, false, false, customizer, sources)
  }

  // _.at--------------------------------------------------------------------//

  /**
    * Creates an array of values corresponding to paths of object.
    * Arguments
      object(Object): The object to iterate over.
      [paths](...(string | string[])): The property paths to pick.
    * Returns
      (Array): Returns the picked values.
  **/

  function at(obj, paths) {
    return paths.map(path => _baseGetValue(obj, path, true, void 0))
  }

  // _.create----------------------------------------------------------------//

  /**
    * Creates an object that inherits from the prototype object.If a properties object is given, its own enumerable string keyed properties are assigned to the created object.
    * Arguments
      prototype(Object): The object to inherit from.
      [properties](Object): The properties to assign to the object.
    * Returns
      (Object): Returns the new object.
  **/

  function create(prororype, properties) {
    return Object.create(prororype, properties)
  }

  // _.defaults--------------------------------------------------------------//

  /**
    * Assigns own and inherited enumerable string keyed properties of source objects to the destination object for all destination properties that resolve to undefined.
      Source objects are applied from left to right. Once a property is set, additional values of the same property are ignored.

    * Arguments
      object(Object): The destination object.
      [sources](...Object): The source objects.
    * Returns
      (Object): Returns object.
  **/

  function defaults(obj, ...sources) {
    return _baseAssign(obj, false, true, false, void 0, sources)
  }

  // _.defaultsDeep----------------------------------------------------------//

  /**
    * This method is like _.defaults except that it recursively assigns default properties.

      Note: This method mutates object.
    * Arguments
      object(Object): The destination object.
      [sources](...Object): The source objects.
    * Returns
      (Object): Returns object.
  **/

  function defaultsDeep(obj, ...sources) {
    return _baseAssign(obj, false, true, true, void 0, sources)
  }

  // _.entries -> toPairs----------------------------------------------------//

  /**
    * Creates an array of own enumerable string keyed-value pairs for object which can be consumed by _.fromPairs. If object is a map or set, its entries are returned.
    * Arguments
      object(Object): The object to query.
    * Returns
      (Array): Returns the key - value pairs.
  **/

  function entries(obj) {
    return _entries(obj)
  }

  // _.entriesIn -> toPairsIn------------------------------------------------//

  /**
    * Creates an array of own and inherited enumerable string keyed-value pairs for object which can be consumed by _.fromPairs. If object is a map or set, its entries are returned.
    * Arguments
      object(Object): The object to query.
    * Returns
      (Array): Returns the key - value pairs.
  **/

  function entriesIn(obj) {
    if (!isObject(obj)) return []
    if (isSet(obj) || isMap(obj)) return obj.entries()
    let result = []
    let isArr = isArray(obj)
    for( let key in obj) {
      result.push([isArr ? Number(key) : key, obj[key]])
    }
    return result
  }

  // _.extend -> assignIn----------------------------------------------------//

  /**
    * This method is like _.assign except that it iterates over own and inherited source properties.

      Note: This method mutates object.
    * Arguments
      object(Object): The destination object.
      [sources](...Object): The source objects.
    * Returns
      (Object): Returns object.
  **/

  function extend(obj, ...sources) {
    return assignIn(obj, ...sources)
  }

  // _.extendWith -> assignInWith--------------------------------------------//

  /**
    * This method is like _.assignIn except that it accepts customizer which is invoked to produce the assigned values.If customizer returns undefined,
      assignment is handled by the method instead.The customizer is invoked with five arguments: (objValue, srcValue, key, object, source).

      Note: This method mutates object.
    * Arguments
      object (Object): The destination object.
      sources (...Object): The source objects.
      [customizer] (Function): The function to customize assigned values.
    * Returns
      (Object): Returns object.
  **/

  function extendWith(obj, ...sources) {
    return assignInWith(obj, ...sources)
  }

  // _.findKey---------------------------------------------------------------//

  /**
    * This method is like _.find except that it returns the key of the first element predicate returns truthy for instead of the element itself.
    * Arguments
      object (Object): The object to inspect.
      [predicate=_.identity] (Function): The function invoked per iteration.
    * Returns
      (*): Returns the key of the matched element, else undefined.
  **/

  function findKey(obj, predicate = identity) {
    predicate = _cb(predicate, DMZ, 3)
    let keys = _keys(obj)
    return keys.find(key => predicate(obj[key], key, obj))
  }

  // _.findLastKey-----------------------------------------------------------//

  /**
    * This method is like _.findKey except that it iterates over elements of a collection in the opposite order.
    * Arguments
      object (Object): The object to inspect.
      [predicate=_.identity] (Function): The function invoked per iteration.
    * Returns
      (*): Returns the key of the matched element, else undefined.
  **/

  function findLastKey(obj, predicate = identity) {
    predicate = _cb(predicate, DMZ, 3)
    let keys = _keys(obj).reverse()
    return keys.find(key => predicate(obj[key], key, obj))
  }

  // _.forIn-----------------------------------------------------------------//

  /**
    * Iterates over own and inherited enumerable string keyed properties of an object and invokes iteratee
      for each property.The iteratee is invoked with three arguments: (value, key, object).Iteratee functions may exit iteration early by explicitly returning false.
    * Arguments
      object (Object): The object to iterate over.
      [iteratee=_.identity] (Function): The function invoked per iteration.
    * Returns
      (Object): Returns object.
  **/

  function forIn(obj, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ, 3)
    let isArr = isArray(obj)
    for (let key in obj) {
      var status = iteratee(obj[key], isArr ? Number(key) : key, obj)
      if (status === false) return obj
    }
    return obj
  }

  // _.forInRight------------------------------------------------------------//

  /**
    * This method is like _.forIn except that it iterates over properties of object in the opposite order.
    * Arguments
      object (Object): The object to iterate over.
      [iteratee=_.identity] (Function): The function invoked per iteration.
    * Returns
      (Object): Returns object.
  **/

  function forInRight(obj, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ, 3)
    let isArr = isArray(obj)
    let keys = []
    for(let key in obj) {
      keys.push(key)
    }
    keys.reverse().some(key => iteratee(obj[key], isArr ? Number(key) : key, obj) === false)
    return obj
  }

  // _.forOwn----------------------------------------------------------------//

  /**
    * Iterates over own enumerable string keyed properties of an object and invokes iteratee for each property. The iteratee is
      invoked with three arguments: (value, key, object). Iteratee functions may exit iteration early by explicitly returning false.
    * Arguments
      object (Object): The object to iterate over.
      [iteratee=_.identity] (Function): The function invoked per iteration.
    * Returns
      (Object): Returns object.
  **/

  function forOwn(obj, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ, 3)
    let keys = _keys(obj)
    keys.some(key => iteratee(obj[key], key, obj) === false)
    return obj
  }

  // _.forOwnRight-----------------------------------------------------------//

  /**
    * This method is like _.forOwn except that it iterates over properties of object in the opposite order.
    * Arguments
      object (Object): The object to iterate over.
      [iteratee=_.identity] (Function): The function invoked per iteration.
    * Returns
      (Object): Returns object.
  **/

  function forOwnRight(obj, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ, 3)
    let keys = _keys(obj).reverse()
    keys.some(key => iteratee(obj[key], key, obj) === false)
    return obj
  }

  // _.functions-------------------------------------------------------------//

  /**
    * Creates an array of function property names from own enumerable properties of object.
    * Arguments
      object(Object): The object to inspect.
    * Returns
      (Array): Returns the function names.
  **/

  function functions(obj) {
    let result = []
    for(let key in obj) {
      if(obj.hasOwnProperty(key) && isFunction(obj[key])) {
        result.push(key)
      }
    }
    return result
  }

  // _.functionsIn-----------------------------------------------------------//

  /**
    * Creates an array of function property names from own and inherited enumerable properties of object.
    * Arguments
      object(Object): The object to inspect.
    * Returns
      (Array): Returns the function names.
  **/

  function functionsIn(obj) {
    let result = []
    for(let key in obj) {
      if(isFunction(obj[key])) {
        result.push(key)
      }
    }
    return result
  }

  // _.get-------------------------------------------------------------------//

  /**
    * Gets the value at path of object.If the resolved value is undefined, the defaultValue is returned in its place.
    * Arguments
      object (Object): The object to query.
      path (Array|string): The path of the property to get.
      [defaultValue] (*): The value returned for undefined resolved values.
    * Returns
      ( * ): Returns the resolved value.
  **/

  function get(obj, path, defaultValue) {
    return _baseGetValue(obj, path, true, defaultValue)
  }

  // _.has-------------------------------------------------------------------//

  /**
    * Checks if path is a direct property of object.
    * Arguments
      object(Object): The object to query.
      path(Array | string): The path to check.
    * Returns
      (boolean): Returns true if path exists, else false.
  **/

  function has(obj, path) {
    return _baseGetValue(obj, path, false, _flagSymbol) !== _flagSymbol
  }

  // _.hasIn-----------------------------------------------------------------//

  /**
    * Checks if path is a direct or inherited property of object.
    * Arguments
      object(Object): The object to query.
      path(Array | string): The path to check.
    * Returns
      (boolean): Returns true if path exists, else false.
  **/

  function hasIn(obj, path) {
    return _baseGetValue(obj, path, true, _flagSymbol) !== _flagSymbol
  }

  // _.invert----------------------------------------------------------------//

  /**
    * Creates an object composed of the inverted keys and values of object.If object contains duplicate values, subsequent values overwrite property assignments of previous values.
    * Arguments
      object(Object): The object to invert.
    * Returns
      (Object): Returns the new inverted object.
  **/

  function invert(obj) {
    let entries = _entries(obj)
    let result = {}
    entries.forEach(item => {
      if (!isObject(item[1])) {
        result[item[1]] = item[0]
      }
    })
    return result
  }

  // _.invertBy--------------------------------------------------------------//

  /**
    * This method is like _.invert except that the inverted object is generated from the results of running each element of object thru iteratee.
      The corresponding inverted value of each inverted key is an array of keys responsible for generating the inverted value. The iteratee is invoked with one argument: (value).
    * Arguments
      object(Object): The object to invert.
      [iteratee = _.identity](Function): The iteratee invoked per element.
    * Returns
      (Object): Returns the new inverted object.
  **/

  function invertBy(obj, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ, 1)
    let entries = _entries(obj)
    let result = {}
    entries.forEach(item => {
      let tmp = iteratee(item[1])
      if (!isObject(tmp)) {
        if(result.hasOwnProperty(tmp)) {
          result[tmp].push(item[0])
        } else {
          result[tmp] = [item[0]]
        }
      }
    })
    return result
  }

  // _.invoke----------------------------------------------------------------//

  /**
    * Invokes the method at path of object.
    * Arguments
      object(Object): The object to query.
      path(Array | string): The path of the method to invoke.
      [args](... * ): The arguments to invoke the method with.
    * Returns
      ( * ): Returns the result of the invoked method.
  **/

  function invoke(obj, path, ...args) {
    let pathArr = toPath(path)
    let funcName = pathArr.pop()
    let context = _baseGetValue(obj, pathArr, true, _flagSymbol)
    if (context === _flagSymbol) throw new Error('can not find value in obj')
    let func = Object.getPrototypeOf(context)[funcName]
    if (!isFunction(func)) throw new Error('invoke must be passed function names')
    return func.call(context, ...args)
  }

  // _.keys------------------------------------------------------------------//

  /**
    * Creates an array of the own enumerable property names of object.

      Note: Non - object values are coerced to objects.See the ES spec for more details.
    * Arguments
      object(Object): The object to query.
    * Returns
      (Array): Returns the array of property names.
  **/

  function keys(obj) {
    return _keys(obj)
  }

  // _.keysIn----------------------------------------------------------------//

  /**
    * Creates an array of the own and inherited enumerable property names of object.

      Note: Non - object values are coerced to objects.
    * Arguments
      object(Object): The object to query.
    * Returns
      (Array): Returns the array of property names.
  **/

  function keysIn(obj) {
    let result = []
    let isArr = isArray(obj)
    for(let key in obj) {
      result.push(isArr ? Number(key) : key)
    }
    return result
  }

  // _.mapKeys---------------------------------------------------------------//

  /**
    * The opposite of _.mapValues; this method creates an object with the same values as object and keys generated by running each own enumerable string keyed property of object thru iteratee. The iteratee is invoked with three arguments: (value, key, object).
    * Arguments
      object (Object): The object to iterate over.
      [iteratee=_.identity] (Function): The function invoked per iteration.
    * Returns
      (Object): Returns the new mapped object.
  **/

  function mapKeys(obj, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ, 3)
    let keys = _keys(obj)
    let result = {}
    keys.forEach(key => {
      let newKey = iteratee(obj[key], key, obj)
      result[newKey] = obj[key]
    })
    return result
  }

  // _.mapValues-------------------------------------------------------------//

  /**
    * Creates an object with the same keys as object and values generated by running each own enumerable string keyed property of object thru iteratee. The iteratee is invoked with three arguments:(value, key, object).
    * Arguments
      object (Object): The object to iterate over.
      [iteratee=_.identity] (Function): The function invoked per iteration.
    * Returns
      (Object): Returns the new mapped object.
  **/

  function mapValues(obj, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ, 3)
    let keys = _keys(obj)
    let result = {}
    keys.forEach(key => {
      let newVal = iteratee(obj[key], key, obj)
      result[key] = newVal
    })
    return result
  }

  // _.merge-----------------------------------------------------------------//

  /**
    * This method is like _.assign except that it recursively merges own and inherited enumerable string keyed properties of source objects into the destination object. Source properties that resolve to undefined are
      skipped if a destination value exists. Array and plain object properties are merged recursively. Other objects and value types are overridden by assignment. Source objects are applied from left to right. Subsequent sources overwrite property assignments of previous sources.

      Note: This method mutates object.
    * Arguments
      object(Object): The destination object.
      [sources](...Object): The source objects.
    * Returns
      (Object): Returns object.
  **/

  function merge(obj, ...sources) {
    return _baseAssign(obj, true, true, true, void 0, sources)
  }

  // _.mergeWith-------------------------------------------------------------//

  /**
    * This method is like _.merge except that it accepts customizer which is invoked to produce the merged values of the destination and source properties. If customizer returns undefined, merging is handled by the method instead. The customizer is invoked with six arguments:
      (objValue, srcValue, key, object, source, stack).

      Note: This method mutates object.
    * Arguments
      object (Object): The destination object.
      sources (...Object): The source objects.
      customizer (Function): The function to customize assigned values.
    * Returns
      (Object): Returns object.
  **/

  function mergeWith(obj, ...sources) {
    if (isFunction(sources[sources.length - 1])) {
      customizer = sources.pop()
    } else {
      customizer = void 0
    }
    return _baseAssign(obj, true, true, true, customizer, sources)
  }

  // _.omit------------------------------------------------------------------//

  /**
    * The opposite of _.pick; this method creates an object composed of the own and inherited enumerable property paths of object that are not omitted.

      Note: This method is considerably slower than _.pick.
    * Arguments
      object(Object): The source object.
      [paths](...(string | string[])): The property paths to omit.
    * Returns
      (Object): Returns the new object.
  **/

  function omit(obj, paths) {
    // 只考虑 普通对象和数组
    let objPaths = _baseGetPaths(obj, true)
    paths = paths.map(path => toPath(path))
    let omitPaths = objPaths.filter(objPath => !paths.some(path => isEqual(path, objPath)))
    let objValues = omitPaths.map(objPath => _baseGetValue(obj, objPath, true, _flagSymbol))
    return zipObjectDeep(omitPaths, objValues)
  }

  // _.omitBy----------------------------------------------------------------//

  /**
    * Creates an object composed of the object properties predicate returns truthy for. The predicate is invoked with two arguments: (value, key).
    * Arguments
      object (Object): The source object.
      [predicate=_.identity] (Function): The function invoked per property.
    * Returns
      (Object): Returns the new object.
  **/

  function omitBy(obj, predicate) {
    predicate = _cb(predicate, DMZ, 2)
    let paths = _baseGetPaths(obj, true)
    let values = paths.map(path => _baseGetValue(obj, path, true, void 0))
    let omitPaths = paths.filter((path, index) => predicate(values[index], path) !== true)
    let omitValues = omitPaths.map(omitPath => _baseGetValue(obj, omitPath, true, void 0))
    return zipObjectDeep(omitPaths, omitValues)

  }

  // _.pick------------------------------------------------------------------//

  /**
    * Creates an object composed of the picked object properties.
    * Arguments
      object(Object): The source object.
      [paths](...(string | string[])): The property paths to pick.
    * Returns
      (Object): Returns the new object.
  **/

  function pick(obj, paths) {
    let values = paths.map(path => _baseGetValue(obj, path, true, _flagSymbol))
    let finnalPaths = paths.slice()
    values.filter((val, index) => {
      if (val === _flagSymbol) {
        finnalPaths.splice(index, 1)
        return false
      }
      return true
    })
    return zipObjectDeep(finnalPaths, values)
  }

  // _.pickBy----------------------------------------------------------------//

  /**
    * Creates an object composed of the object properties predicate returns truthy for. The predicate is invoked with two arguments: (value, key).
    * Arguments
      object (Object): The source object.
      [predicate=_.identity] (Function): The function invoked per property.
    * Returns
      (Object): Returns the new object.
  **/

  function pickBy(obj, predicate = identity) {
    predicate = _cb(predicate, DMZ, 2)
    let paths = _baseGetPaths(obj, true)
    let values = paths.map(path => _baseGetValue(obj, path, true, void 0))
    let pickPaths = paths.filter((path, index) => predicate(values[index], path) === true)
    let pickValues = pickPaths.map(pickPath => _baseGetValue(obj, pickPath, true, void 0))
    return zipObjectDeep(pickPaths, pickValues)
  }

  // _.result----------------------------------------------------------------//

  /**
    * This method is like _.get except that if the resolved value is a function it's invoked with the this binding of its parent object and its result is returned.
    * Arguments
      object (Object): The object to query.
      path (Array|string): The path of the property to resolve.
      [defaultValue] (*): The value returned for undefined resolved values.
    * Returns
      ( * ): Returns the resolved value.
  **/

  function result(obj, path, defaultValue) {
    let tmpResult = _baseGetValue(obj, path, true, defaultValue)
    return isFunction(tmpResult) ? tmpResult.call(obj) : tmpResult
  }

  // _.set-------------------------------------------------------------------//

  /**
    * Sets the value at path of object. If a portion of path doesn't exist, it's created. Arrays are created for missing index properties while objects are created for all other missing properties. Use _.setWith to customize path creation.

      Note: This method mutates object.
    * Arguments
      object(Object): The object to modify.
      path(Array | string): The path of the property to set.
      value( * ): The value to set.
    * Returns
      (Object): Returns object.
  **/

  function set(obj, path, value) {
    return _baseAddProperty(path, value, obj)
  }

  // _.setWith---------------------------------------------------------------//

  /**
    * This method is like _.set except that it accepts customizer which is invoked to produce the objects of path.If customizer returns undefined path creation is handled by the method instead.The customizer is invoked with three arguments: (nsValue, key, nsObject).

      Note: This method mutates object.
    * Arguments
      object (Object): The object to modify.
      path (Array|string): The path of the property to set.
      value (*): The value to set.
      [customizer] (Function): The function to customize assigned values.
    * Returns
      (Object): Returns object.
  **/

  function setWith(obj, path, value, customizer) {
    return _baseAddProperty(path, value, obj, identity, customizer)
  }

  // _.toPairs---------------------------------------------------------------//

  /**
    * Creates an array of own enumerable string keyed-value pairs for object which can be consumed by _.fromPairs. If object is a map or set, its entries are returned.
    * Arguments
      object(Object): The object to query.
    * Returns
      (Array): Returns the key - value pairs.
  **/

  function toPairs(obj) {
    return _entries(obj)
  }

  // _.toPairsIn-------------------------------------------------------------//

  /**
    * Creates an array of own and inherited enumerable string keyed-value pairs for object which can be consumed by _.fromPairs. If object is a map or set, its entries are returned.
    * Arguments
      object(Object): The object to query.
    * Returns
      (Array): Returns the key - value pairs.
  **/

  function toPairsIn(obj) {
    return entriesIn(obj)
  }

  // _.transform-------------------------------------------------------------//

  /**
    * An alternative to _.reduce; this method transforms object to a new accumulator object which is the result of running each of its
      own enumerable string keyed properties thru iteratee, with each invocation potentially mutating the accumulator object. If accumulator
      is not provided, a new object with the same [[Prototype]] will be used. The iteratee is invoked with four arguments: (accumulator, value, key, object).
      Iteratee functions may exit iteration early by explicitly returning false.
    * Arguments
      object (Object): The object to iterate over.
      [iteratee=_.identity] (Function): The function invoked per iteration.
      [accumulator] (*): The custom accumulator value.
    * Returns
      ( * ): Returns the accumulated value.
  **/

  function transform(obj, iteratee = identity, initialVal) {
    iteratee = _cb(iteratee, DMZ, 4)
    let isArr = isArray(obj)
    initialVal = initialVal ? initialVal : isArr ? [] : {}
    let keys = _keys(obj)
    keys.some(key => {
      return iteratee(initialVal, obj[key], key, obj) === false
    })
    return initialVal
  }

  // _.unset-----------------------------------------------------------------//

  /**
    * Removes the property at path of object.

      Note: This method mutates object.
    * Arguments
      object(Object): The object to modify.
      path(Array | string): The path of the property to unset.
    * Returns
      (boolean): Returns true if the property is deleted, else false.
  **/

  function unset(obj, path) {
    let pathArr = toPath(path)
    let tmp = obj
    let len = pathArr.length
    return pathArr.slice(0, len - 1).every((item, index) => {
      let tmpReturn = item in root.Object(tmp)
      tmp = tmp[item]
      if (index === len - 2) {
        if (pathArr[len - 1] in root.Object(tmp)) {
          delete tmp[pathArr[len - 1]]
          return true
        }
        return false
      }
      return tmpReturn
    })
  }

  // _.update----------------------------------------------------------------//

  /**
    * This method is like _.set except that accepts updater to produce the value to set.Use _.updateWith to customize path creation.The updater is invoked with one argument: (value).

      Note: This method mutates object.
    * Arguments
      object (Object): The object to modify.
      path (Array|string): The path of the property to set.
      updater (Function): The function to produce the updated value.
    * Returns
      (Object): Returns object.
  **/

  function update(obj, path, updater = identity) {
    let val = _baseGetValue(obj, path, true, void 0)
    return _baseAddProperty(path, val, obj, updater)
  }

  // _.updateWith------------------------------------------------------------//

  /**
    * This method is like _.update except that it accepts customizer which is invoked to produce the objects of path.If customizer returns undefined path creation is
      handled by the method instead.The customizer is invoked with three arguments: (nsValue, key, nsObject).

      Note: This method mutates object.
    * Arguments
      object (Object): The object to modify.
      path (Array|string): The path of the property to set.
      updater (Function): The function to produce the updated value.
      [customizer] (Function): The function to customize assigned values.
    * Returns
      (Object): Returns object.
  **/

  function updateWith(obj, path, updater = identity, customizer) {
    let val = _baseGetValue(obj, path, true, void 0)
    return _baseAddProperty(path, val, obj, updater, customizer)
  }

  // _.values----------------------------------------------------------------//

  /**
    * Creates an array of the own enumerable string keyed property values of object.

      Note: Non - object values are coerced to objects.
    * Arguments
      object(Object): The object to query.
    * Returns
      (Array): Returns the array of property values.
  **/

  function values(obj) {
    return _values(obj)
  }

  // _.valuesIn--------------------------------------------------------------//

  /**
    * Creates an array of the own and inherited enumerable string keyed property values of object.

      Note: Non - object values are coerced to objects.
    * Arguments
      object(Object): The object to query.
    * Returns
      (Array): Returns the array of property values.
  **/

  function valuesIn(obj) {
    let result = []
    for(let key in obj) {
      result.push(obj[key])
    }
    return result
  }


  //------------------------------------Seq-------------------------------------------
  // _-----------------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.chain-----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.tap-------------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.thru------------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.prototype[Symbol.iterator]--------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.prototype.at----------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.prototype.chain-------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.prototype.commit------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.prototype.next--------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.prototype.plant-------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.prototype.reverse-----------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.prototype.toJSON -> value---------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.prototype.value-------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.prototype.valueOf -> value--------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  //------------------------------------String----------------------------------------
  // _.camelCase-------------------------------------------------------------//

  /**
    * Converts string to camel case.
    * Arguments
      [string = ''](string): The string to convert.
    * Returns
      (string): Returns the camel cased string.
  **/

  function camelCase(str = '') {
    return _baseWordSeparate(str).map((item, index) => {
      if(index === 0) return item.toLowerCase()
      return item[0].toUpperCase() + item.slice(1).toLowerCase()
    }).join('')
  }
  // _.capitalize------------------------------------------------------------//

  /**
    * Converts the first character of string to upper case and the remaining to lower case.
    * Arguments
      [string = ''](string): The string to capitalize.
    * Returns
      (string): Returns the capitalized string.
  **/

  function capitalize(str = '') {
    return str[0].toUpperCase() + str.slice(1).toLowerCase()
  }

  // _.deburr----------------------------------------------------------------//

  /**
    * Deburrs string by converting Latin - 1 Supplement and Latin Extended - A letters to basic Latin letters and removing combining diacritical marks.
    * Arguments
      [string = ''](string): The string to deburr.
    * Returns
      (string): Returns the deburred string.
  **/


  // _.endsWith--------------------------------------------------------------//

  /**
    * Checks if string ends with the given target string.
    * Arguments
      [string=''] (string): The string to inspect.
      [target] (string): The string to search for.
      [position=string.length] (number): The position to search up to.
    * Returns
      (boolean): Returns true if string ends with target, else false.
  **/

  function endsWith(string = '', target, position = string.length) {
    return string.endsWith(target, position)
  }

  // _.escape----------------------------------------------------------------//

  /**
    * Converts the characters "&", "<", ">", '"', and "'" in string to their corresponding HTML entities.

      Note: No other characters are escaped. To escape additional characters use a third-party library like he.

      Though the ">" character is escaped for symmetry, characters like ">" and "/" don't need escaping in HTML and have no special meaning unless they're part of
      a tag or unquoted attribute value. See Mathias Bynens's article (under "semi-related fun fact") for more details.

      When working with HTML you should always quote attribute values to reduce XSS vectors.
    * Arguments
      [string = ''](string): The string to escape.
    * Returns
      (string): Returns the escaped string.
  **/

  function escape(str = '') {
    return str.replace(/[&<>"']/g, $0 => _htmlEscapes[$0])
  }

  // _.escapeRegExp----------------------------------------------------------//

  /**
    * Escapes the RegExp special characters "^", "$", "", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", and "|" in string.
    * Arguments
      [string = ''](string): The string to escape.
    * Returns
      (string): Returns the escaped string.
  **/

  function escapeRegExp(str = '') {
    //"^", "$", "", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", and "|"
    return str.replace(/[\^\$\.\*\+\?\(\)\[\]\{\}\|]/g, $0 => '\\' + $0)
  }

  // _.kebabCase-------------------------------------------------------------//

  /**
    * Converts string to kebab case.
    * Arguments
      [string = ''](string): The string to convert.
    * Returns
      (string): Returns the kebab cased string.
  **/

  function kebabCase(str = '') {
    return _baseWordSeparate(str).map(item => {
      return item.toLowerCase()
    }).join('-')
  }

  // _.lowerCase-------------------------------------------------------------//

  /**
    * Converts string, as space separated words, to lower case.
    * Arguments
      [string = ''](string): The string to convert.
    * Returns
      (string): Returns the lower cased string.
  **/

  function lowerCase(str = '') {
    return _baseWordSeparate(str).map(item => {
      return item.toLowerCase()
    }).join(' ')
  }
  // _.lowerFirst------------------------------------------------------------//

  /**
    * Converts the first character of string to lower case.
    * Arguments
      [string = ''](string): The string to convert.
    * Returns
      (string): Returns the converted string.
  **/

  function lowerFirst(str = '') {
    return str[0].toLowerCase() + str.slice(1)
  }

  // _.pad-------------------------------------------------------------------//

  /**
    * Pads string on the left and right sides if it's shorter than length. Padding characters are truncated if they can't be evenly divided by length.
    * Arguments
      [string = ''](string): The string to pad.
      [length = 0](number): The padding length.
      [chars = ' '](string): The string used as padding.
    * Returns
      (string): Returns the padded string.
  **/

  function pad(str = '', targetLen = 0, chars = ' ') {
    let strLen = str.length
    let addLen = targetLen - strLen > 0 ? targetLen - strLen : 0
    if (addLen === 0) return str
    let leftLen = Math.floor(addLen / 2)
    return padEnd(padStart(str, leftLen + strLen, chars), targetLen, chars)
  }

  // _.padEnd----------------------------------------------------------------//

  /**
    * Pads string on the right side if it's shorter than length. Padding characters are truncated if they exceed length.
    * Arguments
      [string = ''](string): The string to pad.
      [length = 0](number): The padding length.
      [chars = ' '](string): The string used as padding.
    * Returns
      (string): Returns the padded string.
  **/

  function padEnd(str = '', targetLen = 0, chars = ' ') {
    return str.padEnd(targetLen, chars)
  }

  // _.padStart--------------------------------------------------------------//

  /**
    * Pads string on the left side if it's shorter than length. Padding characters are truncated if they exceed length.
    * Arguments
      [string = ''](string): The string to pad.
      [length = 0](number): The padding length.
      [chars = ' '](string): The string used as padding.
    * Returns
      (string): Returns the padded string.
  **/

  function padStart(str = '', targetLen = 0, chars = ' ') {
    return str.padStart(targetLen, chars)
  }

  // _.parseInt--------------------------------------------------------------//

  /**
    * Converts string to an integer of the specified radix. If radix is undefined or 0, a radix of 10 is used unless value is a hexadecimal, in which case a radix of 16 is used.

      Note: This method aligns with the ES5 implementation of parseInt.
    * Arguments
      string(string): The string to convert.
      [radix = 10](number): The radix to interpret value by.
    * Returns
      (number): Returns the converted integer.
  **/

  function parseInt(str, radix = 10, guard) {
    if (guard) radix = 10
    return root.parseInt(str, radix)
  }

  // _.repeat----------------------------------------------------------------//

  /**
    * Repeats the given string n times.
    * Arguments
      [string = ''](string): The string to repeat.
      [n = 1](number): The number of times to repeat the string.
    * Returns
      (string): Returns the repeated string.
  **/

  function repeat(str = '', timers = 1, guard) {
    if (guard) timers = 1
    return str.repeat(timers)
  }

  // _.replace---------------------------------------------------------------//

  /**
    * Replaces matches for pattern in string with replacement.

      Note: This method is based on String#replace.
    * Arguments
      [string = ''](string): The string to modify.
      pattern(RegExp | string): The pattern to replace.
      replacement(Function | string): The match replacement.
    * Returns
      (string): Returns the modified string.
  **/

  function replace(str = '', pattern, replacement) {
    return str.replace(pattern, replacement)
  }

  // _.snakeCase-------------------------------------------------------------//

  /**
    * Converts string to snake case.
    * Arguments
      [string = ''](string): The string to convert.
    * Returns
      (string): Returns the snake cased string.
  **/

  function snakeCase(str = '') {
    return _baseWordSeparate(str).map(item => {
      return item.toLowerCase()
    }).join('_')
  }

  // _.split-----------------------------------------------------------------//

  /**
    * Splits string by separator.

      Note: This method is based on String# split.
    * Arguments
      [string = ''](string): The string to split.
      separator(RegExp | string): The separator pattern to split by.
      [limit](number): The length to truncate results to.
    * Returns
      (Array): Returns the new array of chunks.
  **/

  function split(str = '', separator, limit) {
    return str.split(separator, limit)
  }

  // _.startCase-------------------------------------------------------------//

  /**
    * Converts string to start case.
    * Arguments
      [string = ''](string): The string to convert.
    * Returns
      (string): Returns the start cased string.
  **/

  function startCase(str = '') {
    return _baseWordSeparate(str).map(item => {
      return item[0].toUpperCase() + item.slice(1)
    }).join(' ')
  }

  // _.startsWith------------------------------------------------------------//

  /**
    * Checks if string starts with the given target string.
    * Arguments
      [string=''] (string): The string to inspect.
      [target] (string): The string to search for.
      [position=0] (number): The position to search from.
    * Returns
      (boolean): Returns true if string starts with target, else false.
  **/

  function startsWith(str = '', target, position = 0) {
    return str.startsWith(target, position)
  }

  // _.template--------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.toLower---------------------------------------------------------------//

  /**
    * Converts string, as a whole, to lower case just like String#toLowerCase.
    * Arguments
      [string = ''](string): The string to convert.
    * Returns
      (string): Returns the lower cased string.
  **/

  function toLower(str = '') {
    return str.toLowerCase()
  }

  // _.toUpper---------------------------------------------------------------//

  /**
    * Converts string, as a whole, to upper case just like String#toUpperCase.
    * Arguments
      [string = ''](string): The string to convert.
    * Returns
      (string): Returns the upper cased string.
  **/

  function toUpper(str = '') {
    return str.toUpperCase()
  }

  // _.trim------------------------------------------------------------------//

  /**
    * Removes leading and trailing whitespace or specified characters from string.
    * Arguments
      [string = ''](string): The string to trim.
      [chars = whitespace](string): The characters to trim.
    * Returns
      (string): Returns the trimmed string.
  **/

  function trim(str = '', chars = ' ', guard) {
    if (guard) chars = ' '
    if (chars === ' ') return str.trim()
    return trimStart(trimEnd(str, chars), chars)
  }

  // _.trimEnd---------------------------------------------------------------//

  /**
    * Removes trailing whitespace or specified characters from string.
    * Arguments
      [string = ''](string): The string to trim.
      [chars = whitespace](string): The characters to trim.
    * Returns
      (string): Returns the trimmed string.
  **/

  function trimEnd(str = '', chars = ' ', guard) {
    if (guard) chars = ' '
    if(chars === ' ') return str.trimRight()
    for(var i = str.length - 1; i >= 0; i--) {
      if(!chars.includes(str[i])) {
        break
      }
    }
    return i === -1 ? str : str.slice(0, i + 1)
  }

  // _.trimStart-------------------------------------------------------------//

  /**
    * Removes leading whitespace or specified characters from string.
    * Arguments
      [string = ''](string): The string to trim.
      [chars = whitespace](string): The characters to trim.
    * Returns
      (string): Returns the trimmed string.
  **/

  function trimStart(str = '', chars = ' ', guard) {
    if (guard) chars = ' '
    if(chars === ' ') return str.trimLeft()
    for(var i = 0; i < str.length; i++) {
      if(!chars.includes(str[i])) {
        break
      }
    }
    return i === str.length ? str : str.slice(i)
  }

  // _.truncate--------------------------------------------------------------//

  /**
    * Truncates string if it's longer than the given maximum string length. The last characters of the truncated string are replaced with the omission string which defaults to "...".
    * Arguments
      [string = ''](string): The string to truncate.
      [options = {}](Object): The options object.
      [options.length = 30](number): The maximum string length.
      [options.omission = '...'](string): The string to indicate text is omitted.
      [options.separator](RegExp | string): The separator pattern to truncate to.
    * Returns
      (string): Returns the truncated string.
  **/

  function truncate(str = '', options = {}) {
    let length = options['length'] || 30
    let omission = options['omission'] || '...'
    let separator = options['separator']
    let strLen = length - omission.length > 0 ? length - omission.length : 0
    if (separator === void 0) {
      return str.substr(0, strLen) + omission
    }
    let result = str.substr(0, strLen)
    let lastMatch = isRegExp(separator) ? result.match(new RegExp(separator, 'g')).pop() : separator
    return result.slice(0, result.lastIndexOf(lastMatch)) + omission
  }

  // _.unescape--------------------------------------------------------------//

  /**
    * The inverse of _.escape; this method converts the HTML entities &amp;, &lt;, &gt;, &quot;, and &#39; in string to their corresponding characters.

      Note: No other HTML entities are unescaped. To unescape additional HTML entities use a third-party library like he.
    * Arguments
      [string = ''](string): The string to unescape.
    * Returns
      (string): Returns the unescaped string.
  **/

  function unescape(str = '') {
    return str.replace(/(&amp;|&lt;|&gt;|&quot;|&#39;)/g, $0 => _htmlUnescapes[$0])
  }

  // _.upperCase-------------------------------------------------------------//

  /**
    * Converts string, as space separated words, to upper case.
    * Arguments
      [string = ''](string): The string to convert.
    * Returns
      (string): Returns the upper cased string.
  **/

  function upperCase(str = '') {
    return _baseWordSeparate(str).map(item => {
      return item.toUpperCase()
    }).join(' ')
  }

  // _.upperFirst------------------------------------------------------------//

  /**
    * Converts the first character of string to upper case.
    * Arguments
      [string = ''](string): The string to convert.
    * Returns
      (string): Returns the converted string.
  **/

  function upperFirst(str = '') {
    return str[0].toUpperCase() + str.slice(1)
  }

  // _.words-----------------------------------------------------------------//

  /**
    * Splits string into an array of its words.
    * Arguments
      [string = ''](string): The string to inspect.
      [pattern](RegExp | string): The pattern to match words.
    * Returns
      (Array): Returns the words of string.
  **/

  function words(str = '', pattern, guard) {
    if (guard || !pattern) pattern = /[a-zA-Z0-9]+/g
    return str.match(pattern)
  }

  //------------------------------------Util------------------------------------------
  // _.attempt---------------------------------------------------------------//

  /**
    * Attempts to invoke func, returning either the result or the caught error object.Any additional arguments are provided to func when it 's invoked.
    * Arguments
      func (Function): The function to attempt.
      [args] (...*): The arguments to invoke func with.
    * Returns
      ( * ): Returns the func result or error object.
  **/

  function attempt(func, ...args) {
    try {
      return func.call(DMZ, ...args)
    } catch (err) {
      return isError(err) ? err : new Error(err)
    }
  }

  // _.bindAll---------------------------------------------------------------//

  /**
    * Binds methods of an object to the object itself, overwriting the existing method.

      Note: This method doesn 't set the "length" property of bound functions.
    * Arguments
      object(Object): The object to bind and assign the bound methods to.
      methodNames(...(string | string[])): The object method names to bind.
    * Returns
      (Object): Returns object.
  **/

  function bindAll(obj, methodNames) {
    if (!methodNames) throw new Error('bindAll must be passed function names')
    methodNames = isArray(methodNames) ? methodNames : [methodNames]
    methodNames.forEach(methodName => {
      obj[methodName] = bind(obj[methodName], obj)
    })
    return obj
  }

  // _.cond------------------------------------------------------------------//

  /**
    * Creates a function that iterates over pairs and invokes the corresponding function of the first predicate to return truthy.
      The predicate-function pairs are invoked with the this binding and arguments of the created function.
    * Arguments
      pairs(Array): The predicate - function pairs.
    * Returns
      (Function): Returns the new composite function.
  **/

  function cond(pairs) {
    return function (...args) {
      let index = pairs.findIndex(pair => pair[0].call(this, ...args))
      return pairs[index][1].call(this, ...args)
    }
  }

  // _.conforms--------------------------------------------------------------//

  /**
    * Creates a function that invokes the predicate properties of source with the corresponding property values of a given object, returning true if all predicates return truthy, else false.

      Note: The created function is equivalent to _.conformsTo with source partially applied.
    * Arguments
      source(Object): The object of property predicates to conform to.
    * Returns
      (Function): Returns the new spec function.
  **/

  function conforms(source) {
    return function (obj) {
      return conformsTo(obj, source)
    }
  }

  // _.constant--------------------------------------------------------------//

  /**
    * Creates a function that returns value.
    * Arguments
      value (*): The value to return from the new function.
    * Returns
      (Function): Returns the new constant function.
  **/

  function constant(val) {
    return function () {
      return val
    }
  }

  // _.defaultTo-------------------------------------------------------------//

  /**
    * Checks value to determine whether a default value should be returned in its place. The defaultValue is returned if value is NaN, null, or undefined.
    * Arguments
      value (*): The value to check.
      defaultValue (*): The default value.
    * Returns
      ( * ): Returns the resolved value.
  **/

  function defaultTo(value, defaultValue) {
    return isNil(value) || isNaN(value) ? defaultValue : value
  }

  // _.flow------------------------------------------------------------------//

  /**
    * Creates a function that returns the result of invoking the given functions with the this binding of the created function, where each successive invocation is supplied the return value of the previous.
    * Arguments
      [funcs](...(Function | Function[])): The functions to invoke.
    * Returns
      (Function): Returns the new composite function.
  **/

  function flow(funcs) {
    return function (...args) {
      return funcs.reduce((accumulator, currentVal, index) => {
        if (index === 0) return currentVal.apply(DMZ, accumulator)
        return currentVal.call(DMZ, accumulator)
      }, args)
    }
  }

  // _.flowRight-------------------------------------------------------------//

  /**
    * This method is like _.flow except that it creates a function that invokes the given functions from right to left.
    * Arguments
      [funcs](...(Function | Function[])): The functions to invoke.
    * Returns
      (Function): Returns the new composite function.
  **/

  function flowRight(funcs) {
    return flow(funcs.reverse())
  }

  // _.identity--------------------------------------------------------------//

  /**
    * This method returns the first argument it receives.
    * Arguments
      value( * ): Any value.
    * Returns
      ( * ): Returns value.
  **/

  function identity(val) {
    return val
  }

  // _.iteratee--------------------------------------------------------------//

  /**
    * Creates a function that invokes func with the arguments of the created function. If func is a property name, the created function returns the property value for a given element.
      If func is an array or object, the created function returns true for elements that contain the equivalent source properties, otherwise it returns false.
    * Arguments
      [func = _.identity]( * ): The value to convert to a callback.
    * Returns
      (Function): Returns the callback.
  **/

  function iterate(value) {
    return _cb(value, DMZ, Infinity)
  }

  // _.matches---------------------------------------------------------------//

  /**
    * Creates a function that performs a partial deep comparison between a given object and source, returning true if the given object has equivalent property values, else false.

      Note: The created function is equivalent to _.isMatch with source partially applied.

      Partial comparisons will match empty array and empty object source values against any array or object value, respectively. See _.isEqual for a list of supported value comparisons.
    * Arguments
      source(Object): The object of property values to match.
    * Returns
      (Function): Returns the new spec function.
  **/

  function matches(source) {
    return function (obj) {
      return isMatch(obj, source)
    }
  }

  // _.matchesProperty-------------------------------------------------------//

  /**
    * Creates a function that performs a partial deep comparison between the value at path of a given object to srcValue, returning true if the object value is equivalent, else false.

      Note: Partial comparisons will match empty array and empty object srcValue values against any array or object value, respectively. See _.isEqual for a list of supported value comparisons.
    * Arguments
      path(Array | string): The path of the property to get.
      srcValue( * ): The value to match.
    * Returns
      (Function): Returns the new spec function.
  **/

  function matchesProperty(path, srcValue) {
    return _baseMatchesProperty(path, srcValue)
  }

  // _.method----------------------------------------------------------------//

  /**
    * Creates a function that invokes the method at path of a given object. Any additional arguments are provided to the invoked method.
    * Arguments
      path(Array | string): The path of the method to invoke.
      [args](... * ): The arguments to invoke the method with.
    * Returns
      (Function): Returns the new invoker function.
  **/

  function method(path, ...args) {
    let pathArr = toPath(path)
    return function (obj) {
      let func = _baseGetValue(obj, pathArr, true, void 0)
      return func.call(this, ...args)
    }
  }

  // _.methodOf--------------------------------------------------------------//

  /**
    * The opposite of _.method; this method creates a function that invokes the method at a given path of object. Any additional arguments are provided to the invoked method.
    * Arguments
      object(Object): The object to query.
      [args](... * ): The arguments to invoke the method with.
    * Returns
      (Function): Returns the new invoker function.
  **/

  function methodOf(obj, ...args) {
    return function (path) {
      let pathArr = toPath(path)
      let func = _baseGetValue(obj, pathArr, true, void 0)
      return func.call(this, ...args)
    }
  }

  // _.mixin-----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.noConflict------------------------------------------------------------//

  /**
    * Reverts the _ variable to its previous value and returns a reference to the lodash function.
    * Returns
      (Function): Returns the lodash function.
  **/

  function noConflict() {
    if (root.__ === this) {
      root.__ = _tcdian
    }
    return this
  }

  // _.noop------------------------------------------------------------------//

  /**
    * This method returns undefined.
  **/

  function noop() {
    return void 0
  }

  // _.nthArg----------------------------------------------------------------//

  /**
    * Creates a function that gets the argument at index n. If n is negative, the nth argument from the end is returned.
    * Arguments
      [n=0] (number): The index of the argument to return.
    * Returns
      (Function): Returns the new pass-thru function.
  **/

  function nthArg(n = 0) {
    return function (...args) {
      return args[n < 0 ? args.length + n : n]
    }
  }

  // _.over------------------------------------------------------------------//

  /**
    * Creates a function that invokes iteratees with the arguments it receives and returns their results.
    * Arguments
      [iteratees = [_.identity]](...(Function | Function[])): The iteratees to invoke.
    * Returns
      (Function): Returns the new function.
  **/

  function over(iteratees = [identity]) {
    return function (...args) {
      return iteratees.map(iteratee => iteratee(...args))
    }
  }

  // _.overEvery-------------------------------------------------------------//

  /**
    * Creates a function that checks if all of the predicates return truthy when invoked with the arguments it receives.
    * Arguments
      [predicates = [_.identity]](...(Function | Function[])): The predicates to check.
    * Returns
      (Function): Returns the new function.
  **/

  function overEvery(predicates = [identity]) {
    return function (...args) {
      return predicates.every(predicate => predicate(...args) === true)
    }
  }

  // _.overSome--------------------------------------------------------------//

  /**
    * Creates a function that checks if any of the predicates return truthy when invoked with the arguments it receives.
    * Arguments
      [predicates = [_.identity]](...(Function | Function[])): The predicates to check.
    * Returns
      (Function): Returns the new function.
  **/

  function overSome(predicates = [identity]) {
    return function (...args) {
      return predicates.some(predicate => predicate(...args) === true)
    }
  }

  // _.property--------------------------------------------------------------//

  /**
    * Creates a function that returns the value at path of a given object.
    * Arguments
      path(Array | string): The path of the property to get.
    * Returns
      (Function): Returns the new accessor function.
  **/

  function property(path) {
    return function (obj) {
      let result = _baseGetValue(obj, path, true, _flagSymbol)
      return result === _flagSymbol ? void 0 : result
    }
  }

  // _.propertyOf------------------------------------------------------------//

  /**
    * The opposite of _.property; this method creates a function that returns the value at a given path of object.
    * Arguments
      object(Object): The object to query.
    * Returns
      (Function): Returns the new accessor function.
  **/

  function propertyOf(obj) {
    return function (path) {
      let result = _baseGetValue(obj, path, true, _flagSymbol)
      return result === _flagSymbol ? void 0 : result
    }
  }

  // _.range-----------------------------------------------------------------//

  /**
    * Creates an array of numbers (positive and/or negative) progressing from start up to, but not including, end. A step of -1 is
      used if a negative start is specified without an end or step. If end is not specified, it's set to start with start then set to 0.

      Note: JavaScript follows the IEEE-754 standard for resolving floating-point values which can produce unexpected results.
    * Arguments
      [start = 0](number): The start of the range.
      end(number): The end of the range.
      [step = 1](number): The value to increment or decrement by.
    * Returns
      (Array): Returns the range of numbers.
  **/

  function range(start, end, step) {
    let endBoundary = end !== void 0 ? end : start
    let startBoundary = end !== void 0 ? start : 0
    step = step !== void 0
      ? step
      : endBoundary > startBoundary ? 1 : -1
    if (endBoundary > startBoundary && step === 0) {
      return new Array(endBoundary - startBoundary).fill(startBoundary)
    }
    if ((endBoundary - startBoundary) * step <= 0) return []
    let result = []
    if (endBoundary > startBoundary) {
      for (let i = startBoundary; i < endBoundary; i += step) {
        result.push(i)
      }
    } else {
      for(let i = startBoundary; i > endBoundary; i += step) {
        result.push(i)
      }
    }
    return result
  }

  // _.rangeRight------------------------------------------------------------//

  /**
    * This method is like _.range except that it populates values in descending order.
    * Arguments
      [start = 0](number): The start of the range.
      end(number): The end of the range.
      [step = 1](number): The value to increment or decrement by.
    * Returns
      (Array): Returns the range of numbers.
  **/

  function rangeRight(start, end, step) {
    return range(start, end, step).reverse()
  }

  // _.runInContext----------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.stubArray-------------------------------------------------------------//

  /**
    * This method returns a new empty array.
    * Returns
      (Array): Returns the new empty array.
  **/

  function stubArray() {
    return []
  }

  // _.stubFalse-------------------------------------------------------------//

  /**
    * This method returns false.
    * Returns
      (boolean): Returns false.
  **/

  function stubFalse() {
    return false
  }

  // _.stubObject------------------------------------------------------------//

  /**
    * This method returns a new empty object.
    * Returns
      (Object): Returns the new empty object.
  **/

  function stubObject() {
    return {}
  }

  // _.stubString------------------------------------------------------------//

  /**
    * This method returns an empty string.
    * Returns
      (string): Returns the empty string.
  **/

  function stubString() {
    return ''
  }

  // _.stubTrue--------------------------------------------------------------//

  /**
    * This method returns true.
    * Returns
      (boolean): Returns true.
  **/

  function stubTrue() {
    return true
  }

  // _.times-----------------------------------------------------------------//

  /**
    * Invokes the iteratee n times, returning an array of the results of each invocation. The iteratee is invoked with one argument; (index).
    * Arguments
      n (number): The number of times to invoke iteratee.
      [iteratee=_.identity] (Function): The function invoked per iteration.
    * Returns
      (Array): Returns the array of results.
  **/

  function times(n, iteratee = identity) {
    iteratee = _cb(iteratee, DMZ, 1)
    let result = map(new Array(n), (val, index) => index)
    return result.map(item => iteratee(item))
  }

  // _.toPath----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  function toPath(val) {
    if(isSymbol(val)) return [val]
    if(isArray(val)) return val
    return toString(val).split(/[\[\]\.]+/).filter(it => it !== '')
  }
  // _.uniqueId--------------------------------------------------------------//

  /**
    * Generates a unique ID.If prefix is given, the ID is appended to it.
    * Arguments
      [prefix = ''](string): The value to prefix the ID with.
    * Returns
      (string): Returns the unique ID.
  **/

  function uniqueId(prefix) {
    return toString(prefix) + idCounter++
  }

  //------------------------------------Properties------------------------------------
  // _.VERSION---------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.templateSettings------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.templateSettings.escape-----------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.templateSettings.evaluate---------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.templateSettings.imports----------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.templateSettings.interpolate------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.templateSettings.variable---------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  //------------------------------------Methods---------------------------------------
  // _.templateSettings.imports._--------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  //_.parseJson ----------------------------------------------
  //简易json解析器
  function parseJson(jsonStr) {
    var index = 0

    function typeParse(jsonStr) {
      if (jsonStr[index] === '{') {
        return parseObject(jsonStr)
      } else if (jsonStr[index] === '[') {
        return parseArray(jsonStr)
      } else if (jsonStr[index] === 'n') {
        return parseNull(jsonStr)
      } else if (jsonStr[index] === 't') {
        return parseTrue(jsonStr)
      } else if (jsonStr[index] === 'f') {
        return parseFalse(jsonStr)
      } else if (jsonStr[index] === '"') {
        return parseString(jsonStr)
      } else {
        return parseNumber(jsonStr)
      }
    }

    function parseObject(jsonStr) {
      index++
      var part = {}
      while (jsonStr[index] !== '}') {
        var key = typeParse(jsonStr)
        index++
        var val = typeParse(jsonStr)
        part[key] = val
        if (jsonStr[index] === '}') {
          index++
          break
        }
        index++
      }
      return part
    }

    function parseArray(jsonStr) {
      index++
      var part = []
      while (jsonStr[index] !== ']') {
        if (jsonStr[index] === ',') {
          index++
        } else {
          part.push(typeParse(jsonStr))
        }
      }
      index++
      return part
    }

    function parseNull(jsonStr) {
      var part = jsonStr.substr(index, 4)
      if (part === 'null') {
        index += 4
        return null
      } else {
        throw new Error('found Error at' + index)
      }
    }

    function parseTrue(jsonStr) {
      var part = jsonStr.substr(index, 4)
      if (part === 'true') {
        index += 4
        return true
      } else {
        throw new Error('found Error at' + index)
      }
    }

    function parseFalse(jsonStr) {
      var part = jsonStr.substr(index, 5)
      if (part === 'false') {
        index += 5
        return false
      } else {
        throw new Error('found Error at' + index)
      }
    }

    function parseString(jsonStr) {
      var part = ''
      index++
      while (jsonStr[index] !== '"') {
        part += jsonStr[index]
        index++
      }
      index++
      return part
    }

    function parseNumber(jsonStr) {
      var part = ''
      while (isNumberChar(jsonStr[index])) {
        part += jsonStr[index]
        index++
      }
      return parseFloat(part)
    }

    function isNumberChar(char) {
      //[0-9.+\-e]/i.test(undefined) === true
      return !!char ? (/[0-9.+\-e]/i.test(char)) : false
    }
    return typeParse(jsonStr)
  }

  return {
    //------------------------------------Array-----------------------------------------
    /* _.chunk-------------------------------- */
    chunk,
    /* _.compact------------------------------ */
    compact,
    /* _.concat------------------------------- */
    concat,
    /* _.difference--------------------------- */
    difference,
    /* _.differenceBy------------------------- */
    differenceBy,
    /* _.differenceWith----------------------- */
    differenceWith,
    /* _.drop--------------------------------- */
    drop,
    /* _.dropRight---------------------------- */
    dropRight,
    /* _.dropRightWhile----------------------- */
    dropRightWhile,
    /* _.dropWhile---------------------------- */
    dropWhile,
    /* _.fill--------------------------------- */
    fill,
    /* _.findIndex---------------------------- */
    findIndex,
    /* _.findLastIndex------------------------ */
    findLastIndex,
    /* _.first - > head----------------------- */
    first,
    /* _.flatten------------------------------ */
    flatten,
    /* _.flattenDeep-------------------------- */
    flattenDeep,
    /* _.flattenDepth------------------------- */
    flattenDepth,
    /* _.fromPairs---------------------------- */
    fromPairs,
    /* _.head--------------------------------- */
    head,
    /* _.indexOf------------------------------ */
    indexOf,
    /* _.initial------------------------------ */
    initial,
    /* _.intersection------------------------- */
    intersection,
    /* _.intersectionBy----------------------- */
    intersectionBy,
    /* _.intersectionWith--------------------- */
    intersectionWith,
    /* _.join--------------------------------- */
    join,
    /* _.last--------------------------------- */
    last,
    /* _.lastIndexOf-------------------------- */
    lastIndexOf,
    /* _.nth---------------------------------- */
    nth,
    /* _.pull--------------------------------- */
    pull,
    /* _.pullAll------------------------------ */
    pullAll,
    /* _.pullAllBy---------------------------- */
    pullAllBy,
    /* _.pullAllWith-------------------------- */
    pullAllWith,
    /* _.pullAt------------------------------- */
    pullAt,
    /* _.remove------------------------------- */
    remove,
    /* _.reverse------------------------------ */
    reverse,
    /* _.slice-------------------------------- */
    slice,
    /* _.sortedIndex-------------------------- */
    sortedIndex,
    /* _.sortedIndexBy------------------------ */
    sortedIndexBy,
    /* _.sortedIndexOf------------------------ */
    sortedIndexOf,
    /* _.sortedLastIndex---------------------- */
    sortedLastIndex,
    /* _.sortedLastIndexBy-------------------- */
    sortedLastIndexBy,
    /* _.sortedLastIndexOf-------------------- */
    sortedLastIndexOf,
    /* _.sortedUniq--------------------------- */
    sortedUniq,
    /* _.sortedUniqBy------------------------- */
    sortedUniqBy,
    /* _.tail--------------------------------- */
    tail,
    /* _.take--------------------------------- */
    take,
    /* _.takeRight---------------------------- */
    takeRight,
    /* _.takeRightWhile----------------------- */
    takeRightWhile,
    /* _.takeWhile---------------------------- */
    takeWhile,
    /* _.union-------------------------------- */
    union,
    /* _.unionBy------------------------------ */
    unionBy,
    /* _.unionWith---------------------------- */
    unionWith,
    /* _.uniq--------------------------------- */
    uniq,
    /* _.uniqBy------------------------------- */
    uniqBy,
    /* _.uniqWith----------------------------- */
    uniqWith,
    /* _.unzip-------------------------------- */
    unzip,
    /* _.unzipWith---------------------------- */
    unzipWith,
    /* _.without------------------------------ */
    without,
    /* _.xor---------------------------------- */
    xor,
    /* _.xorBy-------------------------------- */
    xorBy,
    /* _.xorWith------------------------------ */
    xorWith,
    /* _.zip---------------------------------- */
    zip,
    /* _.zipObject---------------------------- */
    zipObject,
    /* _.zipObjectDeep------------------------ */
    zipObjectDeep,
    /* _.zipWith------------------------------ */
    zipWith,
    //------------------------------------Collection------------------------------------
    /* _.countBy------------------------------ */
    countBy,
    /* _.each -> forEach---------------------- */
    each,
    /* _.eachRight -> forEachRight------------ */
    eachRight,
    /* _.every-------------------------------- */
    every,
    /* _.filter------------------------------- */
    filter,
    /* _.find--------------------------------- */
    find,
    /* _.findLast----------------------------- */
    findLast,
    /* _.flatMap------------------------------ */
    flatMap,
    /* _.flatMapDeep-------------------------- */
    flatMapDeep,
    /* _.flatMapDepth------------------------- */
    flatMapDepth,
    /* _.forEach------------------------------ */
    forEach,
    /* _.forEachRight------------------------- */
    forEachRight,
    /* _.groupBy------------------------------ */
    groupBy,
    /* _.includes----------------------------- */
    includes,
    /* _.invokeMap---------------------------- */
    invokeMap,
    /* _.keyBy-------------------------------- */
    keyBy,
    /* _.map---------------------------------- */
    map,
    /* _.orderBy------------------------------ */
    orderBy,
    /* _.partition---------------------------- */
    partition,
    /* _.reduce------------------------------- */
    reduce,
    /* _.reduceRight-------------------------- */
    reduceRight,
    /* _.reject------------------------------- */
    reject,
    /* _.sample------------------------------- */
    sample,
    /* _.sampleSize--------------------------- */
    sampleSize,
    /* _.shuffle------------------------------ */
    shuffle,
    /* _.size--------------------------------- */
    size,
    /* _.some--------------------------------- */
    some,
    /* _.sortBy------------------------------- */
    sortBy,
    //------------------------------------Date------------------------------------------
    /* _.now---------------------------------- */
    now,
    //------------------------------------Function--------------------------------------
    /* _.after-------------------------------- */
    after,
    /* _.ary---------------------------------- */
    ary,
    /* _.before------------------------------- */
    before,
    /* _.bind--------------------------------- */
    bind,
    /* _.bindKey------------------------------ */
    bindKey,
    /* _.curry-------------------------------- */
    curry,
    /* _.curryRight--------------------------- */
    curryRight,
    /* _.debounce----------------------------- */
    /* _.defer-------------------------------- */
    defer,
    /* _.delay-------------------------------- */
    delay,
    /* _.flip--------------------------------- */
    flip,
    /* _.memoize------------------------------ */
    memoize,
    /* _.negate------------------------------- */
    negate,
    /* _.once--------------------------------- */
    once,
    /* _.overArgs----------------------------- */
    overArgs,
    /* _.partial------------------------------ */
    partial,
    /* _.partialRight------------------------- */
    partialRight,
    /* _.rearg-------------------------------- */
    rearg,
    /* _.rest--------------------------------- */
    rest,
    /* _.spread------------------------------- */
    spread,
    /* _.throttle----------------------------- */
    /* _.unary-------------------------------- */
    unary,
    /* _.wrap--------------------------------- */
    wrap,
    //------------------------------------Lang------------------------------------------
    /* _.castArray---------------------------- */
    castArray,
    /* _.clone-------------------------------- */
    clone,
    /* _.cloneDeep---------------------------- */
    cloneDeep,
    /* _.cloneDeepWith------------------------ */
    cloneDeepWith,
    /* _.cloneWith---------------------------- */
    cloneWith,
    /* _.conformsTo--------------------------- */
    conformsTo,
    /* _.eq----------------------------------- */
    eq,
    /* _.gt----------------------------------- */
    gt,
    /* _.gte---------------------------------- */
    gte,
    /* _.isArguments-------------------------- */
    isArguments,
    /* _.isArray------------------------------ */
    isArray,
    /* _.isArrayBuffer------------------------ */
    isArrayBuffer,
    /* _.isArrayLike-------------------------- */
    isArrayLike,
    /* _.isArrayLikeObject-------------------- */
    isArrayLikeObject,
    /* _.isBoolean---------------------------- */
    isBoolean,
    /* _.isBuffer----------------------------- */
    /* _.isDate------------------------------- */
    isDate,
    /* _.isElement---------------------------- */
    isElement,
    /* _.isEmpty------------------------------ */
    isEmpty,
    /* _.isEqual------------------------------ */
    isEqual,
    /* _.isEqualWith-------------------------- */
    isEqualWith,
    /* _.isError------------------------------ */
    isError,
    /* _.isFinite----------------------------- */
    isFinite,
    /* _.isFunction--------------------------- */
    isFunction,
    /* _.isInteger---------------------------- */
    isInteger,
    /* _.isLength----------------------------- */
    isLength,
    /* _.isMap-------------------------------- */
    isMap,
    /* _.isMatch------------------------------ */
    isMatch,
    /* _.isMatchWith-------------------------- */
    isMatchWith,
    /* _.isNaN-------------------------------- */
    isNaN,
    /* _.isNative----------------------------- */
    isNative,
    /* _.isNil-------------------------------- */
    isNil,
    /* _.isNull------------------------------- */
    isNull,
    /* _.isNumber----------------------------- */
    isNumber,
    /* _.isObject----------------------------- */
    isObject,
    /* _.isObjectLike------------------------- */
    isObjectLike,
    /* _.isPlainObject------------------------ */
    isPlainObject,
    /* _.isRegExp----------------------------- */
    isRegExp,
    /* _.isSafeInteger------------------------ */
    isSafeInteger,
    /* _.isSet-------------------------------- */
    isSet,
    /* _.isString----------------------------- */
    isString,
    /* _.isSymbol----------------------------- */
    isSymbol,
    /* _.isTypedArray------------------------- */
    isTypedArray,
    /* _.isUndefined-------------------------- */
    isUndefined,
    /* _.isWeakMap---------------------------- */
    isWeakMap,
    /* _.isWeakSet---------------------------- */
    isWeakSet,
    /* _.lt----------------------------------- */
    lt,
    /* _.lte---------------------------------- */
    lte,
    /* _.toArray------------------------------ */
    toArray,
    /* _.toFinite----------------------------- */
    toFinite,
    /* _.toInteger---------------------------- */
    toInteger,
    /* _.toLength----------------------------- */
    toLength,
    /* _.toNumber----------------------------- */
    toNumber,
    /* _.toPlainObject------------------------ */
    toPlainObject,
    /* _.toSafeInteger------------------------ */
    toSafeInteger,
    /* _.toString----------------------------- */
    toString,
    //------------------------------------Math------------------------------------------
    /* _.add---------------------------------- */
    add,
    /* _.ceil--------------------------------- */
    ceil,
    /* _.divide------------------------------- */
    divide,
    /* _.floor-------------------------------- */
    floor,
    /* _.max---------------------------------- */
    max,
    /* _.maxBy-------------------------------- */
    maxBy,
    /* _.mean--------------------------------- */
    mean,
    /* _.meanBy------------------------------- */
    meanBy,
    /* _.min---------------------------------- */
    min,
    /* _.minBy-------------------------------- */
    minBy,
    /* _.multiply----------------------------- */
    multiply,
    /* _.round-------------------------------- */
    round,
    /* _.subtract----------------------------- */
    subtract,
    /* _.sum---------------------------------- */
    sum,
    /* _.sumBy-------------------------------- */
    sumBy,
    //------------------------------------Number----------------------------------------
    /* _.clamp-------------------------------- */
    clamp,
    /* _.inRange------------------------------ */
    inRange,
    /* _.random------------------------------- */
    random,
    //------------------------------------Object----------------------------------------
    /* _.assign------------------------------- */
    assign,
    /* _.assignIn----------------------------- */
    assignIn,
    /* _.assignInWith------------------------- */
    assignInWith,
    /* _.assignWith--------------------------- */
    assignWith,
    /* _.at----------------------------------- */
    at,
    /* _.create------------------------------- */
    create,
    /* _.defaults----------------------------- */
    defaults,
    /* _.defaultsDeep------------------------- */
    defaultsDeep,
    /* _.entries -> toPairs------------------- */
    entries,
    /* _.entriesIn -> toPairsIn--------------- */
    entriesIn,
    /* _.extend -> assignIn------------------- */
    extend,
    /* _.extendWith -> assignInWith----------- */
    extendWith,
    /* _.findKey------------------------------ */
    findKey,
    /* _.findLastKey-------------------------- */
    findLastKey,
    /* _.forIn-------------------------------- */
    forIn,
    /* _.forInRight--------------------------- */
    forInRight,
    /* _.forOwn------------------------------- */
    forOwn,
    /* _.forOwnRight-------------------------- */
    forOwnRight,
    /* _.functions---------------------------- */
    functions,
    /* _.functionsIn-------------------------- */
    functionsIn,
    /* _.get---------------------------------- */
    get,
    /* _.has---------------------------------- */
    has,
    /* _.hasIn-------------------------------- */
    hasIn,
    /* _.invert------------------------------- */
    invert,
    /* _.invertBy----------------------------- */
    invertBy,
    /* _.invoke------------------------------- */
    invoke,
    /* _.keys--------------------------------- */
    keys,
    /* _.keysIn------------------------------- */
    keysIn,
    /* _.mapKeys------------------------------ */
    mapKeys,
    /* _.mapValues---------------------------- */
    mapValues,
    /* _.merge-------------------------------- */
    merge,
    /* _.mergeWith---------------------------- */
    mergeWith,
    /* _.omit--------------------------------- */
    omit,
    /* _.omitBy------------------------------- */
    omitBy,
    /* _.pick--------------------------------- */
    pick,
    /* _.pickBy------------------------------- */
    pickBy,
    /* _.result------------------------------- */
    result,
    /* _.set---------------------------------- */
    set,
    /* _.setWith------------------------------ */
    setWith,
    /* _.toPairs------------------------------ */
    toPairs,
    /* _.toPairsIn---------------------------- */
    toPairsIn,
    /* _.transform---------------------------- */
    transform,
    /* _.unset-------------------------------- */
    unset,
    /* _.update------------------------------- */
    update,
    /* _.updateWith--------------------------- */
    updateWith,
    /* _.values------------------------------- */
    values,
    /* _.valuesIn----------------------------- */
    valuesIn,
    //------------------------------------Seq-------------------------------------------
    /* _-------------------------------------- */
    /* _.chain-------------------------------- */
    /* _.tap---------------------------------- */
    /* _.thru--------------------------------- */
    /* _.prototype[Symbol.iterator]----------- */
    /* _.prototype.at------------------------- */
    /* _.prototype.chain---------------------- */
    /* _.prototype.commit--------------------- */
    /* _.prototype.next----------------------- */
    /* _.prototype.plant---------------------- */
    /* _.prototype.reverse-------------------- */
    /* _.prototype.toJSON -> value------------ */
    /* _.prototype.value---------------------- */
    /* _.prototype.valueOf -> value----------- */
    //------------------------------------String----------------------------------------
    /* _.camelCase---------------------------- */
    camelCase,
    /* _.capitalize--------------------------- */
    capitalize,
    /* _.deburr------------------------------- */
    /* _.endsWith----------------------------- */
    endsWith,
    /* _.escape------------------------------- */
    escape,
    /* _.escapeRegExp------------------------- */
    escapeRegExp,
    /* _.kebabCase---------------------------- */
    kebabCase,
    /* _.lowerCase---------------------------- */
    lowerCase,
    /* _.lowerFirst--------------------------- */
    lowerFirst,
    /* _.pad---------------------------------- */
    pad,
    /* _.padEnd------------------------------- */
    padEnd,
    /* _.padStart----------------------------- */
    padStart,
    /* _.parseInt----------------------------- */
    parseInt,
    /* _.repeat------------------------------- */
    repeat,
    /* _.replace------------------------------ */
    replace,
    /* _.snakeCase---------------------------- */
    snakeCase,
    /* _.split-------------------------------- */
    split,
    /* _.startCase---------------------------- */
    startCase,
    /* _.startsWith--------------------------- */
    startsWith,
    /* _.template----------------------------- */
    /* _.toLower------------------------------ */
    toLower,
    /* _.toUpper------------------------------ */
    toUpper,
    /* _.trim--------------------------------- */
    trim,
    /* _.trimEnd------------------------------ */
    trimEnd,
    /* _.trimStart---------------------------- */
    trimStart,
    /* _.truncate----------------------------- */
    truncate,
    /* _.unescape----------------------------- */
    unescape,
    /* _.upperCase---------------------------- */
    upperCase,
    /* _.upperFirst--------------------------- */
    upperFirst,
    /* _.words-------------------------------- */
    words,
    //------------------------------------Util------------------------------------------
    /* _.attempt------------------------------ */
    attempt,
    /* _.bindAll------------------------------ */
    bindAll,
    /* _.cond--------------------------------- */
    cond,
    /* _.conforms----------------------------- */
    conforms,
    /* _.constant----------------------------- */
    constant,
    /* _.defaultTo---------------------------- */
    defaultTo,
    /* _.flow--------------------------------- */
    flow,
    /* _.flowRight---------------------------- */
    flowRight,
    /* _.identity----------------------------- */
    identity,
    /* _.iteratee----------------------------- */
    iterate,
    /* _.matches------------------------------ */
    matches,
    /* _.matchesProperty---------------------- */
    matchesProperty,
    /* _.method------------------------------- */
    method,
    /* _.methodOf----------------------------- */
    methodOf,
    /* _.mixin-------------------------------- */
    /* _.noConflict--------------------------- */
    noConflict,
    /* _.noop--------------------------------- */
    noop,
    /* _.nthArg------------------------------- */
    nthArg,
    /* _.over--------------------------------- */
    over,
    /* _.overEvery---------------------------- */
    overEvery,
    /* _.overSome----------------------------- */
    overSome,
    /* _.property----------------------------- */
    property,
    /* _.propertyOf--------------------------- */
    propertyOf,
    /* _.range-------------------------------- */
    range,
    /* _.rangeRight--------------------------- */
    rangeRight,
    /* _.runInContext------------------------- */
    /* _.stubArray---------------------------- */
    stubArray,
    /* _.stubFalse---------------------------- */
    stubFalse,
    /* _.stubObject--------------------------- */
    stubObject,
    /* _.stubString--------------------------- */
    stubString,
    /* _.stubTrue----------------------------- */
    stubTrue,
    /* _.times-------------------------------- */
    times,
    /* _.toPath------------------------------- */
    toPath,
    /* _.uniqueId----------------------------- */
    uniqueId,
    //------------------------------------Properties------------------------------------
    /* _.VERSION------------------------------ */
    /* _.templateSettings--------------------- */
    /* _.templateSettings.escape-------------- */
    /* _.templateSettings.evaluate------------ */
    /* _.templateSettings.imports------------- */
    /* _.templateSettings.interpolate--------- */
    /* _.templateSettings.variable------------ */
    //------------------------------------Methods---------------------------------------
    /* _.templateSettings.imports._----------- */
    //parseJson
    parseJson
  }
}) ()

//测试用
if(window._ === void 0) _ = tcdian