function assign<T, Source>(object: T, source: Source): T & Source;
function assign<T, Source1, Source2>(object: T, source1: Source1, source2: Source2): T & Source1 & Source2;
function assign(object: any, ...sources: any[]): any;
function assign(object: any, ...sources: any[]): any {
    return Object.assign(object, ...sources);
}

export { assign };
