import { entries } from '../object/entries';
import { isFunction } from './isFunction';

type PropertyName = string | number | symbol;

function conformsTo<K extends PropertyName, V>(
    object: Record<K, V>,
    source: Partial<Record<K, (value: V) => boolean>>
): boolean {
    return entries(source).every(([key, func]) => {
        const ø = Object.create(null);
        if (isFunction(func)) {
            return func.call(ø, object[key as K]);
        }
        return false;
    });
}

export { conformsTo };
