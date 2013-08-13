var mongoose = require("mongoose");
var crypto = require('crypto');
var Schema = mongoose.Schema;


var OrderEntity = new Schema({
  warehouse_name: {type: String, required: true, trim: true}, 
  warehouse_id: {type: String, required: true, trim: true}, 
  person_name: {type: String, required: true, trim: true},
  order_number: {type: String, required: true, trim: true},
  delivery_address: {type: String, required: true, trim: true}, 
  container: {type: String, required: false, trim: true}, 
  container_volume: {type: String, required: false, trim: true}, 
  status: {type: String, required: true, trim: true},
  created_at: {type: String, required: true, trim: true},
  modified_at: {type: String, required: true, trim: true},
  incident_id: {type: String, required: true, trim: true},
  incident_name: {type: String, required: true, trim: true},
  item1: {type: String, required: false, trim: true},
  item2: {type: String, required: false, trim: true},
  item3: {type: String, required: false, trim: true},
  item4: {type: String, required: false, trim: true},
  item5: {type: String, required: false, trim: true},
  item6: {type: String, required: false, trim: true},
  item7: {type: String, required: false, trim: true},
  item8: {type: String, required: false, trim: true},
  item9: {type: String, required: false, trim: true},
  item10: {type: String, required: false, trim: true},
  item11: {type: String, required: false, trim: true},
  item12: {type: String, required: false, trim: true},
  number1: {type: String, required: false, trim: true},
  number2: {type: String, required: false, trim: true},
  number3: {type: String, required: false, trim: true},
  number4: {type: String, required: false, trim: true},
  number5: {type: String, required: false, trim: true},
  number6: {type: String, required: false, trim: true},
  number7: {type: String, required: false, trim: true},
  number8: {type: String, required: false, trim: true},
  number9: {type: String, required: false, trim: true},
  number10: {type: String, required: false, trim: true},
  number11: {type: String, required: false, trim: true},
  number12: {type: String, required: false, trim: true},
});

var Order = mongoose.model('X_OrderCollection', OrderEntity);
module.exports.OrderModel = Order;

module.exports.create = function(json_data, callback) {
  var now = Date.now();
  console.log(json_data.warehouse_name); // yes
  console.log(json_data.warehouse_id);	// yes
  console.log(json_data.person_name); // no
  console.log(json_data.order_number);  // yes
  console.log(json_data.delivery_address); //no
  console.log(json_data.status);  //yes	
  console.log(json_data.incident_id);  //yes
  console.log(json_data.incident_name);  //yes
  console.log(json_data.item1);  //yes
  console.log(json_data.number1);//yes
 
  var order = new Order({incident_id: json_data.incident_id, incident_name: json_data.incident_name, warehouse_id:json_data.warehouse_id, warehouse_name:json_data.warehouse_name, created_at: now, modified_at: now, person_name:json_data.person_name, order_number:json_data.order_number, delivery_address:json_data.address, status:json_data.status, item1:json_data.item1, item2:json_data.item2, item3:json_data.item3, item4:json_data.item4, item5:json_data.item5, item6:json_data.item6, item7:json_data.item7, item8:json_data.item8, item9:json_data.item9, item10:json_data.item10, item11:json_data.item11, item12:json_data.item12, number1:json_data.number1, number2:json_data.number2, number3:json_data.number3, number4:json_data.number4, number5:json_data.number5, number6:json_data.number6, number7:json_data.number7, number8:json_data.number8, number9:json_data.number9, number10:json_data.number10, number11:json_data.number11, number12:json_data.number12  });
  order.save(function(err){
    if(!err){
      callback(err, order);
    } else {
      callback(err, order);

    }
  });
}

module.exports.index = function(callback) {
  Order.find()
    .sort('order_number')
    .exec(function(err, q) {
	// code here
      if (!err) {
	callback(err, q);
      } else {
	callback(err, q);
      }
    })
    
}

module.exports.index_by_pending = function(callback) {
  Order.find({status: 'pending'})
    .sort('order_number')
    .exec(function(err, q) {
	// code here
      if (!err) {
	callback(err, q);
      } else {
	callback(err, q);
      }
    })
    
}

module.exports.index_by_warehouse_id = function(warehouse_id, callback) {
    Order.find({warehouse_id: warehouse_id})
    .sort('order_number')
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
    Order.find({status: status})
    .sort('order_number')
    .exec(function(err, q) {
	// code here
      if (!err) {
	callback(err, q);
      } else {
	callback(err, q);
      }
    })
  
}
module.exports.index_by_order_id = function(order_id, callback) {
    Order.find({_id: order_id})
    .sort('order_number')
    .exec(function(err, q) {
	// code here
      if (!err) {
	callback(err, q);
      } else {
	callback(err, q);
      }
    })
  
}

module.exports.update = function(_id, properties_set, callback) {
    Order.update({_id: _id}, {$set: properties_set}, {upsert: true}, function(err, incident, response, fourth) {
      callback(err, incident, response);
  }); 
}

module.exports.update_by_order_number = function(order_number, properties_set, callback) {
    Order.update({order_number: order_number}, {$set: properties_set}, {upsert: true}, function(err, incident, response, fourth) {
      callback(err, incident, response);
  }); 
}


module.exports.index_by_order_number = function(order_number, callback) {
  console.log(order_number);
    Order.find({order_number: order_number})
    .sort('order_number')
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
  Order.findById(_id, function(err, order) {
    callback(err, order);
  });
}

module.exports.remove = function(_id, callback) {
  Order.remove({_id: _id}, function (err, response) {
    callback(err, response);
  });
}

module.exports.update_multiple = function(conditions, update, options, callback) {
  Order.update(conditions, update, options, callback);
}