'use strict';

const assert             = require('chai').assert,
      Handler            = require('../lib/handler');

describe('handler', function(){

  it('takes an state name', function(){
    let handler = new Handler('a state');
    assert.equal(handler.get('stateName'), 'a state');
  });

  describe('this.create()', function(){
    
    it('creates a handler instance', function(){
      assert.exists(Handler.create());
    });

    it('takes a state name', function(){
      let handler = Handler.create('some state');
      assert.equal(handler.get('stateName'), 'some state');
    });

    it('accepts mixins', function(){
      let mixin1 = {
            hello(){}
          },
          mixin2 = {
            world(){}
          },
          handler = Handler.create(mixin1, mixin2);
      assert.exists(handler.hello);
      assert.exists(handler.world);
    });

    it('accepts mixins with a state name', function(){
      let mixin1 = {
            hello(){}
          },
          mixin2 = {
            world(){}
          },
          handler = Handler.create('some state', mixin1, mixin2);
      assert.equal(handler.get('stateName'), 'some state');
      assert.exists(handler.hello);
      assert.exists(handler.world);
    });

  });

  describe('getActionFunction()', function(){

    it('returns a matching action function', function(){
      class SomeHandler extends Handler {
        LaunchRequest(){}
      }
      let handler = new SomeHandler('some state');
      assert.exists(handler.getActionFunction('LaunchRequest'));
    });

    it('returns a matching comma-separated action function', function(){
      class SomeHandler extends Handler {
        'LaunchRequest,SomeIntentName'(){}
      }
      let handler = new SomeHandler('some state')
      assert.exists(handler.getActionFunction('LaunchRequest'));
      assert.exists(handler.getActionFunction('SomeIntentName'));
      assert.notExists(handler.getActionFunction('NonExistentIntentName'));
    });

    it('chooses wildcard function if no function matches action', function(){
      class SomeHandler extends Handler {
        LaunchRequest(){}
        '?'(){}
      }
      let handler = new SomeHandler();
      assert.equal(handler.getActionFunction('NotARealIntent'), SomeHandler.prototype['?']);
    });

  });

});

