import { words } from './words';
import { toLower } from './toLower';

function lowerCase(string = ''): string {
    return words(string)
        .map((word) => toLower(word))
        .join(' ');
}

export { lowerCase };
