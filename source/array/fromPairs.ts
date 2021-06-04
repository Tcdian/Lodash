type PropertyName = string | number | symbol;

function fromPairs<T>(pairs: [PropertyName, T][]): Record<PropertyName, T> {
    const result: Record<PropertyName, T> = {};
    for (let i = 0; i < pairs.length; i++) {
        const [key, value] = pairs[i];
        Object.assign(result, { [key]: value });
    }
    return result;
}

export { fromPairs };
