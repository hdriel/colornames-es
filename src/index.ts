/**
 * Module dependencies
 */
import colors, { Color } from './colors';

const cssColors = colors.filter((color) => !!color.css);
const vgaColors = colors.filter((color) => !!color.vga);

function filterByName(name, colors): Color | undefined {
    name = name?.trim().toLowerCase() ?? '';
    return colors.filter((color) => color.name.toLowerCase() === name).pop();
}

/**
 * Get color value for a certain name.
 * @param name {String}
 * @return {String} Hex color value
 * @api public
 */

export default function (name): string | undefined {
    const color = get(name);
    return color?.value;
}

/**
 * Get color object.
 *
 * @param name {String}
 * @return {Object} Color object
 * @api public
 */

export function get(name): Color | undefined {
    return filterByName(name, colors);
}

/**
 * Get all color object.
 *
 * @return {Array}
 * @api public
 */

get.all = function (): Color[] {
    return colors;
};

export const all = get.all;

/**
 * Get color object compatible with CSS.
 *
 * @return {Array}
 * @api public
 */

get.css = function (name: string): Color[] | Color | undefined {
    if (!name) return cssColors;
    return filterByName(name, cssColors);
};

get.vga = function (name: string): Color[] | Color | undefined {
    if (!name) return vgaColors;
    return filterByName(name, vgaColors);
};
