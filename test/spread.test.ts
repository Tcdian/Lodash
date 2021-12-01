import { spread } from '../source/function/spread';

describe('spread', () => {
    test('spread with array', () => {
        const say = spread((who: string, what: string) => {
            return who + ' says ' + what;
        });

        expect(say(['fred', 'hello'])).toBe('fred says hello');
    });

    test('spread with Promise.all', async () => {
        const numbers = Promise.all([Promise.resolve(40), Promise.resolve(18)]);
        const sum = await numbers.then(spread<number>((x, y) => x + y));
        expect(sum).toBe(58);
    });
});
