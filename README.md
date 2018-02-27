# pxlsrt.js

This Node.js module is based on the [RubyGem pxlsrt](http://github.com/czycha/pxlsrt). Pixel sorting is where an image is divided into sections (called "bands" in pxlsrt nomenclature) and those sections are in turn sorted based off of properties of the pixels within them. Pxlsrt is a basic library that allows you to do this.

## Installation

```
npm install pxlsrt
```

## Example

Check out [example/example.js](example/example.js) for examples.

```js
import Pxlsrt from 'pxlsrt';

Pxlsrt.read('./test.png').then(image => {
  image.filter('brute', { min: 10, max: 20, method: 'saturation', direction: 'vertical' }).write('./output.png');
})
```

## Browser environment

There is a browser-friendly version as well. The only differences are that it loads a browser-friendly version of [Jimp](https://github.com/oliver-moran/jimp) and removes methods that can't be taken in the browser (like writing to a file).

```js
import Pxlsrt from 'pxlsrt/dist/browser';
```

## Filters

Pxlsrt implements filters which affect how the image is pixel sorted. There are two filters included by default, "Brute" and "Smart". Pxlsrt is also extensible so custom filters can be written and included.

### Default filter options

Filters are not required to have these options, but the default filters have these in common:

- **method** – Sort method applied to band.
  - **uniqueness** – How unique the pixel is compared to the others in its band.
  - **random** – Shuffles band.
  - **none** – Performs no sorting option.
  - **sumRGBA** – Sum red, green, blue, and alpha channels. **Default.**
  - **sumHSLA** – Sum hue, saturation, lightness, and alpha channels.
  - **sumHSVA** – Sum hue, saturation, value, and alpha channels.
  - **sumCMYKA** – Sum cyan, magenta, yellow, black, and alpha channels.
  - [**luma**](https://en.wikipedia.org/wiki/Luma_(video)) – Alternative brightness value
  - **alpha**
  - **red**
  - **green**
  - **blue**
  - **hue**
  - **saturation**
  - **lightness**
  - **value**
  - **cyan**
  - **magenta**
  - **yellow**
  - **black**
- **direction** – Direction to sort in.
  - **horizontal** – **Default.**
  - **vertical**
  - **tlbr** – Top-left to bottom-right diagonal.
  - **trbl** – Top-right to bottom-left diagonal.
- **reverse** – Whether or not to reverse the band after sorting.
  - **true** – Reverses band.
  - **false** – Doesn't reverse band. **Default.**
  - **'either'** – Randomly reverse or not reverse band.
- **middlate** – Apply "middlation" effect. Middlation rearranges a band so the first pixel is in the middle, and continues to wind outwards. For example, `{1 2 3 4 5 6}` middlated once is `{5 3 1 2 4 6}`. You can loop and apply middlation multiple times or applying the process in reverse.
  - **0** – Apply no middlation . **Default.**
  - **> 0** – Middlate that many times.
  - **< 0** – Middlate in reverse that many times.

### Brute filter

The Brute filter doesn't care about the contents of the image. Brute randomly divides the image into bands within a range of length. It is then sorted within those bands.

#### Options

- **min** – The minimum band length. If less than 0, will equal the maximum band length. **Default: -1.**
- **max** – The maximum band length. If less than 0, will equal the total size of the line. **Default: -1.**

### Smart filter

The Smart filter uses edge detection to find regions of the image which it then sorts.

#### Options

- **tolerance** – The higher the tolerance, the larger the regions, and the more pixels that are added to the bands. Different images may require different tolerances in order to achieve the intended effects. **Default: 20.**

### Creating your own filter

Pxlsrt filters are based off of the `Filter` class and added via the `FilterCollection`. Below is an example of how to create your own filter and apply it.

#### myfilter.js
```js
import Pxlsrt from 'pxlsrt';

class MyFilter extends Pxlsrt.Filter {
  // Your filter must override the run function
  // It only accepts two arguments:
  //   - image: Pxlsrt.Image that is calling the filter.
  //   - options: Object with options for the filter.
  static run(image, options = {}) {
    // Apply some effects to image
    return image;
  }
}

module.exports = MyFilter;
```

#### applymyfilter.js
```js
import Pxlsrt from 'pxlsrt';
import MyFilter from './myfilter.js';

Pxlsrt.FilterCollections.add('myfilter', MyFilter);
Pxlsrt.read('./test.png').then(image => {
  image.filter('myfilter').write('./output.png');
});
```

## API

To see classes and functions, run jsdoc and checkout the docs folder:

```
npm run jsdoc
```

## License

Pxlsrt is licensed under the MIT license.