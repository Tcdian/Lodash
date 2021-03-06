import { get } from '../object/get';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | ReadonlyArray<PropertyName>;

function property<T extends object, TResult>(path: PropertyPath): (object: T) => TResult {
    return function (this: any, object: T): TResult {
        return get(object, path);
    };
}

export { property };
