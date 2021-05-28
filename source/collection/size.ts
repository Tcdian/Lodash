import { keys } from '../object/keys';
import { isSet } from '../lang/isSet';
import { isMap } from '../lang/isMap';

type PropertyName = string | number | symbol;

function size(collection: Record<PropertyName, unknown> | string): number {
    if (isSet(collection) || isMap(collection)) {
        return collection.size;
    }
    return keys(collection).length;
}

export { size };
