import _ from 'lodash';
import lowerFirst from '../source/lowerFirst';

test(`lowerFirst('Fred') => ${lowerFirst('Fred')}`, () => {
    expect(lowerFirst('Fred')).toBe(_.lowerFirst('Fred'));
});

test(`lowerFirst('FRED') => ${lowerFirst('FRED')}`, () => {
    expect(lowerFirst('FRED')).toBe(_.lowerFirst('FRED'));
});
