interface Dictionary<T> {
    [index: string]: T;
}

type PropertyName = string | number | symbol;

function fromPairs<T>(pairs: [PropertyName, T][]): Dictionary<T> {
    const result: Dictionary<T> = {};
    for (let i = 0; i < pairs.length; i++) {
        const [key, value] = pairs[i];
        Object.assign(result, { [key]: value });
    }
    return result;
}

export default fromPairs;
