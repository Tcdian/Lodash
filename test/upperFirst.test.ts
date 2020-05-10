import _ from 'lodash';
import upperFirst from '../source/upperFirst';

test(`upperFirst('fred') => ${upperFirst('fred')}`, () => {
    expect(upperFirst('fred')).toBe(_.upperFirst('fred'));
});

test(`upperFirst('FRED') => ${upperFirst('FRED')}`, () => {
    expect(upperFirst('FRED')).toBe(_.upperFirst('FRED'));
});
