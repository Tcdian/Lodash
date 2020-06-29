import { isFunction } from '../lang/isFunction';

function functions(object: any): string[] {
    return Object.keys(object).filter((key) => isFunction(object[key]));
}

export { functions };
