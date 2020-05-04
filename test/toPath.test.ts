import _ from 'lodash';
import toPath from '../source/toPath';

test(`toPath('a.b.c') => ${toPath('a.b.c')}`, () => {
    expect(toPath('a.b.c')).toEqual(_.toPath('a.b.c'));
});

test(`toPath('a[0].b.c') => ${toPath('a[0].b.c')}`, () => {
    expect(toPath('a[0].b.c')).toEqual(_.toPath('a[0].b.c'));
});

test(`toPath('a[0][1].b[2]') => ${toPath('a[0][1].b[2]')}`, () => {
    expect(toPath('a[0][1].b[2]')).toEqual(_.toPath('a[0][1].b[2]'));
});
