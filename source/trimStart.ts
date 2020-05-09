function trimStart(string: string, chars: string = ' '): string {
    const cache = new Set(chars);
    let start = -1;
    for (let i = 0; i < string.length; i++) {
        if (!cache.has(string[i])) {
            break;
        }
        start++;
    }
    return string.slice(start + 1);
}

export default trimStart;
