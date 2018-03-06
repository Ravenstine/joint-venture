'use strict';

const BaseObject = require('./base-object');

/**
 * Provides a uniform API for handling requests from voice activated assistants.
 * @class
 * @extends BaseObject
 * @property {string} userId         - A unique ID for the user making the request.
 * @property {string} userFirstName  - The first name of the user making the request.
 * @property {string} userSurname    - The surname name of the user making the request.
 * @property {string} userDislayName - The display name of the user making the request.
 * @property {string} sessionId      - A unique ID for the current session/conversation.
 * @property {string} requestId      - A unique ID for the request.
 * @property {object} attributes     - The object that stores various values and exists for the duration of a session.
 * @property {string} locale         - The locale of the request.  If none is included, it will default to either the environment variable `DEFAULT_LOCALE` or it will return 'en-US'.
 * @property {string} json           - A serialized JSON representation of the request.
 * @property {string} action         - The name of the request type or the name of the intent being sent.
 */
class Request extends BaseObject {
  constructor(originalRequest){
    super(...arguments);
    this.set('originalRequest', originalRequest);
  }
  get userId(){}
  get userFirstName(){}
  get userSurname(){}
  get userDisplayName(){}
  get sessionId(){}
  get requestId(){}
  get attributes(){ return {}; }
  get state(){}
  get json(){
    return JSON.stringify(this.get('originalRequest', {}));
  }
  get locale(){
    return process.env.DEFAULT_LOCALE || 'en-US';
  }
  get action(){}
  toString(){
    return this.json;
  }
}

module.exports = Request;

