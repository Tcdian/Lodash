import _ from 'lodash';
import escapeRegExp from '../source/escapeRegExp';

test(`escapeRegExp('[lodash](https://lodash.com/)') => ${escapeRegExp('[lodash](https://lodash.com/)')}`, () => {
    expect(escapeRegExp('[lodash](https://lodash.com/)')).toBe(_.escapeRegExp('[lodash](https://lodash.com/)'));
});
