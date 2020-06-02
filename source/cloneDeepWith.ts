import _baseClone from './_baseClone';

const CLONE_DEEP_FLAG = 1 << 0;
const CLONE_SYMBOLS_FLAG = 1 << 2;

type Func = (...args: any[]) => any;

function cloneDeepWith<TSource, TTarget = TSource>(value: TSource, customizer?: Func): TTarget {
    return _baseClone(value, CLONE_SYMBOLS_FLAG | CLONE_DEEP_FLAG, customizer);
}

export default cloneDeepWith;
