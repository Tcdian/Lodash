import { clone } from '../source/lang/clone';

test('clone([{ a: 1 }, { b: 2 }])', () => {
    const objects = [{ a: 1 }, { b: 2 }];
    const shallow = clone(objects);
    expect(shallow).toEqual(objects);
    expect(shallow).not.toBe(objects);
    expect(shallow[0]).toBe(objects[0]);
});
