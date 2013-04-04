# NodeChat

In this assignment, you'll use [Node.js](http://nodejs.org) to implement a simple chatroom server. Users should be able to connect to your Node server with a web browser, choose a username, send messages, and see the messages sent by all the other users connected to the same server.

## Relevant documentation
* [Node module system - how to export and require](http://nodejs.org/api/modules.html)
* [http Node module](http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html)
* [fs Node module](http://nodemanual.org/0.8.14/nodejs_ref_guide/fs.html)
* [querystring Node module](http://nodemanual.org/0.8.14/nodejs_ref_guide/querystring.html)
* [Handling POST data in Node](http://blog.frankgrimm.net/2010/11/howto-access-http-message-body-post-data-in-node-js/)
* [Running Jasmine tests on Node server code](http://www.2ality.com/2011/10/jasmine.html)
* [HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
* [HTTP headers fields](http://en.wikipedia.org/wiki/List_of_HTTP_header_fields)
* [Same Origin Policy and CORS](http://en.wikipedia.org/wiki/Same_origin_policy)
* [Jasmine-node](https://github.com/mhevery/jasmine-node)

## What's in this repo
* `basic-server.js` is a very-well-documented bare-bones HTTP server.  Its comments include instructions on how to run it.
* `request-handler.js` is a nearly-empty file where you'll do your work.
* `spec` is old hat -- it has the Jasmine specs.  They work just a little differently on node -- see the docs, linked to above.

## Your goals

You should:
* Learn how to use Node to start an HTTP server and how to connect to that server with a web browser. (Source code for a bare-bones HTTP server is included in the file `basic-server.js`.)
* Learn how to use export and require. Write a proper request handling function in the file `request-handler.js`. Use export to make this function available, and use require to import the function into `basic-server.js` and use it there.
* Make your Node server implement the URLs you used for your chat client (eg `/1/classes/messages`).
* Modify your chat-client code to connect to your Node server instead of connecting to Parse. (http://127.0.0.1:8080/ instead of https://api.parse.com/1/). Start the server and try out the client!
* Make all the Jasmine tests pass. To run the Jasmine tests for your Node server, you must install the jasmine-node module, using the command: `sudo npm install -g jasmine-node`. Then to run the tests, do `jasmine-node spec` from the main directory.
* The tests in `ServerSpec.js` expect the `handleRequest` function in `request-handler.js` to be defined. The tests in `LiveServerIntegrationSpec.js` expect your Node server to be running.

Extra credit:
* Make your Node server serve up the html and js files for the chat client page at http://127.0.0.1:8080/. Run the client by visiting that URL in your browser instead of opening the file.
* Allow your server to handle multiple rooms, like Parse does, using urls like `/1/classes/someRoomName`.
* Have the server store the message log in a file so that the messages are saved even after you stop and restart the node server.
* Run your node server on a real, internet-accessible server instead of 127.0.0.1. Share the IP address with the rest of the class and use it to chat with other students.
* Summarize the chain of events between basic-server's `http.createServer(...)` and the function call to `requestListener`.
  * Throughout your expedition, record your notes for later publication as a blog post.
  * Start from [Node's HTTP module](https://github.com/joyent/node/blob/master/lib/http.js#L1717).  List/summarize the method calls that happen, skipping over boring steps when possible, and aiming for conceptual completeness and simplicity.
  * Things will get increasingly more "low-level" -- closer to bare networking concepts and system calls to non-javascript code.  Make a judgement calls about when to skip onwards.  Beeline for something complete, but very, very simple, and fill in more details later.  Watch out for deep rabbit-holes.
