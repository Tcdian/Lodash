import { toPath } from '../util/toPath';
import { get } from './get';
import { initial } from '../array/initial';
import { last } from '../array/last';
import { isNil } from '../lang/isNil';
import { _toKey } from './_toKey';

type PropertyName = string | number | symbol;
type Many<T> = T | T[];
type PropertyPath = Many<PropertyName>;

function unset(object: any, path: PropertyPath): boolean {
    const formattedPath = toPath(path);
    const parent = get(object, initial(formattedPath));
    return isNil(parent) || delete parent[_toKey(last(formattedPath))];
}

export { unset };
