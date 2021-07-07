import { words } from '../source/string/words';

describe('words', () => {
    test('words("fred, barney, & pebbles") => ["fred", "barney", "pebbles"]', () => {
        expect(words('fred, barney, & pebbles')).toEqual(['fred', 'barney', 'pebbles']);
    });

    test('words("fred, barney, & pebbles", /[^, ]+/g) => ["fred", "barney", "&", "pebbles"]', () => {
        expect(words('fred, barney, & pebbles', /[^, ]+/g)).toEqual(['fred', 'barney', '&', 'pebbles']);
    });
});
