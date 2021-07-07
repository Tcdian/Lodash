import { words } from './words';
import { toLower } from './toLower';

function snakeCase(string = ''): string {
    return words(string)
        .map((word) => toLower(word))
        .join('_');
}

export { snakeCase };
