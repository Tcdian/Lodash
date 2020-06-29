import { _baseClone } from './_baseClone';

const CLONE_DEEP_FLAG = 1 << 0;
const CLONE_SYMBOLS_FLAG = 1 << 2;

type CloneWithCustomizer<TValue, TResult> = (
    value: TValue,
    key: number | string | undefined,
    object: any,
    cach: any
) => TResult;

function cloneDeepWith<TSource, TTarget = TSource>(
    value: TSource,
    customizer?: CloneWithCustomizer<TSource, TTarget | undefined>
): TTarget | TSource {
    return _baseClone(value, CLONE_SYMBOLS_FLAG | CLONE_DEEP_FLAG, customizer);
}

export { cloneDeepWith };
