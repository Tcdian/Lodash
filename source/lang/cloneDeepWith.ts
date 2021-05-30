import { _baseClone } from './_baseClone';

const CLONE_DEEP_FLAG = 1 << 0;
const CLONE_SYMBOLS_FLAG = 1 << 2;

type PropertyName = string | number | symbol;
type CloneWithCustomizer<T> = (value: any, key?: PropertyName, object?: T, cache?: Map<any, any>) => any;

function cloneDeepWith<T>(value: T, customizer?: CloneWithCustomizer<T>): any {
    return _baseClone(value, CLONE_SYMBOLS_FLAG | CLONE_DEEP_FLAG, customizer);
}

export { cloneDeepWith };
