import { _baseClone } from './_baseClone';

const CLONE_DEEP_FLAG = 1 << 0;
const CLONE_SYMBOLS_FLAG = 1 << 2;

function cloneDeep<T>(vale: T): T {
    return _baseClone(vale, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

export { cloneDeep };
