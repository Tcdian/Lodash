import { get } from '../object/get';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | ReadonlyArray<PropertyName>;

function property<TObj, TResult>(path: PropertyPath): (object: TObj) => TResult {
    return function (object: TObj): TResult {
        return get(object, path);
    };
}

export { property };
