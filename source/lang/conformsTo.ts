import { keys } from '../object/keys';
import { isFunction } from './isFunction';

const ø = Object.create(null);

function conformsTo<T>(object: T, source: { [K in keyof T]?: (value: T[K]) => boolean }): boolean {
    return keys(source).every((key) => {
        const func = source[key as keyof T];
        if (isFunction(func)) {
            return func.call(ø, object[key as keyof T]);
        }
        return false;
    });
}

export { conformsTo };
