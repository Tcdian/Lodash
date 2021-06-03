import { lt } from '../source/lang/lt';

describe('lt', () => {
    test('lt(1, 3) => true', () => {
        expect(lt(1, 3)).toBe(true);
    });

    test('lt(3, 3) => true', () => {
        expect(lt(3, 3)).toBe(false);
    });

    test('lt(3, 1) => true', () => {
        expect(lt(3, 1)).toBe(false);
    });
});
