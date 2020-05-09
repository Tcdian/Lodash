function trimEnd(string: string, chars: string = ' '): string {
    const cache = new Set(chars);
    let end = string.length;
    for (let i = string.length - 1; i >= 0; i--) {
        if (!cache.has(string[i])) {
            break;
        }
        end--;
    }
    return string.slice(0, end);
}

export default trimEnd;
