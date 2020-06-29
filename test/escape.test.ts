import _ from 'lodash';
import { escape } from '../source/string';

test(`escape('fred, barney, & pebbles') => ${escape('fred, barney, & pebbles')}`, () => {
    expect(escape('fred, barney, & pebbles')).toBe(_.escape('fred, barney, & pebbles'));
});
