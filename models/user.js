/*
 * User Model
 *
 * Instead of following the traditional Mongoose examples, I'm
 * using a function to provide both private and public methods to
 * this model to keep things more organized!
 */

var User = function(){
  var mongoose = require('mongoose');
  // Kinda redundant, but needed
  var Schema = require('mongoose').Schema;
  // Mongoose schema so Mongoose can make effective queries
  var userSchema = new Schema({
    name : { type: String, index: { unique: true, required: true }}
    , short_name : {type: String, required: true }
    , city : { type: String, required: true, trim: true }
    , state : { type: String, required: true, trim: true }
    , country : { type: String, required: true, trim: true }
    , created_at : { type: Date, required: true }
    , modified_at : {type: Date, required: true }
    , lat : { type: String, required: true, trim: true, default: "0.0" }
    , lng : { type: String, required: true, trim: true, default: "0.0" }
    
  });
  // Declaring a private model for internal methods
  var _model = mongoose.model('userCollectionTwo', userSchema);
  // Creating a register method for convenience
  var _register = function(name, short_name, city, state, country, callback){
    console.log(name);
    var now = Date.now();
    _model.create({ name: name, short_name: short_name, city:city, state:state, country:country, created_at:now, modified_at:now }, function(e, doc){
      if(e) {
	console.log(e);
        fail(e);
      } else {
		console.log(2);

        callback(doc);
      }
    });
  };
  // Creating a findByEmail method for convenience
  var _findByEmail = function(email, success, fail){
    _model.findOne({ email: email }, function(e, doc){
      if(e) {
        fail(e);
      } else {
        success(doc);
      }
    });
  }

  // Returning properties and methods we'd like to be public
  return {
    register: _register,
    schema: userSchema,
    model: _model,
    findByEmail: _findByEmail
  }
}();

module.exports = User;