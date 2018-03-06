'use strict';

const Request = require('../request');

class CortanaRequest extends Request{
  get userId(){
    return this.get('originalRequest.recipient.userId');
  }
  get userDisplayName(){
    return this.get('originalRequest.from.name');
  }
  get sessionId(){
    return this.get('originalRequest.conversation.id');
  }
  // get applicationId(){
  //   return this.get('originalRequest.session.applicationId');
  // }
  get attributes(){
    return {}; // dunno how this will work yet
  }
  get state(){
    return {}; // dunno how this will work yet
  }
  get locale(){
    return this.get('originalRequest.locale') || this.super();
  }
}

module.exports = CortanaRequest;

