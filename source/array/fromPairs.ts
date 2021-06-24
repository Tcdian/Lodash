type PropertyName = string | number | symbol;

function fromPairs<K extends PropertyName, V>(pairs: [K, V][]): Record<K, V> {
    const result = {} as Record<K, V>;
    for (let i = 0; i < pairs.length; i++) {
        const [key, value] = pairs[i];
        Object.assign(result, { [key]: value });
    }
    return result;
}

export { fromPairs };
