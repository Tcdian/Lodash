import { _baseIsEqual } from './_baseIsEqual';

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
    return compared !== undefined ? compared : _baseIsEqual(object, source, COMPARE_PARTIAL_FLAG, customizer);
}

export { isMatchWith };
