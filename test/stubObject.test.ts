import { stubObject } from '../source/util/stubObject';
import { times } from '../source/util/times';

describe('stubObject', () => {
    test('times(2, stubObject) => [{}, {}]', () => {
        const objects = times(2, stubObject);
        expect(objects).toEqual([{}, {}]);
        expect(objects[0]).not.toBe(objects[1]);
    });
});
