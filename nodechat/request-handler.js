var router = require('./router.js');
var dbserver = require('../orm-example.js');

var defaultHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
};

getMessages = function(request, response) {
  request.on('end', function() {
    response.writeHead(200, defaultHeaders);
    dbserver.readMessages(function(msgs){
      response.end(msgs);
    });
  });
};

postMessage = function(request, response) {
  request.on('data', function(chunk) {
    dbserver.writeMessage(JSON.parse(chunk));
  });
  request.on('end', function() {
    response.writeHead(200, defaultHeaders);
    response.end();
  });
};

routeDefault = function(request, response) {
  response.writeHead(404, defaultHeaders);
  response.end();
};

module.exports.GET = getMessages;
module.exports.POST = postMessage;
module.exports.other = routeDefault;