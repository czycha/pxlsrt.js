const Band = require('../dist/lib/band.js');
const color = require('onecolor/one-color-all');
const expect = require('chai').expect;

describe('Band', function() {
  let band;
  const pixels = [
    color([255, 255, 255, 255]), // rgba(255, 255, 255, 255); hsla(0, 0, 255, 1.0)
    color([192, 137, 103, 0]), // rgba(192, 137, 103, 0); hsla(22.921, 105.558, 147.5, 0.0)
    color([255, 0, 0, 192]), // rgba(255, 0, 0, 192); hsla(0, 255, 127.5, 0.7529)
    color([0, 0, 0, 255]), // rgba(0, 0, 0, 255); hsla (0, 0, 0, 1.0)
    color([0, 204, 221, 238]), // rgba(0, 204, 221, 238); hsla(184.615, 255, 110.5, 0.933)
  ];
  const pixelOrder = (...order) => order.map((i) => pixels[i]);
  beforeEach(function() {
    band = new Band(pixels);
  });
  describe('#reverse()', function() {
    it('should reverse', function() {
      band.reverse();
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(4, 3, 2, 1, 0));
    });
  });
  describe('#middlate()', function() {
    it('should middlate', function() {
      band.middlate();
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(3, 1, 0, 2, 4));
    });
  });
  describe('#middlateReverse()', function() {
    it('should reverse middlate', function() {
      band.middlateReverse();
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(2, 1, 3, 0, 4));
    });
  });
  describe('#middlateLoop()', function() {
    it('should loop middlate', function() {
      band.middlateLoop(1);
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(3, 1, 0, 2, 4));
      band.middlateLoop(-1);
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(0, 1, 2, 3, 4));
      band.middlateLoop(0);
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(0, 1, 2, 3, 4));
      band.middlateLoop(-1);
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(2, 1, 3, 0, 4));
    });
  });
  describe('#none()', function() {
    it('should not sort', function() {
      band.none();
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(0, 1, 2, 3, 4));
    });
  });
  describe('#alpha()', function() {
    it('should sort by alpha values', function() {
      band.alpha();
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(1, 2, 4, 0, 3));
    });
  });
  describe('#sumRGBA()', function() {
    it('should sort by sum of red, green, blue, and alpha values', function() {
      band.sumRGBA();
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(3, 1, 2, 4, 0));
    });
  });
  describe('#red()', function() {
    it('should sort by red values', function() {
      band.red();
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(3, 4, 1, 0, 2));
    });
  });
  describe('#green()', function() {
    it('should sort by green values', function() {
      band.green();
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(2, 3, 1, 4, 0));
    });
  });
  describe('#blue()', function() {
    it('should sort by blue values', function() {
      band.blue();
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(2, 3, 1, 4, 0));
    });
  });
  describe('#luma()', function() {
    it('should sort by luma values', function() {
      band.luma();
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(3, 2, 1, 4, 0));
    });
  });
  describe('#sumHSLA()', function() {
    it('should sort by sum of hue, saturation, lightness, and alpha values', function() {
      band.sumHSLA();
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(3, 1, 0, 2, 4).map(c => c.hsl()));
    });
  });
  describe('#hue()', function() {
    it('should sort by hue values', function() {
      band.hue();
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(0, 2, 3, 1, 4).map(c => c.hsv()));
    });
  });
  describe('#saturation()', function() {
    it('should sort by saturation values', function() {
      band.saturation();
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(0, 3, 1, 2, 4).map(c => c.hsv()));
    });
  });
  describe('#lightness()', function() {
    it('should sort by lightness values', function() {
      band.lightness();
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(3, 4, 2, 1, 0).map(c => c.hsl()));
    });
  });
  describe('#sumHSVA()', function() {
    it('should sort by sum of hue, saturation, lightness, and alpha values', function() {
      band.sumHSVA();
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(3, 1, 0, 2, 4).map(c => c.hsv()));
    });
  });
  describe('#value()', function() {
    it('should sort by value values', function() {
      band.value();
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(3, 1, 4, 0, 2).map(c => c.hsv()));
    });
  });
  describe('#sumCMYKA()', function() {
    it('should sort by sum of cyan, magenta, yellow, black, and alpha values', function() {
      band.sumCMYKA();
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(1, 0, 4, 2, 3).map(c => c.cmyk()));
    });
  });
  describe('#cyan()', function() {
    it('should sort by cyan values', function() {
      band.cyan();
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(0, 1, 2, 3, 4).map(c => c.cmyk()));
    });
  });
  describe('#magenta()', function() {
    it('should sort by magenta values', function() {
      band.magenta();
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(0, 4, 1, 2, 3).map(c => c.cmyk()));
    });
  });
  describe('#yellow()', function() {
    it('should sort by yellow values', function() {
      band.yellow();
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(0, 4, 1, 2, 3).map(c => c.cmyk()));
    });
  });
  describe('#black()', function() {
    it('should sort by black values', function() {
      band.black();
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(0, 2, 4, 1, 3).map(c => c.cmyk()));
    });
  });
  describe('#uniqueness()', function() {
    it('should sort by pixel uniqueness within band', function() {
      band.uniqueness();
      expect(band.pixels).to.have.deep.ordered.members(pixelOrder(1, 4, 2, 3, 0));
    });
  });
});
