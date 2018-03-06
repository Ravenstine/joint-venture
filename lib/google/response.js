'use strict';

const Response = require('../response');

class GoogleResponse extends Response {
  get output() {
    let output = {
      conversation_token:   JSON.stringify(this.get('sessionAttributes')),
      expect_user_response: !this.get('shouldEndSession'),
      expected_inputs:      this.expectedInputs(),
      final_response: {
        ssml: this.outputSpeech()
      }
    };
    if(this.get('shouldEndSession')){
      delete output.expected_inputs;
    } else {
      delete output.final_response;
    }
    return output;
  }
  /**
   * Provides expected inputs when the user is being prompted.
   * @method
   * @private
  */
  expectedInputs(){
    if(!this.get('prompts.length')) return [];
    let input = {
      input_prompt: {
        initial_prompts: [
          {
            ssml: this.outputPrompt()
          }
        ],
        no_input_prompts: this.get('reprompts', [this.get('prompts.last')]).map(l => `<speak>${l}</speak>`)
      },
      possible_intents: []
    };
    return [input];
  }
  /**
   * Output speech not including prompt speech.
   * @method
   * @private
  */
  outputSpeech(){
    return ['<speak>'].concat(this.get('speech')).concat('</speak>').join('\n');
  }
  /**
   * Output speech including prompt speech.
   * @method
   * @private
  */
  outputPrompt(){
    return ['<speak>'].concat(this.get('speech')).concat(this.get('prompts.last')).concat('</speak>').join('\n');
  }
}

module.exports = GoogleResponse;

