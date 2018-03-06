'use strict';

const assistants = {
  alexa: [
    'session', 
    'request', 
    'version'
  ],
  google: [
    'user',
    'device',
    'conversation',
    'inputs'
  ],
  cortana: [
    'type',
    'id',
    'timestamp',
    'serviceUrl',
    'channelId',
    'from',
    'conversation',
    'recipient',
    'text',
    'textFormat'
  ]
};

// Uses Bayes' theorem to make a best guess on which assistant the
// request body originates from since not all keys are guaranteed
// to be present in a request body.  This is preferable to the
// applicaiton making assumptions about the request being handled
// through HTTP, and should work 99.9% of the time.

module.exports = requestBody => {
  let scores        = {},
      trainingCount = Object.keys(assistants).length;
  Object.keys(assistants).forEach(assistant => {
    scores[assistant]  = 0;
    let assistantWords = assistants[assistant];
    Object.keys(requestBody).forEach(key => {
      let s = (assistantWords.indexOf(key) > -1) ? 1 : 0.1;
      scores[assistant] += Math.log(s / parseFloat(assistantWords.length));
    });
    scores[assistant] += Math.log((1 || 0.1) / trainingCount);
  });
  return Object.entries(scores).sort((a,b) => b[1] - a[1])[0].shift();
}

