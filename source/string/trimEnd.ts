function trimEnd(string: string, chars?: string): string;
function trimEnd(string: string, chars?: string | number, guard?: any): string;
function trimEnd(string: string, chars?: string | number, guard?: any): string {
    if (guard || chars === undefined) {
        return string.trimEnd();
    }
    const cache = new Set(String(chars));
    let end = string.length;
    for (let i = string.length - 1; i >= 0; i--) {
        if (!cache.has(string[i])) {
            break;
        }
        end--;
    }
    return string.slice(0, end);
}

export { trimEnd };
