import { uniqueId } from '../source/util/uniqueId';

describe('uniqueId', () => {
    test('Generates a unique ID', () => {
        const id1 = uniqueId('id_');
        const id2 = uniqueId('id_');
        expect(id1).not.toEqual(id2);
    });
});
