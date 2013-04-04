var controller = require('./request-handler.js');
var url = require('url');

var pathOf = function(request) {
  return url.parse(request.url).pathname;
};

var validMethod = function(reqMethod){
  if (reqMethod==='GET' || reqMethod==='POST'){
    return reqMethod;
  } else {
    return 'other';
  }
};

var handleRequest = function(request, response) {
  var method = validMethod(request.method);
  if (pathOf(request) === '/classes/room1') {
    controller[method](request, response);
  } else if (pathOf(request) === '/1/classes/messages') {
    controller[method](request, response);
  }
};

module.exports.handleRequest = handleRequest;