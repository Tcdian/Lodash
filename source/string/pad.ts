function pad(string: string, length: number, chars = ' '): string {
    const stringLen = string.length;
    const startLen = length > stringLen ? length - stringLen : 0;
    const endLen = (startLen + 1) >> 1;
    return string.padEnd(stringLen + endLen, chars).padStart(length, chars);
}

export { pad };
