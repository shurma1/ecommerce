import cls from './cls';
describe('cls', () => {
    test('should return classes separated by spaces', () => {
        expect(cls('a', 'b', 'c')).toBe('a b c');
    });

    test('should return only classes with true', () => {
        expect(cls('a', ['b', true], ['c', false])).toBe('a b');
    });

    test('should return only valid classes', () => {
        expect(cls('a', null, ['c', false])).toBe('a');
    });
});