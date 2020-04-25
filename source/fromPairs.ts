interface Dictionary {
    [propertyKey: string]: any;
}

function fromPairs(pairs: [string, any][]): Dictionary {
    const result: Dictionary = {};
    for (let i = 0; i < pairs.length; i++) {
        const [key, value] = pairs[i];
        result[key] = value;
    }
    return result;
}

export default fromPairs;
