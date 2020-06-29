import { isNumber } from './isNumber';

function isNaN(value: any): boolean {
    return isNumber(value) && value !== +value;
}

export { isNaN };
