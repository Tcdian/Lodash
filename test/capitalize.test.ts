import _ from 'lodash';
import capitalize from '../source/capitalize';

test(`capitalize('FRED') => ${capitalize('FRED')}`, () => {
    expect(capitalize('FRED')).toBe(_.capitalize('FRED'));
});
