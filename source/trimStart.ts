function trimStart(string: string, chars: string = ' '): string {
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
