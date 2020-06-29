import { trimStart } from './trimStart';
import { trimEnd } from './trimEnd';

function trim(string: string, chars?: string, guard?: any): string {
    if (guard || chars === undefined) {
        return string.trim();
    }
    return trimEnd(trimStart(string, chars), chars);
}

export { trim };
