import { escapeRegExp } from '../source/string/escapeRegExp';

describe('escapeRegExp', () => {
    test('escapeRegExp("[lodash](https://lodash.com/)") => "\\[lodash\\]\\(https://lodash\\.com/\\)"")}', () => {
        expect(escapeRegExp('[lodash](https://lodash.com/)')).toBe('\\[lodash\\]\\(https://lodash\\.com/\\)');
    });
});
