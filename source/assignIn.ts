function assignIn<T, U>(target: T, source: U): T & U;
function assignIn<T, U, V>(target: T, source1: U, source2: V): T & U & V;
function assignIn<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
function assignIn(target: object, ...sources: object[]): object;
function assignIn(target: object, ...sources: object[]): object {
    return Object.assign(target, ...sources, ...sources.map((source) => Object.getPrototypeOf(source)));
}

export default assignIn;
