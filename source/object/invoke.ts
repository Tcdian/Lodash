import { get } from './get';
import { toPath } from '../util/toPath';
import { last } from '../array/last';
import { initial } from '../array/initial';
import { isNil } from '../lang/isNil';
import { _toKey } from '../util/_toKey';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | ReadonlyArray<PropertyName>;

function invoke(object: any, path: PropertyPath, ...args: any[]): any {
    const pathArr = toPath(path);
    const data = get(object, initial(pathArr));
    const func = isNil(data) ? data : data[_toKey(last(pathArr))];
    return isNil(func) ? undefined : func.call(data, ...args);
}

export { invoke };
