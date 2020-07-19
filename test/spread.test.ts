import { spread } from '../source/function/spread';

test('spread', () => {
    const say = spread(function (who, what) {
        return who + ' says ' + what;
    });

    expect(say(['fred', 'hello'])).toBe('fred says hello');
});

test('spread', async () => {
    const numbers = Promise.all([Promise.resolve(40), Promise.resolve(18)]);
    const sum = await numbers.then(
        spread<number>(function (x, y) {
            return x + y;
        })
    );
    expect(sum).toBe(58);
});
