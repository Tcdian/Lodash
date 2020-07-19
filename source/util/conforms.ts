import { conformsTo } from '../lang/conformsTo';
import { partialRight } from '../function/partialRight';

function conforms<T>(source: { [K in keyof T]?: (value: T[K]) => boolean }): (object: T) => boolean {
    return partialRight(conformsTo, source);
}

export { conforms };
