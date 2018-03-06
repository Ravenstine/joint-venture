'use strict';

const assert     = require('chai').assert,
      BaseObject = require('../lib/base-object');

describe('base-object', function(){

  describe('this.mixin()', function(){

    it('creates a new object with functions from another object', function(){
      class Obj1 extends BaseObject {
        goodbye(){}
      }
      class Obj2 extends BaseObject {
        hello(){ return 'hello'; }
      }
      class Obj3 extends BaseObject.mixin(Obj2, Obj1) {
        hello(){ return super.hello() + ' world'; }
        foo(){}
      }
      let obj = new Obj3();
      assert.exists(obj.foo);
      assert.equal(obj.hello(), 'hello world');
      assert.exists(obj.goodbye);
    });

    it('supports regular objects as well as constructors/classes', function(){
      let mixin = {
        world: function() { return 'world'; }
      }
      class Obj extends BaseObject.mixin(mixin) {
        hello(){ return 'hello'; }
      }
      let obj = new Obj();
      assert.exists(obj.hello);
      assert.exists(obj.world);
    });


  });

});

