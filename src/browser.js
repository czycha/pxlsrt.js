import Image from './lib/image.browser.js';
import Band from './lib/band.js';
import Conversions from './lib/conversions.js';
import Filter from './lib/filter.js';
import DefaultFilter from './lib/default-filter.js';
import FilterCollection from './lib/filter-collection.js';

/**
 * Collection of classes with shorthand read function.
 * Browser-friendly.
 * @namespace
 * @ignore
 * @see Pxlsrt
 * @property {Image} Image
 * @property {Band} Band
 * @property {Filter} Filter
 * @property {FilterCollection} FilterCollection
 */
const PxlsrtBrowser = {
  Image,
  Band,
  Conversions,
  Filter,
  DefaultFilter,
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

module.exports = PxlsrtBrowser;
