var mongoose = require("mongoose");
var crypto = require('crypto');
var Schema = mongoose.Schema;

// set default for role as USER
var UserEntity = new Schema({
  email : { type: String, required: true, trim: true, index: {unique: true}}
  , password_hash : {type: String, required: true }
  , city : { type: String, required: false, trim: true }
  , state : { type: String, required: false, trim: true }
  , country : { type: String, required: false, trim: true }
  , created_at : { type: Date, required: true }
  , modified_at : {type: Date, required: true }
  , role : { type: String, required: true, trim: true, default: "user" }
  , authorized : { type: Boolean, required: true, default:false}
  , incident_id: {type: String, required: true, trim: true}
  , incident_name: {type: String, required: true, trim: true}
  , create_inventory: { type: Boolean, required: true, default:false}
  , view_inventory: { type: Boolean, required: true, default:false}
  , update_or_delete_inventory: { type: Boolean, required: true, default:false}
  , create_orders: { type: Boolean, required: true, default:false}
  , view_orders: { type: Boolean, required: true, default:false}
  , update_or_delete_orders: { type: Boolean, required: true, default:false}
  , create_cases: { type: Boolean, required: true, default:false}
  , view_cases: { type: Boolean, required: true, default:false}
  , update_or_delete_cases: { type: Boolean, required: true, default:false}
  , create_deliveries: { type: Boolean, required: true, default:false}
  , view_deliveries: { type: Boolean, required: true, default:false}
  , update_or_delete_deliveries: { type: Boolean, required: true, default:false}
  
});

var HASH_SALT = "9eir9234jlt90sgdj2390";

var User= mongoose.model('X_UserCollection', UserEntity);

module.exports.UserEntity = User;


module.exports.create = function(email, password, incident_id, incident_name, callback){
    console.log(email);
    console.log(password);
    console.log(incident_id);
    console.log(incident_name);
    var email = email;
    var shasum = crypto.createHash('sha1');
    var hash_salt = HASH_SALT;
    shasum.update(password + hash_salt);
    var now = Date.now();
    var password_hash = shasum.digest('hex');
    
    var user = new User({email:email, password_hash:password_hash, created_at: now, modified_at: now, authorized:false, incident_id: incident_id, incident_name: incident_name});
    user.save(function(err){
      console.log("saving");
        if(!err){
            console.log('User saved.');
	    console.log("id = " + user._id);
	    callback(err, user)

        } else {
	    console.log(err.message);
	    callback(err, user);
	}
    });
}

module.exports.index = function(callback) {
  User.find()
    .sort('email')
    .exec(function(err, q) {
	// code here
      if (!err) {
	callback(err, q);
      } else {
	callback(err, q);
      }
    })
    
}
module.exports.index_by_incident_name = function(incident_name, callback) {
  User.find({incident_name: incident_name})
    .sort('email')
    .exec(function(err, q) {
	// code here
      if (!err) {
	callback(err, q);
      } else {
	callback(err, q);
      }
    })
    
}

module.exports.read = function(_id, callback) {
  User.findById(_id, function(err, user) {
    console.log(user);
    callback(err, user);
  });
}
module.exports.read_by_email = function(email, callback) {
  User.findOne({email: email}, function(err, user) {
    console.log(user);
    callback(err, user);
  });
}

module.exports.update = function(_id, properties_set, callback) {
    User.update({_id: _id}, {$set: properties_set}, {upsert: true}, function(err, incident, response, fourth) {
      callback(err, incident, response);
  }); 
}

module.exports.remove = function(_id, callback) {
  User.remove({_id: _id}, function (err, response) {
    callback(err, response);
  });
}