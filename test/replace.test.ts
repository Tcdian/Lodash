import { replace } from '../source/string/replace';

describe('replace', () => {
    test('replace("Hi Fred", "Fred", "Barney") => "Hi Barney"', () => {
        expect(replace('Hi Fred', 'Fred', 'Barney')).toBe('Hi Barney');
    });
});
