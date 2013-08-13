var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var DeliveryEntity = new Schema({
  vehicle_id : {type: String, required: true, trim: true},
  vehicle_driver: {type: String, required: true, trim: true},
  order_numbers: {type: [String], required: true, trim: true},
  status: {type: String, required: true, trim: true},
  created_at: {type: String, required: true, trim: true},
  modified_at: {type: String, required: true, trim: true},
  incident_id: {type: String, required: true, trim: true},
  incident_name: {type: String, required: true, trim: true},
  delivered_at: {type: String, required: false, trim: true}

});

var Delivery = mongoose.model('X_DeliveryCollection', DeliveryEntity);
module.exports.DeliveryEntity = Delivery;
module.exports.create = function(incident_id, incident_name, vehicle_id, vehicle_driver, order_numbers, status, callback) {
  console.log(incident_id);
  console.log(incident_name);
  console.log(vehicle_driver);
  console.log(vehicle_id);
  console.log(order_numbers);
  console.log(status);
  
  var now = Date.now();
  var delivery = new Delivery({incident_id: "1", incident_name: "2", vehicle_id:vehicle_id, vehicle_driver:vehicle_driver, created_at: now, modified_at: now, order_numbers:order_numbers, status:"en route"});
  delivery.save(function(err){
    if(!err){
      callback(err, delivery);
    } else {
      callback(err, delivery);
      console.log(err.message);

    }
  });
}

module.exports.index = function(callback) {
  Delivery.find()
    .sort('created_at')
    .exec(function(err, q) {
	// code here
      if (!err) {
	callback(err, q);
      } else {
	callback(err, q);
      }
    })
    
}
module.exports.index_en_route = function(callback) {
  Delivery.find({status: 'en route'})
    .sort('created_at')
    .exec(function(err, q) {
	// code here
      if (!err) {
	callback(err, q);
      } else {
	callback(err, q);
      }
    })
    
}
module.exports.index_by_status = function(status, callback) {
  Delivery.find({status: status})
    .sort('created_at')
    .exec(function(err, q) {
	// code here
      if (!err) {
	console.log(q);
	callback(err, q);
      } else {
	callback(err, q);
      }
    })
    
}
module.exports.index_by_order_number = function(order_number, callback) {
  Delivery.find({order_numbers: order_number})
    .sort('created_at')
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
  console.log(_id);
  Delivery.findOne({_id:_id}, function(err, user) {
    console.log(user);
    callback(err, user);
  });
}

module.exports.update = function(_id, properties_set, callback) {
    Delivery.update({_id: _id}, {$set: properties_set}, {upsert: true}, function(err, incident, response) {
      console.log("callback");
      console.log(err);
      console.log(incident);
      console.log(response);
      callback(err, incident, response);
  }); 
}