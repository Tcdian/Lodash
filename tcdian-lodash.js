var tcdian = (function () {

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

  // _optimizeCb//
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
  function compact(arr) {
    return arr.filter(val => !!identity(val))
  }

  // _.concat----------------------------------------------------------------//
  function concat(arr, ...others) {
    return arr.concat(...others)
  }

  // _.difference------------------------------------------------------------//
  function difference(arr, ...others) {
    let compareArr = flatten(others)
    return arr.filter(val => !compareArr.includes(val))
  }

  // _.differenceBy----------------------------------------------------------//
  // _.differenceWith--------------------------------------------------------//
  // _.drop------------------------------------------------------------------//
  function drop(arr, n = 1) {
    let startIndex = n < 0 ? 0 : n
    return arr.slice(startIndex)
  }

  // _.dropRight-------------------------------------------------------------//
  function dropRight(arr, n = 1) {
    let endIndex = arr.length - Math.floor(n)
    endIndex = endIndex < 0 ? 0 : endIndex
    return arr.slice(0, endIndex)
  }

  // _.dropRightWhile--------------------------------------------------------//
  // _.dropWhile-------------------------------------------------------------//
  // _.fill------------------------------------------------------------------//
  function fill(arr, value, start = 0, end = arr.length) {
    for(let i = start; i < end; i++) {
      arr[i] = value
    }
    return arr
  }

  // _.findIndex-------------------------------------------------------------//
  // _.findLastIndex---------------------------------------------------------//
  // _.first - > head--------------------------------------------------------//
  function first(arr) {
    return (arr && arr.length) ? arr[0] : void 0
  }
  // _.flatten---------------------------------------------------------------//
  function flatten(arr) {
    return flattenDepth(arr, 1)
  }

  // _.flattenDeep-----------------------------------------------------------//
  function flattenDeep(arr) {
    return flattenDepth(arr, Infinity)
  }

  // _.flattenDepth----------------------------------------------------------//
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
  function fromPairs(pairs) {
    let len = pairs == null ? 0 : pairs.length
    let result = {}
    for(let i = 0; i < len; i++) {
      result[pairs[i][0]] = pairs[i][1]
    }
    return result
  }

  // _.head------------------------------------------------------------------//
  function head(arr) {
    return first(arr)
  }

  // _.indexOf---------------------------------------------------------------//
  function indexOf(arr, val, fromIndex = 0) {
    return arr.indexOf(val, fromIndex)
  }

  // _.initial---------------------------------------------------------------//
  function initial(arr) {
    let len = arr == null ? 0 : arr.length
    return len ? arr.slice(0, len - 1) : []
  }

  // _.intersection----------------------------------------------------------//
  function intersection(...arrays) {
    let result = []
    let initialArr = arrays[0]
    let otherArrs = arrays.slice(1)
    return initialArr.filter((item, index, collection) => {
      return collection.indexOf(item) === index && otherArrs.every(otherArr => otherArr.includes(item))
    })
  }

  // _.intersectionBy--------------------------------------------------------//
  // _.intersectionWith------------------------------------------------------//
  // _.join------------------------------------------------------------------//
  function join(arr, separator = ',') {
    return arr == null ? '' : arr.join(separator)
  }

  // _.last------------------------------------------------------------------//
  function last(arr) {
    return (arr && arr.length) ? arr[arr.length - 1] : void 0
  }

  // _.lastIndexOf-----------------------------------------------------------//
  function lastIndexOf(arr, val, fromIndex = arr.length - 1) {
    return arr.lastIndexOf(val, fromIndex)
  }

  // _.nth-------------------------------------------------------------------//
  function nth(arr, n = 0) {
    return (arr && arr.length) ? arr[n < 0 ? arr.length + n: n] : void 0
  }

  // _.pull------------------------------------------------------------------//
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
  function pullAll(arr, values) {
    return pull(arr, ...values)
  }

  // _.pullAllBy-------------------------------------------------------------//
  // _.pullAllWith-----------------------------------------------------------//
  // _.pullAt----------------------------------------------------------------//
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
  // _.reverse---------------------------------------------------------------//
  function reverse(arr) {
    return arr == null ? array : arr.reverse()
  }

  // _.slice-----------------------------------------------------------------//
  function slice(arr, start = 0, end = arr.length) {
    return arr.slice(start, end)
  }

  // _.sortedIndex-----------------------------------------------------------//
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
  // _.sortedIndexOf---------------------------------------------------------//
  function sortedIndexOf(arr, val) {
    let index =sortedIndex(arr, val)
    return arr[index] === val ? index : -1
  }

  // _.sortedLastIndex-------------------------------------------------------//
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
  // _.sortedLastIndexOf-----------------------------------------------------//
  function sortedLastIndexOf(arr, val) {
    let index = sortedLastIndex(arr, val) - 1
    return arr[index] === val ? index : -1
  }

  // _.sortedUniq------------------------------------------------------------//
  function sortedUniq(arr) {
    return arr.filter((item, index, collection) => item !== collection[index - 1])
  }

  // _.sortedUniqBy----------------------------------------------------------//
  // _.tail------------------------------------------------------------------//
  function tail(arr) {
    let len = arr == null ? 0 : arr.length
    return len ? arr.slice(1, len) : []
  }

  // _.take------------------------------------------------------------------//
  function take(arr, n = 1) {
    return (arr && arr.length) ? arr.slice(0, n < 0 ? 0 : n) : []
  }

  // _.takeRight-------------------------------------------------------------//
  function takeRight(arr, n = 1) {
    return (arr && arr.length) ? arr.slice(arr.length - n < 0 ? 0 : arr.length - n, arr.length) : []
  }

  // _.takeRightWhile--------------------------------------------------------//
  // _.takeWhile-------------------------------------------------------------//
  // _.union-----------------------------------------------------------------//
  function union(...arrays) {
    return uniq(flatten(arrays))
  }

  // _.unionBy---------------------------------------------------------------//
  // _.unionWith-------------------------------------------------------------//
  // _.uniq------------------------------------------------------------------//
  function uniq(arr) {
    return arr.filter((item, index, collection) => collection.indexOf(item) === index)
  }

  // _.uniqBy----------------------------------------------------------------//
  // _.uniqWith--------------------------------------------------------------//
  // _.unzip-----------------------------------------------------------------//
  function unzip(arr) {
    return zip(...arr)
  }

  // _.unzipWith-------------------------------------------------------------//
  // _.without---------------------------------------------------------------//
  function without(arr, ...values) {
    return difference(arr, values)
  }

  // _.xor-------------------------------------------------------------------//
  function xor(...arrays) {
    let flatArr = flatten(arrays.map(arr => {
      return arr.filter((item, index, collection) => collection.indexOf(item) === index)
    }))
    let compareArr = flatArr.filter((item, index, collection) => collection.indexOf(item) !== index)
    return flatArr.filter(item => !compareArr.includes(item))
  }

  // _.xorBy-----------------------------------------------------------------//
  // _.xorWith---------------------------------------------------------------//
  // _.zip-------------------------------------------------------------------//
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
  function zipObject(props = [], values = []) {
    let result = {}
    for(let i = 0; i < props.length; i++) {
      result[props[i]] = values[i]
    }
    return result
  }

  // _.zipObjectDeep---------------------------------------------------------//
  function zipObjectDeep(props = [], value = []) {

  }

  // _.zipWith---------------------------------------------------------------//
  //------------------------------------Collection------------------------------------
  //------------------------------------Date------------------------------------------
  //------------------------------------Function--------------------------------------
  //------------------------------------Lang------------------------------------------
  // _.castArray-------------------------------------------------------------//
  // _.clone-----------------------------------------------------------------//
  // _.cloneDeep-------------------------------------------------------------//
  // _.cloneDeepWith---------------------------------------------------------//
  // _.cloneWith-------------------------------------------------------------//
  // _.conformsTo------------------------------------------------------------//
  // _.eq--------------------------------------------------------------------//
  // _.gt--------------------------------------------------------------------//
  // _.gte-------------------------------------------------------------------//
  // _.isArguments-----------------------------------------------------------//
  function isArguments(obj) {
    return _objectProto.toString.call(obj) === _typeMap.Arguments
  }

  // _.isArray---------------------------------------------------------------//
  function isArray(obj) {
    return Array.isArray ? Array.isArray(obj) : _objectProto.toString.call(obj) === _typeMap.Array
  }

  // _.isArrayBuffer---------------------------------------------------------//
  function isArrayBuffer(obj) {
    return _objectProto.toString.call(obj) === _typeMap.ArrayBuffer
  }

  // _.isArrayLike-----------------------------------------------------------//
  function isArrayLike(obj) {
    let len = obj['length']
    return !isFunction(obj) && len >= 0 && len <= Number.MAX_SAFE_INTEGER
  }

  // _.isArrayLikeObject-----------------------------------------------------//
  function isArrayLikeObject(obj) {
    return isArrayLike(obj) && isObjectLike(obj)
  }

  // _.isBoolean-------------------------------------------------------------//
  function isBoolean(obj) {
    return _objectProto.toString.call(obj) === _typeMap.Boolean
  }

  // _.isBuffer--------------------------------------------------------------//
  // _.isDate----------------------------------------------------------------//
  function isDate(obj) {
    return _objectProto.toString.call(obj) === _typeMap.Date
  }
  // _.isElement-------------------------------------------------------------//
  function isElement(obj) {
    return !!(obj && obj.nodeType === 1)
  }

  // _.isEmpty---------------------------------------------------------------//
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

  // .isEqual---------------------------------------------------------------//
  // .isEqualWith-----------------------------------------------------------//
  // _.isError---------------------------------------------------------------//
  function isError(obj) {
    return _objectProto.toString.call(obj) === _typeMap.Error
  }

  // _.isFinite--------------------------------------------------------------//
  function isFinite(obj) {
    return Number.isFinite(obj)
  }

  // _.isFunction------------------------------------------------------------//
  function isFunction(obj) {
    return _objectProto.toString.call(obj) === _typeMap.Function
  }

  // _.isInteger-------------------------------------------------------------//
  function isInteger(obj) {
    return Number.isInteger(obj)
  }

  // _.isLength--------------------------------------------------------------//
  function isLength(obj) {
    return Number.isSafeInteger(obj) && obj >= 0
  }

  // _.isMap-----------------------------------------------------------------//
  function isMap(obj) {
    return _objectProto.toString.call(obj) === _typeMap.Map
  }

  // _.isMatch---------------------------------------------------------------//
  // _.isMatchWith-----------------------------------------------------------//
  // _.isNaN-----------------------------------------------------------------//
  function isNaN(obj) {
    return isNumber(obj) && obj != +obj
  }

  // _.isNative--------------------------------------------------------------//
  function isNative(obj) {
    return isFunction(obj) && /\[native code\]/.test('' + obj)
  }

  // _.isNil-----------------------------------------------------------------//
  function isNil(obj) {
    return obj == void 0
  }

  // _.isNull----------------------------------------------------------------//
  function isNull(obj) {
    return _objectProto.toString.call(obj) === _typeMap.Null
  }

  // _.isNumber--------------------------------------------------------------//
  function isNumber(obj) {
    return _objectProto.toString.call(obj) === _typeMap.Number
  }

  // _.isObject--------------------------------------------------------------//
  function isObject(obj) {
    let type = typeof obj
    return !isNull(obj) && (type == 'object' || type == 'function')
  }

  // _.isObjectLike----------------------------------------------------------//
  function isObjectLike (obj) {
    return !isNull(obj) && typeof obj == 'object'
  }

  // _.isPlainObject---------------------------------------------------------//
  function isPlainObject(obj) {
    let proto = Object.getPrototypeOf(obj)
    return proto === null || proto === Object.prototype
  }

  // _.isRegExp--------------------------------------------------------------//
  function isRegExp(obj) {
    return _objectProto.toString.call(obj) === _typeMap.RegExp
  }

  // _.isSafeInteger---------------------------------------------------------//
  function isSafeInteger(obj) {
    return Number.isSafeInteger(obj)
  }

  // _.isSet-----------------------------------------------------------------//
  function isSet(obj) {
    return _objectProto.toString.call(obj) === _typeMap.Set
  }

  // _.isString--------------------------------------------------------------//
  function isString(obj) {
    return _objectProto.toString.call(obj) === _typeMap.String
  }

  // _.isSymbol--------------------------------------------------------------//
  function isSymbol(obj) {
    return _objectProto.toString.call(obj) === _typeMap.Symbol
  }

  // _.isTypedArray----------------------------------------------------------//
  function isTypedArray(obj) {
    return /\[object Uint(8|16|32)Array\]/.test(Object.prototype.toString.call(obj))
  }

  // _.isUndefined-----------------------------------------------------------//
  function isUndefined(obj) {
    return obj === void 0
  }

  // _.isWeakMap-------------------------------------------------------------//
  function isWeakMap(obj) {
    return isObjectLike(obj) && _objectProto.toString.call(obj) === _typeMap.WeakMap
  }

  // _.isWeakSet-------------------------------------------------------------//
  function isWeakSet(obj) {
    return isObjectLike(obj) && _objectProto.toString.call(obj) === _typeMap.WeakSet
  }

  // _.lt--------------------------------------------------------------------//
  // _.lte-------------------------------------------------------------------//
  // _.toArray---------------------------------------------------------------//
  // _.toFinite--------------------------------------------------------------//
  // _.toInteger-------------------------------------------------------------//
  // _.toLength--------------------------------------------------------------//
  // _.toNumber--------------------------------------------------------------//
  // _.toPlainObject---------------------------------------------------------//
  // _.toSafeInteger---------------------------------------------------------//
  // _.toString--------------------------------------------------------------//
  //------------------------------------Math------------------------------------------
  //------------------------------------Number----------------------------------------
  //------------------------------------Object----------------------------------------
  //------------------------------------Seq-------------------------------------------
  //------------------------------------String----------------------------------------
  //------------------------------------Util------------------------------------------
  // _.attempt---------------------------------------------------------------//
  // _.bindAll---------------------------------------------------------------//
  // _.cond------------------------------------------------------------------//
  // _.conforms--------------------------------------------------------------//
  // _.constant--------------------------------------------------------------//
  // _.defaultTo-------------------------------------------------------------//
  // _.flow------------------------------------------------------------------//
  // _.flowRight-------------------------------------------------------------//
  // _.identity--------------------------------------------------------------//
  function identity(val) {
    return val
  }

  // _.iteratee--------------------------------------------------------------//
  // _.matches---------------------------------------------------------------//
  // _.matchesProperty-------------------------------------------------------//
  // _.method----------------------------------------------------------------//
  // _.methodOf--------------------------------------------------------------//
  // _.mixin-----------------------------------------------------------------//
  // _.noConflict------------------------------------------------------------//
  // _.noop------------------------------------------------------------------//
  // _.nthArg----------------------------------------------------------------//
  // _.over------------------------------------------------------------------//
  // _.overEvery-------------------------------------------------------------//
  // _.overSome--------------------------------------------------------------//
  // _.property--------------------------------------------------------------//
  // _.propertyOf------------------------------------------------------------//
  // _.range-----------------------------------------------------------------//
  // _.rangeRight------------------------------------------------------------//
  // _.runInContext----------------------------------------------------------//
  // _.stubArray-------------------------------------------------------------//
  // _.stubFalse-------------------------------------------------------------//
  // _.stubObject------------------------------------------------------------//
  // _.stubString------------------------------------------------------------//
  // _.stubTrue--------------------------------------------------------------//
  // _.times-----------------------------------------------------------------//
  // _.toPath----------------------------------------------------------------//
  // function toPath(val) {
  //   if(isSymbol(val)) return [val]
  //   if(isArray(val)) return val
  //   return toString(val).split(/[\[\]\.]+/).filter(it => it !== '')
  // }
  // _.uniqueId--------------------------------------------------------------//
  //------------------------------------Properties------------------------------------
  //------------------------------------Methods---------------------------------------
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
    //------------------------------------Lang------------------------------------------
    /* _.castArray---------------------------- */
    /* _.clone-------------------------------- */
    /* _.cloneDeep---------------------------- */
    /* _.cloneDeepWith------------------------ */
    /* _.cloneWith---------------------------- */
    /* _.conformsTo--------------------------- */
    /* _.eq----------------------------------- */
    /* _.gt----------------------------------- */
    /* _.gte---------------------------------- */
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
    /* _.lte---------------------------------- */
    /* _.toArray------------------------------ */
    /* _.toFinite----------------------------- */
    /* _.toInteger---------------------------- */
    /* _.toLength----------------------------- */
    /* _.toNumber----------------------------- */
    /* _.toPlainObject------------------------ */
    /* _.toSafeInteger------------------------ */
    /* _.toString----------------------------- */
    //------------------------------------Util------------------------------------------
    /* _.attempt------------------------------ */
    /* _.bindAll------------------------------ */
    /* _.cond--------------------------------- */
    /* _.conforms----------------------------- */
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
  }
}) ()

//测试用
if(window._ === void 0) _ = tcdian