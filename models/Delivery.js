var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var DeliveryEntity = new Schema({
  vehicle_id : {type: String, required: true, trim: true},
  vehicle_driver: {type: String, required: true, trim: true},
  order_ids: {type: [String], required: true, trim: true},
  order_numbers: {type: [String], required: true, trim: true},
  status: {type: String, required: true, trim: true},
  created_at: {type: String, required: true, trim: true},
  modified_at: {type: String, required: true, trim: true},
  incident_id: {type: String, required: true, trim: true},
  incident_name: {type: String, required: true, trim: true}

});

var Delivery = mongoose.model('X_DeliveryCollection', DeliveryEntity);

module.exports.create = function(vehicle_id, vehicle_driver, order_id, order_number, status, callback) {
  var now = Date.now();
  var delivery = new Delivery({vehicle_id:vehicle_id, vehicle_driver:vehicle_driver, created_at: now, modified_at: now, order_id:order_id, status:staus});
  delivery.save(function(err){
    if(!err){
      callback(err, delivery);
    } else {
      callback(err, deliver);

    }
  });
}