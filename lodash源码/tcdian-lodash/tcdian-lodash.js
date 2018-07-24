;
(function() {
  // Baseline setup
  //----------------------

  //将全局this 赋值给 局部root
  var root = this

  var previous_ = root.__

  //empty 对象
  var emptyObj = Object.create(null)

  //将_ 变量暴露给全局
  var _ = {}

  self.tcdian = self.__ = _

  // ----------------------------------Array---------------------------------------Array

  //_.chunk ------------------------------------------- 1
  _.chunk = function(arr, size = 1) {
    if (size <= 0) {
      throw new Error('size must greater than 0')
    }
    var result = []
    for (let i = 0, len = arr.length; i < len; i += size) {
      var tmp = arr.slice(i, i + size)
      result.push(tmp)
    }
    return result
  }

  //_.compact ----------------------------------------- 2
  _.compact = function(arr) {
    return arr.filter(val => !!val)
  }

  //_.concat ------------------------------------------ 3
  _.concat = function(arr, ...others) {
    return arr.concat(...others)
  }

  //_.difference ----------------------------------------- 4
  _.difference = function(arr, ...others) {
    var compareArr = [].concat(_.flatten(others))
    return arr.filter(it => !compareArr.includes(it))
  }

  //_.differenceBy -------------------------------------------5
  _.differenceBy = function(arr, values, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 1)
    return arr.filter(it => !values.some(val => iteratee(val) === iteratee(it)))
  }

  //_.differenceWith ------------------------------------------6
  _.differenceWith = function(arr, values, comparator) {
    return arr.filter(it => !values.some(val => comparator.call(emptyObj, it, val)))
  }

  //_.drop -----------------------------------------------7
  _.drop = function(arr, num = 1) {
    return arr.slice(Math.max(0, num))
  }

  //_.dropRight -------------------------------------------8
  _.dropRight = function(arr, num = 1) {
    return arr.slice(0, Math.max(0, arr.length - num))
  }

  //_.dropRightWhile ------------------------------------------9
  _.dropRightWhile = function(arr, predicate) {
    var iteratee = _cb(predicate, emptyObj, 3)
    var pos
    for (let i = arr.length - 1; i >= 0; i--) {
      if (!iteratee(arr[i], i, arr)) {
        pos = i
        break
      }
    }
    return arr.slice(0, pos + 1)
  }

  //_.dropWhile ------------------------------------------10
  _.dropWhile = function(arr, predicate) {
    var iteratee = _cb(predicate, emptyObj, 3)
    return arr.slice(arr.findIndex((item, index, collection) => !iteratee(item, index, collection)))
  }

  //_.fill -----------------------------------------------11
  _.fill = function(arr, val, start = 0, end = arr.length) {
    for (let i = start; i < end; i++) {
      arr[i] = val
    }
    return arr
  }

  // _.findIndex ------------------------------------------12
  _.findIndex = function(arr, predicate, fromIndex) {
    var iteratee = _cb(predicate, emptyObj, 3)
    var pos
    fromIndex = fromIndex === void 0 ? 0 : fromIndex
    for (let i = fromIndex; i < arr.length; i++) {
      if (iteratee(arr[i], i, arr)) {
        pos = i
        break
      }
    }
    return pos === void 0 ? -1 : pos
  }

  // _.findLastIndex ------------------------------------------13
  _.findLastIndex = function(arr, predicate, fromIndex) {
    var iteratee = _cb(predicate, emptyObj, 3)
    var pos
    fromIndex = fromIndex === void 0 ? arr.length - 1 : fromIndex
    for (let i = fromIndex; i >= 0; i--) {
      if (iteratee(arr[i], i, arr)) {
        pos = i
        break
      }
    }
    return pos === void 0 ? -1 : pos
  }

  //_.flatten -------------------------------------------14
  _.flatten = function(arr) {
    // return arr.length > 0 ? Array.prototype.concat.apply([], arr) : arr
    return _.isArray(arr) ? [].concat(...arr) : []
  }

  //_.flattenDeep ----------------------------------------------15
  _.flattenDeep = function(arr) {
    return _.flattenDepth(arr, Infinity)
  }

  //_.flattenDepth -------------------------------------------------16
  _.flattenDepth = function(arr, depth = 1) {
    var result = []

    function flatten(arr, depth) {
      for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i]) && depth > 0) {
          flatten(arr[i], depth - 1)
        } else {
          result.push(arr[i])
        }
      }
      return result
    }
    return flatten(arr, depth)
  }

  //_.fromPairs --------------------------------------------------17
  _.fromPairs = function(pairs) {
    var result = {}
    for (let i = 0; i < pairs.length; i++) {
      var pair = pairs[i]
      result[pair[0]] = pair[1]
    }
    return result
  }

  //_.head ---------------------------------------------------18
  _.head = function(arr) {
    return arr[0]
  }

  //_.indexOf -------------------------------------------------19
  _.indexOf = function(arr, val, fromIndex = 0) {
    return arr.indexOf(val, fromIndex)
  }

  //_.initial --------------------------------------------------20
  _.initial = function(arr) {
    return arr.slice(0, Math.max(arr.length - 1, 0))
  }

  //_.intersection -----------------------------------------------21
  _.intersection = function(arr, ...others) {
    return arr.filter(item => others.every(it => it.includes(item)))
  }

  //_.intersectionBy -----------------------------------------------22
  _.intersectionBy = function(...args) {
    if (args.length < 3) return _.intersection(...args)
    var firstArr = args.shift()
    var iteratee = _cb(args.pop(), emptyObj, 1)
    return firstArr.filter(it => args.every(items => items.some(item => iteratee(item) === iteratee(it))))
  }

  //_.intersectionWith -----------------------------------------------23
  _.intersectionWith = function(...args) {
    if (args.length < 3) return _.intersection(...args)
    var firstArr = args.shift()
    var comparator = args.pop()
    return firstArr.filter(it => args.every(items => items.some(item => comparator(it, item))))
  }

  //_.join -------------------------------------------------------24
  _.join = function(arr, separator = ',') {
    return arr.join(separator)
  }

  //_.last -------------------------------------------------------25
  _.last = function(arr) {
    return arr[arr.length - 1]
  }

  //_.lastIndexOf ------------------------------------------------26
  _.lastIndexOf = function(arr, val, fromIndex = arr.length - 1) {
    return arr.lastIndexOf(val, fromIndex)
  }

  //_.nth --------------------------------------------------------27
  _.nth = function(arr, n = 0) {
    n = n >= 0 ? n : arr.length + n
    return arr[n]
  }

  //_.pull ---------------------------------------------------------28
  _.pull = function(arr, ...values) {
    for (let i = 0; i < arr.length; i++) {
      if (values.includes(arr[i])) {
        arr.splice(i, 1)
        i--
      }
    }
    return arr
  }

  //_.pullAll --------------------------------------------------------29
  _.pullAll = function(arr, values) {
    return _.pull.call(emptyObj, arr, ...values)
  }

  //_.pullAllBy --------------------------------------------------------30
  _.pullAllBy = function(arr, values, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 1)
    for (let i = 0; i < arr.length; i++) {
      if (values.some(it => iteratee(it) === iteratee(arr[i]))) {
        arr.splice(i, 1)
        i--
      }
    }
    return arr
  }

  //_.pullAllWith --------------------------------------------------------31
  _.pullAllWith = function(arr, values, comparator) {
    for (let i = 0; i < arr.length; i++) {
      if (values.some(it => comparator(arr[i], it))) {
        arr.splice(i, 1)
        i--
      }
    }
    return arr
  }

  //_.pullAt --------------------------------------------------------32
  _.pullAt = function(arr, indexs) {
    var result = []
    indexs.sort(function(a, b) {
      return a - b
    })
    var differ = 0
    for (let i = 0; i < indexs.length; i++) {
      result.push(...arr.splice(indexs[i] - differ, 1))
      differ++
    }
    return result
  }

  //_.remove -----------------------------------------------------------------33
  _.remove = function(arr, predicate) {
    var iteratee = _cb(predicate, emptyObj, 3)
    var result = []
    for (let i = 0; i < arr.length; i++) {
      var tmp = iteratee(arr[i], i, arr)
      if (tmp) {
        result.push(arr.splice(i, 1)[0])
        i--
      }
    }
    return result
  }

  //_.reverse -----------------------------------------------------------------34
  _.reverse = function(arr) {
    arr.reverse()
    return arr
  }

  //_.slice --------------------------------------------------------------------35
  _.slice = function(arr, start = 0, end = arr.length) {
    return arr.slice(start, end)
  }

  //_.sortedIndex --------------------------------------------------------------36
  _.sortedIndex = function(arr, val) {
    var left = 0
    var right = arr.length - 1
    if (arr[left] === undefined || arr[left] >= val) {
      return 0
    }
    if (arr[right] < val) {
      return right + 1
    }
    var tmp = void 0
    while (left <= right) {
      var mid = Math.floor((left + right) / 2)
      if (arr[mid] === val) {
        tmp = mid
        right = mid - 1
      } else if (arr[mid] < val) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
    return tmp ? tmp : right + 1
  }

  //_.sortedIndexBy ---------------------------------------------------------37
  _.sortedIndexBy = function(arr, val, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 1)
    return _.sortedIndex(arr.map(it => iteratee(it)), iteratee(val))
  }

  //_.sortedIndexOf ---------------------------------------------------------38
  _.sortedIndexOf = function(arr, val) {
    var left = 0
    var right = arr.length - 1
    if (arr[left] === undefined || arr[left] >= val) {
      return 0
    }
    if (arr[right] < val) {
      return right + 1
    }
    var tmp = void 0
    while (left <= right) {
      var mid = Math.floor((left + right) / 2)
      if (arr[mid] === val) {
        tmp = mid
        right = mid - 1
      } else if (arr[mid] < val) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
    return tmp ? tmp : -1
  }

  //_.sortedLastIndex -----------------------------------------------39
  _.sortedLastIndex = function(arr, val) {
    var left = 0
    var right = arr.length - 1
    if (arr[left] === undefined || arr[left] > val) {
      return 0
    }
    if (arr[right] <= val) {
      return right + 1
    }
    var tmp = void 0
    while (left <= right) {
      var mid = Math.floor((left + right) / 2)
      if (arr[mid] === val) {
        tmp = mid
        left = mid + 1
      } else if (arr[mid] < val) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
    return tmp ? tmp + 1 : right + 1
  }

  //_.sortedLastIndexBy -----------------------------------------------40
  _.sortedLastIndexBy = function(arr, val, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 1)
    return _.sortedLastIndex(arr.map(it => iteratee(it)), iteratee(val))
  }

  //_.sortedLastIndexOf -----------------------------------------------41
  _.sortedLastIndexOf = function(arr, val) {
    var left = 0
    var right = arr.length - 1
    if (arr[left] === undefined || arr[left] > val) {
      return 0
    }
    if (arr[right] <= val) {
      return right + 1
    }
    var tmp = void 0
    while (left <= right) {
      var mid = Math.floor((left + right) / 2)
      if (arr[mid] === val) {
        tmp = mid
        left = mid + 1
      } else if (arr[mid] < val) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
    return tmp ? tmp : -1
  }

  //_.sortedUniq -----------------------------------------------42
  _.sortedUniq = function(arr) {
    var result = arr.length > 0 ? [arr[0]] : []
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] !== arr[i - 1]) {
        result.push(arr[i])
      }
    }
    return result
  }

  //_.sortedUniqBy ----------------------------------------------43
  _.sortedUniqBy = function(arr, iteratee) {
    iteratee = _cb(iteratee)
    var result = arr.length > 0 ? [arr[0]] : []
    for (let i = 1; i < arr.length; i++) {
      if (iteratee(arr[i], i, arr) !== iteratee(arr[i - 1], i - 1, arr)) {
        result.push(arr[i])
      }
    }
    return result
  }

  //_.tail ----------------------------------------------------44
  _.tail = function(arr) {
    return arr.slice(1)
  }

  //_.take ----------------------------------------------------45
  _.take = function(arr, num = 1) {
    return arr.slice(0, num)
  }

  //_.takeRight ----------------------------------------------------46
  _.takeRight = function(arr, num = 1) {
    return num === 0 ? [] : arr.slice(-num)
  }

  //_.takeRightWhile ----------------------------------------------------47
  _.takeRightWhile = function(arr, predicate) {
    var iteratee = _cb(predicate, emptyObj, 3)
    var pos
    for (let i = arr.length - 1; i >= 0; i--) {
      if (!iteratee(arr[i], i, arr)) {
        pos = i
        break
      }
    }
    return pos === void 0 ? arr.slice() : arr.slice(pos + 1)
  }

  //_.takeWhile ----------------------------------------------------48
  _.takeWhile = function(arr, predicate) {
    var iteratee = _cb(predicate, emptyObj, 3)
    var pos
    for (let i = 0; i < arr.length; i++) {
      if (!iteratee(arr[i], i, arr)) {
        pos = i
        break
      }
    }
    return pos === void 0 ? arr.slice() : arr.slice(0, pos)
  }

  //_.union ------------------------------------------------------ 49
  _.union = function(...arr) {
    return _.flatten(arr).filter(function(val, index, collection) {
      return collection.indexOf(val) === index
    })
  }

  //_.unionBy ------------------------------------------------------ 50
  _.unionBy = function(...args) {
    if (args.length < 3) return _.union(...args)
    var iteratee = _cb(args.pop(), emptyObj, 1)
    var arr = _.flatten(args)
    var iterateeArr = arr.map(it => iteratee(it))
    return arr.filter((item, index) => iterateeArr.indexOf(iteratee(item)) === index)
  }

  //_.unionWith ------------------------------------------------------ 51
  _.unionWith = function(...args) {
    if (args.length < 3) return _.union(...args)
    var comparator = args.pop()
    var arr = _.flatten(args)
    var result = []
    arr.forEach(item => {
      if (!result.some(it => comparator(it, item))) {
        result.push(item)
      }
    })
    return result
  }

  //_.uniq ------------------------------------------------------ 52
  _.uniq = function(arr) {
    return arr.filter(function(val, index, collection) {
      return collection.indexOf(val) === index
    })
  }

  //_.uniqBy ------------------------------------------------------ 53
  _.uniqBy = function(arr, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 1)
    var iterateeArr = arr.map((item, index, collection) => iteratee(item, index, collection))
    return arr.filter((val, index) => iterateeArr.indexOf(iterateeArr[index]) === index)
  }

  //_.uniqWith ------------------------------------------------------ 54
  _.uniqWith = function(arr, comparator) {
    var result = []
    arr.forEach(item => {
      if (!result.some(it => comparator(it, item))) {
        result.push(item)
      }
    })
    return result
  }

  //_.unzip ------------------------------------------------------ 55
  _.unzip = function(arr) {
    var result = new Array(arr[0].length).fill(0).map(it => [])
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        result[j][i] = arr[i][j]
      }
    }
    return result
  }

  //_.unzipWith ------------------------------------------------------ 56
  _.unzipWith = function(arr, iteratee = _.identity) {
    return _.unzip(arr).map(it => iteratee(...it))
  }

  //_.without ------------------------------------------------------ 57
  _.without = function(arr, ...values) {
    return arr.filter(it => !values.includes(it))
  }

  //_.xor ------------------------------------------------------ 58
  _.xor = function(...arrays) {
    var flattenArr = _.flatten(arrays)
    var compareArr = flattenArr.filter(function(val, index, collection) {
      return collection.indexOf(val) !== index
    })
    return flattenArr.filter(it => !compareArr.includes(it))
  }

  //_.xorBy ------------------------------------------------------ 59
  _.xorBy = function(...args) {
    if (args.length < 3) return _.xor(...args)
    var iteratee = _cb(args.pop(), emptyObj, 1)
    var arr = _.flatten(args)
    var iterateeArr = arr.map(it => iteratee(it))
    var compareArr = iterateeArr.filter((item, index, collection) => collection.indexOf(item) !== index)
    return arr.filter(it => !compareArr.includes(iteratee(it)))
  }

  //_.xorWith ------------------------------------------------------ 60
  _.xorWith = function(...args) {
    if (args.length < 3) return _.xor(...args)
    var comparator = args.pop()
    var arr = _.flatten(args)
    var result = []
    for (let i = 0; i < arr.length; i++) {
      var flag = false
      for (let j = 0; j < arr.length; j++) {
        if (i < j && comparator(arr[i], arr[j]) || i > j && comparator(arr[j], arr[i])) {
          flag = true
          break
        }
      }
      if (!flag) result.push(arr[i])
    }
    return result
  }

  //_.zip ------------------------------------------------------ 61
  _.zip = function(...arrays) {
    var result = new Array(arrays[0].length).fill(0).map(it => [])
    for (let i = 0; i < arrays.length; i++) {
      for (let j = 0; j < arrays[0].length; j++) {
        result[j][i] = arrays[i][j]
      }
    }
    return result
  }

  //_.zipObject ------------------------------------------------------ 62
  _.zipObject = function(props = [], values = []) {
    var result = {}
    for (let i = 0; i < props.length; i++) {
      result[props[i]] = values[i]
    }
    return result
  }

  //_.zipObjectDeep ------------------------------------------------------ 63
  _.zipObjectDeep = function(props = [], values = []) {
    var result = void 0
    for (var i = 0; i < props.length; i++) {
      var k = -1
      var prop = _.toPath(props[i])
      result = parsePath(result)
    }

    function parsePath(obj) {
      k++
      if (k !== 0 && /^\d+$/.test(prop[k])) {
        var obj = obj || []
      } else {
        var obj = obj || {}
      }
      if (obj[prop[k]] && _.includes(obj[prop[k]], prop[k + 1])) {
        parsePath(obj[prop[k]])
      } else {
        if (k === prop.length - 1) {
          obj[prop[k]] = values[i]
        } else {
          obj[prop[k]] = parsePath(obj[prop[k]])
        }
      }
      return obj
    }
    return result
  }

  //_.zipWith ------------------------------------------------------ 64
  _.zipWith = function(...args) {
    if (_.isFunction(args[args.length - 1])) {
      var iteratee = args.pop()
      return _.zip(...args).map(it => iteratee(...it))
    } else {
      return _.zip(...args)
    }
  }

  // --------------------------------Collection------------------------------------Collection
  // _.countBy ------------------------------------------------------ 1
  _.countBy = function(collection, iteratee) {
    var obj = {}
    iteratee = _cb(iteratee, emptyObj, 1)
    var keys = Object.keys(collection)
    keys.forEach(key => {
      var tmp = iteratee(collection[key])
      if (tmp in obj) {
        obj[tmp] += 1
      } else {
        obj[tmp] = 1
      }
    })
    return obj
  }

  // _.each -> forEach ------------------------------------------------------ 2
  _.each = function(collection, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 3)
    var keys = Object.keys(collection)
    var isArr = _.isArray(collection)
    keys.every(key => iteratee(collection[key], isArr ? Number(key) : key, collection))
    return collection
  }

  // _.eachRight -> forEachRight ---------------------------------------------- 3
  _.eachRight = function(collection, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 3)
    var keys = Object.keys(collection).reverse()
    var isArr = _.isArray(collection)
    keys.every(key => iteratee(collection[key], isArr ? Number(key) : key, collection))
    return collection
  }

  // _.every ------------------------------------------------------ 4
  _.every = function(collection, predicate) {
    var iteratee = _cb(predicate, emptyObj, 3)
    var keys = Object.keys(collection)
    var isArr = _.isArray(collection)
    return keys.every(key => iteratee(collection[key], isArr ? Number(key) : key, collection))
  }

  // _.filter ------------------------------------------------------ 5
  _.filter = function(collection, predicate) {
    var iteratee = _cb(predicate, emptyObj, 3)
    var keys = Object.keys(collection)
    var isArr = _.isArray(collection)
    var result = []
    keys.forEach(key => {
      if (iteratee(collection[key], isArr ? Number(key) : key, collection)) {
        result.push(collection[key])
      }
    })
    return result
  }

  // _.find ------------------------------------------------------ 6
  _.find = function(collection, predicate, fromIndex = 0) {
    var iteratee = _cb(predicate, emptyObj, 3)
    var keys = Object.keys(collection)
    var isArr = _.isArray(collection)
    var resultIndex = keys.find((key, index) => {
      if (index >= fromIndex && iteratee(collection[key], isArr ? Number(key) : key, collection)) return true
    })
    return collection[resultIndex]
  }

  // _.findLast ------------------------------------------------------ 7
  _.findLast = function(collection, predicate, fromIndex = collection.length - 1) {
    var iteratee = _cb(predicate, emptyObj, 3)
    var keys = Object.keys(collection).reverse()
    var isArr = _.isArray(collection)
    var resultIndex = keys.find((key, index) => {
      if ((index >= keys.length - 1 - fromIndex) && iteratee(collection[key], isArr ? Number(key) : key, collection)) return true
    })
    return collection[resultIndex]
  }

  // _.flatMap ------------------------------------------------------ 8
  _.flatMap = function(collection, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 3)
    var keys = Object.keys(collection)
    var isArr = _.isArray(collection)
    return _.flatten(keys.map(key => iteratee(collection[key], isArr ? Number(key) : key, collection)))
  }

  // _.flatMapDeep ------------------------------------------------------ 9
  _.flatMapDeep = function(collection, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 3)
    var keys = Object.keys(collection)
    var isArr = _.isArray(collection)
    return _.flattenDepth(keys.map(key => iteratee(collection[key], isArr ? Number(key) : key, collection)), Infinity)
  }

  // _.flatMapDepth ------------------------------------------------------ 10
  _.flatMapDepth = function(collection, iteratee, depth = 1) {
    iteratee = _cb(iteratee, emptyObj, 3)
    var keys = Object.keys(collection)
    var isArr = _.isArray(collection)
    return _.flattenDepth(keys.map(key => iteratee(collection[key], isArr ? Number(key) : key, collection)), depth)
  }

  // _.forEach ------------------------------------------------------ 11
  _.forEach = _.each

  // _.forEachRight ------------------------------------------------------ 12
  _.forEachRight = _.eachRight

  // _.groupBy ------------------------------------------------------ 13
  _.groupBy = function(collection, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 1)
    var values = Object.values(collection)
    var result = {}
    values.forEach(val => {
      var tmp = iteratee(val)
      if (tmp in result) {
        result[tmp].push(val)
      } else {
        result[tmp] = [val]
      }
    })
    return result
  }

  // _.includes ------------------------------------------------------ 14
  _.includes = function(collection, val, fromIndex = 0) {
    if (_.isString(collection) || _.isArray(collection)) {
      return collection.includes(val, fromIndex)
    }
    var values = Object.values(collection)
    return values.includes(val, fromIndex)
  }

  // _.invokeMap ------------------------------------------------------ 15
  _.invokeMap = function(collection, path, ...args) {
    var values = Object.values(collection)
    if (_.isFunction(path)) {
      return values.map(val => path.call(val, ...args))
    } else {
      var methodName = _.toPath(path).pop()
      return values.map(val => {
        var method = Object.getPrototypeOf(val)[methodName]
        return method.call(val, ...args)
      })
    }
  }

  // _.keyBy ------------------------------------------------------ 16
  _.keyBy = function(collection, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 1)
    var values = Object.values(collection)
    var result = {}
    values.forEach(val => {
      result[iteratee(val)] = val
    })
    return result
  }

  // _.map ------------------------------------------------------ 17
  _.map = function(collection, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 3)
    var keys = Object.keys(collection)
    var isArr = _.isArray(collection)
    return keys.map(key => iteratee(collection[key], isArr ? Number(key) : key, collection))
  }

  // _.orderBy ------------------------------------------------------ 18
  _.orderBy = function(collection, iteratees, orders) {
    iteratees = iteratees.map(iteratee => _cb(iteratee, emptyObj, 1))
    var values = Object.values(collection)
    values.sort(function(a, b) {
      return comparing(a, b, iteratees, orders)
    })
    return values

    //比较函数
    function comparing(a, b, iteratees, orders) {
      for (let i = 0; i < iteratees.length; i++) {
        var tmpA = iteratees[i](a)
        var tmpB = iteratees[i](b)
        if (orders === void 0 || orders[i] !== 'desc') {
          if (tmpA < tmpB) return -1
          if (tmpA > tmpB) return 1
        }
        if (tmpA < tmpB) return 1
        if (tmpA > tmpB) return -1
      }
      return 0
    }
  }

  // _.partition ------------------------------------------------------ 19
  _.partition = function(collection, predicate) {
    var iteratee = _cb(predicate, emptyObj, 1)
    var values = Object.values(collection)
    var truthy = []
    var falsey = []
    values.forEach(val => {
      if (iteratee(val)) {
        truthy.push(val)
      } else {
        falsey.push(val)
      }
    })
    return [truthy, falsey]
  }

  // _.reduce ------------------------------------------------------ 20
  _.reduce = function(collection, iteratee, initialVal) {
    iteratee = _cb(iteratee, emptyObj, 4)
    var keys = Object.keys(collection)
    var isArr = _.isArray(collection)
    var accumulator = initialVal === void 0 ? collection[keys[0]] : initialVal
    var fromIndex = initialVal === void 0 ? 1 : 0
    for (let i = fromIndex; i < keys.length; i++) {
      accumulator = iteratee(accumulator, collection[keys[i]], isArr ? Number(keys[i]) : keys[i], collection)
    }
    return accumulator
  }

  // _.reduceRight ------------------------------------------------------ 21
  _.reduceRight = function(collection, iteratee, initialVal) {
    iteratee = _cb(iteratee, emptyObj, 4)
    var isArr = _.isArray(collection)
    var keys = Object.keys(collection).reverse()
    var accumulator = initialVal === void 0 ? collection[keys[0]] : initialVal
    var fromIndex = initialVal === void 0 ? 1 : 0
    for (let i = fromIndex; i < keys.length; i++) {
      accumulator = iteratee(accumulator, collection[keys[i]], isArr ? Number(keys[i]) : keys[i], collection)
    }
    return accumulator
  }

  // _.reject ------------------------------------------------------ 22
  _.reject = function(collection, predicate) {
    var iteratee = _cb(predicate, emptyObj, 3)
    var isArr = _.isArray(collection)
    var keys = Object.keys(collection)
    var result = []
    keys.forEach(key => {
      if (!iteratee(collection[key], isArr ? Number(key) : key, collection)) {
        result.push(collection[key])
      }
    })
    return result
  }

  // _.sample ------------------------------------------------------ 23
  _.sample = function(collection) {
    return Object.values(collection)[Math.floor((Math.random() * collection.length))]
  }

  // _.sampleSize ------------------------------------------------------ 24
  _.sampleSize = function(collection, n = 1) {
    var values = Object.values(collection)
    var min = Math.min(n, values.length)
    var result = []
    for (let i = 0; i < n; i++) {
      var randomIndex = Math.floor(Math.random() * values.length)
      result.push(...values.splice(randomIndex, 1))
    }
    return result
  }

  // _.shuffle ------------------------------------------------------ 25
  _.shuffle = function(collection) {
    var values = Object.values(collection)
    //洗牌算法
    var len = values.length
    for (var i = 0; i < len - 1; i++) {
      var randomIndex = Math.floor(Math.random() * (len - i)) + i
      exchange(values, i, randomIndex)
    }

    function exchange(arr, x, y) {
      var tmp = arr[x]
      arr[x] = arr[y]
      arr[y] = tmp
    }
    return values
  }

  // _.size ------------------------------------------------------ 26
  _.size = function(collection) {
    if (_.isArray(collection) || _.isString(collection)) {
      return collection.length
    }
    return Object.keys(collection).length
  }

  // _.some ------------------------------------------------------ 27
  _.some = function(collection, predicate) {
    var iteratee = _cb(predicate, emptyObj, 3)
    var isArr = _.isArray(collection)
    var keys = Object.keys(collection)
    return keys.some(key => iteratee(collection[key], isArr ? Number(key) : key, collection))
  }

  // _.sortBy ------------------------------------------------------ 28
  _.sortBy = function(collection, iteratees) {
    iteratees = iteratees.map(iteratee => _cb(iteratee, emptyObj, 1))
    var values = Object.values(collection)
    values.sort(function(a, b) {
      return comparing(a, b, iteratees)
    })
    return values

    //比较函数
    function comparing(a, b, iteratees) {
      for (let i = 0; i < iteratees.length; i++) {
        var tmpA = iteratees[i](a)
        var tmpB = iteratees[i](b)
        if (tmpA < tmpB) return -1
        if (tmpA > tmpB) return 1
      }
      return 0
    }
  }

  // --------------------------------Date------------------------------------------Date
  //_.now ------------------------------------------------------------------ 1
  _.now = function() {
    return new Date().getTime()
  }

  // --------------------------------Function--------------------------------------Function
  // _.after ------------------------------------------------------------------ 1
  _.after = function(n, func) {
    return function(...args) {
      if (--n < 1) {
        return func.call(this, ...args)
      }
    }
  }

  // _.ary ------------------------------------------------------------------ 2
  _.ary = function(func, n = func.length) {
    return function(...args) {
      return func.apply(this, args.slice(0, n))
    }
  }

  // _.before ------------------------------------------------------------------ 3
  _.before = function(n, func) {
    var result
    return function(...args) {
      if (--n > 0) {
        result = func.call(this, ...args)
      }
    }
    return result
  }

  // _.bind ------------------------------------------------------------------ 4
  _.bind = function(func, thisArg, ...partials) {
    return function(...args) {
      var finalArgs = partials.map(it => {
        if (it === _) return args.shift()
        return it
      }).concat(args)
      return func.call(thisArg, ...finalArgs)
    }
  }

  // _.bindKey ------------------------------------------------------------------ 5
  _.bindKey = function(obj, key, ...partials) {
    return function(...args) {
      var func = obj[key]
      var finalArgs = partials.map(it => {
        if (it === _) return args.shift()
        return it
      }).concat(args)
      return func.call(obj, ...finalArgs)
    }
  }

  // _.curry ------------------------------------------------------------------ 6
  _.curry = function(func, arity = func.length) {
    return function(...args) {
      var len = args.filter(it => it !== _).length
      if (len >= arity) {
        return func.call(this, ...args)
      }
      return _.curry(_.bind(func, this, ...args), arity - len)
    }
  }

  // _.curryRight ------------------------------------------------------------- 7
  _.curryRight = function(func, arity = func.length) {
    return function(...args) {
      var len = args.filter(it => it !== _).length
      if (len >= arity) {
        return func.call(this, ...args)
      }
      var addArr = new Array(arity - args.length).fill(_)
      var finalArgs = args.reverse().concat(addArr).reverse()
      return _.curryRight(_.bind(func, this, ...finalArgs), arity - len)
    }
  }

  // _.debounce --------------------------------------------------------------- 8
  _.debounce = function(func, wait) {
    var timeoutID
    return function(...args) {
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
        return func.call(this, ...args)
      }, wait)
    }
  }

  // _.defer ------------------------------------------------------------------ 9
  _.defer = function(func, ...args) {
    return setTimeout(() => {
      func.call(this, ...args)
    }, 0)
  }

  // _.delay ------------------------------------------------------------------ 10
  _.delay = function(func, wait, ...args) {
    return setTimeout(() => {
      func.call(this, ...args)
    }, wait)
  }

  // _.flip ------------------------------------------------------------------ 11
  _.flip = function(func) {
    return function(...args) {
      return func.call(this, ...args.reverse())
    }
  }

  // _.memoize ----------------------------------------------------------------- 12
  _.memoize = function(func, resolver) {
    var memoize = function(...args) {
      var address = resolver === void 0 ? args[0] : resolver.call(this, ...args)
      if (!memoize.cache.has(address)) {
        memoize.cache.set(address, func.call(this, ...args))
      }
      return memoize.cache.get(address)
    }
    memoize.cache = new Map()
    return memoize
  }

  // _.negate ------------------------------------------------------------------ 13
  _.negate = function(predicate) {
    return function(...args) {
      return !predicate.call(this, ...args)
    }
  }

  // _.once ------------------------------------------------------------------ 14
  _.once = function(func) {
    var flag = false
    var memo
    return function(...args) {
      if (!flag) {
        flag = true
        memo = func.call(this, ...args)
        return memo
      } else {
        return memo
      }
    }
  }

  // _.overArgs ------------------------------------------------------------------ 15
  _.overArgs = function(func, transforms) {
    return function(...args) {
      return func.call(this, ...transforms.map((item, index) => transforms[index](args[index])))
    }
  }

  // _.partial ------------------------------------------------------------------ 16
  _.partial = function(func, ...partials) {
    return function(...args) {
      var finalArgs = partials.map(it => {
        if (it === _) return args.unshift()
        return it
      }).concat(args)
      return func.call(this, ...finalArgs)
    }
  }
  // _.partialRight --------------------------------------------------------- 17
  _.partialRight = function(func, ...partials) {
    //看不懂
  }
  // _.rearg ------------------------------------------------------------------ 18
  _.rearg = function(func, indexes) {
    return function(...args) {
      var finalArgs = []
      indexs.forEach((it, index) => {
        finalArgs[it] = args[index]
      })
      return func.call(this, ...finalArgs)
    }
  }

  // _.rest ------------------------------------------------------------------ 19
  _.rest = function(func, start = func.length - 1) {
    return function(...args) {
      var args1 = args.slice(0, start)
      var args2 = args.slice(start)
      return func.call(this, ...args1, args2)
    }
  }

  // _.spread ------------------------------------------------------------------ 20
  _.spread = function(func, start = 0) {
    return function(args) {
      return func.call(this, ...args.slice(start))
    }
  }

  // _.throttle ------------------------------------------------------------------ 21
  _.throttle = function(func, wait = 0, options = {}) {
    var leading = 'leading' in options ? options.leading : true
    var trailing = 'trailing' in options ? options.trailing : true
    var previous = 0
    var timeoutID = null
    var result
    return function(...args) {
      var runtime = Date.now()
      if (!previous && leading === false) {
        previous = runtime
      }
      //需要等待多长时间后可以执行
      var remaining = wait - (runtime - previous)
      //remaining > wait 说明时间被调整过
      if (remaining <= 0 || remaining > wait) {
        if (timeoutID) {
          clearTimeout(timeoutID)
        }
        timeoutID = null
        previous = runtime
        result = func.call(this, ...args)
      } else if (!timeoutID && trailing === true) {
        timeoutID = setTimeout(() => {
          //leading 为false时,每次触发后一定会延迟wait时间才会调用,如果不把previous重置
          //为0,那么中间间隔长时间remaining就会变为负数,下一次调用就会马上触发,不会延迟
          previous = leading === false ? 0 : Date.now()
          timeoutID = null
          result = func.call(this, ...args)
        }, remaining)
      }
      return result
    }
  }

  // _.unary ------------------------------------------------------------------ 22
  _.unary = function(func) {
    return function(...args) {
      return func.call(this, args[0])
    }
  }

  // _.wrap ------------------------------------------------------------------ 23
  _.wrap = function(val, wrapper = _.identity) {
    return function(...args) {
      return wrapper.call(this, val, ...args)
    }
  }
  // --------------------------------Lang------------------------------------------Lang
  // _.castArray -------------------------------------------------------------- 1
  _.castArray = function(val) {
    if (arguments.length === 0) {
      return []
    }
    return _.isArray(val) ? val : [val]
  }

  // _.clone -------------------------------------------------------------- 2
  _.clone = function(val) {
    if (!_.isObject(val)) {
      return val
    }
    return _.isArray(val) ? val.slice() : Object.assign(val)
  }

  // _.cloneDeep ---------------------------------------------------------- 3
  _.cloneDeep = function(val) {
    if (!_.isObject(val)) {
      return val
    }
    if (_.isArray(val)) {
      return val.map(it => _.cloneDeep(it))
    }
    var result = Object.create(Object.getPrototypeOf(val))
    Object.keys(val).forEach(key => {
      result[key] = _.cloneDeep(val[key])
    })
    return result
  }

  // _.cloneDeepWith ------------------------------------------------------- 4
  _.cloneDeepWith = function(val, customizer) {
    if (!_.isObject(val)) return val
    if (!_.isFunction(customizer)) return _.cloneDeep(val)
    var keys = Object.keys(val)
    var isArr = _.isArray(val)
    var result = Object.create(Object.getPrototypeOf(val))
    keys.forEach(key => {
      var tmp = customizer(val[key], isArr ? Number(key) : key, val)
      if (tmp === void 0) {
        result[key] = _.cloneDeepWith(val[key])
      } else {
        result[key] = tmp
      }
    })
    return result
  }

  // _.cloneWith ---------------------------------------------------------- 5
  _.cloneWith = function(val, customizer) {
    if (!_.isObject(val)) return val
    if (!_.isFunction(customizer)) return _.clone(val)
    var keys = Object.keys(val)
    var isArr = _.isArray(val)
    var result = Object.create(Object.getPrototypeOf(val))
    keys.forEach(key => {
      var tmp = customizer(val[key], isArr ? Number(key) : key, val)
      if (tmp === void 0) {
        result[key] = val[key]
      } else {
        result[key] = tmp
      }
    })
    return result
  }

  // _.conformsTo ---------------------------------------------------------- 6
  _.conformsTo = function(obj, source) {
    return Object.keys(source).every(it => source[it](obj[it]))
  }

  // _.eq ---------------------------------------------------------- 7
  _.eq = function(val, other) {
    return val === other || (_.isNaN(val) && _.isNaN(other))
  }

  // _.gt ---------------------------------------------------------- 8
  _.gt = function(val, other) {
    return val > other
  }

  // _.gte ---------------------------------------------------------- 9
  _.gte = function(val, other) {
    return val > other || val === other
  }

  // _.isArray ------------------------------------------------------ 10
  _.isArray = function(obj) {
    if (Array.isArray) {
      return Array.isArray(obj)
    } else {
      return Object.prototype.toString.call(obj) === "[object Array]"
    }
  }

  // _.isArrayLike ------------------------------------------------------ 10
  _.isArrayLike = function(val) {
    var len = val['length']
    return !_.isFunction(val) && len >= 0 && len <= Number.MAX_SAFE_INTEGER
  }

  // _.isArrayLikeObject ----------------------------------------------- 10
  _.isArrayLikeObject = function(val) {
    return _.isArrayLike(val) && _.isObject(val)
  }

  // _.isBuffer ----------------------------------------------------------- 11
  // _.isElement ---------------------------------------------------------- 12
  _.isElement = function(val) {
    return !!val && val.nodeType === 1
  }

  // _.isEmpty ------------------------------------------------------------- 13
  _.isEmpty = function(val) {
    if (val == null) return true
    return Object.keys(val).length === 0
  }

  // _.isEqual -------------------------------------------------------------- 14
  _.isEqual = function(val, other) {
    if (!_.isObject(val)) return _.eq(val, other)
    if (_.isArray(val)) {
      if (_.isArray(other)) {
        return val.every((it, index) => {
          return _.isEqual(it, other[index])
        })
      }
      return false
    }
    return Object.keys(val).every(key => _.isEqual(val[key], other[key]))
  }

  // _.isEqualWith -------------------------------------------------------- 15
  _.isEqualWith = function(val, other, customizer) {

    if (customizer === void 0) return _.isEqual(val, other)

    if (!_.isObject(val)) return customizer(val, other) || _.isEqual(val, other)

    if (_.isArray(val)) {
      if (_.isArray(other) && val.length === other.length) {
        return val.every((item, index, collection) => {
          var compare = customizer(item, other[index], index, collection, other)
          if (compare === void 0) {
            return _.isEqualWith(item, other[index], customizer)
          } else {
            return compare
          }
        })
      }
      return false
    }
    var keysVal = Object.keys(val)
    var keysOther = Object.keys(other)
    if (keysVal.length !== keysOther.length) return false
    return keysVal.every(item => {
      var compare = customizer(val[item], other[item], item, val, other)
      if (compare === void 0) {
        return _.isEqualWith(val[item], other[item], customizer)
      } else {
        return compare
      }
    })
  }

  // _.isFinite -------------------------------------------------------- 16
  _.isFinite = function(val) {
    return _.isNumber(val) && val >= Number.MIN_VALUE && val <= Number.MAX_VALUE
  }

  // _.isInteger ---------------------------------------------------------- 17
  _.isInteger = function(val) {
    return Number.isInteger(val)
  }

  // _.isLength -------------------------------------------------------------- 18
  _.isLength = function(val) {
    return _.isInteger(val) && val >= 0 && val <= Number.MAX_SAFE_INTEGER
  }

  // _.isMatch ---------------------------------------------------------------- 19
  _.isMatch = function(obj, source) {
    if (Object.keys(source).length === 0) return true
    var tmp = _.cloneDeep(obj)
    return _.isEqual(obj, Object.assign(tmp, source))
  }

  // _.isMatchWith ------------------------------------------------------------20
  _.isMatchWith = function(obj, source, customizer) {
    var tmp = _.cloneDeep(obj)
    return _.isEqualWith(obj, Object.assign(tmp, source), customizer)
  }

  // _.isNative --------------------------------------------------------------- 21
  _.isNative = function(val) {
    return _.isFunction(val) && /\[native code\]/.test('' + val)
  }

  // _.isNil -----------------------------------------------------------------22
  _.isNil = function(val) {
    return val == void 0
  }

  // _.isNull -----------------------------------------------------------------22
  _.isNull = function(val) {
    return val === null
  }

  // _.isObject --------------------------------------------------------------23
  _.isObject = function(val) {
    return (typeof val === "object" || typeof val === "function") && val !== null
  }

  // _.isObjectLike -----------------------------------------------------------24
  _.isObjectLike = function(val) {
    return typeof val === 'object' && val !== null
  }

  // _.isPlainObject ----------------------------------------------------------25
  _.isPlainObject = function(val) {
    var proto = Object.getPrototypeOf(val)
    return proto === null || proto === Object.prototype
  }

  // _.isSafeInteger ----------------------------------------------------------26
  _.isSafeInteger = function(val) {
    return Number.isSafeInteger(val)
  }

  // _.isTypedArray -----------------------------------------------------------27
  _.isTypedArray = function(val) {
    return /\[object Uint(8|16|32)Array\]/.test(Object.prototype.toString.call(val))
  }

  //_.isUndefined --------------------------------------------------------------28
  _.isUndefined = function(val) {
    return val === void 0
  }

  // _.isNaN ----------------------------------------------------------------- 29
  _.isNaN = function(obj) {
    return _.isNumber(obj) && isNaN(obj)
  }

  //_.lt ---------------------------------------------------------------------- 30
  _.lt = function(val, other) {
    return val < other
  }

  //_.lte ---------------------------------------------------------------------- 31
  _.lte = function(val, other) {
    return val <= other
  }

  // _.toArray -----------------------------------------------------------------32
  _.toArray = function(val) {

    if (_.isString(val)) return val.split('')

    if (!_.isObject(val)) return []

    if (_.isArray(val)) return val.slice()

    if (_.isArrayLike(val)) return Array.from(val)

    return Object.values(val)
  }

  // _.toFinite ---------------------------------------------------------------33
  _.toFinite = function(val) {
    if (!val) return 0
    if (val === Infinity) return Number.MAX_VALUE
    if (val === -Infinity) return Number.MIN_VALUE
    return Number(val)
  }

  // _.toInteger ---------------------------------------------------------------34
  _.toInteger = function(val) {
    var result = _.toFinite(val)
    var remainder = result % 1
    return remainder ? result - remainder : result
  }

  //_.toLength ----------------------------------------------------------------35
  _.toLength = function(val) {
    var result = _.toInteger(val)
    if (result <= 0) return 0
    return result > 4294967295 ? 4294967295 : result
  }

  // _.toNumber ---------------------------------------------------------------36
  _.toNumber = function(val) {
    return Number(val)
  }

  // _.toPlainObject ----------------------------------------------------------37
  _.toPlainObject = function(val) {
    return Object.assign({}, val)
  }

  // _.toSafeInteger -----------------------------------------------------------38
  _.toSafeInteger = function(val) {
    var result = _.toInteger(val)
    if (result >= Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER
    if (result <= Number.MIN_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER
    return result
  }

  //_.toSting ------------------------------------------------------------------39
  _.toString = function(val) {
    if (val == void 0) return ''
    if (_.isArray(val)) return val.join(',')
    if (_.isSymbol(val)) return val.toString()
    var result = val + ''
    return result === 0 && (1 / val === -Infinity) ? '-0' : result
  }

  // ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'] 类型判断\
  ;
  ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Boolean', 'ArrayBuffer', 'Map', 'Set', 'Symbol', 'WeakMap', 'WeakSet'].forEach(it => {
    _['is' + it] = function(obj) {
      return Object.prototype.toString.call(obj) === `[object ${it}]`
    }
  })

  // --------------------------------Math------------------------------------------Math
  // _.add ----------------------------------------------------------------- 1
  _.add = function(augend, addend) {
    return augend + addend
  }

  // _.ceil ----------------------------------------------------------------- 2
  _.ceil = function(number, precision = 0) {
    var digit = Math.pow(10, precision)
    return Math.ceil(number * digit) / digit
  }

  // _.divide ----------------------------------------------------------------- 3
  _.divide = function(dividend, divisor) {
    return dividend / divisor
  }

  // _.floor ----------------------------------------------------------------- 4
  _.floor = function(number, precision = 0) {
    var digit = Math.pow(10, precision)
    return Math.floor(number * digit) / digit
  }

  // _.max ----------------------------------------------------------------- 5
  _.max = function(arr) {
    var max = Math.max(...arr)
    return max === -Infinity ? undefined : max
  }

  // _.maxBy ----------------------------------------------------------------- 6
  _.maxBy = function(arr, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 1)
    var max = -Infinity
    var result = undefined
    arr.forEach(it => {
      var tmp = iteratee(it)
      if (tmp > max) {
        max = tmp
        result = it
      }
    })
    return result
  }

  // _.mean ----------------------------------------------------------------- 7
  _.mean = function(arr) {
    return arr.reduce((accumulator, currentVal) => accumulator + currentVal) / arr.length
  }

  // _.meanBy ----------------------------------------------------------------- 8
  _.meanBy = function(arr, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 1)
    var iterateeArr = arr.map(it => iteratee(it))
    return iterateeArr.reduce((accumulator, currentVal) => accumulator + currentVal) / iterateeArr.length
  }

  // _.min ----------------------------------------------------------------- 9
  _.min = function(arr) {
    var min = Math.min(...arr)
    return min === Infinity ? undefined : min
  }

  // _.minBy ----------------------------------------------------------------- 10
  _.minBy = function(arr, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 1)
    var min = Infinity
    var result = undefined
    arr.forEach(it => {
      var tmp = iteratee(it)
      if (tmp < min) {
        min = tmp
        result = it
      }
    })
    return result
  }

  // _.multiply ----------------------------------------------------------------- 11
  _.multiply = function(multiplier, multiplicand) {
    return multiplier * multiplicand
  }

  // _.round ----------------------------------------------------------------- 12
  _.round = function(number, precision = 0) {
    var digit = Math.pow(10, precision)
    return Math.round(number * digit) / digit
  }

  // _.subtract ----------------------------------------------------------------- 13
  _.subtract = function(minuend, subtrahend) {
    return minuend - subtrahend
  }

  // _.sum ----------------------------------------------------------------- 14
  _.sum = function(arr) {
    return arr.reduce((accumulator, currentVal) => accumulator + currentVal)
  }

  // _.sumBy ----------------------------------------------------------------- 15
  _.sumBy = function(arr, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 1)
    var iterateeArr = arr.map(it => iteratee(it))
    return iterateeArr.reduce((accumulator, currentVal) => accumulator + currentVal)
  }

  // --------------------------------Number----------------------------------------Number
  // _.clamp ------------------------------------------------------------------- 1
  _.clamp = function(number, lower, upper) {
    var upperB = upper ? upper : lower
    var lowerB = upper ? lower : -Infinity
    if (number > upperB) return upperB
    if (number < lowerB) return lowerB
    return number
  }

  // _.inRange --------------------------------------------------------------- 2
  _.inRange = function(number, start = 0, end) {
    var endB = end ? end : start
    var startB = end ? start : 0
    if (endB < startB) {
      var tmp = startB
      startB = endB
      endB = tmp
    }
    if (startB <= number && endB > number) return true
    return false
  }

  // _.random ----------------------------------------------------------------- 3
  _.random = function(lower, upper, floating) {
    var lowerB = upper ? lower : 0
    var upperB = upper ? upper : lower
    if (upperB < lowerB) {
      var tmp = upperB
      upperB = lowerB
      lowerB = tmp
    }
    if (!floating && upperB === parseInt(upperB) && lowerB === parseInt(lowerB)) {
      return Math.floor(Math.random() * (upperB - lowerB + 1)) + lowerB
    }
    return Math.random() * (upperB - lowerB) + lowerB
  }

  // --------------------------------Object----------------------------------------Object
  // _.assign ----------------------------------------------------------------- 1
  _.assign = function(obj, ...sources) {
    return Object.assign(obj, ...sources)
  }

  // _.assignIn ----------------------------------------------------------------- 2
  _.assignIn = function(obj, ...sources) {
    sources.forEach(item => {
      for (var key in item) {
        obj[key] = item[key]
      }
    })
    return obj
  }

  // _.assignInWith ----------------------------------------------------------------- 3
  _.assignInWith = function(obj, ...sources) {
    if (_.isFunction(sources[sources.length - 1])) {
      var customizer = sources.pop()
      sources.forEach(item => {
        for (var key in item) {
          var customize = customizer(obj[key], item[key], key, obj, item)
          if (customize === void 0) {
            obj[key] = item[key]
          } else {
            obj[key] = customize
          }
        }
      })
      return obj
    } else {
      return _.assignInWith(obj, ...sources)
    }
  }

  // _.assignWith  ----------------------------------------------------------------- 4
  _.assignWith = function(obj, ...sources) {
    if (_.isFunction(sources[sources.length - 1])) {
      var customizer = sources.pop()
      sources.forEach(item => {
        for (var key in item) {
          if (item.hasOwnProperty(key)) {
            var customize = customizer(obj[key], item[key], key, obj, item)
            if (customize === void 0) {
              obj[key] = item[key]
            } else {
              obj[key] = customize
            }
          }
        }
      })
      return obj
    } else {
      return _.assign(obj, ...sources)
    }
  }

  // _.at  ----------------------------------------------------------------- 5
  _.at = function(obj, paths) {
    var paths = [].concat(paths)
    var result = []
    paths.forEach((pathStr, index) => {
      var pathArr = _.toPath(pathStr)
      result[index] = pathArr.reduce((accumulator, currentVal) => {
        return accumulator[currentVal]
      }, obj)
    })
    return result
  }

  // _.create  ----------------------------------------------------------------- 6
  _.create = function(prototype, properties) {
    return Object.assign(Object.create(prototype), properties)
  }

  // _.defaults  ---------------------------------------------------------------- 7
  _.defaults = function(obj, ...sources) {
    function customizer(objVal, srcVal) {
      return _.isUndefined(objVal) ? srcVal : objVal
    }
    return _.assignInWith(obj, ...sources.concat(customizer))
  }

  // _.defaultsDeep  --------------------------------------------------------- 8
  _.defaultsDeep = function(obj, ...sources) {
    sources.forEach(item => {
      for (var key in item) {
        if (!_.isObject(item[key])) {
          if (!(key in obj)) {
            obj[key] = item[key]
          }
        } else {
          obj[key] = _.defaultsDeep(obj[key], item[key])
        }
      }
    })
    return obj
  }

  // _.entries -> toPairs  -------------------------------------------------- 9
  _.entries = function(obj) {
    return Object.entries(obj)
  }

  // _.entriesIn -> toPairsIn  ----------------------------------------------- 10
  _.entriesIn = function(obj) {
    var result = []
    for (var key in obj) {
      result.push([key, obj[key]])
    }
    return result
  }

  // _.extend -> assignIn  -------------------------------------------------- 11
  _.extend = _.assignIn

  // _.extendWith -> assignInWith  -------------------------------------------- 12
  _.extendWith = _.assignInWith

  // _.findKey  ----------------------------------------------------------------- 13
  _.findKey = function(obj, predicate) {
    var iteratee = _cb(predicate, emptyObj, 3)
    var keys = Object.keys(obj)
    var isArr = _.isArray(obj)
    return keys.find(key => iteratee(obj[key], isArr ? Number(key) : key, obj))
  }

  // _.findLastKey  ----------------------------------------------------------- 14
  _.findLastKey = function(obj, predicate) {
    var iteratee = _cb(predicate, emptyObj, 3)
    var keys = Object.keys(obj).reverse()
    var isArr = _.isArray(obj)
    return keys.find(key => iteratee(obj[key], isArr ? Number(key) : key, obj))
  }

  // _.forIn ----------------------------------------------------------------- 15
  _.forIn = function(obj, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 3)
    var isArr = _.isArray(obj)
    for (let key in obj) {
      var status = iteratee(obj[key], isArr ? Number(key) : key, obj)
      if (status === false) return obj
    }
    return obj
  }

  // _.forInRight ------------------------------------------------------------- 16
  _.forInRight = function(obj, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 3)
    var isArr = _.isArray(obj)
    var keys = []
    for (let key in obj) {
      keys.push(key)
    }
    keys.reverse().some(key => iteratee(obj[key], isArr ? Number(key) : key, obj) === false)
    return obj
  }

  // _.forOwn ----------------------------------------------------------------- 17
  _.forOwn = function(obj, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 3)
    var isArr = _.isArray(obj)
    var keys = Object.keys(obj)
    keys.some(key => iteratee(obj[key], isArr ? Number(key) : key, obj) === false)
    return obj
  }

  // _.forOwnRight  ----------------------------------------------------------- 18
  _.forOwnRight = function(obj, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 3)
    var isArr = _.isArray(obj)
    var keys = Object.keys(obj).reverse()
    keys.some(key => iteratee(obj[key], isArr ? Number(key) : key, obj) === false)
    return obj
  }

  // _.functions  ------------------------------------------------------------- 19
  _.functions = function(obj) {
    return Object.keys(obj)
  }

  // _.functionsIn ----------------------------------------------------------------- 20
  _.functionsIn = function(obj) {
    var result = []
    for (var key in obj) {
      result.push(key)
    }
    return result
  }

  // _.get ----------------------------------------------------------------- 21
  _.get = function(obj, path, defaultVal) {
    var pathArr = _.toPath(path)
    var result = pathArr.reduce((accumulator, currentVal) => {
      return accumulator === void 0 ? accumulator : accumulator[currentVal]
    }, obj)
    return result === void 0 ? defaultVal : result
  }

  // _.has ----------------------------------------------------------------- 22
  _.has = function(obj, path) {
    var pathArr = _.toPath(path)
    var tmp = obj
    for (let i = 0; i < pathArr.length; i++) {
      if (tmp.hasOwnProperty(pathArr[i])) {
        tmp = tmp[pathArr[i]]
      } else {
        return false
      }
    }
    return true
  }

  // _.hasIn ----------------------------------------------------------------- 23
  _.hasIn = function(obj, path) {
    var pathArr = _.toPath(path)
    var tmp = obj
    for (let i = 0; i < pathArr.length; i++) {
      if (pathArr[i] in tmp) {
        tmp = tmp[pathArr[i]]
      } else {
        return false
      }
    }
    return true
  }

  // _.invert ----------------------------------------------------------------- 24
  _.invert = function(obj) {
    var pairs = _.entries(obj)
    var result = Object.create(Object.getPrototypeOf(obj))
    pairs.forEach(item => {
      result[item[1]] = item[0]
    })
    return result
  }

  // _.invertBy  -------------------------------------------------------------- 25
  _.invertBy = function(obj, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 1)
    var pairs = Object.entries(obj)
    var result = {}
    pairs.forEach(pair => {
      var tmp = iteratee(pair[1])
      if (tmp in result) {
        result[tmp].push(pair[0])
      } else {
        result[tmp] = [pair[0]]
      }
    })
    return result
  }

  // _.invoke ----------------------------------------------------------------- 26
  _.invoke = function(obj, path, ...args) {
    var pathArr = _.toPath(path)
    var method = pathArr.pop()
    var master = _.get(obj, pathArr)
    return Object.create(Object.getPrototypeOf(master))[method].apply(master, args)
  }

  // _.keys  ----------------------------------------------------------------- 27
  _.keys = function(obj) {
    return Object.keys(obj)
  }

  // _.keysIn  ----------------------------------------------------------------- 28
  _.keysIn = function(obj) {
    var keys = []
    for (var key in obj) {
      keys.push(key)
    }
    return keys
  }

  // _.mapKeys  ----------------------------------------------------------------- 29
  _.mapKeys = function(obj, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 3)
    var keys = Object.keys(obj)
    var isArr = _.isArray(obj)
    var result = {}
    keys.forEach(key => {
      var tmp = iteratee(obj[key], isArr ? Number(key) : key, obj)
      result[tmp] = obj[key]
    })
    return result
  }

  // _.mapValues  ------------------------------------------------------------- 30
  _.mapValues = function(obj, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 3)
    var keys = Object.keys(obj)
    var isArr = _.isArray(obj)
    var result = {}
    keys.forEach(key => {
      var tmp = iteratee(obj[key], isArr ? Number(key) : key, obj)
      result[key] = tmp
    })
    return result
  }

  // _.merge  ----------------------------------------------------------------- 31
  _.merge = function(obj, ...sources) {
    sources.forEach(item => {
      if (!_.isObject(obj)) {
        obj = item
      } else {
        for (var key in item) {
          if (key in obj) {
            obj[key] = _.merge(obj[key], item[key])
          } else {
            obj[key] = item[key]
          }
        }
      }
    })
    return obj
  }

  // _.mergeWith  ----------------------------------------------------------------- 32
  _.mergeWith = function(obj, ...sources) {
    if (_.isFunction(sources[sources.length])) return _.merge(obj, ...sources)
    var method = sources.pop()
    sources.forEach(item => {
      if (!_.isObject(obj)) {
        obj = item
      } else {
        for (var key in item) {
          var customize = method(obj[key], item[key], key, obj, item)
          if (customize === void 0) {
            if (key in obj) {
              obj[key] = _.merge(obj[key], item[key])
            } else {
              obj[key] = item[key]
            }
          } else {
            obj[key] = customize
          }
        }
      }
    })
    return obj
  }

  // _.omit  ----------------------------------------------------------------- 33
  _.omit = function(obj, paths) {
    var objPaths = []
    var tmpPath = []
    var result = Object.create(Object.getPrototypeOf(obj))

    function parsePath(obj) {
      if (!_.isObject(obj)) {
        objPaths.push(tmpPath.slice())
        return
      }
      for (var key in obj) {
        tmpPath.push(key)
        parsePath(obj[key])
        tmpPath.pop()
      }
    }
    parsePath(obj)
    paths = paths.map(path => _.toPath(path))
    var resultPaths = objPaths.filter(path => !paths.some(item => _.isEqual(item, path)))
    resultPaths.forEach(path => {
      var tmp = result
      var val = obj
      for (var i = 0; i < path.length - 1; i++) {
        if (!(path[i] in tmp)) {
          tmp[path[i]] = Object.create(Object.getPrototypeOf(val[path[i]]))
        }
        tmp = tmp[path[i]]
        val = val[path[i]]
      }
      tmp[path[i]] = val[path[i]]
    })
    return result
  }

  // _.omitBy ----------------------------------------------------------------- 34
  _.omitBy = function(obj, predicate) {
    var iteratee = _cb(predicate, emptyObj, 2)
    var keys = Object.keys(obj)
    var isArr = _.isArray(obj)
    var result = {}
    keys.forEach(key => {
      var tmp = iteratee(obj[key], isArr ? Number(key) : key)
      if (!tmp) {
        result[key] = obj[key]
      }
    })
    return result
  }

  // _.pick ----------------------------------------------------------------- 35
  _.pick = function(obj, paths) {
    var objPaths = []
    var tmpPath = []
    var result = Object.create(Object.getPrototypeOf(obj))

    function parsePath(obj) {
      if (!_.isObject(obj)) {
        objPaths.push(tmpPath.slice())
        return
      }
      for (var key in obj) {
        tmpPath.push(key)
        parsePath(obj[key])
        tmpPath.pop()
      }
    }
    parsePath(obj)
    paths = paths.map(path => _.toPath(path))
    var resultPaths = objPaths.filter(path => paths.some(item => _.isEqual(item, path)))
    resultPaths.forEach(path => {
      var tmp = result
      var val = obj
      for (var i = 0; i < path.length - 1; i++) {
        if (!(path[i] in tmp)) {
          tmp[path[i]] = Object.create(Object.getPrototypeOf(val[path[i]]))
        }
        tmp = tmp[path[i]]
        val = val[path[i]]
      }
      tmp[path[i]] = val[path[i]]
    })
    return result
  }

  // _.pickBy  ----------------------------------------------------------------- 36
  _.pickBy = function(obj, predicate) {
    var iteratee = _cb(predicate, emptyObj, 2)
    var keys = Object.keys(obj)
    var isArr = _.isArray(obj)
    var result = {}
    keys.forEach(key => {
      var tmp = iteratee(obj[key], isArr ? Number(key) : key)
      if (tmp) {
        result[key] = obj[key]
      }
    })
    return result
  }

  // _.result  ----------------------------------------------------------------- 37
  _.result = function(obj, path, defaultVal) {
    var result = _.get(obj, path, defaultVal)
    if (_.isFunction(result)) {
      return result.call(this)
    }
    return result
  }

  // _.set  ----------------------------------------------------------------- 38
  _.set = function(obj, path, val) {
    var pathArr = _.toPath(path)
    var tmp = obj
    for (var i = 0; i < pathArr.length; i++) {
      if (i === pathArr.length - 1) {
        tmp[pathArr[i]] = val
      } else {
        if (!(pathArr[i] in tmp)) {
          if (_.isNaN(Number(pathArr[i + 1]))) {
            tmp[pathArr[i]] = {}
          } else {
            tmp[pathArr[i]] = []
          }
        }
        tmp = tmp[pathArr[i]]
      }
    }
    return obj
  }

  // _.setWith  ----------------------------------------------------------------- 39
  _.setWith = function(obj, path, val, customizer) {
    if (!_.isFunction(customizer)) return _.set(obj, path, val)
    var pathArr = _.toPath(path)
    var tmp = obj
    for (var i = 0; i < pathArr.length; i++) {
      if (i === pathArr.length - 1) {
        tmp[pathArr[i]] = val
      } else {
        if (!(pathArr[i] in tmp)) {
          var customize = customizer(tmp[pathArr[i]], pathArr[i], tmp)
          if (customize !== void 0) {
            tmp[pathArr[i]] = customize
          } else if (_.isNaN(Number(pathArr[i + 1]))) {
            tmp[pathArr[i]] = {}
          } else {
            tmp[pathArr[i]] = []
          }
        }
        tmp = tmp[pathArr[i]]
      }
    }
    return obj
  }

  // _.toPairs --------------------------------------------------------------- 40
  _.toPairs = _.entries

  // _.toPairsIn  ------------------------------------------------------------ 41
  _.toPairsIn = _.entriesIn

  // _.transform  ------------------------------------------------------------ 42
  _.transform = function(obj, iteratee, accumulator) {
    iteratee = _cb(iteratee, emptyObj, 4)
    accumulator = accumulator === void 0 ? Object.creat(Object.getPrototypeOf(obj)) : accumulator
    var keys = Object.keys(obj)
    var isArr = _.isArray(obj)
    keys.some(key => {
      var tmp = iteratee(accumulator, obj[key], key, obj)
      return tmp === false
    })
    return accumulator
  }

  // _.unset  ----------------------------------------------------------------- 43
  _.unset = function(obj, path) {
    var pathArr = _.toPath(path)
    var tmp = obj
    for (var i = 0; i < pathArr.length - 1; i++) {
      if (i === pathArr.length - 2) {
        if (pathArr[i + 1] in tmp[pathArr[i]]) {
          delete tmp[pathArr[i]][pathArr[i + 1]]
          return true
        }
        return false
      }
      if (!(pathArr[i] in tmp)) return false
      tmp = tmp[pathArr[i]]
    }
  }

  // _.update  ----------------------------------------------------------------- 44
  _.update = function(obj, path, updater) {
    var pathArr = _.toPath(path)
    var tmp = obj
    for (var i = 0; i < pathArr.length; i++) {
      if (i === pathArr.length - 1) {
        tmp[pathArr[i]] = updater(tmp[pathArr[i]])
      } else {
        if (!(pathArr[i] in tmp)) {
          if (_.isNaN(Number(pathArr[i + 1]))) {
            tmp[pathArr[i]] = {}
          } else {
            tmp[pathArr[i]] = []
          }
        }
        tmp = tmp[pathArr[i]]
      }
    }
    return obj
  }

  // _.updateWith  ----------------------------------------------------------------- 45
  _.updateWith = function(obj, path, updater, customizer) {
    if (!_.isFunction(customizer)) return _.update(obj, path, updater)
    var pathArr = _.toPath(path)
    var tmp = obj
    for (var i = 0; i < pathArr.length; i++) {
      if (i === pathArr.length - 1) {
        tmp[pathArr[i]] = updater(tmp[pathArr[i]])
      } else {
        if (!(pathArr[i] in tmp)) {
          var customize = customizer(tmp[pathArr[i]], pathArr[i], tmp)
          if (customize !== void 0) {
            tmp[pathArr[i]] = customize
          } else if (_.isNaN(Number(pathArr[i + 1]))) {
            tmp[pathArr[i]] = {}
          } else {
            tmp[pathArr[i]] = []
          }
        }
        tmp = tmp[pathArr[i]]
      }
    }
    return obj
  }

  // _.values  ----------------------------------------------------------------- 46
  _.values = function(obj) {
    return Object.values(obj)
  }

  // _.valuesIn  ----------------------------------------------------------------- 47
  _.valuesIn = function(obj) {
    var result = []
    for (var key in obj) {
      result.push(obj[key])
    }
    return result
  }

  // --------------------------------Seq-------------------------------------------Seq

  //_.chain -------------------------------
  _.chain = function(obj) {
    var instance = _(obj)
    instance._chain = true
    return instance
  }

  // --------------------------------String----------------------------------------String

  // _.camelCase ------------------------------------------------------------ 1
  _.camelCase = function(str = '') {
    return _baseWordSeparate(str).map((it, index) => {
      if (index === 0) return it.toLowerCase()
      return it.substr(0, 1).toUpperCase() + it.substring(1).toLowerCase()
    }).join('')
  }

  // _.capitalize ------------------------------------------------------------ 2
  _.capitalize = function(str = '') {
    return str.substr(0, 1).toUpperCase() + str.substring(1).toLowerCase()
  }

  // _.deburr ------------------------------------------------------------ 3

  // _.endsWith ------------------------------------------------------------ 4
  _.endsWith = function(str = '', target, position = str.length) {
    return str.endsWith(target, position)
  }

  // _.escape ------------------------------------------------------------ 5
  _.escape = function(str = '') {
    return str.replace(/[&<>"']/g, $0 => {
      if ($0 === '&') return '&amp;'
      if ($0 === '<') return '&lt;'
      if ($0 === '>') return '&gt;'
      if ($0 === '"') return '&quot;'
      if ($0 === "'") return '&apos;'
    })
  }

  // _.escapeRegExp ------------------------------------------------------------ 6
  _.escapeRegExp = function(str = '') {
    //"^", "$", "", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", and "|"
    return str.replace(/[\^\$\.\*\+\?\(\)\[\]\{\}\|]/g, $0 => '\\' + $0)
  }

  // _.kebabCase ------------------------------------------------------------ 7
  _.kebabCase = function(str = '') {
    return _baseWordSeparate(str).join('-').toLowerCase()
  }

  // _.lowerCase ------------------------------------------------------------ 8
  _.lowerCase = function(str = '') {
    return _baseWordSeparate(str).join(' ').toLowerCase()
  }

  // _.lowerFirst ------------------------------------------------------------ 9
  _.lowerFirst = function(str = '') {
    return str.substr(0, 1).toLowerCase() + str.substring(1)
  }

  // _.pad ------------------------------------------------------------ 10
  _.pad = function(str = '', len = 0, chars = ' ') {
    let strL = str.length
    let addLen = len - strL > 0 ? len - strL : 0
    if (addLen === 0) return str
    let leftL = Math.floor(addLen / 2)
    let rightL = Math.ceil(addLen / 2)
    return str.padStart(strL + leftL, chars).padEnd(len, chars)
  }

  // _.padEnd ------------------------------------------------------------ 11
  _.padEnd = function(str = '', len = 0, chars = ' ') {
    return str.padEnd(len, chars)
  }

  // _.padStart ------------------------------------------------------------ 12
  _.padStart = function(str = '', len = 0, chars = ' ') {
    return str.padStart(len, chars)
  }

  // _.parseInt ------------------------------------------------------------ 13
  _.parseInt = function(str, radix = 10) {
    return parseInt(str, radix)
  }

  // _.repeat ------------------------------------------------------------ 14
  _.repeat = function(str = '', n = 1) {
    return str.repeat(n)
  }

  // _.replace ------------------------------------------------------------ 15
  _.replace = function(str = '', pattern, replacement) {
    return str.replace(pattern, replacement)
  }

  // _.snakeCase ------------------------------------------------------------ 16
  _.snakeCase = function(str = '') {
    return _baseWordSeparate(str).join('_').toLowerCase()
  }

  // _.split ------------------------------------------------------------ 17
  _.split = function(str = '', separator, limit) {
    var result = str.split(separator)
    if (limit === void 0) return result
    return result.slice(0, limit)
  }

  // _.startCase ------------------------------------------------------------ 18
  _.startCase = function(str) {
    return _baseWordSeparate(str).map(it => it.slice(0, 1).toUpperCase() + it.slice(1)).join(' ')
  }

  // _.startsWith ------------------------------------------------------------ 19
  _.startsWith = function(str = '', target, position = 0) {
    return str.startsWith(target, position)
  }

  // _.template ------------------------------------------------------------ 20

  // _.toLower ------------------------------------------------------------ 21
  _.toLower = function(str = '') {
    return str.toLowerCase()
  }

  // _.toUpper ------------------------------------------------------------ 22
  _.toUpper = function(str = '') {
    return str.toUpperCase()
  }

  // _.trim ------------------------------------------------------------ 23
  _.trim = function(str = '', chars = ' ') {
    return _.trimEnd(_.trimStart(str, chars), chars)
  }

  // _.trimEnd ------------------------------------------------------------ 24
  _.trimEnd = function(str = '', chars = ' ') {
    if (chars === ' ') return str.trimRight()
    var pos
    for (let i = str.length - 1; i >= 0; i--) {
      if (!chars.includes(str[i])) {
        pos = i
        break
      }
    }
    return pos === void 0 ? str : str.slice(0, pos + 1)
  }

  // _.trimStart ------------------------------------------------------------ 25
  _.trimStart = function(str = '', chars = ' ') {
    if (chars === ' ') return str.trimLeft()
    var pos
    for (var i = 0; i < str.length; i++) {
      if (!chars.includes(str[i])) {
        pos = i
        break
      }
    }
    return pos === void 0 ? str : str.slice(pos)
  }

  // _.truncate ------------------------------------------------------------ 26
  _.truncate = function(str = '', options = {}) {
    let length = options['length'] || 30
    let omission = options['omission'] || '...'
    let separator = options['separator']
    let strLen = length - omission.length > 0 ? length - omission.length : 0
    if (separator === void 0) {
      return str.substr(0, strLen) + omission
    }
    let result = str.substr(0, strLen)
    let lastMatch = _.isRegExp(separator) ? result.match(new RegExp(separator, 'g')).pop() : separator
    return result.slice(0, result.lastIndexOf(lastMatch)) + omission
  }

  // _.unescape ------------------------------------------------------------ 27
  _.unescape = function(str = '') {
    return str.replace(/(&amp;|&lt;|&gt;|&quot;|&apos;)/g, $0 => {
      if ($0 === '&amp;') return '&'
      if ($0 === '&lt;') return '<'
      if ($0 === '&gt;') return '>'
      if ($0 === '&quot;') return '"'
      if ($0 === '&apos;') return "'"
    })
  }

  // _.upperCase ------------------------------------------------------------ 28
  _.upperCase = function(str = '') {
    return _baseWordSeparate(str).join(' ').toUpperCase()
  }

  // _.upperFirst ------------------------------------------------------------ 29
  _.upperFirst = function(str = '') {
    return str.slice(0, 1).toUpperCase() + str.slice(1)
  }

  // _.words ------------------------------------------------------------ 30
  _.words = function(str, pattern) {
    pattern = pattern || /[a-zA-Z0-9]+/g
    return str.match(pattern)
  }

  // --------------------------------Util------------------------------------------Util
  //_.attempt --------------------------------------------------------------- 1
  _.attempt = function(func, args) {
    try {
      return func.call(emptyObj, ...args)
    } catch (err) {
      return isError(err) ? err : new Error(err)
    }
  }

  //_.bindAll --------------------------------------------------------------- 2
  _.bindAll = function(obj, methodNames) {
    methodNames = _.isArray(methodNames) ? methodNames : [methodNames]
    methodNames.forEach(methodsName => {
      obj[methodsName] = obj[methodsName].bind(obj)
    })
    return obj
  }

  //_.cond ----------------------------------------------------------------- 3
  _.cond = function(pairs) {
    return function(...args) {
      var index = pairs.findIndex(val => val[0].call(this, ...args))
      return pairs[index][1].call(this, ...args)
    }
  }

  //_.conforms --------------------------------------------------------------- 4
  _.conforms = function(sources) {
    return function(obj) {
      return _.conformsTo(obj, sources)
    }
  }

  //_.constant --------------------------------------------------------------- 5
  _.constant = function(val) {
    return function() {
      return val
    }
  }

  //_.defaultTo --------------------------------------------------------------- 6
  _.defaultTo = function(val, defaultVal) {
    return _.isNil(val) || _.isNaN(val) ? defaultVal : val
  }

  //_.flow --------------------------------------------------------------- 7
  _.flow = function(funcs) {
    return function(...args) {
      return funcs.reduce((accumulator, currentVal, currentIndex) => {
        if (currentIndex === 0) return currentVal.apply(emptyObj, accumulator)
        return currentVal.call(emptyObj, accumulator)
      }, args)
    }
  }

  //_.flowRight --------------------------------------------------------------- 8
  _.flowRight = function(funcs) {
    return function(...args) {
      for (var i = funcs.length - 1; i > 0; i--) {
        var args = [funcs[i].apply(emptyObj, args)]
      }
      return funcs[i].apply(emptyObj, args)
    }
  }

  //_.identity --------------------------------------------------------------- 9
  _.identity = function(val) {
    return val
  }

  //_.iteratee --------------------------------------------------------------- 10
  _.iteratee = function(val) {
    return _cb(val, void 0, Infinity)
  }

  //_.matches --------------------------------------------------------------- 11
  _.matches = function(source) {
    return function(obj) {
      return _.isMatch(obj, source)
    }
  }

  //_.matchesProperty -------------------------------------------------------- 12
  _.matchesProperty = function(path, srcVal) {
    return function(obj) {
      return _.isEqual(_.get(obj, path, Symbol(0)), srcVal)
    }
  }

  //_.method --------------------------------------------------------------- 13
  _.method = function(path, ...args) {
    return function(obj) {
      return _.get(obj, path).apply(emptyObj, args)
    }
  }

  //_.methodOf --------------------------------------------------------------- 14
  _.methodOf = function(obj, ...args) {
    return function(paths) {
      var result = []
      var isArr = _.isArray(paths)
      paths = isArr ? paths : [paths]
      paths.forEach((path, index) => {
        result[index] = _.get(obj, path).apply(emptyObj, args)
      })
      return isArr ? result : result[0]
    }
  }

  //_.mixin --------------------------------------------------------------- 15
  _.mixin = function(obj = {}, source = {}, options = {}) {
    var keys = Object.keys(source)
    var addObj = _.isFunction(obj) ? Object.getPrototypeOf(obj) : obj
    kesy.forEach(key => {
      addObj[key] = source[obj]
    })
    if (options.chain === false) return
    return _.chain(obj)
  }

  //_.noConflict ------------------------------------------------------------- 16
  _.noConflict = function() {
    root.__ = previous_
    return this
  }

  //_.noop --------------------------------------------------------------- 17
  _.noop = function() {
    return void 0
  }

  //_.nthArg --------------------------------------------------------------- 18
  _.nthArg = function(n = 0) {
    return function(...args) {
      n = n >= 0 ? n : args.length + n
      return args[n]
    }
  }

  //_.over --------------------------------------------------------------- 19
  _.over = function(iteratees = [_.identity]) {
    return function(...args) {
      return iteratees.map(iteratee => iteratee.call(this, ...args))
    }
  }

  //_.overEvery --------------------------------------------------------------- 20
  _.overEvery = function(predicates = [_.identity]) {
    return function(...args) {
      return predicates.every(predicate => predicate.call(this, ...args))
    }
  }

  //_.overSome --------------------------------------------------------------- 21
  _.overSome = function(predicates = [_.identity]) {
    return function(...args) {
      return predicates.some(predicate => predicate.call(this, ...args))
    }
  }

  //_.property --------------------------------------------------------------- 22
  _.property = function(path) {
    return function(obj) {
      return _.get(obj, path, void 0)
    }
  }

  //_.propertyOf --------------------------------------------------------------- 23
  _.propertyOf = function(obj) {
    return function(paths) {
      var result = []
      var isArr = _.isArray(paths)
      paths = isArr ? paths : [paths]
      paths.forEach((path, index) => {
        console.log(path)
        result[index] = _.get(obj, path, void 0)
      })
      return isArr ? result : result[0]
    }
  }

  //_.range --------------------------------------------------------------- 24
  _.range = function(start = 0, end, step) {
    let endR = end === void 0 ? start : end
    let startR = end === void 0 ? 0 : start
    let stepR = step === void 0 ? (endR > startR ? 1 : -1) : step
    if ((endR - startR) > 0 && step === 0) return new Array(endR - startR).fill(startR)
    if ((endR - startR) * step <= 0) return []
    var result = []
    if (endR > startR) {
      for (let i = startR; i < endR; i += stepR) {
        result.push(i)
      }
    }
    if (startR > endR) {
      for (let i = startR; i > endR; i += stepR) {
        result.push(i)
      }
    }
    return result
  }

  //_.rangeRight --------------------------------------------------------------- 25
  _.rangeRight = function(start = 0, end, step) {
    return _.range(start, end, step).reverse()
  }

  //_.runInContext --------------------------------------------------------------- 26
  //_.stubArray --------------------------------------------------------------- 27
  _.stubArray = function() {
    return []
  }

  //_.stubFalse --------------------------------------------------------------- 28
  _.stubFalse = function() {
    return false
  }

  //_.stubObject --------------------------------------------------------------- 29
  _.stubObject = function() {
    return {}
  }

  //_.stubString --------------------------------------------------------------- 30
  _.stubString = function() {
    return ''
  }

  //_.stubTrue --------------------------------------------------------------- 31
  _.stubTrue = function() {
    return true
  }

  //_.times --------------------------------------------------------------- 32
  _.times = function(n, iteratee) {
    iteratee = _cb(iteratee, emptyObj, 1)
    var result = []
    for (let i = 0; i < n; i++) {
      result.push(iteratee(i))
    }
    return result
  }

  //_.toPath --------------------------------------------------------------- 33
  _.toPath = function(val) {
    return _.isArray(val) ? val : _.toString(val).split(/[\[\]\.]+/).filter(it => it !== '')
  }

  //_.uniqueId --------------------------------------------------------------- 34
  _.uniqueId = function(prefix = '') {
    return prefix + idCounter++
  }



  // --------------------------------Properties------------------------------------Properties
  // --------------------------------Methods---------------------------------------Methods
  // --------------------------------补充函数---------------------------------------补充函数
  //_.parseJson ----------------------------------------------
  //简易json解析器
  _.parseJson = function(jsonStr) {
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

  // --------------------------------内部函数---------------------------------------内部函数
  //_baseWordSeparate ------------------------------------------------------ 1
  // camelCase kebabCase snakeCase lowerCase startCase upperCase
  var _baseWordSeparate = function(str) {
    var pattern = /[\-_\s]+/g
    if (pattern.test(str)) return str.split(pattern).filter(it => it !== '')
    return str.split(/(?=[A-Z])/)
  }
  var _cb = function(val, context, argCount) {
    if (val == null) return _.identity;
    if (_.isFunction(val)) return _optimizeCb(val, context, argCount)
    if (_.isArray(val)) return _hasVal(val)
    if (_.isObject(val)) return _.matches(val)
    return _.property(val)
  }

  // _optimizeCb -------------------------------------------------------- 2
  var _optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func

    argCount = argCount == null ? 3 : argCount

    if (argCount === 1) {
      return function(val) {
        return func.call(context, val)
      }
    }
    if (argCount === 2) {
      return function(val, index) {
        return func.call(context, val, index)
      }
    }
    if (argCount === 3) {
      return function(val, index, collection) {
        return func.call(context, val, index, collection)
      }
    }
    if (argCount === 4) {
      return function(accumulator, val, index, collection) {
        return func.call(context, accumulator, val, index, collection)
      }
    }
    return function(...args) {
      return func.apply(context, args)
    }
  }

  // _hasVal -------------------------------------------------------- 3
  _hasVal = function(val) {
    return function(obj) {
      var lastVal = val[val.length - 1]
      return _.get(obj, val.slice(0, val.length - 1), Symbol(0)) === lastVal
    }
  }

  // --------------------------------常量---------------------------------------常量
  var idCounter = 0
})()