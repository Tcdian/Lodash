import _ from 'lodash';
import { isDate } from '../source/lang/isDate';

test(`isDate(new Date) => ${isDate(new Date())}`, () => {
    expect(isDate(new Date())).toBe(_.isDate(new Date()));
});

test(`isDate('Mon April 23 2012') => ${isDate('Mon April 23 2012')}`, () => {
    expect(isDate('Mon April 23 2012')).toBe(_.isDate('Mon April 23 2012'));
});
