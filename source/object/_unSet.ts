import { toPath } from '../util/toPath';
import { get } from './get';
import { initial } from '../array/initial';
import { last } from '../array/last';
import { isNil } from '../lang/isNil';
import { _toKey } from '../util/_toKey';

type PropertyName = string | number | symbol;
type Many<T> = T | T[];

function _unSet(object: any, path: Many<PropertyName>): boolean {
    const formattedPath = toPath(path);
    const parent = get(object, initial(formattedPath));
    return isNil(parent) || delete parent[_toKey(last(formattedPath))];
}

export { _unSet };
