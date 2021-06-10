type Func = (...args: any[]) => any;

interface MemoizedFunction {
    cache: Map<any, any>;
}

function memoize<TFunc extends Func>(
    func: TFunc,
    resolver?: (...args: Parameters<TFunc>) => any
): TFunc & MemoizedFunction {
    function memoized(this: any, ...args: Parameters<TFunc>): ReturnType<TFunc> {
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
    return memoized as TFunc & MemoizedFunction;
}

export { memoize };
