import { escape } from '../source/string/escape';

test(`escape('fred, barney, & pebbles') => ${escape('fred, barney, & pebbles')}`, () => {
    expect(escape('fred, barney, & pebbles')).toBe('fred, barney, &amp; pebbles');
});
