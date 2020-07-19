import { isNil } from '../lang/isNil';
import { isNaN } from '../lang/isNaN';

function defaultTo<T, R>(value: T | null | undefined, defaultValue: R): T | R {
    if (isNil(value) || isNaN(value)) {
        return defaultValue;
    }
    return value;
}

export { defaultTo };
