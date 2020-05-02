import isNumber from './isNumber';

function isSafeInteger(value: any): boolean {
    return isNumber(value) && Number.isSafeInteger(value);
}

export default isSafeInteger;
