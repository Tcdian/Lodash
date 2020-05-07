interface Dictionary<T> {
    [index: string]: T;
}

interface NumericDictionary<T> {
    [index: number]: T;
}

function values<T>(object: Dictionary<T> | NumericDictionary<T>): T[];
function values(object: any): any[] {
    return Object.keys(object).map((key) => object[key]);
}

export default values;
