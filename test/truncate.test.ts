import _ from 'lodash';
import truncate from '../source/truncate';

test(`truncate('hi-diddly-ho there, neighborino') => ${truncate('hi-diddly-ho there, neighborino')}`, () => {
    expect(truncate('hi-diddly-ho there, neighborino')).toBe(_.truncate('hi-diddly-ho there, neighborino'));
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
    ).toBe(
        _.truncate('hi-diddly-ho there, neighborino', {
            length: 24,
            separator: ' ',
        })
    );
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
    ).toBe(
        _.truncate('hi-diddly-ho there, neighborino', {
            length: 24,
            separator: 'k',
        })
    );
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
    ).toBe(
        _.truncate('hi-diddly-ho there, neighborino', {
            length: 24,
            separator: /,? +/,
        })
    );
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
    ).toBe(
        _.truncate('hi-diddly-ho there, neighborino', {
            length: 24,
            separator: /,? +/g,
        })
    );
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
    ).toBe(
        _.truncate('hi-diddly-ho there, neighborino', {
            omission: ' [...]',
        })
    );
});
