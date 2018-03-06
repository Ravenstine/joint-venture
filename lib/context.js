'use strict';

const detectAssistant = require('./assistant-detector'),
      BaseObject      = require('./base-object'),
      BaseArray       = require('./base-array'),
      AlexaRequest    = require('./alexa/request'),
      AlexaResponse   = require('./alexa/response'),
      GoogleRequest   = require('./google/request'),
      GoogleResponse  = require('./google/response'),
      CortanaRequest  = require('./cortana/request'),
      CortanaResponse = require('./cortana/response'),
      speak           = require('./speech-builder');

/**
 * Represents the context of the overall applications state, including the request, response, current state, etc.  It is also used as the public interface to build the response object.
 * @class
 * @extends BaseObject
*/
class Context extends BaseObject {
  constructor(requestObject, options={}){
    super();
    let assistant, request, response;
    assistant = detectAssistant(requestObject);
    if(assistant == 'alexa'){
      request  = new AlexaRequest(requestObject);
      response = new AlexaResponse();
    }
    if(assistant == 'google'){
      request  = new GoogleRequest(requestObject);
      response = new GoogleResponse();
    }
    if(assistant == 'cortana'){
      request  = new CortanaRequest(requestObject);
      response = new CortanaResponse();
    }
    this.set('assistant', assistant);
    this.set('request',   request);
    this.set('response',  response);
    this.set('state',     request.get('state'));
    this.set('action',    request.get('action'));
    this.set('options',   options);
    this.clean();
  }
  /**
   * Indicates if the state has changed.  It will return true if either the `state` property or the `action` property have changed.
   * @property Context.hasChangedState
   * @private
   * @returns {boolean}
  */
  get hasChangedState(){
    return this.get('dirty.state') || this.get('dirty.action');
  }
  /**
   * Erases record of property changes.
   * @method
   * @private
  */
  clean(){
    this.dirty = {};
  }
  set(...args){
    super.set(...args);
    this.get('dirty', {})[args[0]] = true;
  }
  /**
   * Writes speech to the response object.
   * @method
   * @param {object} speech - A string or object structure of speech.
   * @example
   * // You can provide a string:
   * context.say('Hello world');
   * // Or you can specify different strings for locales
   * context.say({
   *   'en-US': 'hello world',
   *   'de-DE': 'hallo welt'  
   * });
   * // Or an array of either objects or strings (to be concatenated)
   * context.say([
   *   'Hello!',
   *   {
   *      'en-US': 'goodbye',
   *      'de-DE': 'auf wiedersehen'
   *   }
   * ]);
   * // You can also add pauses and audio
   * context.say([
   *   {audio: 'https://example.net/sound.mp3'},
   *   {pause: '2s'},
   *   'Oh, sorry, I thought we were done speaking.'
   * ]);
  */
  say(speech){
    let ssml         = speak(speech, this),
        outputSpeech = this.get('response.speech', new BaseArray());
    outputSpeech.push.apply(outputSpeech, ssml);
  }
  /**
   * Writes speech meant to represent a question to the user and prevents the session from being ended.
   * @method
   * @param {object} speech - A string or object structure of speech.
  */
  ask(speech){
    let ssml         = speak(speech, this),
        outputSpeech = this.get('response.prompts', new BaseArray());
    outputSpeech.push.apply(outputSpeech, ssml);
    this.set('response.shouldEndSession', false);
  }
  /**
   * Writes speech to be used when a user fails to reply to a question/prompt.
   * @method
   * @param {object} speech - A string or object structure of speech.
  */
  reprompt(speech){
    let ssml         = speak(speech, this),
        outputSpeech = this.get('response.reprompt', new BaseArray());
    outputSpeech.push.apply(outputSpeech, ssml);
  }
}

module.exports = Context;

