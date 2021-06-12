import { get } from '../object/get';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | ReadonlyArray<PropertyName>;

function property<TObj, R>(path: PropertyPath): (object: TObj) => R {
    return function (object: TObj): R {
        return get(object, path);
    };
}

export { property };
