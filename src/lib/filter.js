/**
 * Filter interface
 * @interface
 */
class Filter {
  /**
   * Apply filter to image.
   * @abstract
   * @param {Image} image
   * @param {Object} options
   * @return {Image}
   */
  static run(image, options) {
    return image;
  }
}

module.exports = Filter;
