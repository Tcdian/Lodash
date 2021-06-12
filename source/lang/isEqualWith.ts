import { _baseIsEqual } from './_baseIsEqual';
import { isUndefined } from './isUndefined';

type PropertyName = string | number | symbol;
type IsEqualCustomizer = (
    objValue: any,
    othValue: any,
    key?: PropertyName,
    object?: any,
    other?: any,
    cache?: Map<any, any>
) => boolean | undefined;

function isEqualWith(value: any, other: any, customizer: IsEqualCustomizer): boolean {
    const compared = customizer && customizer(value, other);
    return isUndefined(compared) ? _baseIsEqual(value, other, 0, customizer) : compared;
}

export { isEqualWith };
