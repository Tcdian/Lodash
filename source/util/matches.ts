import { isMatch } from '../lang/isMatch';

function matches<T, V>(source: T): (value: V) => boolean;
function matches(source: any): (value: any) => boolean {
    return function (object: any): boolean {
        return isMatch(object, source);
    };
}

export { matches };
