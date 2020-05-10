import isFunction from './isFunction';
import isLength from './isLength';

function isArrayLike(value: any): boolean {
    return value !== null && !isFunction(value) && isLength(value.length);
}

export default isArrayLike;
