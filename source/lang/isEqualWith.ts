import { _baseIsEqual, IsEqualCustomizer } from './_baseIsEqual';

function isEqualWith(value: any, other: any, customizer: IsEqualCustomizer): boolean {
    return _baseIsEqual(value, other, customizer);
}

export { isEqualWith };
