function assignIn<T, U>(object: T, source: U): T & U;
function assignIn<T, U, V>(object: T, source1: U, source2: V): T & U & V;
function assignIn<T, U, V, W>(object: T, source1: U, source2: V, source3: W): T & U & V & W;
function assignIn(object: object, ...sources: object[]): object;
function assignIn(object: object, ...sources: object[]): object {
    return Object.assign(object, ...sources, ...sources.map((source) => Object.getPrototypeOf(source)));
}

export default assignIn;
