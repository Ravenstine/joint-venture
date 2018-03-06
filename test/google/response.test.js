'use strict';

const assert        = require('chai').assert,
      GoogleResponse = require('../../lib/google/response');

describe('response - google', function(){

  it('writes output speech', function(){
    let response = new GoogleResponse();
    response.get('speech', []).push('Hello World');
    assert.match(response.get('output.final_response.ssml', ''), /Hello World/);
  });

  it('sets reprompt if prompt added and shouldEndSession is false', function(){
    let response = new GoogleResponse();
    response.set('shouldEndSession', false);
    response.get('prompts').push('What\'s your favorite color?');
    response.get('reprompts').push('I didn\'nt catch that');
    assert.match(response.get('output.expected_inputs[0].input_prompt.initial_prompts[0].ssml', ''), /favorite color/);
    assert.match(response.get('output.expected_inputs[0].input_prompt.no_input_prompts[0]', ''), /catch that/);
    assert.notExists(response.get('output.final_response.ssml'));
  });

});

