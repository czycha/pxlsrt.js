/**
 * Static conversion methods used in Pxlsrt
 * @namespace
 */
class Conversions {
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
   * Converts x/y coordinates to diagonal coordinates with TLBR (top-left to bottom-right) orientation.
   * @param {int} x
   * @param {int} y
   * @return {diagonalCoordinate} diagonal coordinates
   */
  static xyToTLBRDiagonal(x, y) {
    const key = x - y;
    return {
      key,
      index: key >= 0 ? y : x,
    };
  }

  /**
   * Converts x/y coordinates to diagonal coordinates with TRBL (top-right to bottom-left) orientation.
   * @param {int} x
   * @param {int} y
   * @param {int} columns
   * @return {diagonalCoordinate} diagonal coordinates
   */
  static xyToTRBLDiagonal(x, y, columns) {
    const key = columns - 1 - x - y;
    return {
      key,
      index: key >= 0 ? y : columns - 1 - x,
    };
  }

  /**
   * Converts TLBR (top-left to bottom-right) diagonal coordinates to x/y coordinates.
   * @param {int} key
   * @param {int} i
   * @return {xyCoordinate} x/y coordinates
   */
  static tlbrDiagonalToXY(key, i) {
    return {
      x: (key >= 0 ? key + i : i),
      y: (key >= 0 ? i : i - key),
    };
  }

  /**
   * Converts TLBR (top-left to bottom-right) diagonal coordinates to x/y coordinates.
   * @param {int} key
   * @param {int} i
   * @param {int} columns
   * @return {xyCoordinate} x/y coordinates
   */
  static trblDiagonalToXY(key, i, columns) {
    return {
      x: (key >= 0 ? columns - 1 - key - i : columns - 1 - i),
      y: (key >= 0 ? i : i - key),
    };
  }
};

module.exports = Conversions;
