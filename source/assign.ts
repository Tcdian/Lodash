function assign<T, U>(target: T, source: U): T & U;
function assign<T, U, V>(target: T, source1: U, source2: V): T & U & V;
function assign<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
function assign(target: object, ...sources: object[]): object;
function assign(target: object, ...sources: object[]): object {
    return Object.assign(target, ...sources);
}

export default assign;
