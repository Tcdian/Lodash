## tcdian_lodash
##### 为了加强自己对js基础的掌握, 计划用七天时间仿写一个lodash库
最后用时九天,完成lodash共 298 个函数,其中很多函数的实现没有完整的还原lodash函数的所有功能,并且很多的测试用例都比较少,很多函数的实现存在一些问题,这是我今后需要去修改和完善的地方.<br>
这次lodash的简单实现, 有几个我印象比较深的地方:
* iteratee <br>
通过iteratee函数, 将传入的参数处理成一个函数,这使得我们在使用lodash的一些高阶函数时,传入的值并不局限于函数,传入的值会被iteratee进行处理,返回需要的函数.
* isEqual <br>
isEqual 的实现需要考虑很多问题, 我在实现中没有考虑ES6新加入的Map 和 Set等新的数据结构, 对于循环引用问题,我用一个Map存储出现过的值.
构造函数问题, 如果两个值均有constructor,则判断两个值的constructor是否为同一个, 如果其中一个没有constructor, 则忽略不考虑,判断其他属性是否equal.
对于对象的Symbol属性, 我在实现中没有去考虑. isEqual 还需要进一步去完善.
* cloneDeep <br>
和isEqual类似, 我在实现的时候考虑的情况和isEqual基本类似,没有考虑ES6新添加的Map 和 Set.
* throttle debounce <br>
lodash的 这两个函数配置项比较多, 实现也较为复杂, 基本上这两个函数相当于我们平时使用中的debounce和throttle的混合体.
* bind <br>
lodash的bind函数支持传入lodash自身来当做占位符
* curry <br>
函数柯里化,函数接收的参数没有达到指定数量时, 将传入的参数bind到函数上, 返回该bind函数
* memoize <br>
将函数运行的结果保存在Cache中, 函数被重复调用时,返回保存的结果, Cache使用ES6 Map, 支持对Cache进行修改
* chain <br>
lodash 本身的实现是支持无new 调用的, 此方法让lodash支持链式调用.
##### 还有很多函数在实现的过程中遇到过一些问题, 计划在接下来的时间里, 阅读一下lodash的源码,学习lodash作者的代码实现思路和方式, 之后再去重新实现一遍lodash库.我认为很多细节的东西,需要不断去摸索,尝试,才能掌握好.对自己说一声: 加油 !