import _baseClone from './_baseClone';

const CLONE_SYMBOLS_FLAG = 1 << 2;

type CloneWithCustomizer<TValue, TResult> = (
    value: TValue,
    key: number | string | undefined,
    object: any,
    cach: any
) => TResult;

function cloneWith<TSource, TTarget = TSource>(
    value: TSource,
    customizer?: CloneWithCustomizer<TSource, TTarget>
): TTarget {
    return _baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
}

export default cloneWith;
