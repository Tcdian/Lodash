import { toPath } from '../util/toPath';
import { get } from './get';
import { initial } from '../array/initial';
import { last } from '../array/last';
import { isNil } from '../lang/isNil';
import { _toKey } from '../util/_toKey';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | PropertyName[];

function _unSet(object: any, path: PropertyPath): boolean {
    const pathArr = toPath(path);
    const parent = get(object, initial(pathArr));
    return isNil(parent) || delete parent[_toKey(last(pathArr))];
}

export { _unSet };
