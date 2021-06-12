function assignIn<T, Source>(object: T, source: Source): T & Source;
function assignIn<T, Source1, Source2>(object: T, source1: Source1, source2: Source2): T & Source1 & Source2;
function assignIn(object: any, ...sources: any[]): any;
function assignIn(object: any, ...sources: any[]): any {
    sources.forEach((source) => {
        for (const key in source) {
            object[key] = source[key];
        }
    });
    return object;
}

export { assignIn };
