import { isFunction } from '../lang/isFunction';
import { keysIn } from './keysIn';

function functionsIn(object: any): string[] {
    return keysIn(object).filter((key) => isFunction(object[key]));
}

export { functionsIn };
