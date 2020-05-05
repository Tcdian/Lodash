import _ from 'lodash';
import entries from '../source/entries';

test(`entries({ a: 1, b: 2 }) => ${entries({ a: 1, b: 2 })}`, () => {
    expect(entries({ a: 1, b: 2 })).toEqual(_.entries({ a: 1, b: 2 }));
});
