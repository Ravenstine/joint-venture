'use strict';

const Response   = require('../response'),
      BaseArray  = require('../base-array');

class AlexaResponse extends Response {
  get output() {
    let output = {
      version: "1.0",
      sessionAttributes: this.get('sessionAttributes', {}),
      response: {
        shouldEndSession: this.get('shouldEndSession')
      }
    },
    speech = new BaseArray().dconcat(this.get('speech'));

    if(!this.get('shouldEndSession')){
      speech.dconcat(this.get('prompts'));
      if(this.get('reprompts.length')){
        output.response.reprompt = {
          outputSpeech: {
            type: 'SSML', 
            ssml: `<speak>${this.get('reprompts').join('\n')}</speak>`
          }
        };
      }
    }

    if(speech.length){
      output.response.outputSpeech = {
        type: 'SSML', 
        ssml: `<speak>${speech.join('\n')}</speak>`
      };
    }

    return output;
  }
}

module.exports = AlexaResponse;

