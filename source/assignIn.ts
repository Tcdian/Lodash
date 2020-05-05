function assignIn<T, U>(object: T, source: U): T & U;
function assignIn<T, U, V>(object: T, source1: U, source2: V): T & U & V;
function assignIn<T, U, V, W>(object: T, source1: U, source2: V, source3: W): T & U & V & W;
function assignIn<T>(object: any, ...sources: any[]): T;
function assignIn(object: any, ...sources: any[]): any {
    sources.forEach((source) => {
        for (let key in source) {
            object[key] = source[key];
        }
    });
    return object;
}

export default assignIn;

Object.assign;
