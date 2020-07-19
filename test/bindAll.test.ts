import { bindAll } from '../source/util/bindAll';

const view = {
    label: 'docs',
    click: function () {
        return `clicked ${this.label}`;
    },
};

test('bindAll', () => {
    bindAll(view, ['click']);
    const click = view.click;
    expect(click()).toBe('clicked docs');
});
