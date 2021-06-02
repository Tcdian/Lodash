import { keys } from '../object/keys';
import { isSet } from '../lang/isSet';
import { isMap } from '../lang/isMap';

type PropertyName = string | number | symbol;

function size(
    collection: unknown[] | Record<PropertyName, unknown> | string | Map<unknown, unknown> | Set<unknown>
): number {
    if (isSet(collection) || isMap(collection)) {
        return collection.size;
    }
    return keys(collection).length;
}

export { size };
