'use strict';

const Request = require('../request');

class AlexaRequest extends Request{
  get userId(){
    return this.get('originalRequest.user.userId');
  }
  get sessionId(){
    return this.get('originalRequest.session.sessionId');
  }
  // get applicationId(){
  //   return this.get('originalRequest.session.applicationId');
  // }
  get attributes(){
    // clone the attributes object so it can be modified and
    // used in the response witout altering the request
    return Object.assign({}, this.get('originalRequest.session.attributes.ATTRIBUTES', {}));
  }
  get state(){
    return this.get('originalRequest.session.attributes.STATE');
  }
  get locale(){
    return this.get('originalRequest.request.locale') || this.super();
  }
  get action(){
    let action;
    if(this.get('originalRequest.request.type') == 'IntentRequest'){
      action = this.get('originalRequest.request.intent', {})['name'];
    } else {
      action = this.get('originalRequest.request.type');
    }
    return action;
  }
}

module.exports = AlexaRequest;

