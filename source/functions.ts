import isFunction from './isFunction';

function functions<T extends object, U extends keyof T>(object: T): U[];
function functions(object: any): string[] {
    return Object.keys(object).filter((key) => isFunction(object[key]));
}

export default functions;
