import { truncate } from '../source/string/truncate';

test(`truncate('hi-diddly-ho there, neighborino') => ${truncate('hi-diddly-ho there, neighborino')}`, () => {
    expect(truncate('hi-diddly-ho there, neighborino')).toBe('hi-diddly-ho there, neighbo...');
});

test(`truncate('hi-diddly-ho there, neighborino', {
        'length': 24,
        'separator': ' '
    }) => ${truncate('hi-diddly-ho there, neighborino', {
        length: 24,
        separator: ' ',
    })}`, () => {
    expect(
        truncate('hi-diddly-ho there, neighborino', {
            length: 24,
            separator: ' ',
        })
    ).toBe('hi-diddly-ho there,...');
});

test(`truncate('hi-diddly-ho there, neighborino', {
    'length': 24,
    'separator': 'k'
}) => ${truncate('hi-diddly-ho there, neighborino', {
    length: 24,
    separator: 'k',
})}`, () => {
    expect(
        truncate('hi-diddly-ho there, neighborino', {
            length: 24,
            separator: 'k',
        })
    ).toBe('hi-diddly-ho there, n...');
});

test(`truncate('hi-diddly-ho there, neighborino', {
        'length': 24,
        'separator': /,? +/
    }) => ${truncate('hi-diddly-ho there, neighborino', {
        length: 24,
        separator: /,? +/,
    })}`, () => {
    expect(
        truncate('hi-diddly-ho there, neighborino', {
            length: 24,
            separator: /,? +/,
        })
    ).toBe('hi-diddly-ho there...');
});

test(`truncate('hi-diddly-ho there, neighborino', {
    'length': 24,
    'separator': /,? +/g
}) => ${truncate('hi-diddly-ho there, neighborino', {
    length: 24,
    separator: /,? +/g,
})}`, () => {
    expect(
        truncate('hi-diddly-ho there, neighborino', {
            length: 24,
            separator: /,? +/g,
        })
    ).toBe('hi-diddly-ho there...');
});

test(`truncate('hi-diddly-ho there, neighborino', {
        'omission': ' [...]'
    }) => ${truncate('hi-diddly-ho there, neighborino', {
        omission: ' [...]',
    })}`, () => {
    expect(
        truncate('hi-diddly-ho there, neighborino', {
            omission: ' [...]',
        })
    ).toBe('hi-diddly-ho there, neig [...]');
});
