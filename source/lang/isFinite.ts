import { isNumber } from './isNumber';

function isFinite(value: any): boolean {
    return isNumber(value) && Number.isFinite(value);
}

export { isFinite };
