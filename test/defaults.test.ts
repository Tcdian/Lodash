import _ from 'lodash';
import { defaults } from '../source/object';

test(`defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 }) => ${defaults({ a: 1 }, { b: 2 }, { a: 3 })}`, () => {
    expect(defaults({ a: 1 }, { b: 2 }, { a: 3 })).toEqual(_.defaults({ a: 1 }, { b: 2 }, { a: 3 }));
});
