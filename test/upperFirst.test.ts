import { upperFirst } from '../source/string/upperFirst';

test(`upperFirst('fred') => ${upperFirst('fred')}`, () => {
    expect(upperFirst('fred')).toBe('Fred');
});

test(`upperFirst('FRED') => ${upperFirst('FRED')}`, () => {
    expect(upperFirst('FRED')).toBe('FRED');
});
