import { _baseMerge } from './_baseMerge';

function merge<T, Source>(object: T, source: Source): T & Source;
function merge<T, Source1, Source2>(object: T, source1: Source1, source2: Source2): T & Source1 & Source2;
function merge(object: any, ...sources: any[]): any;
function merge(object: any, ...sources: any[]): any {
    return _baseMerge(object, sources);
}

export { merge };
