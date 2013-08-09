var mongoose = require("mongoose");
var crypto = require('crypto');
var Schema = mongoose.Schema;

var VehicleEntity = new Schema({
  owner_name: { type: String, required: true, trim: true },
  other_drivers: { type: String, required: true, trim: true }, 
  created_at: { type: String, required: true, trim: true },
  modified_at: { type: String, required: true, trim: true },
  phone1: { type: String, required: true, trim: true },
  phone2: { type: String, required: false, trim: true },
  owner_email: { type: String, required: false, trim: true }, 
  owner_twitter: { type: String, required: false, trim: true },
  vehicle_type: { type: String, required: true, trim: true }, 
  license_plate: { type: String, required: true, trim: true }, 
  vehicle_color: { type: String, required: false, trim: true },
  vehicle_make: { type: String, required: false, trim: true }, 
  vehicle_model: { type: String, required: false, trim: true }, 
  emergency_contact_name: { type: String, required: true, trim: true }, 
  emergency_contact_number: { type: String, required: true, trim: true },
  incident_id: { type: String, required: true, trim: true },
  incident_name: { type: String, required: true, trim: true }

});

var Vehicle = mongoose.model('X_VehicleCollection', VehicleEntity);
module.exports.VehicleEntity = Vehicle;

module.exports.create = function(owner_name, other_drivers, phone1, owner_email, owner_twitter, vehicle_type, license_plate, emergency_contact_name, emergency_contact_number, incident_id, incident_name, callback) {
  var now = Date.now();
  var vehicle = new Vehicle({owner_name:owner_name, other_drivers:other_drivers, created_at: now, modified_at: now, phone1:phone1, owner_email:owner_email, owner_twitter:owner_twitter, vehicle_type:vehicle_type, license_plate: license_plate, emergency_contact_name: emergency_contact_name, emergency_contact_number: emergency_contact_number, incident_id:incident_id, incident_name: incident_name});
  vehicle.save(function(err){
    if(!err){
      callback(err, vehicle);
    } else {
      console.log(err.message);
      callback(err, vehicle);
    }
  });
}

module.exports.index = function(callback) {
  Vehicle.find({}, function(err, q) {
    if (!err) {
      console.log(q);
      callback(err, q);
      
    } else {
      callback(err, q);
    }
  });
    
}



module.exports.remove = function(_id, callback) {
  Vehicle.remove({_id: _id}, function (err, response) {
    callback(err, response);
  });
}

module.exports.read = function(_id, callback) {
  Vehicle.findById(_id, function(err, incident) {
    callback(err, incident);
  });
}

module.exports.update = function(_id, properties_set, callback) {
    Vehicle.update({_id: _id}, {$set: properties_set}, {upsert: true}, function(err, incident, response, fourth) {
      callback(err, incident, response);
  }); 
}

module.exports.index_by_incident_name = function(incident_name, callback) {
  Vehicle.find({incident_name: incident_name})
    .sort('owner_name')
    .exec(function(err, q) {
	// code here
      if (!err) {
	callback(err, q);
      } else {
	callback(err, q);
      }
    })
    
}