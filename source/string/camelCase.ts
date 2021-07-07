import { words } from './words';
import { upperFirst } from './upperFirst';
import { toLower } from './toLower';

function camelCase(string = ''): string {
    return words(string)
        .map((word, index) => (index === 0 ? toLower(word) : upperFirst(toLower(word))))
        .join('');
}

export { camelCase };
