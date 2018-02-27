import Image from './lib/image.js';
import Band from './lib/band.js';
import Conversions from './lib/conversions.js';
import Filter from './lib/filter.js';
import FilterCollection from './lib/filter-collection.js';

/**
 * Collection of classes with shorthand read function
 * @namespace
 * @property {Image} Image
 * @property {Band} Band
 * @property {Filter} Filter
 * @property {FilterCollection} FilterCollection
 */
const Pxlsrt = {
  Image,
  Band,
  Conversions,
  Filter,
  FilterCollection,

  /**
   * Read image from path.
   * @param {string} path - Path or URL
   * @return {Promise<Image>}
   */
  read(...args) {
    return this.Image.read(...args);
  },
};

module.exports = Pxlsrt;
