function pad(string: string, length: number, chars = ' '): string {
    const stringLen = string.length;
    const startLen = length > stringLen ? length - stringLen : 0;
    const endLen = Math.ceil(startLen / 2);
    return string.padEnd(stringLen + endLen, chars).padStart(length, chars);
}

export { pad };
