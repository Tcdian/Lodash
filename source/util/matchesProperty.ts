import { get } from '../object/get';
import { isEqual } from '../lang/isEqual';

type PropertyName = string | number | symbol;
type Many<T> = T | T[];

function matchesProperty<T, V>(path: Many<PropertyName>, srcValue: T) {
    return function (object: V): boolean {
        return isEqual(get(object, path), srcValue);
    };
}

export { matchesProperty };
