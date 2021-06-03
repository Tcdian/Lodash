import { escape } from '../source/string/escape';

describe('escape', () => {
    test('escape("fred, barney, & pebbles") => "fred, barney, &amp; pebbles"', () => {
        expect(escape('fred, barney, & pebbles')).toBe('fred, barney, &amp; pebbles');
    });
});
