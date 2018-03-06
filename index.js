'use strict';

module.exports = {
  Context        : require('./lib/context'),
  Handler        : require('./lib/handler'),
  Request        : require('./lib/request'),
  Response       : require('./lib/response'),
  Skill          : require('./lib/skill'),
  AlexaRequest   : require('./lib/alexa/request'),
  AlexaResponse  : require('./lib/alexa/response'),
  GoogleRequest  : require('./lib/google/request'),
  GoogleResponse : require('./lib/google/response'),
  CortanaRequest : require('./lib/cortana/request'),
  CortanaResponse: require('./lib/cortana/response'),
};

