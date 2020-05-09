function trimStart(string: string, chars?: string, guard?: any): string {
    if (guard || chars === undefined) {
        return string.trimStart();
    }
    const cache = new Set(chars);
    let start = 0;
    for (let i = 0; i < string.length; i++) {
        if (!cache.has(string[i])) {
            break;
        }
        start++;
    }
    return string.slice(start);
}

export default trimStart;
