function assign<T, U>(object: T, source: U): T & U;
function assign<T, U, V>(object: T, source1: U, source2: V): T & U & V;
function assign<T, U, V, W>(object: T, source1: U, source2: V, source3: W): T & U & V & W;
function assign(object: any, ...sources: any[]): any;
function assign(object: any, ...sources: any[]): any {
    return Object.assign(object, ...sources);
}

export default assign;
