import { isRegExp } from '../lang/isRegExp';
import { last } from '../array/last';

interface Options {
    length?: number;
    omission?: string;
    separator?: RegExp | string;
}

function truncate(string: string, { length = 30, omission = '...', separator }: Options = {}) {
    const len = length > omission.length ? length - omission.length : 0;
    if (separator === undefined) {
        return string.slice(0, len) + omission;
    }
    const separatorRegExp = isRegExp(separator)
        ? separator.global
            ? separator
            : new RegExp(separator.source, `${separator.flags}g`)
        : new RegExp(separator, 'g');
    const matched = string.slice(0, len).match(separatorRegExp);
    return matched !== null
        ? string.slice(0, string.slice(0, len).lastIndexOf(last(matched) as string)) + omission
        : string.slice(0, len) + omission;
}

export { truncate };
