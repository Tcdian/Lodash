import { bindAll } from '../source/util/bindAll';

describe('bindAll', () => {
    const view = {
        label: 'docs',
        click: function () {
            return `clicked ${this.label}`;
        },
    };

    test('bindAll this to view', () => {
        bindAll(view, ['click']);
        const click = view.click;
        expect(click()).toBe('clicked docs');
    });
});
