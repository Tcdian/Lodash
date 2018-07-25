var tcdian = window.__ = (function () {

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
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }

  // Used to map HTML entities to characters.
  var htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  }

  // Demilitarized zone
  var DMZ = Object.create(null)

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
      let funcLen = func.length
      let separator = 0
      let argsList = new Array(Math.max(0, funcLen - partivals.length)).fill(__).concat(partivals)
      let finalArgs = argsList.map(item => {
        if (item === __) return args[separator++]
        return item
      }).concat(args.slice(separator))
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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.ceil------------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.divide----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.floor-----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.max-------------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.meanBy----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.min-------------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.round-----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.subtract--------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.sum-------------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    return Object.assign(obj, ...sources)
  }

  // _.assignIn--------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.assignInWith----------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.assignWith------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.defaults--------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.defaultsDeep----------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.entries -> toPairs----------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.entriesIn -> toPairsIn------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.extend -> assignIn----------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.extendWith -> assignInWith--------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.functionsIn-----------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.get-------------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.has-------------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.hasIn-----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.invert----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.mergeWith-------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.toPairsIn-------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.capitalize------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.deburr----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.endsWith--------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.escape----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.escapeRegExp----------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.kebabCase-------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.lowerCase-------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.lowerFirst------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.pad-------------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.padEnd----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.padStart--------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.parseInt--------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.repeat----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.replace---------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.snakeCase-------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.split-----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.startCase-------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.startsWith------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.toUpper---------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.trim------------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.trimEnd---------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.trimStart-------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.upperCase-------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.upperFirst------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.words-----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  //------------------------------------Util------------------------------------------
  // _.attempt---------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.bindAll---------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.defaultTo-------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.flow------------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.flowRight-------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.matchesProperty-------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.noop------------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.nthArg----------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.propertyOf------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.stubFalse-------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.stubObject------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.stubString------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

  // _.stubTrue--------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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

  // function toPath(val) {
  //   if(isSymbol(val)) return [val]
  //   if(isArray(val)) return val
  //   return toString(val).split(/[\[\]\.]+/).filter(it => it !== '')
  // }
  // _.uniqueId--------------------------------------------------------------//

  /**
    * description
    * Arguments
      array(Array): The
    * Returns
      (Array): Returns the new array of chunks.
  **/

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
    /* _.ceil--------------------------------- */
    /* _.divide------------------------------- */
    /* _.floor-------------------------------- */
    /* _.max---------------------------------- */
    /* _.maxBy-------------------------------- */
    /* _.mean--------------------------------- */
    /* _.meanBy------------------------------- */
    /* _.min---------------------------------- */
    /* _.minBy-------------------------------- */
    /* _.multiply----------------------------- */
    /* _.round-------------------------------- */
    /* _.subtract----------------------------- */
    /* _.sum---------------------------------- */
    /* _.sumBy-------------------------------- */
    //------------------------------------Number----------------------------------------
    /* _.clamp-------------------------------- */
    /* _.inRange------------------------------ */
    /* _.random------------------------------- */
    //------------------------------------Object----------------------------------------
    /* _.assign------------------------------- */
    assign,
    /* _.assignIn----------------------------- */
    /* _.assignInWith------------------------- */
    /* _.assignWith--------------------------- */
    /* _.at----------------------------------- */
    /* _.create------------------------------- */
    /* _.defaults----------------------------- */
    /* _.defaultsDeep------------------------- */
    /* _.entries -> toPairs------------------- */
    /* _.entriesIn -> toPairsIn--------------- */
    /* _.extend -> assignIn------------------- */
    /* _.extendWith -> assignInWith----------- */
    /* _.findKey------------------------------ */
    /* _.findLastKey-------------------------- */
    /* _.forIn-------------------------------- */
    /* _.forInRight--------------------------- */
    /* _.forOwn------------------------------- */
    /* _.forOwnRight-------------------------- */
    /* _.functions---------------------------- */
    /* _.functionsIn-------------------------- */
    /* _.get---------------------------------- */
    /* _.has---------------------------------- */
    /* _.hasIn-------------------------------- */
    /* _.invert------------------------------- */
    /* _.invertBy----------------------------- */
    /* _.invoke------------------------------- */
    /* _.keys--------------------------------- */
    keys,
    /* _.keysIn------------------------------- */
    /* _.mapKeys------------------------------ */
    /* _.mapValues---------------------------- */
    /* _.merge-------------------------------- */
    /* _.mergeWith---------------------------- */
    /* _.omit--------------------------------- */
    /* _.omitBy------------------------------- */
    /* _.pick--------------------------------- */
    /* _.pickBy------------------------------- */
    /* _.result------------------------------- */
    /* _.set---------------------------------- */
    /* _.setWith------------------------------ */
    /* _.toPairs------------------------------ */
    /* _.toPairsIn---------------------------- */
    /* _.transform---------------------------- */
    /* _.unset-------------------------------- */
    /* _.update------------------------------- */
    /* _.updateWith--------------------------- */
    /* _.values------------------------------- */
    values,
    /* _.valuesIn----------------------------- */
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
    /* _.capitalize--------------------------- */
    /* _.deburr------------------------------- */
    /* _.endsWith----------------------------- */
    /* _.escape------------------------------- */
    /* _.escapeRegExp------------------------- */
    /* _.kebabCase---------------------------- */
    /* _.lowerCase---------------------------- */
    /* _.lowerFirst--------------------------- */
    /* _.pad---------------------------------- */
    /* _.padEnd------------------------------- */
    /* _.padStart----------------------------- */
    /* _.parseInt----------------------------- */
    /* _.repeat------------------------------- */
    /* _.replace------------------------------ */
    /* _.snakeCase---------------------------- */
    /* _.split-------------------------------- */
    /* _.startCase---------------------------- */
    /* _.startsWith--------------------------- */
    /* _.template----------------------------- */
    /* _.toLower------------------------------ */
    /* _.toUpper------------------------------ */
    /* _.trim--------------------------------- */
    /* _.trimEnd------------------------------ */
    /* _.trimStart---------------------------- */
    /* _.truncate----------------------------- */
    /* _.unescape----------------------------- */
    /* _.upperCase---------------------------- */
    /* _.upperFirst--------------------------- */
    /* _.words-------------------------------- */
    //------------------------------------Util------------------------------------------
    /* _.attempt------------------------------ */
    /* _.bindAll------------------------------ */
    /* _.cond--------------------------------- */
    /* _.conforms----------------------------- */
    conforms,
    /* _.constant----------------------------- */
    /* _.defaultTo---------------------------- */
    /* _.flow--------------------------------- */
    /* _.flowRight---------------------------- */
    /* _.identity----------------------------- */
    identity,
    /* _.iteratee----------------------------- */
    /* _.matches------------------------------ */
    /* _.matchesProperty---------------------- */
    /* _.method------------------------------- */
    /* _.methodOf----------------------------- */
    /* _.mixin-------------------------------- */
    /* _.noConflict--------------------------- */
    /* _.noop--------------------------------- */
    /* _.nthArg------------------------------- */
    /* _.over--------------------------------- */
    /* _.overEvery---------------------------- */
    /* _.overSome----------------------------- */
    /* _.property----------------------------- */
    /* _.propertyOf--------------------------- */
    /* _.range-------------------------------- */
    /* _.rangeRight--------------------------- */
    /* _.runInContext------------------------- */
    /* _.stubArray---------------------------- */
    /* _.stubFalse---------------------------- */
    /* _.stubObject--------------------------- */
    /* _.stubString--------------------------- */
    /* _.stubTrue----------------------------- */
    /* _.times-------------------------------- */
    /* _.toPath------------------------------- */
    /* _.uniqueId----------------------------- */
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