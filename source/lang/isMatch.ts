import { _baseIsEqual } from './_baseIsEqual';

const COMPARE_PARTIAL_FLAG = 1 << 0;

// eslint-disable-next-line @typescript-eslint/ban-types
function isMatch(object: object, source: object): boolean {
    return _baseIsEqual(object, source, COMPARE_PARTIAL_FLAG);
}

export { isMatch };
