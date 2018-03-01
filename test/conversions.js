const Conversions = require('../dist/lib/conversions.js');
const expect = require('chai').expect;

const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;

describe('Conversions', function() {
  describe('#xyToTLBRDiagonal(), #tlbrDiagonalToXY()', function() {
    it('should convert between XY and TLBR', function() {
      for (let i = 0; i < 50; i++) {
        const c = rand(5, 100);
        const x = rand(0, c);
        const y = rand(0, 100);
        const {key, index} = Conversions.xyToTLBRDiagonal(x, y);
        const {x: xi, y: yi} = Conversions.tlbrDiagonalToXY(key, index);
        expect(xi).to.equal(x);
        expect(yi).to.equal(y);
      }
    });
  });
  describe('#xyToTRBLDiagonal(), #trblDiagonalToXY()', function() {
    it('should convert between XY and TRBL', function() {
      for (let i = 0; i < 50; i++) {
        const c = rand(5, 100);
        const x = rand(0, c);
        const y = rand(0, 100);
        const {key, index} = Conversions.xyToTLBRDiagonal(x, y, c);
        const {x: xi, y: yi} = Conversions.tlbrDiagonalToXY(key, index, c);
        expect(xi).to.equal(x);
        expect(yi).to.equal(y);
      }
    });
  });
});
