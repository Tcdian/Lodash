import { _baseClone } from './_baseClone';

const CLONE_SYMBOLS_FLAG = 1 << 2;

function clone<T>(value: T): T {
    return _baseClone(value, CLONE_SYMBOLS_FLAG);
}

export { clone };
