import { truncate } from '../source/string/truncate';

describe('truncate', () => {
    test('truncate("hi-diddly-ho there, neighborino") => "hi-diddly-ho there, neighbo..."', () => {
        expect(truncate('hi-diddly-ho there, neighborino')).toBe('hi-diddly-ho there, neighbo...');
    });

    test(`truncate("hi-diddly-ho there, neighborino", {
            "length": 24,
            "separator": " "
        }) => "hi-diddly-ho there,..."`, () => {
        expect(
            truncate('hi-diddly-ho there, neighborino', {
                length: 24,
                separator: ' ',
            })
        ).toBe('hi-diddly-ho there,...');
    });

    test(`truncate("hi-diddly-ho there, neighborino", {
        "length": 24,
        "separator": "k"
    }) => "hi-diddly-ho there, n..."`, () => {
        expect(
            truncate('hi-diddly-ho there, neighborino', {
                length: 24,
                separator: 'k',
            })
        ).toBe('hi-diddly-ho there, n...');
    });

    test(`truncate("hi-diddly-ho there, neighborino", {
            "length": 24,
            "separator": /,? +/
        }) => "hi-diddly-ho there..."`, () => {
        expect(
            truncate('hi-diddly-ho there, neighborino', {
                length: 24,
                separator: /,? +/,
            })
        ).toBe('hi-diddly-ho there...');
    });

    test(`truncate("hi-diddly-ho there, neighborino", {
        "length": 24,
        "separator": /,? +/g
    }) => "hi-diddly-ho there..."`, () => {
        expect(
            truncate('hi-diddly-ho there, neighborino', {
                length: 24,
                separator: /,? +/g,
            })
        ).toBe('hi-diddly-ho there...');
    });

    test(`truncate("hi-diddly-ho there, neighborino", {
            "omission": " [...]"
        }) => "hi-diddly-ho there, neig [...]"`, () => {
        expect(
            truncate('hi-diddly-ho there, neighborino', {
                omission: ' [...]',
            })
        ).toBe('hi-diddly-ho there, neig [...]');
    });
});
