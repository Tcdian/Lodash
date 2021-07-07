import { words } from './words';
import { upperFirst } from './upperFirst';

function startCase(string = ''): string {
    return words(string)
        .map((word) => upperFirst(word))
        .join(' ');
}

export { startCase };
