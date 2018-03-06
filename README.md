Joint Venture
=============

A minimal library for building responses to multiple voice-activated assitant platforms, including Alexa, Google Assistant, Cortana, etc.

## Usage

All this library does is build the JSON you would place in a voice activated response.  It does not serve HTTP.  You will have to do that yourself with either something like [Express](https://expressjs.com/) or an [AWS Lambda](https://aws.amazon.com/lambda/) function.

### Example

All you have to do is set up a new assistant from a given request object.  It will guess the platform from the request object and write a response for it.

```javascript
const { Handler, Skill } = require('joint-venture');

class DefaultHandler extends Handler {
  LaunchRequest() {
    this.speak('Launch Request response from lambda');
    this.set('action', 'GetNewFactIntent');
  }
  GetNewFactIntent() {
    this.speak('sample fact poo');
  }
  'AMAZON.HelpIntent'() {
    this.ask('moo help message');
    this.reprompt('moo reprompt');
  }
  'AMAZON.StopIntent,AMAZON.CancelIntent'() {
    this.speak('cancel moo');
  }
  '?'(){
    this.speak('I\'m not sure how to help you with that.');
  }
}

Skill.create()
  .registerHandler(defaultHandler)
  .perform(requestBody)  // A request body object from Alexa, Google Assistant, or Cortana.
  .then(console.log);
```

## Status

At this moment, only speech can be written to Alexa and Google responses.  I've yet to do much development for Cortana(Bot Framework).  More features like cards are to come.

## Development

### Testing

[Mocha](https://mochajs.org) is used as the testing framework, and assertions are made using [Chai](https://chaijs.com).  Test coverage is tracked using [Istanbul](https://istanbul.js.org/).

To run the tests with coverage tracking, just run `npm run test`.

If you want to run tests without coverage, install Mocha globally by running `npm install -g mocha` and then perform tests by running `mocha --recursive`.

## License

See [License.txt](License.txt).


