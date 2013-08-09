var mongoose = require("mongoose");
var crypto = require('crypto');
var Schema = mongoose.Schema;


var OrderEntity = new Schema({
  warehouse_name: {type: String, required: true, trim: true}, 
  person_name: {type: String, required: true, trim: true},
  order_number: {type: String, required: true, trim: true},
  delivery_address: {type: String, required: true, trim: true}, 
  item_name: {type: String, required: true, trim: true}, 
  container: {type: String, required: false, trim: true}, 
  container_volume: {type: String, required: false, trim: true}, 
  total_units: {type: String, required: true, trim: true},
  status: {type: String, required: true, trim: true},
  created_at: {type: String, required: true, trim: true},
  modified_at: {type: String, required: true, trim: true}
});

var Order = mongoose.model('X_OrderCollection', OrderEntity);
module.exports.OrderModel = Order;

module.exports.create = function(warehouse_id, warehouse_name, person_name, order_number, delivery_address, item_name, total_units, status, callback) {
  var now = Date.now();
  var order = new Order({warehouse_id:warehouse_id, warehouse_name:warehouse_name, created_at: now, modified_at: now, person_name:person_name, order_number:order_number, delivery_address:delivery_address, item_name:item_name, total_units: total_units, status:status });
  order.save(function(err){
    if(!err){
      callback(err, order);
    } else {
      callback(err, order);

    }
  });
}