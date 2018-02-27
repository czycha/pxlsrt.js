import 'jimp/browser/lib/jimp';
import onecolor from 'onecolor/one-color-all';
import Conversions from './conversions.js';
import FilterCollection from './filter-collection.js';

/**
 * The canvas upon which you will paint. Browser-friendly version.
 */
class Image {
  /**
   * Create an Image object.
   * @constructor
   * @param {Jimp} image
   */
  constructor(image) {
    /**
     * Jimp image
     * @member
     * @type {Jimp}
     */
    this.image = image.clone();

    /**
     * Image width
     * @member
     * @type {int}
     */
    this.width = this.image.bitmap.width;

    /**
     * Image height
     * @member
     * @type {int}
     */
    this.height = this.image.bitmap.height;
  }

  /**
   * Clone Pxlsrt image.
   * @return {Image}
   */
  clone() {
    return new Image(image.clone());
  }

  /**
   * Read image from path or URL.
   * @param {string} path - Path or URL
   * @return {Promise<Image>}
   */
  static read(path) {
    return Jimp.read(path).then((image) => new this(image));
  }

  /**
   * Gets buffer. Passes off to Jimp.
   * @see {@link https://github.com/oliver-moran/jimp#writing-to-files-and-buffers}
   * @return {Image} this
   */
  getBuffer(...args) {
    this.image.getBuffer(...args);
    return this;
  }

  /**
   * Sets pixel color.
   * @param {int} x
   * @param {int} y
   * @param {Onecolor} color
   * @return {int} Integer representation of color
   */
  setPixel(x, y, color) {
    const intColor = Jimp.rgbaToInt(
      color.red() * 255,
      color.green() * 255,
      color.blue() * 255,
      color.alpha() * 255
    );
    this.image.setPixelColor(intColor, x, y);
    return intColor;
  }

  /**
   * Gets pixel color.
   * @param {int} x
   * @param {int} y
   * @return {Onecolor} color
   */
  getPixel(x, y) {
    const {r, g, b, a} = Jimp.intToRGBA(this.image.getPixelColor(x, y));
    return onecolor([r, g, b, a]);
  }

  /**
   * Scan pixels into array of colors.
   * @param {int} x
   * @param {int} y
   * @param {int} width
   * @param {height} height
   * @return {Array<Onecolor>}
   */
  scanPixels(x, y, width, height) {
    const colors = [];
    this.image.scan(x, y, width, height, (_x, _y, idx) => {
      const color = onecolor([
        this.image.bitmap.data[idx + 0],
        this.image.bitmap.data[idx + 1],
        this.image.bitmap.data[idx + 2],
        this.image.bitmap.data[idx + 3],
      ]);
      colors.push(color);
    });
    return colors;
  }

  /**
   * @typedef {Array<Array<Onecolor>>} lines
   */

  /**
   * Horizontal rows.
   * @member
   * @type {lines}
   */
  get rows() {
    const rowArray = [];
    for (let y = 0; y < this.height; y++) {
      const row = this.scanPixels(0, y, this.width, 1);
      rowArray.push(row);
    }
    return rowArray;
  }
  set rows(rowArray) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.setPixel(x, y, rowArray[y][x]);
      }
    }
  }

  /**
   * Vertical columns.
   * @member
   * @type {lines}
   */
  get columns() {
    const colArray = [];
    for (let x = 0; x < this.width; x++) {
      const col = this.scanPixels(x, 0, 1, this.height);
      colArray.push(col);
    }
    return colArray;
  }
  set columns(colArray) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.setPixel(x, y, colArray[x][y]);
      }
    }
  }

  /**
   * @typedef {Object} diagonalPixels
   * @property {Array<Onecolor>} * - Multidimensional array of colors
   */

  /**
   * TLBR diagonals (top-left to bottom-right).
   * @member
   * @type {diagonalPixels}
   */
  get tlbrDiagonals() {
    const diagonals = {};
    this.image.scan(0, 0, this.width, this.height, (x, y, idx) => {
      const color = onecolor([
        this.image.bitmap.data[idx + 0],
        this.image.bitmap.data[idx + 1],
        this.image.bitmap.data[idx + 2],
        this.image.bitmap.data[idx + 3],
      ]);
      const {key} = Conversions.xyToTLBRDiagonal(x, y);
      if (!(key in diagonals)) {
        diagonals[key] = [];
      }
      diagonals[key].push(color);
    });
    return diagonals;
  }
  set tlbrDiagonals(diagonals) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const {key, index} = Conversions.xyToTLBRDiagonal(x, y);
        this.setPixel(x, y, diagonals[key][index]);
      }
    }
  }

  /**
   * TRBL diagonals (top-right to bottom-left).
   * @member
   * @type {diagonalPixels}
   */
  get trblDiagonals() {
    const diagonals = {};
    this.image.scan(0, 0, this.width, this.height, (x, y, idx) => {
      const color = onecolor([
        this.image.bitmap.data[idx + 0],
        this.image.bitmap.data[idx + 1],
        this.image.bitmap.data[idx + 2],
        this.image.bitmap.data[idx + 3],
      ]);
      const {key} = Conversions.xyToTRBLDiagonal(x, y, this.width);
      if (!(key in diagonals)) {
        diagonals[key] = [];
      }
      diagonals[key].push(color);
    });
    return diagonals;
  }
  set trblDiagonals(diagonals) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const {key, index} = Conversions.xyToTRBLDiagonal(x, y, this.width);
        this.setPixel(x, y, diagonals[key][index]);
      }
    }
  }

  /**
   * Get lines by direction.
   * @param {string} direction - horizontal, vertical, tlbr, or trbl
   * @return {diagonalPixels|lines}
   */
  getLines(direction) {
    switch (direction) {
      case 'horizontal':
        return this.rows;
      case 'vertical':
        return this.columns;
      case 'tlbr':
        return this.tlbrDiagonals;
      case 'trbl':
        return this.trblDiagonals;
    }
  }

  /**
   * Set lines by direction.
   * @param {string} direction - horizontal, vertical, tlbr, or trbl
   * @param {diagonalPixels|lines} lines
   * @return {Image} this
   */
  setLines(direction, lines) {
    switch (direction) {
      case 'horizontal':
        this.rows = lines;
        break;
      case 'vertical':
        this.columns = lines;
        break;
      case 'tlbr':
        this.tlbrDiagonals = lines;
        break;
      case 'trbl':
        this.trblDiagonals = lines;
        break;
    }
    return this;
  }

  /**
   * Run a filter on current image.
   * @param {string} key
   * @param {Object} options
   * @return {Image} this
   */
  filter(key, options = {}) {
    const filter = FilterCollection.get(key);
    return filter.run(this, options);
  }
};

module.exports = Image;
