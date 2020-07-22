import { get } from './get';
import { toPath } from '../util/toPath';
import { last } from '../array/last';
import { initial } from '../array/initial';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | ReadonlyArray<PropertyName>;

function invoke(object: any, path: PropertyPath, ...args: any[]): any {
    const pathArr = toPath(path);
    const funcName = last(pathArr);
    const data = get(object, initial(pathArr));
    return data[funcName].call(data, ...args);
}

export { invoke };
