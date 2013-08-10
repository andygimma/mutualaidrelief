var async = require('async');



var mongoose = require("mongoose");
var crypto = require('crypto');
var Schema = mongoose.Schema;

var InventoryEntity = new Schema({
  warehouse_name: {type: String, required: true, trim: true},
  warehouse_id: {type: String, required: true, trim: true},
  name: {type: String, required: true, trim: true},
  container: {type: String, required: false, trim: true},
  container_volume: {type: String, required: false, trim: true},
  total_units: {type: Number, required: true, trim: true},
  incident_id: {type: String, required: true, trim: true},
  incident_name: {type: String, required: true, trim: true},
  user_email: {type: String, required: true, trim: true},
  created_at: {type: String, required: true, trim: true},
  modified_at: {type: String, required: true, trim: true}
});

var Inventory = mongoose.model('X_InventoryCollection', InventoryEntity);
module.exports.InventoryItem = Inventory;

module.exports.index_by_warehouse_id = function(warehouse_id, callback) {
    Inventory.find({warehouse_id: warehouse_id})
    .sort('name')
    .exec(function(err, q) {
	// code here
      if (!err) {
	callback(err, q);
      } else {
	callback(err, q);
      }
    })
  
}
module.exports.index = function(callback) {
  Inventory.find()
    .sort('name')
    .exec(function(err, q) {
	// code here
      if (!err) {
	callback(err, q);
      } else {
	callback(err, q);
      }
    })
    
}

module.exports.index_by_warehouse = function(warehouse_id, callback) {
    Inventory.find({warehouse_id: warehouse_id})
    .sort('name')
    .exec(function(err, q) {
	// code here
      if (!err) {
	callback(err, q);
      } else {
	callback(err, q);
      }
    })
}

module.exports.index_by_name = function(name, callback) {
    Inventory.find({name: name})
    .sort('name')
    .exec(function(err, q) {
	// code here
      if (!err) {
	callback(err, q);
      } else {
	callback(err, q);
      }
    })
}

module.exports.check_availability = function(warehouse_id, name, total, callback) {
  console.log(warehouse_id);
  console.log(name);
  console.log(total);
  Inventory.findOne({warehouse_id: warehouse_id, name:name}, function(err, q) {
    console.log(q);
    if (!err) {
      if(q == null){
	  // your code here.
	  console.log("null");
	  callback(err, false);
      } else {
	
	if(q.total_units >= total) {
	  
	  callback(err, true);
	} else {
	   callback(err, false); 
	}

      }

    } else {
      callback(err, q);
    }
  });
  
}

module.exports.decrement = function(warehouse_id, name, total_units, callback) {
  var now = Date.now()
  Inventory.findOne({ warehouse_id: warehouse_id, name: name }, function (err, doc){
    if (!err && doc != null) {
      console.log(doc);
      var total = doc.total_units;
      doc.total_units = total - parseInt(total_units);
      doc.modified_at = now;
      console.log(doc.total_units);
      doc.save();
      callback(err, doc);
    } else {
      console.log("name");
      console.log(name);
      callback(err, doc);
    }
  });
}

module.exports.create_or_increment = function (name, total_units, warehouse_name, warehouse_id, incident_name, incident_id, user_email, callback) {
  console.log("create_or_increment");
    var warehouses = "none";
    async.series([
    function(callback) {
      Inventory.find({name: name, warehouse_name: warehouse_name}, function(err, doc){
	console.log("find");
	if (doc) {
	  console.log("doc is true");
	  warehouses = doc;
	}
	callback();

      });

    }, 
    function(callback) {
      console.log(warehouses.length);
      if (warehouses.length == 0) {
	console.log("p");
	  var now = Date.now();
	  var inventory = new Inventory({name:name.toLowerCase(), total_units:total_units, created_at: now, modified_at: now, warehouse_name:warehouse_name, warehouse_id:warehouse_id, incident_name:incident_name, incident_id:incident_id, user_email: user_email});
	  inventory.save(function(err){
	    if(!err){
	      console.log(inventory);
	      callback(err, inventory);
	    } else {
	      callback(err, inventory);

	    }
	  });
	
      } else {
	// Increment
	Inventory.findOne({ warehouse_name: warehouse_name, name: name }, function (err, doc){
	var total = doc.total_units;
	console.log(total);
	doc.total_units = total + parseInt(total_units);
	console.log(doc.total_units);
	doc.save();
	callback(err, doc);
      });
	
      }

    },], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err){
	  console.log(err.message);
	}
	callback();
    });
  
}


module.exports.create = function (req, res) {
  warehouse_name = req.body.warehouse_name;
  name = req.body.name;
  container = req.body.container;
  container_volume = req.body.container_volume;
  total_units = req.body.total_units;
  // search name and container, if exists, increment by volume, if not, add 
  InventoryItem.find({warehouse_name: warehouse_name, name: name, container: container, container_volume: container_volume}, function(err,q){
    console.log(q[0]);
    if (typeof q[0] === 'undefined') {
      var inventoryItem = new InventoryItem({warehouse_name: warehouse_name, name: name, container: container, container_volume: container_volume, total_units: total_units});
      inventoryItem.save(function(err){
	console.log("saving inventory item");
	if (!err) {
	  console.log("inventory item saved");
	} else {
	}
      });
    } else {
      console.log("incrementing")
      // update q[0], get container_volume
      InventoryItem.findOne({ warehouse_name: warehouse_name, name: name, container: container, container_volume: container_volume }, function (err, doc){
	var total = doc.total_units;
	console.log(total);
	doc.total_units = total + parseInt(total_units);
	console.log(doc.total_units);
	doc.save();
      });

    }  
 });
}
