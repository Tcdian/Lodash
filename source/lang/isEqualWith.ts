import { _baseIsEqual } from './_baseIsEqual';
import { isUndefined } from './isUndefined';

type IsEqualCustomizer = (
    objValue: any,
    othValue: any,
    key: any,
    object: any,
    other: any,
    stack: any
) => boolean | undefined;

function isEqualWith(value: any, other: any, customizer: IsEqualCustomizer): boolean {
    const compared = customizer && customizer(value, other, undefined, undefined, undefined, undefined);
    return isUndefined(compared) ? _baseIsEqual(value, other, 0, customizer) : compared;
}

export { isEqualWith };
