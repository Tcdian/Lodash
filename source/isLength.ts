import isInteger from './isInteger';

function isLength(value: any): boolean {
    return isInteger(value) && value > -1 && value <= Number.MAX_SAFE_INTEGER;
}

export default isLength;
