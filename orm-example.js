var reqHandler = require('./nodechat/request-handler.js');

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "");

var messages = sequelize.define('messages', {
  message: Sequelize.TEXT,
  username:  Sequelize.STRING,
  roomname: Sequelize.STRING
});

messages.sync();

var readMessages = function(callback){
  messages.findAll().success(function(mesgs){
    callback(JSON.stringify(mesgs));
  });
};

var writeMessage = function(obj){
  var newMessage = messages.build({message: obj.message, username: obj.username});
  newMessage.save();
};

module.exports.readMessages = readMessages;
module.exports.writeMessage = writeMessage;
