import isFunction from './isFunction';

function functions(object: any): string[] {
    return Object.keys(object).filter((key) => isFunction(object[key]));
}

export default functions;
