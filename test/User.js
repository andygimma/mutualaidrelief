/*
 * Developer : Andy Gimma (andy.n.gimma@gmail.com)
 * Date : 08/14/13
 * All code (c)2013 Andy Gimma all rights reserved
 */

var mongoose = require('mongoose');
var user = require('./../models/User');
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
    var email = "test@test.com";
    var password = "2342";
    user.create(email, password, function(doc){
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
    user.UserEntity.remove({}, function(){
      done();
    });
  });

  it('registers a new user', function(done){
    var email = "test@test.com";
    var password = "2342";
    user.create(email, password, function(doc){
      console.log(doc);
      currentUser = doc;
      done();
    });
  });
});