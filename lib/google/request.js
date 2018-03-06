'use strict';

const Request = require('../request');

class GoogleRequest extends Request {
  get userId(){
    return this.get('originalRequest.user.user_id');
  }
  get userFirstName(){
    return this.get('originalRequest.user.profile.given_name');
  }
  get userSurname(){
    return this.get('originalRequest.user.profile.family_name');
  }
  get userDisplayName(){
    return this.get('originalRequest.user.profile.display_name');
  }
  get sessionId(){
    return this.get('originalRequest.conversation.conversation_id');
  }
  get attributes(){
    // clone the attributes object so it can be modified and
    // used in the response witout altering the request
    let conversationToken = this.get('originalRequest.conversation.conversation_token', '{}');
    try{
      return JSON.parse(conversationToken)['ATTRIBUTES'] || {};
    } catch(err) {
      return {};
    }
  }
  get state(){
    let conversationToken = this.get('originalRequest.conversation.conversation_token', '{}');
    try {
      return (JSON.parse(conversationToken) || {})['STATE'];
    } catch(err) {
      return '';
    }
  }
  get locale(){
    // according to: https://github.com/actions-on-google/actions-on-google-nodejs/blob/ef01c100c4c9e2c95744842c4238127e1417262d/assistant-app.js#L1431-L1448
    return this.get('originalRequest.user.locale') || this.super();
  }
}

module.exports = GoogleRequest;

