function trimStart(string: string, chars?: string): string;
function trimStart(string: string, chars?: string | number, guard?: any): string;
function trimStart(string: string, chars?: string | number, guard?: any): string {
    if (guard || chars === undefined) {
        return string.trimStart();
    }
    const cache = new Set(String(chars));
    let start = 0;
    for (let i = 0; i < string.length; i++) {
        if (!cache.has(string[i])) {
            break;
        }
        start++;
    }
    return string.slice(start);
}

export { trimStart };
