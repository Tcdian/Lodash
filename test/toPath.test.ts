import _ from 'lodash';
import toPath from '../source/toPath';

test(`toPath('a.b.c') => ${toPath('a.b.c')}`, () => {
    expect(toPath('a.b.c')).toEqual(_.toPath('a.b.c'));
});

test(`toPath('a[0].b.c') => ${toPath('a[0].b.c')}`, () => {
    expect(toPath('a[0].b.c')).toEqual(_.toPath('a[0].b.c'));
});

test(`toPath('a[0][1].b[2].c') => ${toPath('a[0][1].b[2].c')}`, () => {
    expect(toPath('a[0][1].b[2].c')).toEqual(_.toPath('a[0][1].b[2].c'));
});
