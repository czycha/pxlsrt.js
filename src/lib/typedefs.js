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

/**
 * Hash function. Transform some object to a comparable string.
 * @callback hashFn
 * @param {*} val
 * @return {String} hash
 */

/**
 * @typedef {Object} countObject
 * @property {int} count
 * @property {string} hash
 * @property {Object} key
 */

/**
 * @typedef {Array} countEntry
 * @property {Object} 0 - Key
 * @property {int} 1 - Count
 */
