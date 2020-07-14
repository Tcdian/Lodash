import _ from 'lodash';
import { capitalize } from '../source/string/capitalize';

test(`capitalize('FRED') => ${capitalize('FRED')}`, () => {
    expect(capitalize('FRED')).toBe(_.capitalize('FRED'));
});

test(`capitalize('Fred') => ${capitalize('Fred')}`, () => {
    expect(capitalize('Fred')).toBe(_.capitalize('Fred'));
});
