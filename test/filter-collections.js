const FilterCollection = require('../dist/lib/filter-collection.js');
const Smart = require('../dist/filters/smart.js');
const Brute = require('../dist/filters/brute.js');
const Filter = require('../dist/lib/filter.js');
const expect = require('chai').expect;

describe('FilterCollection', function() {
  describe('#filters', function() {
    it('should have default filters', function() {
      expect(FilterCollection.filters).to.have.all.keys('smart', 'brute');
      expect(FilterCollection.filters.smart).to.equal(Smart);
      expect(FilterCollection.filters.brute).to.equal(Brute);
    });
  });
  describe('#get()', function() {
    it('should get filter by key', function() {
      const filter = FilterCollection.get('smart');
      expect(filter).to.equal(Smart);
    });
  });
  describe('#add()', function() {
    it('should add new filter', function() {
      FilterCollection.add('filter', Filter);
      expect(FilterCollection.filters).to.include.all.keys('filter');
      expect(FilterCollection.filters.filter).to.equal(Filter);
    });
    it('should override filters', function() {
      FilterCollection.add('brute', Filter);
      expect(FilterCollection.filters).to.include.all.keys('brute');
      expect(FilterCollection.filters.brute).to.equal(Filter).and.not.equal(Brute);
    });
  });
});