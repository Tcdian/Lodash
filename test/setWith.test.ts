import { setWith } from '../source/object/setWith';

test("setWith({}, '[0][1]', 'a', Object)", () => {
    expect(setWith({}, '[0][1]', 'a', Object)).toEqual({ '0': { '1': 'a' } });
});
