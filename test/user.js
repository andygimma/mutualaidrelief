var mongoose = require('mongoose');
var user = require('./../models/user');
var should = require('should');
// Connecting to a local test database or creating it on the fly
mongoose.connect('mongodb://localhost/user_test');

/*
 * Mocha Test
 *
 * Tests are organized by having a "describe" and "it" method. Describe
 * basically creates a "section" that you are testing and the "it" method
 * is what runs your test code.
 *
 * For asynchronous tests you need to have a done method that you call after
 * your code should be done executing so Mocha runs to test properly.
 */

describe('Users', function(){
  var currentUser = null;

  /*
   * beforeEach Method
   *
   * The before each method will execute every time Mocha is run. This
   * code will not run every time an individual test is run.
   */

  beforeEach(function(done){
    user.register('name2', 'short_name', 'city', 'state', 'country', function(doc){
      console.log(doc);
      currentUser = doc;
      done();
    });
  });

  /*
   * afterEach Method
   *
   * Just like the beforeEach, afterEach is run after Mocha has completed
   * running it's queue.
   */

  afterEach(function(done){
    user.model.remove({}, function(){
      done();
    });
  });

  it('registers a new user', function(done){
    user.register('7', '2', '3', '4', '5', function(doc){
      console.log("12");
      console.log(doc.email);
      doc.name.should.eql('7');
      done();
    });
  });

//   it('fetches user by email', function(done){
//     user.findByEmail('test@test.com', function(doc){
//       doc.email.should.eql('test@test.com');
//       done();
//     });
//   });
});