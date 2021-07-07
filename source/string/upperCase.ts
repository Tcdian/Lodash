import { words } from './words';
import { toUpper } from './toUpper';

function upperCase(string = ''): string {
    return words(string)
        .map((word) => toUpper(word))
        .join(' ');
}

export { upperCase };
