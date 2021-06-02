import { get } from '../object/get';
import { isEqual } from '../lang/isEqual';

type PropertyName = string | number | symbol;
type PropertyPath<T> = T | ReadonlyArray<T>;

function matchesProperty<T, V>(path: PropertyPath<PropertyName>, srcValue: T) {
    return function (object: V): boolean {
        return isEqual(get(object, path), srcValue);
    };
}

export { matchesProperty };
