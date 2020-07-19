import { defaults } from '../source/object/defaults';

test(`defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 }) => ${defaults({ a: 1 }, { b: 2 }, { a: 3 })}`, () => {
    expect(defaults({ a: 1 }, { b: 2 }, { a: 3 })).toEqual({ a: 1, b: 2 });
});
