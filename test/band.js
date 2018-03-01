const Band = require('../dist/lib/band.js');
const onecolor = require('onecolor/one-color-all');
const assert = require('assert');

describe('Band', function() {
  let band;
  const pixels = [
    onecolor([255, 255, 255, 255]),
    onecolor([192, 137, 103, 0]),
    onecolor([255, 0, 0, 192]),
    onecolor([0, 0, 0, 255]),
    onecolor([0, 204, 221, 238]),
  ];
  const pixelOrder = (...order) => order.map((i) => pixels[i]);
  const compareOrder = (band, ...order) => {
    const shouldBe = pixelOrder(...order);
    return;
      shouldBe.length === band.pixels.length &&
      shouldBe.every((pixel, i) => pixel.equals(band.pixels[i]));
  };
  beforeEach(function() {
    band = new Band(pixels);
  });
  describe('#reverse()', function() {
    it('should reverse', function() {
      band.reverse();
      assert(compareOrder(band, 4, 3, 2, 1, 0));
    });
  });
  describe('#middlate()', function() {
    it('should middlate', function() {
      band.middlate();
      assert(compareOrder(band, 3, 1, 0, 2, 4));
    });
  });
  describe('#middlateReverse()', function() {
    it('should reverse middlate', function() {
      band.middlateReverse();
      assert(compareOrder(band, 2, 1, 3, 0, 4));
    });
  });
  describe('#middlateLoop()', function() {
    it('should loop middlate', function() {
      band.middlateLoop(1);
      assert(compareOrder(band, 3, 1, 0, 2, 4));
      band.middlateLoop(-1);
      assert(compareOrder(band, 0, 1, 2, 3, 4));
      band.middlateLoop(0);
      assert(compareOrder(band, 0, 1, 2, 3, 4));
      band.middlateLoop(-1);
      assert(compareOrder(band, 2, 1, 3, 0, 4));
    });
  });
  describe('#none()', function() {
    it('should not sort', function() {
      band.none();
      assert(compareOrder(band, 0, 1, 2, 3, 4));
    });
  });
  describe('#alpha()', function() {
    it('should sort by alpha values', function() {
      band.alpha();
      assert(compareOrder(band, 1, 2, 4, 0, 3));
    });
  });
  describe('#sumRGBA()', function() {
    it('should sort by sum of red, green, blue, and alpha values', function() {
      band.sumRGBA();
      assert(compareOrder(band, 3, 1, 2, 4, 0));
    });
  });
  describe('#red()', function() {
    it('should sort by red values', function() {
      band.red();
      assert(compareOrder(band, 3, 4, 1, 0, 2));
    });
  });
  describe('#green()', function() {
    it('should sort by green values', function() {
      band.green();
      assert(compareOrder(band, 2, 3, 1, 4, 0));
    });
  });
  describe('#blue()', function() {
    it('should sort by blue values', function() {
      band.blue();
      assert(compareOrder(band, 2, 3, 1, 4, 0));
    });
  });
  describe('#luma()', function() {
    it('should sort by luma values', function() {
      band.luma();
      assert(compareOrder(band, 3, 2, 1, 4, 0));
    });
  });
  describe('#sumHSLA()', function() {
    it('should sort by sum of hue, saturation, lightness, and alpha values', function() {
      band.sumHSLA();
      assert(compareOrder(band, 3, 1, 0, 2, 4));
    });
  });
  describe('#hue()', function() {
    it('should sort by hue values', function() {
      band.hue();
      assert(compareOrder(band, 0, 2, 3, 1, 4));
    });
  });
  describe('#saturation()', function() {
    it('should sort by saturation values', function() {
      band.saturation();
      assert(compareOrder(band, 0, 3, 1, 2, 4));
    });
  });
  describe('#lightness()', function() {
    it('should sort by lightness values', function() {
      band.lightness();
      assert(compareOrder(band, 3, 4, 2, 1, 0));
    });
  });
  describe('#sumHSVA()', function() {
    it('should sort by sum of hue, saturation, lightness, and alpha values', function() {
      band.sumHSVA();
      assert(compareOrder(band, 3, 1, 0, 2, 4));
    });
  });
  describe('#value()', function() {
    it('should sort by value values', function() {
      band.value();
      assert(compareOrder(band, 3, 1, 4, 0, 2));
    });
  });
  describe('#sumCMYKA()', function() {
    it('should sort by sum of cyan, magenta, yellow, black, and alpha values', function() {
      band.sumCMYKA();
      assert(compareOrder(band, 1, 0, 4, 2, 3));
    });
  });
  describe('#cyan()', function() {
    it('should sort by cyan values', function() {
      band.cyan();
      assert(compareOrder(band, 0, 1, 2, 3, 4));
    });
  });
  describe('#magenta()', function() {
    it('should sort by magenta values', function() {
      band.magenta();
      assert(compareOrder(band, 0, 4, 1, 2, 3));
    });
  });
  describe('#yellow()', function() {
    it('should sort by yellow values', function() {
      band.yellow();
      assert(compareOrder(band, 0, 4, 1, 2, 3));
    });
  });
  describe('#black()', function() {
    it('should sort by black values', function() {
      band.black();
      assert(compareOrder(band, 0, 2, 4, 1, 3));
    });
  });
  describe('#uniqueness()', function() {
    it('should sort by pixel uniqueness within band', function() {
      band.uniqueness();
      assert(compareOrder(band, 1, 4, 2, 3, 0));
    });
  });
});
