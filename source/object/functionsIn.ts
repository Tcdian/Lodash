import { isFunction } from '../lang/isFunction';

function functionsIn(object: any): string[] {
    const result: string[] = [];
    for (let key in object) {
        if (isFunction(object[key])) {
            result.push(key);
        }
    }
    return result;
}

export { functionsIn };
