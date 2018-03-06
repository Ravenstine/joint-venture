'use strict';

const assert        = require('chai').assert,
      AlexaResponse = require('../../lib/alexa/response');

describe('response - alexa', function(){

  it('contains speech', function(){
    let response = new AlexaResponse();
    response.get('speech', []).push('Hello World');
    assert.match(response.get('output.response.outputSpeech.ssml', ''), /Hello World/);
  });

  it('sets reprompt if shouldEndSession is false', function(){
    let response = new AlexaResponse();
    response.set('shouldEndSession', false);
    response.get('reprompts').push('I didn\'nt catch that');
    assert.match(response.get('output.response.reprompt.outputSpeech.ssml', ''), /catch that/);
  });

  it('doesn\'t set reprompt if shouldEndSession is true', function(){
    let response = new AlexaResponse();
    response.get('reprompts').push('I didn\'nt catch that');
    assert.notExists(response.get('output.response.reprompt.outputSpeech.ssml'));
  });

});

