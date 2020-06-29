type Func = (...args: any[]) => any;

interface MemoizedFunction {
    cache: Map<any, any>;
}

function memoize<T extends Func>(func: T, resolver?: Func): T & MemoizedFunction;
function memoize(func: Func, resolver?: Func): Func & MemoizedFunction {
    function memoized(this: any, ...args: any[]): any {
        const key = resolver ? resolver.call(this, ...args) : args[0];
        const cache = memoized.cache;
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = func.call(this, ...args);
        memoized.cache = cache.set(key, result);
        return result;
    }
    memoized.cache = new (memoize.Cache || Map)();
    return memoized;
}

memoize.Cache = Map;

export { memoize };
