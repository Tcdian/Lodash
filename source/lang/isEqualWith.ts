import { _baseIsEqual, IsEqualCustomizer } from './_baseIsEqual';
import { isUndefined } from './isUndefined';

function isEqualWith(value: any, other: any, customizer: IsEqualCustomizer): boolean {
    const compared = customizer && customizer(value, other);
    return isUndefined(compared) ? _baseIsEqual(value, other, 0, customizer) : compared;
}

export { isEqualWith };
