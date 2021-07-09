import { assignWith } from '../source/object/assignWith';

describe('assignWith', () => {
    function customizer(objValue?: number, srcValue?: number) {
        return objValue !== undefined ? objValue : srcValue;
    }

    test('assignWith customizer', () => {
        expect(assignWith({ a: 1 }, { b: 2 }, { a: 3 }, customizer)).toEqual({ a: 1, b: 2 });
    });
});
