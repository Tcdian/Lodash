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
          let customizeResult = customizer(obj[key], value, key, obj, items)
          if (customizeResult) value = customizeResult
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

  // _baseGet
  function _baseGet(obj, path, prototypeChain, defaultValue) {
    let pathArr = toPath(path)
    let result = obj
    let flag = pathArr.every(item => {
      let tmpResult = prototypeChain && (item in result) || result.hasOwnProperty(item)
      result = result[item]
      return tmpResult
    })
    return flag ? result : defaultValue
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

  // _cb
  function _cb(value, context, argCount) {
    if (isNil(value)) return identity
    if (isFunction(value)) return _optimizeCb(value, context, argCount)
    if (isObject(value)) {
      return isArray(value)
    }
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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.differenceWith--------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.dropWhile-------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.findLastIndex---------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    let result = []
    let initialArr = arrays[0]
    let otherArrs = arrays.slice(1)
    return initialArr.filter((item, index, collection) => {
      return collection.indexOf(item) === index && otherArrs.every(otherArr => otherArr.includes(item))
    })
  }

  // _.intersectionBy--------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.intersectionWith------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.pullAllWith-----------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.reverse---------------------------------------------------------------//

  /**
    * Reverses array so that the first element becomes the last, the second element becomes the second to last, and so on.

      Note: This method mutates array and is based on Array# reverse.
    * Arguments
      array(Array): The array to modify.
    * Returns
      (Array): Returns array.
  **/

  function reverse(arr) {
    return arr == null ? array : arr.reverse()
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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    return (arr && arr.length) ? arr.slice(arr.length - n < 0 ? 0 : arr.length - n, arr.length) : []
  }

  // _.takeRightWhile--------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.takeWhile-------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.unionWith-------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    return arr.filter((item, index, collection) => collection.indexOf(item) === index)
  }

  // _.uniqBy----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.uniqWith--------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    let flatArr = flatten(arrays.map(arr => {
      return arr.filter((item, index, collection) => collection.indexOf(item) === index)
    }))
    let compareArr = flatArr.filter((item, index, collection) => collection.indexOf(item) !== index)
    return flatArr.filter(item => !compareArr.includes(item))
  }

  // _.xorBy-----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.xorWith---------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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

  }

  // _.zipWith---------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  //------------------------------------Collection------------------------------------
  // _.countBy---------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.each - > forEach------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.eachRight - > forEachRight--------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.every-----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.filter----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.find------------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.findLast--------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.flatMap---------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.flatMapDeep-----------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.flatMapDepth----------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.forEach---------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.forEachRight----------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.groupBy---------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.keyBy-----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.map-------------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.orderBy---------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.partition-------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.reduce----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.reduceRight-----------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.reject----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    let values = Object.values(collection)
    //洗牌算法
    let len = values.length
    for (let i = 0; i < len - 1; i++) {
      let randomIndex = Math.floor(Math.random() * (len - i)) + i
      exchange(values, i, randomIndex)
    }

    function exchange(arr, x, y) {
      let tmp = arr[x]
      arr[x] = arr[y]
      arr[y] = tmp
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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.sortBy----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * Creates a function that accepts arguments of func and either invokes func returning its result, if at least arity number of arguments have been provided, or returns a function that accepts the remaining func arguments, and so on. The arity of func may be specified if func.length is not sufficient.

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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

  function clone(value) {
    if (!isObject(value)) {
      return value
    }
    if (isElement(value) || isFunction(value) || isWeakMap(value) || isWeakSet(value) || isError(value) || _objectProto.toString.call(value) === _typeMap.HTMLCollection) {
      return {}
    }
    if (isArray(value) || isTypedArray(value) || isArrayBuffer(value) || isArguments(value)) {
      return _arrayProto.slice.call(value)
    }
    if (isMap(value)) {
      let result = new Map()
      value.forEach((item, key) => {
        result.set(key, item)
      })
      return result
    }
    if(isSet(value)) {
      return new Set(value)
    }
    let result = Object.create(Object.getPrototypeOf(value))
    return Object.assign(result, value)
  }

  // _.cloneDeep-------------------------------------------------------------//

  /**
    * This method is like _.clone except that it recursively clones value.
    * Arguments
      value( * ): The value to recursively clone.
    * Returns
      ( * ): Returns the deep cloned value.
  **/

  function cloneDeep(value) {
    if (!isObject(value)) {
      return value
    }
    if (isElement(value) || isFunction(value) || isWeakMap(value) || isWeakSet(value) || isError(value) || _objectProto.toString.call(value) === _typeMap.HTMLCollection) {
      return {}
    }
    if (isTypedArray(value) || isArrayBuffer(value)) {
      return _arrayProto.slice.call(value)
    }
    if (isArray(value) || isArguments(value)) {
      return _arrayProto.map.call(value, item => cloneDeep(item))
    }
    if (isMap(value)) {
      let map = new Map()
      value.forEach((item, key) => {
        map.set(cloneDeep(key), cloneDeep(item))
      })
      return map
    }
    if (isSet(value)) {
      let set = new Set()
      value.forEach(item => {
        set.add(cloneDeep(item))
      })
      return set
    }
    let obj = Object.create(Object.getPrototypeOf(value))
    Object.keys(value).forEach(key => {
      obj[key] = _.cloneDeep(value[key])
    })
    return obj
  }

  // _.cloneDeepWith---------------------------------------------------------//
  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.cloneWith-------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    return Object.keys(source).every(item => source[item].call(DMZ, obj[item]))
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
    return Object.keys(obj).length === 0
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

  function isEqual(value, other) {
    if (_objectProto.toString.call(value) != _objectProto.toString.call(other)) {
      return false
    }
    if (!isObject(value) || isFunction(value) || _objectProto.toString.call(value) === _typeMap.DOMException) {
      return eq(value, other)
    }
    if (isTypedArray(value) || isArrayBuffer(value) || isArray(value)) {
      return value.length === other.length ? value.every((item, index) => isEqual(item, other[index])) : false
    }
    if (isSet(value) || isMap(value)) {
      if(value.size !== other.size) return false
      let valueKeys = Array.from(value.keys())
      let otherKeys = Array.from(other.keys())
      return valueKeys.every(key => {
        for(let i = 0; i < otherKeys.length; i++) {
          if (isEqual(key, otherKeys[i])) {
            return isEqual(value[key], other[otherKeys[i]])
          }
        }
        return false
      })
    }
    let valueKeys = Object.keys(value)
    let otherKeys = Object.keys(other)
    return valueKeys.length === otherKeys.length && valueKeys.every(key => isEqual(value[key], other[key]))
  }

  // .isEqualWith------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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

      Note: This method can't reliably detect native functions in the presence of the core-js package because core-js circumvents this kind of detection. Despite multiple requests, the core-js maintainer has made it clear: any attempt to fix the detection will be obstructed. As a result, we're left with little choice but to throw an error. Unfortunately, this also affects packages, like babel-polyfill, which rely on core-js.
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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  //------------------------------------Number----------------------------------------
  // _.clamp-----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.inRange---------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.random----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * This method is like _.assignIn except that it accepts customizer which is invoked to produce the assigned values.If customizer returns undefined, assignment is handled by the method instead.The customizer is invoked with five arguments: (objValue, srcValue, key, object, source).

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
    * This method is like _.assign except that it accepts customizer which is invoked to produce the assigned values.If customizer returns undefined, assignment is handled by the method instead.The customizer is invoked with five arguments: (objValue, srcValue, key, object, source).

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    if (!isObject(obj)) return []
    if (isSet(obj) || isMap(obj)) return obj.entries()
    return Object.entries(obj)
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
    for( let key in obj) {
      result.push([key, obj[key]])
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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.findLastKey-----------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.forIn-----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.forInRight------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.forOwn----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.forOwnRight-----------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    return _baseGet(obj, path, true, defaultValue)
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
    return _baseGet(obj, path, false, _flagSymbol) !== _flagSymbol
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
    return _baseGet(obj, path, true, _flagSymbol) !== _flagSymbol
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
    let pairs = Object.entries(obj)
    let result = Object.create(Object.getPrototypeOf(obj))
    pairs.forEach(pair => {
      if (!isObject(pair[1])) {
        result[pair[1]] = pair[0]
      }
    })
    return result
  }

  // _.invertBy--------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    let context = _baseGet(obj, pathArr, true, _flagSymbol)
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
    return Object.keys(obj)
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
    for(let key in obj) {
      result.push(key)
    }
    return result
  }

  // _.mapKeys---------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.mapValues-------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.omitBy----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.pick------------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.pickBy----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.result----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.set-------------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.setWith---------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.toPairs---------------------------------------------------------------//

  /**
    * Creates an array of own enumerable string keyed-value pairs for object which can be consumed by _.fromPairs. If object is a map or set, its entries are returned.
    * Arguments
      object(Object): The object to query.
    * Returns
      (Array): Returns the key - value pairs.
  **/

  function toPairs(obj) {
    return entries(obj)
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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.unset-----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.update----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.updateWith------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    return Object.values(obj)
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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * Creates a function that returns the value at path of a given object.
    * Arguments
      path(Array | string): The path of the property to get.
    * Returns
      (Function): Returns the new accessor function.
  **/

  // _.method----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.methodOf--------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.overEvery-------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.overSome--------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
      let result = _baseGet(obj, path, true, _flagSymbol)
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
      let result = _baseGet(obj, path, true, _flagSymbol)
      return result === _flagSymbol ? void 0 : result
    }
  }

  // _.range-----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.rangeRight------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    /* _.differenceWith----------------------- */
    /* _.drop--------------------------------- */
    drop,
    /* _.dropRight---------------------------- */
    dropRight,
    /* _.dropRightWhile----------------------- */
    /* _.dropWhile---------------------------- */
    /* _.fill--------------------------------- */
    fill,
    /* _.findIndex---------------------------- */
    /* _.findLastIndex------------------------ */
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
    /* _.intersectionWith--------------------- */
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
    /* _.pullAllWith-------------------------- */
    /* _.pullAt------------------------------- */
    pullAt,
    /* _.remove------------------------------- */
    /* _.reverse------------------------------ */
    reverse,
    /* _.slice-------------------------------- */
    slice,
    /* _.sortedIndex-------------------------- */
    sortedIndex,
    /* _.sortedIndexBy------------------------ */
    /* _.sortedIndexOf------------------------ */
    sortedIndexOf,
    /* _.sortedLastIndex---------------------- */
    sortedLastIndex,
    /* _.sortedLastIndexBy-------------------- */
    /* _.sortedLastIndexOf-------------------- */
    sortedLastIndexOf,
    /* _.sortedUniq--------------------------- */
    sortedUniq,
    /* _.sortedUniqBy------------------------- */
    /* _.tail--------------------------------- */
    tail,
    /* _.take--------------------------------- */
    take,
    /* _.takeRight---------------------------- */
    takeRight,
    /* _.takeRightWhile----------------------- */
    /* _.takeWhile---------------------------- */
    /* _.union-------------------------------- */
    union,
    /* _.unionBy------------------------------ */
    /* _.unionWith---------------------------- */
    /* _.uniq--------------------------------- */
    uniq,
    /* _.uniqBy------------------------------- */
    /* _.uniqWith----------------------------- */
    /* _.unzip-------------------------------- */
    unzip,
    /* _.unzipWith---------------------------- */
    /* _.without------------------------------ */
    without,
    /* _.xor---------------------------------- */
    xor,
    /* _.xorBy-------------------------------- */
    /* _.xorWith------------------------------ */
    /* _.zip---------------------------------- */
    zip,
    /* _.zipObject---------------------------- */
    zipObject,
    /* _.zipObjectDeep------------------------ */
    // zipObjectDeep,
    /* _.zipWith------------------------------ */
    //------------------------------------Collection------------------------------------
    /* _.countBy------------------------------ */
    /* _.each -> forEach---------------------- */
    /* _.eachRight -> forEachRight------------ */
    /* _.every-------------------------------- */
    /* _.filter------------------------------- */
    /* _.find--------------------------------- */
    /* _.findLast----------------------------- */
    /* _.flatMap------------------------------ */
    /* _.flatMapDeep-------------------------- */
    /* _.flatMapDepth------------------------- */
    /* _.forEach------------------------------ */
    /* _.forEachRight------------------------- */
    /* _.groupBy------------------------------ */
    /* _.includes----------------------------- */
    includes,
    /* _.invokeMap---------------------------- */
    /* _.keyBy-------------------------------- */
    /* _.map---------------------------------- */
    /* _.orderBy------------------------------ */
    /* _.partition---------------------------- */
    /* _.reduce------------------------------- */
    /* _.reduceRight-------------------------- */
    /* _.reject------------------------------- */
    /* _.sample------------------------------- */
    sample,
    /* _.sampleSize--------------------------- */
    sampleSize,
    /* _.shuffle------------------------------ */
    shuffle,
    /* _.size--------------------------------- */
    size,
    /* _.some--------------------------------- */
    /* _.sortBy------------------------------- */
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
    //------------------------------------Lang------------------------------------------
    /* _.castArray---------------------------- */
    castArray,
    /* _.clone-------------------------------- */
    clone,
    /* _.cloneDeep---------------------------- */
    cloneDeep,
    /* _.cloneDeepWith------------------------ */
    /* _.cloneWith---------------------------- */
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
    /* _.mean--------------------------------- */
    mean,
    /* _.meanBy------------------------------- */
    /* _.min---------------------------------- */
    min,
    /* _.minBy-------------------------------- */
    /* _.multiply----------------------------- */
    multiply,
    /* _.round-------------------------------- */
    round,
    /* _.subtract----------------------------- */
    subtract,
    /* _.sum---------------------------------- */
    sum,
    /* _.sumBy-------------------------------- */
    //------------------------------------Number----------------------------------------
    /* _.clamp-------------------------------- */
    /* _.inRange------------------------------ */
    /* _.random------------------------------- */
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
    /* _.findLastKey-------------------------- */
    /* _.forIn-------------------------------- */
    /* _.forInRight--------------------------- */
    /* _.forOwn------------------------------- */
    /* _.forOwnRight-------------------------- */
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
    /* _.invoke------------------------------- */
    invoke,
    /* _.keys--------------------------------- */
    keys,
    /* _.keysIn------------------------------- */
    keysIn,
    /* _.mapKeys------------------------------ */
    /* _.mapValues---------------------------- */
    /* _.merge-------------------------------- */
    merge,
    /* _.mergeWith---------------------------- */
    mergeWith,
    /* _.omit--------------------------------- */
    /* _.omitBy------------------------------- */
    /* _.pick--------------------------------- */
    /* _.pickBy------------------------------- */
    /* _.result------------------------------- */
    /* _.set---------------------------------- */
    /* _.setWith------------------------------ */
    /* _.toPairs------------------------------ */
    toPairs,
    /* _.toPairsIn---------------------------- */
    toPairsIn,
    /* _.transform---------------------------- */
    /* _.unset-------------------------------- */
    /* _.update------------------------------- */
    /* _.updateWith--------------------------- */
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
    /* _.matches------------------------------ */
    matches,
    /* _.matchesProperty---------------------- */
    /* _.method------------------------------- */
    /* _.methodOf----------------------------- */
    /* _.mixin-------------------------------- */
    /* _.noConflict--------------------------- */
    noConflict,
    /* _.noop--------------------------------- */
    noop,
    /* _.nthArg------------------------------- */
    nthArg,
    /* _.over--------------------------------- */
    /* _.overEvery---------------------------- */
    /* _.overSome----------------------------- */
    /* _.property----------------------------- */
    property,
    /* _.propertyOf--------------------------- */
    propertyOf,
    /* _.range-------------------------------- */
    /* _.rangeRight--------------------------- */
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
  }
}) ()

//测试用
if(window._ === void 0) _ = tcdian