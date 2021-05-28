import { trimStart } from './trimStart';
import { trimEnd } from './trimEnd';
function trim(string: string, chars?: string): string;
function trim(string: string, chars?: string | number, guard?: any): string;
function trim(string: string, chars?: string | number, guard?: any): string {
    if (guard || chars === undefined) {
        return string.trim();
    }
    return trimEnd(trimStart(string, chars), chars);
}

export { trim };
