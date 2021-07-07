import { words } from './words';
import { toLower } from './toLower';

function kebabCase(string = ''): string {
    return words(string)
        .map((word) => toLower(word))
        .join('-');
}

export { kebabCase };
