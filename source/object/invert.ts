import { entries } from './entries';

type PropertyName = string | number | symbol;

function invert<K extends PropertyName, V>(object: Record<K, V>): Record<string, K> {
    const pairs = entries(object);
    return Object.fromEntries(pairs.map(([key, val]) => [val, key]));
}

export { invert };
