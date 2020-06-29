const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

function escapeRegExp(string: string): string {
    return string.replace(reRegExpChar, '\\$&');
}

export { escapeRegExp };
