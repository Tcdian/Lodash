import { set } from './set';
import { get } from './get';

type PropertyName = string | number | symbol;
type Many<T> = T | T[];
type PropertyPath = Many<PropertyName>;

function update(object: any, path: PropertyPath, updater: (value: any) => any): any {
    return set(object, path, updater(get(object, path)));
}

export { update };
