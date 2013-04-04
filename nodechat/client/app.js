// - wrap all current globals in a closure to make sure they are only accessed on this page
// ((function)(){
//   var foo = 1;
//   window.foo = foo;
// }());
var baseURL = 'http://127.0.0.1:8080/classes/room1';
// var ajaxHelper = function


var friendList = {};

/*
  - affecting a CSS class should be its own method (e.g. applyHighlight(friend))
  - bolding should also be applied in renderMessage.
  - this function should only affect the friendslist
*/
var manageFriends = function(name, friends) {
  if (!_.contains(friendList, name)) {
    friends[name] = name;
    $("[data-username=" + name + "]").toggleClass('highlighted');
    addFriend(name);
  } else {
    delete friendList[name];
    $("[data-username=" + name + "]").toggleClass('highlighted');
    removeFriend(name);
  }
  return friendList;
};

/*
  - this only adds friends to the DOM, it could be misinterpretted
    to be adding friends to a friendsList
  - be more specific in the function
*/
var addFriend = function(name) {
  $('.friend_names').append($('<div data-username="'+name+'">'+ name +'</div>'));
};

var removeFriend = function(name) {
  $('.friend_names [data-username='+ name +']').remove();
};


var currentRoom = '';

/*
  - could have been moveToRoom(room);
*/
var changeRoom = function (room) {
  clearMessages();
  getMessagesFromParse(room);
};

/*
  - should be run seperately from getMessagesFromParse().
  - should be run on a short interval.
  - needs its own query to get rooms from the server, agnostic of messages.
  - AJAX call to Parse, to gather all rooms from messages on the server
  - should pass values to a renderChatRoom function
*/
var getRoomsFromParse = function(messages) {
  renderChatRooms(_(messages.results).chain().map(function(value) {
    return value.roomname;
  }).uniq().value());
};


/*
  - should render the rooms from GetChatRooms() on the page
  - applying correct attributes
*/
var chatRoomTemplate = _.template('<div class="room" data-roomname="<%= chatroom.roomname %>"><%= chatroom.roomname %></div>');
var renderChatRooms = function(chatRooms) {
  _.each(chatRooms, function(chatroom, idx, chatRooms){
    $('.roomnames').append($(chatRoomTemplate({chatroom: chatroom})));
  });
};

// clearMessages is pretty neat.
var clearMessages = function() {
  $('.message_container').html("");
};

/*
  - abstract AJAX calls with a helper function.
  - run this on an interval.
*/
var getMessagesFromParse = function (room) {
  $.ajax(baseURL, {
    contentType: 'application/json',
    dataType: 'json',
    success: function(data){
      console.log(data);
      populateMessages(data); // rendermessage();
      getRoomsFromParse(data);
    }
  });
};

// all populateMessage does is append.
// move the each loop to success call.
// append nodes directly from renderMessage();
var populateMessages = function(data) {
  clearMessages();
  $.each(data, function(which, message) {
    $('.message_container').prepend(renderMessage(message));
  });
};

/*
  - no need to assign text values as variables, can target them inline.
  - abstract AJAX call
*/
var postMessage = function () {
  var theMessage = {username: $('.name').val(), message: $('.writeup').val(), roomname: currentRoom};

  $.ajax(baseURL, {
    contentType: 'application/json',
    dataType: 'json',
    type: 'POST',
    data: JSON.stringify(theMessage),
    success: function(data){
      $('.name').val("");
      $('.writeup').val("");
    }
  });
  getMessagesFromParse();
};

/*
  - reserve double quotes for html. single quotes for JS strings.
  - apply styles in renderMessage, add selectedClass to text.
*/
var renderMessage = function(message) {
  // var selectedClass = applyFriendHighlighting(message.username);  <== friendsList is a global called in the func
  // then we add a '+selectedClass+' to the class below

  var $node = $(
    "<div class='message'>"+
      "<span class='user' data-username="+message.username+">"+ message.username +"</span>" +"<span class='text' data-username="+message.username+">"+ message.message +"</span>" +"</div>");
  return $node;

};

getMessagesFromParse(currentRoom);

$(document).ready(function() {

  setTimeout(function(){
    $('.user').on('click', function(evt){
      var testUsername = $(evt.target).data('username');
      // $("[data-username=" + testUsername + "]").toggleClass('highlighted');
      manageFriends(testUsername, friendList);
      // applyFriendStyle(testUserName);
    })}, 1000);

  $('form').on('click', '.submit', function(event) {
    event.preventDefault();
    // debugger;
    postMessage();
    // changeRoom(currentRoom);
  });

  $('.roomnames').on('click', '.room', function(event) {
    event.preventDefault();
    // console.log("in here");
    room = ($(this).data("roomname"));
    currentRoom = room;
    changeRoom(room);
  });

  // $('form').on('click', '.roomSubmit', function(event) {
  //   event.preventDefault();
  //   room = $('.room').val();
  //   currentRoom = room;
  //   changeRoom(room);
  // });
});










