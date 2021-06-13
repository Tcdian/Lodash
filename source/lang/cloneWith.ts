import { _baseClone } from './_baseClone';

const CLONE_SYMBOLS_FLAG = 1 << 2;

type PropertyName = string | number | symbol;
type CloneWithCustomizer<T, R> = (value: T, key: PropertyName | undefined, object: any, stack: any) => R;

function cloneWith<T, R>(value: T, customizer?: CloneWithCustomizer<T, R | undefined>): T | R {
    return _baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
}

export { cloneWith };
