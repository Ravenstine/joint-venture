'use strict';

const assert    = require('chai').assert,
      BaseArray = require('../lib/base-array');

describe('base-array', function(){

  describe('first()', function(){
    it('returns the first element', function(){
      let array = BaseArray.from(['a', 'b', 'c']);
      assert.equal(array.first, 'a');
    });
  });

  describe('last()', function(){
    it('returns the last element', function(){
      let array = BaseArray.from(['a', 'b', 'c']);
      assert.equal(array.last, 'c');
    });
  });

  describe('dconcat()', function() {
    it('pushes another array\'s elements', function(){
      let array = BaseArray.from(['a', 'b', 'c']);
      array.dconcat(['d', 'e', 'f']);
      assert.equal(array.length, 6);
    });
  });

});

