'use strict';

const BaseObject = require('./base-object'),
      BaseArray  = require('./base-array');

/**
 * Provides a uniform API around writing responses.
 * @class
 * @extends BaseObject
 * @property {string}  appId             - The vendor-specific ID for the voice-activated application.
 * @property {string}  sessionId         - The ID for the session/conversation.
 * @property {object}  output            - The platform-specific response object.
 * @property {object}  json              - The stringified JSON version of the `object` property.
 * @property {array}   speech            - The output speech, not including questions or reprompts.
 * @property {array}   prompts           - Speech output for questions prompting the user.
 * @property {array}   reprompts         - Speech output for when the user fails to reply to a prompt.
 * @property {boolean} shouldEndSession - Indicates if the session should end after the current execution.
*/

class Response extends BaseObject {
  constructor(){
    super();
    this.set('speech',    new BaseArray());
    this.set('prompts',   new BaseArray());
    this.set('reprompts', new BaseArray());
    this.set('shouldEndSession', true);
  }
  toString(){
    return this.json;
  }
  get output(){
    return this.object || {};
  }
  get json(){
    return JSON.stringify(this.output);
  }
}

module.exports = Response;

