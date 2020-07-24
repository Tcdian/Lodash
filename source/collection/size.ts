import { keys } from '../object/keys';
import { isSet } from '../lang/isSet';
import { isMap } from '../lang/isMap';

function size(collection: object | string): number {
    if (isSet(collection) || isMap(collection)) {
        return collection.size;
    }
    return keys(collection).length;
}

export { size };
