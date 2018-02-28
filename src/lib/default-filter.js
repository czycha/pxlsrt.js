import Filter from './filter.js';

/**
 * Interface that Pxlsrt's default filters build off of.
 * @extends Filter
 * @interface
 */
class DefaultFilter extends Filter {
  /**
   * Generate a line modification function.
   * @param {Object} options
   * @param {int} options.middlate - Middlation effect counter. 0 means no run. > 0 means loop that many times. < 0 means run middlateReverse than many times.
   * @param {(truthy|'either')} options.reverse - Reverse string or not. Providing 'either' will randomly reverse lines.
   * @param {string} options.method - Sorting method.
   * @param {bandFn} bandFn
   * @return {modifyLine}
   */
  static genModifyLineFn({middlate, reverse, method}, bandFn) {
    return (line, key) => {
      const newLine = [];
      const bands = bandFn(line, +key);
      bands.forEach((band) => {
        band.sortByMethod(method);
        if (
          reverse === true ||
          (reverse === 'either' && Math.round(Math.random()) === 1)
        ) {
          band.reverse();
        }
        band.middlateLoop(middlate);
        newLine.push(...band.pixels);
      });
      return newLine;
    };
  }

  /**
   * Modify and set lines.
   * @param {Image} image
   * @param {lines|diagonalLines} lines
   * @param {direction} direction - horizontal, vertical, tlbr, or trbl
   * @param {modifyLine} modifyLine - Line modification function.
   * @return {Image}
   */
  static setLines(image, lines, direction, modifyLine) {
    if (direction === 'vertical' || direction === 'horizontal') {
      lines = lines.map(modifyLine);
    } else {
      Object.entries(lines).forEach(([key, line]) => {
        lines[key] = modifyLine(line, key);
      });
    }
    image.setLines(direction, lines);
    return image;
  }
}

module.exports = DefaultFilter;
