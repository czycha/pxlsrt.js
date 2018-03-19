/**
 * Map implementation that only keeps track of duplicates.
 */
class CountMap {
  /**
   * Create CountMap
   * @param {Array} [arr=[]] - Initial values.
   * @param {hashFn} [hash] - Hash function to turn object into comparable string.
   */
  constructor(arr = [], hash = ((a) => '' + a)) {
    /**
     * Internal count object.
     * @member
     * @type {Object<countObject>}
     */
    this.counts = {};

    /**
     * Hash method.
     * @member
     * @type {hashFn}
     */
    this.hash = hash;

    for (let key of arr) {
      this.add(key);
    }
  }

  /**
   * Add key to map.
   * @param {*} key
   * @return {int} count
   */
  add(key) {
    const hashed = this.hash(key);
    if (!this.counts[hashed]) {
      this.counts[hashed] = {
        hash: hashed,
        key,
        count: 1,
      };
    } else {
      this.counts[hashed].count++;
    }
    return this.counts[hashed].count;
  }

  /**
   * Count key instances.
   * @param {*} key
   * @return {int} count
   */
  get(key) {
    const hashed = this.hash(key);
    return this.counts[hashed] ? this.counts[hashed].count : 0;
  }

  /**
   * Get keys.
   * @return {Array} keys
   */
  keys() {
    return Object.values(this.counts).map((val) => val.key);
  }

  /**
   * Get entries.
   * @return {Array<countEntry>} entries
   */
  entries() {
    return Object.values(this.counts).map((val) => [val.key, val.count]);
  }
}

module.exports = CountMap;
