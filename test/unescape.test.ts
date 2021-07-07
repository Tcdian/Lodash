import { unescape } from '../source/string/unescape';

describe('unescape', () => {
    test('unescape("fred, barney, &amp; pebbles") => "fred, barney, & pebbles"', () => {
        expect(unescape('fred, barney, &amp; pebbles')).toBe('fred, barney, & pebbles');
    });
});
