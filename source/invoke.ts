import get from './get';
import toPath from './toPath';
import last from './last';
import initial from './initial';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | PropertyName[];

function invoke(object: any, path: PropertyPath, ...args: any[]): any {
    const pathArr = toPath(path);
    const funcName = last(pathArr);
    const data = get(object, initial(pathArr));
    return data[funcName].call(data, ...args);
}

export default invoke;
