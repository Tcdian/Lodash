import { _baseClone } from './_baseClone';

const CLONE_SYMBOLS_FLAG = 1 << 2;

type PropertyName = string | number | symbol;
type CloneWithCustomizer<TValue, TResult> = (value: TValue, key?: PropertyName, object?: any, stack?: any) => TResult;

function cloneWith<TSource, TResult>(
    value: TSource,
    customizer?: CloneWithCustomizer<TSource, TResult | undefined>
): TSource | TResult {
    return _baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
}

export { cloneWith };
