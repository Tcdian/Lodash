import { _baseMerge } from './_baseMerge';
import { isObject } from '../lang/isObject';

type PropertyName = string | number | symbol;

function defaultsDeep<T, Source>(object: T, source: Source): T & Source;
function defaultsDeep<T, Source1, Source2>(object: T, source1: Source1, source2: Source2): T & Source1 & Source2;
function defaultsDeep(object: any, ...sources: any[]): any;
function defaultsDeep(object: any, ...sources: any[]): any {
    return _baseMerge(object, sources, customDefaultsMerge);

    function customDefaultsMerge(
        objValue: any,
        srcValue: any,
        key: PropertyName | undefined,
        object: any,
        source: any,
        stack: Set<any> | undefined
    ) {
        if (isObject(objValue) && isObject(srcValue)) {
            _baseMerge(objValue, [srcValue], customDefaultsMerge, stack);
        }
        return objValue;
    }
}

export { defaultsDeep };
