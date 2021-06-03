import { cond } from '../source/util/cond';
import { isString } from '../source/lang/isString';
import { isNumber } from '../source/lang/isNumber';
import { conforms } from '../source/util/conforms';
import { constant } from '../source/util/constant';
import { stubTrue } from '../source/util/stubTrue';

describe('cond', () => {
    test('cond', () => {
        const func = cond([
            [conforms({ a: isString }), constant('matches A')],
            [conforms({ a: isNumber }), constant('matches B')],
            [stubTrue, constant('no match')],
        ]);

        expect(func({ a: '1' })).toBe('matches A');
        expect(func({ a: 1 })).toBe('matches B');
        expect(func({ a: null })).toBe('no match');
    });
});
