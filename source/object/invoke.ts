import { get } from './get';
import { toPath } from '../util/toPath';
import { last } from '../array/last';
import { initial } from '../array/initial';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | ReadonlyArray<PropertyName>;

function invoke(object: any, path: PropertyPath, ...args: any[]): any {
    const pathArr = toPath(path);
    const data = get(object, initial(pathArr));
    const func = data[last(pathArr)];
    return func.call(data, ...args);
}

export { invoke };
