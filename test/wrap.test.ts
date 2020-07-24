import { wrap } from '../source/function/wrap';
import { escape } from '../source/string/escape';

test('wrap', () => {
    const p = wrap(escape, function (func, text: string) {
        return '<p>' + func(text) + '</p>';
    });

    expect(p('fred, barney, & pebbles')).toBe('<p>fred, barney, &amp; pebbles</p>');
});
