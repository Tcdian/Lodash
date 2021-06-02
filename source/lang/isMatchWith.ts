import { _baseIsEqual } from './_baseIsEqual';
import { isUndefined } from './isUndefined';

const COMPARE_PARTIAL_FLAG = 1 << 0;

type PropertyName = string | number | symbol;
type isMatchWithCustomizer = (
    objValue: any,
    othValue: any,
    key?: PropertyName,
    object?: any,
    other?: any
) => boolean | undefined;

function isMatchWith(object: any, source: any, customizer?: isMatchWithCustomizer): boolean {
    const compared = customizer && customizer(object, source);
    return isUndefined(compared) ? _baseIsEqual(object, source, COMPARE_PARTIAL_FLAG, customizer) : compared;
}

export { isMatchWith };
