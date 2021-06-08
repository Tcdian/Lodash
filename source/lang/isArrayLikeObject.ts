import { isArrayLike } from './isArrayLike';
import { isObjectLike } from './isObjectLike';

// eslint-disable-next-line @typescript-eslint/ban-types
function isArrayLikeObject(value: any): value is object & { length: number } {
    return isArrayLike(value) && isObjectLike(value);
}

export { isArrayLikeObject };
