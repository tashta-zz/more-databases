var request =require('superagent');
var expect = require('expect.js');

describe('Room', function(){
  it('responds to POST request with 200', function(done){
    request.post('127.0.0.1:8080/classes/room1').end(function(res){
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('responds to GET request with 200', function(done){
    request.get('127.0.0.1:8080/classes/room1').end(function(res){
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('responds to GET request with 200', function(done){
    request.get('127.0.0.1:8080/1/classes/messages').end(function(res){
      expect(res.status).to.equal(200);
      done();
    });
  });
});