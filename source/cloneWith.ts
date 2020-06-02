import _baseClone from './_baseClone';

const CLONE_SYMBOLS_FLAG = 1 << 2;

type Func = (...args: any[]) => any;

function cloneWith<TSource, TTarget = TSource>(value: TSource, customizer?: Func): TTarget {
    return _baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
}

export default cloneWith;
