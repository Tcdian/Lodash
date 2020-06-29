function split(string: string, separator: RegExp | string, limit?: number): string[] {
    return string.split(separator, limit);
}

export { split };
