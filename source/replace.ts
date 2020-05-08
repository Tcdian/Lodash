type ReplaceFunction = (match: string, ...args: any[]) => string;

function replace(string: string, pattern: RegExp | string, replacement: ReplaceFunction | string): string;
function replace(string: string, pattern: RegExp | string, replacement: any): string {
    return string.replace(pattern, replacement);
}

export default replace;
