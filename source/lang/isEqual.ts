import { _baseIsEqual } from './_baseIsEqual';

function isEqual(value: any, other: any): boolean {
    return _baseIsEqual(value, other);
}

export { isEqual };
