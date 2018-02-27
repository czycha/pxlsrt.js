import onecolor from 'onecolor/one-color-all';

/**
 * Band of pixels that will be sorted
 */
class Band {
  /**
   * Creates a Band.
   * @constructor
   * @param {Array<Onecolor>} pixels
   */
  constructor(pixels) {
    /**
     * Band pixels
     * @member
     * @type {Array<Onecolor>}
     */
    this.pixels = [...pixels];

    /**
     * Sortable properties
     * @member
     * @type {Array<string>}
     */
    this.sortable = [
      'alpha',
      'black',
      'blue',
      'cyan',
      'green',
      'hue',
      'lightness',
      'luma',
      'magenta',
      'none',
      'random',
      'red',
      'saturation',
      'sumCMYKA',
      'sumHSLA',
      'sumHSVA',
      'sumRGBA',
      'uniqueness',
      'value',
      'yellow',
    ];
  }

  /**
   * Reverses band.
   * @return {Band} this
   */
  reverse() {
    this.pixels.reverse();
    return this;
  }

  /**
   * Applies cool "middlation" effect to band.
   * @return {Band} this
   */
  middlate() {
    const newBand = [];
    for (let i = 0; i < this.pixels.length; i += 1) {
      if ((this.pixels.length + i) % 2 === 1) {
        newBand[0.5 * ((this.pixels.length + i) - 1)] = this.pixels[i];
      } else {
        newBand[(0.5 * (this.pixels.length - i)) - 1] = this.pixels[i];
      }
    }
    this.pixels = newBand;
    return this;
  }

  /**
   * Applies cool "middlation" effect in reverse to band.
   * @return {Band} this
   */
  middlateReverse() {
    const newBand = [];
    for (let i = 0; i < this.pixels.length; i += 1) {
      const comparator = Math.ceil(this.pixels.length / 2.0) - 1;
      if (i === comparator) {
        newBand[0] = this.pixels[i];
      } else if (i < comparator) {
        newBand[this.pixels.length - (2 * i) - 2] = this.pixels[i];
      } else {
        newBand[((2 * i) - this.pixels.length) + 1] = this.pixels[i];
      }
    }
    this.pixels = newBand;
    return this;
  }

  /**
   * Loops through middlations.
   * @param {int} count - If less than zero, calls `middlateReverse` that many times. If greater, calls `middlate`.
   * @return {Band} this
   * @see(#middlate)
   * @see(#middlateReverse)
   */
  middlateLoop(count) {
    if (count < 0) {
      const to = Math.abs(count);
      for (let i = 0; i < to; i += 1) {
        this.middlateReverse();
      }
    } else if (count > 0) {
      for (let i = 0; i < count; i += 1) {
        this.middlate();
      }
    }
    return this;
  }

  /**
   * @callback sortCallback
   * @param {Onecolor} a
   * @param {Onecolor} b
   * @return {int} -1 if a is less than b; 1 if a is more than b; 0 if a equals b
   */

  /**
   * Sorts by custom method.
   * @param {sortCallback} method
   * @return {Band} this
   */
  sort(method) {
    this.pixels = this.pixels.sort(method);
    return this;
  }

  /**
   * @callback sortByMethodCallback
   * @param {Onecolor} color
   * @return {*} Comparable value
   */

  /**
   * Compare by a transformation applied to all values.
   * @param {sortByMethodCallback} method
   * @return {Band} this
   */
  sortBy(method) {
    return this.sort((a, b) => {
      const transformA = method(a);
      const transformB = method(b);
      if (transformA < transformB) {
        return -1;
      } else if (transformA > transformB) {
        return 1;
      }
      return 0;
    });
  }

  /**
   * Call method to sort by it.
   * @throws Will throw error if provided invalid method name.
   * @param {string} methodName
   * @return {Band} this
   */
  sortByMethod(methodName) {
    if (this.sortable.includes(methodName)) {
      return this[methodName]();
    }
    throw new Error(`Invalid sort method: ${methodName}`);
  }

  /**
   * Shuffles band.
   * @return {Band} this
   */
  random() {
    this.pixels = this.pixels.sort(() => (0.5 - Math.random()));
    return this;
  }

  /**
   * No-op
   * @return {Band} this
   */
  none() {
    return this;
  }

  /**
   * Sort by alpha
   * @return {Band} this
   */
  alpha() {
    return this.sortBy((color) => color.alpha());
  }

  /**
   * Sort by hue
   * @return {Band} this
   */
  hue() {
    this.toHSV();
    return this.sortBy((color) => color.hue());
  }

  /**
   * Sort by saturation
   * @return {Band} this
   */
  saturation() {
    this.toHSV();
    return this.sortBy((color) => color.saturation());
  }

  /**
   * Sort by value
   * @return {Band} this
   */
  value() {
    this.toHSV();
    return this.sortBy((color) => color.value());
  }

  /**
   * Sort by lightness
   * @return {Band} this
   */
  lightness() {
    this.toHSL();
    return this.sortBy((color) => color.lightness());
  }

  /**
   * Sort by sum of hue, saturation, lightness, and alpha
   * @return {Band} this
   */
  sumHSLA() {
    this.toHSL();
    return this.sortBy((color) => (
      color.hue() +
      color.saturation() +
      color.lightness() +
      color.alpha()
    ));
  }

  /**
   * Sort by sum of hue, saturation, value, and alpha
   * @return {Band} this
   */
  sumHSVA() {
    this.toHSV();
    return this.sortBy((color) => (
      color.hue() +
      color.saturation() +
      color.value() +
      color.alpha()
    ));
  }

  /**
   * Sort by red channel
   * @return {Band} this
   */
  red() {
    this.toRGB();
    return this.sortBy((color) => color.red());
  }

  /**
   * Sort by green channel
   * @return {Band} this
   */
  green() {
    this.toRGB();
    return this.sortBy((color) => color.green());
  }

  /**
   * Sort by blue channel
   * @return {Band} this
   */
  blue() {
    this.toRGB();
    return this.sortBy((color) => color.blue());
  }

  /**
   * Sort by sum of red, blue, green, and alpha values
   * @return {Band} this
   */
  sumRGBA() {
    this.toRGB();
    return this.sortBy((color) => (
      color.red() +
      color.green() +
      color.blue() +
      color.alpha()
    ));
  }

  /**
   * Sort by cyan channel
   * @return {Band} this
   */
  cyan() {
    this.toCMYK();
    return this.sortBy((color) => color.cyan());
  }

  /**
   * Sort by magenta channel
   * @return {Band} this
   */
  magenta() {
    this.toCMYK();
    return this.sortBy((color) => color.magenta());
  }

  /**
   * Sort by yellow channel
   * @return {Band} this
   */
  yellow() {
    this.toCMYK();
    return this.sortBy((color) => color.yellow());
  }

  /**
   * Sort by black (K) channel
   * @return {Band} this
   */
  black() {
    this.toCMYK();
    return this.sortBy((color) => color.black());
  }

  /**
   * Sort by sum of cyan, magenta, yellow, black, and alpha channels.
   * @return {Band} this
   */
  sumCMYKA() {
    this.toCMYK();
    return this.sortBy((color) => (
      color.cyan() +
      color.magenta() +
      color.yellow() +
      color.black() +
      color.alpha()
    ));
  }

  /**
   * Sort by luma value.
   * @return {Band} this
   * @see {@link https://en.wikipedia.org/wiki/Luma_(video)}
   */
  luma() {
    this.toRGB();
    return this.sortBy((color) => (
      color.red() * 0.2126 +
      color.green() * 0.7152 +
      color.blue() * 0.0722
    ));
  }

  /**
   * Sort by uniqueness compared to other colors in band.
   * @return {Band} this
   */
  uniqueness() {
    this.toRGB();
    const colors = this.pixels.reduce((colors, color) => {
      colors.red += color.red();
      colors.green += color.green();
      colors.blue += color.blue();
      colors.alpha += color.alpha();
      return colors;
    }, {red: 0, green: 0, blue: 0, alpha: 0});
    colors.red /= this.pixels.length;
    colors.green /= this.pixels.length;
    colors.blue /= this.pixels.length;
    colors.alpha /= this.pixels.length;
    return this.sortBy((color) => (
      Math.pow(color.red() - colors.red, 2) +
      Math.pow(color.green() - colors.green, 2) +
      Math.pow(color.blue() - colors.blue, 2) +
      Math.pow(color.alpha() - colors.alpha, 2)
    ));
  }

  /**
   * Convert color space to RGB.
   */
  toRGB() {
    if (!(this.pixels[0] instanceof onecolor.RGB)) {
      this.pixels = this.pixels.map((color) => color.rgb());
    }
  }

  /**
   * Convert color space to HSV.
   */
  toHSV() {
    if (!(this.pixels[0] instanceof onecolor.HSV)) {
      this.pixels = this.pixels.map((color) => color.hsv());
    }
  }

  /**
   * Convert color space to HSL.
   */
  toHSL() {
    if (!(this.pixels[0] instanceof onecolor.HSL)) {
      this.pixels = this.pixels.map((color) => color.hsl());
    }
  }

  /**
   * Convert color space to CMYK.
   */
  toCMYK() {
    if (!(this.pixels[0] instanceof onecolor.CMYK)) {
      this.pixels = this.pixels.map((color) => color.cmyk());
    }
  }
}

module.exports = Band;
