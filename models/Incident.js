var mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost/user_test');

var Schema = mongoose.Schema;

// set default for role as USER
var IncidentEntity = new Schema({
  name : { type: String, required: true, trim: true }
  , short_name : {type: String, required: true }
  , city : { type: String, required: true, trim: true }
  , state : { type: String, required: true, trim: true }
  , country : { type: String, required: true, trim: true }
  , created_at : { type: Date, required: true }
  , modified_at : {type: Date, required: true }
  , lat : { type: String, required: true, trim: true, default: "0.0" }
  , lng : { type: String, required: true, trim: true, default: "0.0" }
  
});


var Incident= mongoose.model('X_IncidentCollection', IncidentEntity);

module.exports.IncidentEntity = Incident;

module.exports.create = function(name, short_name, city, state, country, lat, lng, callback) {
  var now = Date.now();
  var incident = new Incident({name:name, short_name:short_name, created_at: now, modified_at: now, city:city, state:state, country:"none for now", lat:lat, lng: lng});
  incident.save(function(err){
    if(!err){
      callback(err, incident);
    } else {
      callback(err, incident);

    }
  });
}

module.exports.index = function(callback) {
  Incident.find({}, function(err, q) {
    if (!err) {
      callback(err, q);
    } else {
      callback(err, q);
    }
  });
    
}



module.exports.remove = function(_id, callback) {
  Incident.remove({_id: _id}, function (err, response) {
    callback(err, response);
  });
}

module.exports.read = function(_id, callback) {
  Incident.findById(_id, function(err, incident) {
    callback(err, incident);
  });
}

module.exports.update = function(_id, properties_set, callback) {
    Incident.update({_id: _id}, {$set: properties_set}, {upsert: true}, function(err, incident, response, fourth) {
      callback(err, incident, response);
  }); 
}