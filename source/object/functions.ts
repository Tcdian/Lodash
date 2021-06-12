import { isFunction } from '../lang/isFunction';
import { keys } from './keys';

function functions(object: any): string[] {
    return keys(object).filter((key) => isFunction(object[key]));
}

export { functions };
