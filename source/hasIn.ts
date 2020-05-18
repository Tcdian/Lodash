import toPath from './toPath';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | ReadonlyArray<PropertyName>;

function hasIn(object: any, path: PropertyPath): boolean {
    const pathArr = toPath(path);
    for (let i = 0; i < pathArr.length; i++) {
        if (!(pathArr[i] in object)) {
            return false;
        }
        object = object[pathArr[i]];
    }
    return true;
}

export default hasIn;
