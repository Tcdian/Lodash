import { isInteger } from './isInteger';

function _isIndex(value: any): boolean {
    value = Number(value);
    return isInteger(value) && value > -1 && value < Number.MAX_SAFE_INTEGER;
}

export { _isIndex };
