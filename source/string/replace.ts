import { isString } from '../lang/isString';

type ReplaceFunction = (match: string, ...args: any[]) => string;

function replace(string: string, pattern: RegExp | string, replacement: ReplaceFunction | string): string {
    if (isString(replacement)) {
        return string.replace(pattern, replacement);
    }
    return string.replace(pattern, replacement);
}

export { replace };
