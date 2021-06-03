import { add } from '../source/math/add';

describe('add', () => {
    test('add(6, 4) => 10', () => {
        expect(add(6, 4)).toBe(10);
    });
});
