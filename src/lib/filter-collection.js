import Brute from '../filters/brute.js';
import Smart from '../filters/smart.js';

/**
 * Collection of filters that can be applied to a Pxlsrt Image.
 * @namespace
 * @property {Array<Filter>} filters
 */
const FilterCollection = {
  filters: {},

  /**
   * Add a filter to the collection.
   * @param {string} key
   * @param {Filter} filterClass
   */
  add(key, filterClass) {
    this.filters[key] = filterClass;
  },

  /**
   * Get filter by key.
   * @param {string} key
   * @return {Filter}
   */
  get(key) {
    return this.filters[key];
  },
};

// Add default filters:
FilterCollection.add('brute', Brute);
FilterCollection.add('smart', Smart);

module.exports = FilterCollection;
