import isNumber from './isNumber';

function isInteger(value: any): boolean {
    return isNumber(value) && Number.isInteger(value);
}

export default isInteger;
