'use strict';

const assert             = require('chai').assert,
      { 
        Context, 
        AlexaResponse, 
        GoogleResponse, 
        CortanaResponse 
      }                  = require('../index'),
      AlexaMockRequest   = require('./mock/alexa/launch.json'),
      GoogleMockRequest  = require('./mock/google/sample-request.json'),
      CortanaMockRequest = require('./mock/cortana/message.json');

describe('context', function(){

  it('generates an Alexa response from an Alexa request', function(){
    let context = new Context(AlexaMockRequest);
    assert.equal(context.get('response.constructor'), AlexaResponse);
  });

  it('generates a Google response from an Google request', function(){
    let context = new Context(GoogleMockRequest);
    assert.equal(context.get('response.constructor'), GoogleResponse);
  });

  it('generates a Cortana response from an Cortana request', function(){
    let context = new Context(CortanaMockRequest);
    assert.equal(context.get('response.constructor'), CortanaResponse);
  });

  describe('say()', function(){

    it('writes speech to a response', function(){
      let context = new Context(AlexaMockRequest);
      context.say('Hello World');
      assert.include(context.get('response.speech'), 'Hello World');
    });

    it('takes an object with locale-specific speech', function(){
      let context = new Context(AlexaMockRequest);
      context.say({
        'en-US': 'Hello World',
        'de-DE': 'Hallo Welt'
      });
      assert.include(context.get('response.speech'), 'Hello World');
      assert.notInclude(context.get('response.speech'), 'Hallo Welt');
    });

    it('takes an object with audio and writes it as SSML', function(){
      let context = new Context(AlexaMockRequest);
      context.say({
        audio: 'https://example.xyz/example.mp3'
      });
      assert.include(context.get('response.speech'), '<audio src="https://example.xyz/example.mp3"/>');
    });

    it('takes an object with a break defined and writes it as SSML', function(){
      let context = new Context(AlexaMockRequest);
      context.say({
        break: 'medium'
      });
      assert.include(context.get('response.speech'), '<break strength="medium"/>');
    });

    it('takes an object with a pause defined and writes it as a break tag in SSML', function(){
      let context = new Context(AlexaMockRequest);
      context.say({
        pause: '3s'
      });
      assert.include(context.get('response.speech'), '<break time="3s"/>');
    });

    it('writes random speech', function(){
      let context = new Context(AlexaMockRequest),
          randomSpeech = [
            'Old McDonald had a farm',
            'EIEIO',
            'And on his farm he had a cow'
          ];
      context.say({
        random: randomSpeech
      });
      assert.include(randomSpeech, context.get('response.speech')[0]);
    });

    it('takes an array of strings', function(){
      let context = new Context(AlexaMockRequest);
      context.say([
        'Hello',
        'World'
      ]);
      assert.include(context.get('response.speech'), 'Hello');
      assert.include(context.get('response.speech'), 'World');
    });

    it('takes an array of objects', function(){
      let context = new Context(AlexaMockRequest);
      context.say([
        {
          'en-US': 'Hello World'
        },
        {
          'en-US': 'Goodbye World'
        }
      ]);
      assert.include(context.get('response.speech'), 'Hello World');
      assert.include(context.get('response.speech'), 'Goodbye World');
    });

  });

  describe('ask()', function(){

    it('writes speech to a response', function(){
      let context = new Context(AlexaMockRequest);
      context.say('Who\'s your daddy?');
      assert.include(context.get('response.speech'), 'Who\'s your daddy?');
    });

    it('sets shouldEndSession to false', function() {
      let context = new Context(AlexaMockRequest);
      assert.isTrue(context.get('response.shouldEndSession'));
      context.ask('Who\'s your daddy?');
      assert.isFalse(context.get('response.shouldEndSession'));
    });

  });

});

