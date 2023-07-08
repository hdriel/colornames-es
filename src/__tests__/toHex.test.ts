import toHex, { get } from '../index';

describe('toHex tests', () => {
    test('maps VGA color names to HEX values', function () {
        expect(toHex('red')).toBe('#FF0000');
        expect(toHex('blue')).toBe('#0000FF');
        expect(toHex('BluE')).toBe('#0000FF');
    });

    test('maps CSS color names to HEX values', function () {
        expect(toHex('lightsalmon')).toBe('#FFA07A');
        expect(toHex('mediumvioletred')).toBe('#C71585');
        expect(toHex('meDiumVioletRed')).toBe('#C71585');
    });

    test('meta data about a color', function () {
        expect(get('red')).toEqual({
            name: 'red',
            css: true,
            value: '#FF0000',
            vga: true,
        });
        expect(get('rEd')).toEqual({
            name: 'red',
            css: true,
            value: '#FF0000',
            vga: true,
        });
    });
});
