function defaults<T, U>(target: T, source: U): T & U;
function defaults<T, U, V>(target: T, source1: U, source2: V): T & U & V;
function defaults<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
function defaults(target: object, ...sources: object[]): object;
function defaults(target: object, ...sources: object[]): object {
    return Object.assign(target, ...sources.reverse(), { ...target });
}

export default defaults;
