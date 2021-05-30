import { isFunction } from '../lang/isFunction';

function _baseIteratee(value: any) {
    if (isFunction(value)) {
        return value;
    }
}
