import { _baseClone } from './_baseClone';

const CLONE_DEEP_FLAG = 1 << 0;
const CLONE_SYMBOLS_FLAG = 1 << 2;

type PropertyName = string | number | symbol;
type CloneDeepWithCustomizer<T> = (value: any, key: PropertyName | undefined, object: T | undefined, stack: any) => any;

function cloneDeepWith<T>(value: T, customizer?: CloneDeepWithCustomizer<T>): any {
    return _baseClone(value, CLONE_SYMBOLS_FLAG | CLONE_DEEP_FLAG, customizer);
}

export { cloneDeepWith };
