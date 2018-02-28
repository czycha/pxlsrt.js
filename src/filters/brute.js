import DefaultFilter from '../lib/default-filter.js';
import Band from '../lib/band.js';

/**
 * Brute force sorting filter. Breaks up image into randomly sized bands to sort by.
 * @extends DefaultFilter
 */
class Brute extends DefaultFilter {
  /**
   * Run filter on image.
   * @override
   * @param {Image} image
   * @param {Object} options
   * @param {int} options.min - Minimum band size. -1 means to equal max.
   * @param {int} options.max - Maximum band size. -1 means to equal line size.
   * @param {string} options.method - Sorting method.
   * @param {int} options.middlate - Middlation effect counter. 0 means no run. > 0 means loop that many times. < 0 means run middlateReverse than many times.
   * @param {(truthy|'either')} options.reverse - Reverse string or not. Providing 'either' will randomly reverse lines.
   * @param {string} options.direction - Direction to sort in. Options are: horizontal, vertical, tlbr (top-left to bottom-right diagonal), or trbl (top-right to bottom-left diagonal).
   * @return {Image} image
   */
  static run(image, {
    min = -1,
    max = -1,
    method = 'sumRGBA',
    middlate = 0,
    reverse = false,
    direction = 'horizontal',
  } = {}) {
    const lines = image.getLines(direction);
    const modifyLine = this.genModifyLineFn(
      {middlate, reverse, method},
      (line, key) => this.randomBands(line, min, max)
    );
    return this.setLines(image, lines, direction, modifyLine);
  }

  /**
   * Randomly slices array into Bands.
   * @param {Array} arr
   * @param {int} min
   * @param {int} max
   * @return {Array<Band>}
   */
  static randomBands(arr, min, max) {
    if (arr.length === 0) {
      return [[]];
    }
    const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    const slices = [];
    max = (max > arr.length || max <= 0) ? arr.length : max;
    min = (min > max || min <= 0) ? max : min;
    let currLower = 0;
    let currUpper = rand(min, max);
    slices.push(arr.slice(currLower, currUpper));
    while (arr.length - currUpper >= min) {
      const addMax = Math.min(max, arr.length - currUpper);
      currLower = currUpper;
      currUpper += rand(min, addMax);
      slices.push(arr.slice(currLower, currUpper));
    }
    if (currUpper < arr.length) {
      slices.push(arr.slice(currUpper));
    }
    return slices.map((slice) => new Band(slice));
  }
}

module.exports = Brute;
