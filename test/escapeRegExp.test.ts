import { escapeRegExp } from '../source/string/escapeRegExp';

test(`escapeRegExp('[lodash](https://lodash.com/)') => ${escapeRegExp('[lodash](https://lodash.com/)')}`, () => {
    expect(escapeRegExp('[lodash](https://lodash.com/)')).toBe('\\[lodash\\]\\(https://lodash\\.com/\\)');
});
