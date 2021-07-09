import { isString } from '../lang/isString';
import { isSymbol } from '../lang/isSymbol';

function _toKey(value: any): string | symbol {
    if (isString(value) || isSymbol(value)) {
        return value;
    }
    return '' + value;
}

export { _toKey };
