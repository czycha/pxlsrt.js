/**
 * @typedef {Array<Onecolor>} line
 */

/**
 * @typedef {Array<line>} lines
 */

/**
 * @typedef {Object} diagonalPixels
 * @property {line} * - Multidimensional array of colors
 */

/**
 * Band generation function.
 * @callback bandFn
 * @param {line} line
 * @param {int} key
 */

/**
 * Line modification function.
 * @callback modifyLine
 * @param {line} line
 * @param {int|string} key
 * @return {line}
 */

/**
 * @typedef {Object} xyCoordinate
 * @property {int} x
 * @property {int} y
 */

/**
 * @typedef {Object} diagonalCoordinate
 * @property {int} key
 * @property {int} index
 */
