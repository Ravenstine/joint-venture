'use strict';

const Response = require('../response');

class CortanaResponse extends Response {
  get output() {
    let output = {
      type: this.get('shouldEndSession') ? 'endOfConversation' : 'message',
      text: this.get('speech')
    };
    speech   = this.get('speech');
    if(speech.length) output.speak = `<speak>${speech.join('\n')}</speak>`;
    return output;
  }
}

module.exports = CortanaResponse;

