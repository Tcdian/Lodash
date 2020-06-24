import isObject from './isObject';
import isUndefined from './isUndefined';

type MergeWithCustomizer = (
    objValue: any,
    srcValue: any,
    key: string | symbol,
    object: any,
    source: any,
    cache: any
) => any;

function _baseMerge(object: any, sources: any[], customizer?: MergeWithCustomizer, cache: Set<any> = new Set()): any {
    sources.forEach((source) => {
        Object.keys(source).forEach((key) => {
            let finalVal = source[key];

            const customized = isUndefined(customizer)
                ? undefined
                : customizer(object[key], source[key], key, object, source, cache);
            finalVal = isUndefined(customized) ? finalVal : customized;

            if (customized === undefined && isObject(object[key]) && isObject(source[key]) && !cache.has(object[key])) {
                const cacheKey = object[key];
                cache.add(cacheKey);
                finalVal = _baseMerge(object[key], [source[key]], customizer, cache);
                cache.delete(cacheKey);
            }

            object[key] = finalVal;
        });
    });
    return object;
}

export default _baseMerge;
