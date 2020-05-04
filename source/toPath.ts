import isArray from './isArray';
import isSymbol from './isSymbol';
import isEmpty from './isEmpty';
import toString from './toString';

function toPath(value: any): (string | symbol)[] {
    if (isSymbol(value)) {
        return [value];
    }
    if (isArray(value)) {
        return value.map((item) => (isSymbol(item) ? item : toString(item)));
    }
    return stringToPath(toString(value));
}

function stringToPath(s: string): string[] {
    const stack: string[] = [];
    let path = '';
    for (let i = 0; i < s.length; i++) {
        switch (s[i]) {
            case '.':
                if (s[i + 1] !== '[') {
                    path += '.';
                }
                break;
            case '[':
                path += path === '' ? '' : '.';
                stack.push(path);
                path = '';
                break;
            case ']':
                path = (stack.pop() || '') + path;
                break;
            default:
                path += s[i];
        }
    }
    return path.split('.');
}

export default toPath;
