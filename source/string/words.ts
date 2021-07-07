import { isUndefined } from '../lang/isUndefined';

const wordPattern = new RegExp(['[A-Z][a-z]+', '[A-Z]+(?=[A-Z][a-z])', '[A-Z]+', '[a-z]+', '[0-9]+'].join('|'), 'g');

function words(string = '', pattern?: RegExp | string): string[] {
    if (isUndefined(pattern)) {
        return string.match(wordPattern) || [];
    }
    return string.match(pattern) || [];
}

export { words };
