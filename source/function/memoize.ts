type Func<TS extends any[], R> = (...args: TS) => R;
interface MemoizedFunction {
    cache: Map<any, any>;
}

function memoize<T extends Func<any[], any>>(
    func: T,
    resolver?: (...args: Parameters<T>) => any
): T & MemoizedFunction {
    function memoized(this: any, ...args: Parameters<T>): ReturnType<T> {
        const key = resolver ? resolver.call(this, ...args) : args[0];
        const cache = memoized.cache;
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = func.call(this, ...args);
        memoized.cache = cache.set(key, result);
        return result;
    }

    memoized.cache = new Map();
    return memoized as T & MemoizedFunction;
}

export { memoize };
