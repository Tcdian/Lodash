import { conformsTo } from '../lang/conformsTo';
import { partialRight } from '../function/partialRight';

type PropertyName = string | number | symbol;

function conforms<K extends PropertyName, V>(
    source: Partial<Record<K, (value: V) => boolean>>
): (object: Record<K, V>) => boolean {
    return partialRight(conformsTo, source);
}

export { conforms };
