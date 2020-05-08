function pad(string: string, length: number, chars: string = ' '): string {
    const strLen = string.length;
    const addition = length > strLen ? length - strLen : 0;
    const backAddition = Math.ceil(addition / 2);
    return string.padEnd(strLen + backAddition, chars).padStart(length, chars);
}

export default pad;
