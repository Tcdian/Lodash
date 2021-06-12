import { assign } from './assign';

function defaults<T, Source>(object: T, source: Source): T & Source;
function defaults<T, Source1, Source2>(object: T, source1: Source1, source2: Source2): T & Source1 & Source2;
function defaults(object: any, ...sources: any[]): any;
function defaults(object: any, ...sources: any[]): any {
    return assign(object, ...sources.reverse(), { ...object });
}

export { defaults };
