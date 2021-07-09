import { _baseIsEqual } from './_baseIsEqual';

type PropertyName = string | number | symbol;
type IsEqualCustomizer = (
    objValue: any,
    othValue: any,
    key: PropertyName | undefined,
    object: any,
    other: any,
    stack: any
) => boolean | undefined;

function isEqualWith(value: any, other: any, customizer: IsEqualCustomizer): boolean {
    const compared = customizer && customizer(value, other, undefined, undefined, undefined, undefined);
    return compared !== undefined ? compared : _baseIsEqual(value, other, 0, customizer);
}

export { isEqualWith };
