var mongoose = require('mongoose');
var incident = require('./../models/Incident');
var should = require('should');
var async = require('async');
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

describe('Incidents', function(){
  var currentUser = null;

  /*
   * beforeEach Method
   *
   * The before each method will execute every time Mocha is run. This
   * code will not run every time an individual test is run.
   */

  beforeEach(function(done){
    var name = "Test Incident2";
    var short_name = "test";
    var city = "Some City";
    var state= "Some State";
    var country="Some Country";
    incident.create(name, short_name, city, state, country, "23.3", "33.2", function(doc){
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
    incident.IncidentEntity.remove({}, function(){
      done();
    });
  });

  it('creates an incident', function(done){
    var name = "Test Incident2";
    var short_name = "test";
    var city = "Some City";
    var state= "Some State";
    var country="Some Country";

    incident.create(name, short_name, city, state, country, "23.3", "33.2", function(err, doc){
      doc.name.should.eql('Test Incident2');
      done();
    });
  });
  
  it('updates an incident', function(done){
     var this_incident;
     var new_city = "New City";

     async.series([
        function create(callback) {
	  var name = "Test Incident3";
	  var short_name = "test";
	  var city = "Some City";
	  var state= "Some State";
	  var country="Some Country";
	  incident.create(name, short_name, city, state, country, "23.3", "33.2", function(err, doc){
	    this_incident = doc;
	    console.log(this_incident._id);

	    callback();
	  });
        },
        function update(callback) {
	  var properties_set = new Object();
	  properties_set.city = new_city;
	  incident.update(this_incident._id, properties_set, function(err, doc, response){
	    doc.should.eql(1);
	    response.updatedExisting.should.eql(true);
	    callback();
	  });
        },
	function get(callback) {
	  console.log(this_incident._id);
	  
	  incident.read(this_incident._id, function (error, incident) {
	    should.not.exist(error);
	    should.exist(incident);
	    incident.city.should.eql(new_city);
	    callback()

	    });
        }
        
        ], function (err, results) {
            done();
        });

  });
  
  it('returns Incident index', function(done){

    incident.index(function(err, doc){
      should.exist(doc);
      should.not.exist(err);
      done();
    });
  });
  
  it('deletes an Incident', function(done) {
	 var currentIncident;
         async.series([

        function create(callback) {
	  var name = "Test Incident3";
	  var short_name = "test";
	  var city = "Some City";
	  var state= "Some State";
	  var country="Some Country";
	  incident.create(name, short_name, city, state, country, "23.3", "33.2", function(err, doc){
	    currentIncident = doc;
	    callback();
	  });
        },

        function remove(callback) {
            incident.remove(currentIncident._id, function (error, response) {
	    should.not.exist(error);
	    response.should.eql(1);
	    callback()
            });
        },

        function get(callback) {
	  incident.read(currentIncident._id, function (error, incident) {
	    should.not.exist(error);
	    should.not.exist(incident);
	    callback()

	    });
        }

        ], function (err, results) {
            done();
        });
  });    
  
    it('reads an Incident', function(done) {
	 var currentIncident;
         async.series([

        function create(callback) {
	  var name = "Test Incident3";
	  var short_name = "test";
	  var city = "Some City";
	  var state= "Some State";
	  var country="Some Country";
	  incident.create(name, short_name, city, state, country, "23.3", "33.2", function(err, doc){
	    currentIncident = doc;
	    callback();
	  });
        },

        function get(callback) {
	  incident.read(currentIncident._id, function (error, incident) {
	    should.not.exist(error);
	    should.exist(incident);
	    callback()

	    });
        }

        ], function (err, results) {
            done();
        });
  });    

    
    // NEED TO UPDATE AN INCIDENT
});