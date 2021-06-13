import { _baseIsEqual } from './_baseIsEqual';
import { isUndefined } from './isUndefined';

type PropertyName = string | number | symbol;
type isMatchWithCustomizer = (
    objValue: any,
    othValue: any,
    key: PropertyName | undefined,
    object: any,
    other: any
) => boolean | undefined;

const COMPARE_PARTIAL_FLAG = 1 << 0;

function isMatchWith(object: any, source: any, customizer?: isMatchWithCustomizer): boolean {
    const compared = customizer && customizer(object, source, undefined, undefined, undefined);
    return isUndefined(compared) ? _baseIsEqual(object, source, COMPARE_PARTIAL_FLAG, customizer) : compared;
}

export { isMatchWith };
