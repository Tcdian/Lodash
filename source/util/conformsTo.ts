import { keys } from '../object/keys';
import { isFunction } from '../lang/isFunction';

const ø = Object.create(null);

function conformsTo<T>(object: T, source: { [K in keyof T]?: (value: T[K]) => boolean }): boolean {
    return keys(source).every((key) => {
        // @ts-ignore
        return isFunction(source[key]) && source[key].call(ø, object[key]);
    });
}

export { conformsTo };
