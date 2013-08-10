// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var flash = require('connect-flash');


var OrderModel = require('../models/Order.js');
var InventoryModel = require('../models/Inventory.js');


module.exports.get = function(req, res){
  console.log("delete order");
  var order_id = req.params.order_id;
  console.log(order_id);
  var user_email = req.user.email;
  
  var warehouse_name;
  var warehouse_id;
  var incident_name;
  var incident_id;
    
  var name1;
  var name2;
  var name3;
  var name4;
  var name5;
  var name6;
  var name7;
  var name8;
  var name9;
  var name10;
  var name11;
  var name12;
  
  var number1;
  var number2;
  var number3;
  var number4;
  var number5;
  var number6;
  var number7;
  var number8;
  var number9;
  var number10;
  var number11;
  var number12;
  
  async.series([
  function(callback) {
      OrderModel.read(order_id, function (error, order) {
	  warehouse_name = order.warehouse_name;
	  warehouse_id = order.warehouse_id;
	  incident_name = order.incident_name;
	  incident_id = order.incident_id;
	  name1 = order.item1;
	  console.log(order.item1);
	  name2 = order.item2;
	  name3 = order.item3;
	  name4 = order.item4;
	  name5 = order.item5;
	  name6 = order.item6;
	  name7 = order.item7;
	  name8 = order.item8;
	  name9 = order.item9;
	  name10 = order.item10;
	  name11 = order.item11;
	  name12 = order.item12;
	  
	  number1 = order.number1;
	  number2 = order.number2;
	  number3 = order.number3;
	  number4 = order.number4;
	  number5 = order.number5;
	  number6 = order.number6;
	  number7 = order.number7;
	  number8 = order.number8;
	  number9 = order.number9;
	  number10 = order.number10;
	  number11 = order.number11;
	  number12 = order.number12;
	    callback()
	      
	    });

    },
    function(callback) {
   	InventoryModel.create_or_increment(name1, number1, warehouse_name, warehouse_id, incident_name, incident_id, user_email, function(err, inventory) {
	   callback()
	  console.log("test");
	  console.log("|" + name2 + "|");

	      });

	if (name2 != '') {
	  console.log("second");
	InventoryModel.create_or_increment(name2, number2, warehouse_name, warehouse_id, incident_name, incident_id, user_email, function(err, inventory) {
	  console.log("test");

	      });
	}
	if (name3 != '') {
	InventoryModel.create_or_increment(name3, number3, warehouse_name, warehouse_id, incident_name, incident_id, user_email, function(err, inventory) {
	  console.log("test");

	      });
	}
	if (name4 != '') {
	InventoryModel.create_or_increment(name4, number4, warehouse_name, warehouse_id, incident_name, incident_id, user_email, function(err, inventory) {
	  console.log("test");

	      });
	}
	if (name5 != '') {
	InventoryModel.create_or_increment(name5, number5, warehouse_name, warehouse_id, incident_name, incident_id, user_email, function(err, inventory) {
	  console.log("test");

	      });
	}
	if (name6 != '') {
	InventoryModel.create_or_increment(name6, number6, warehouse_name, warehouse_id, incident_name, incident_id, user_email, function(err, inventory) {
	  console.log("test");

	      });
	}
	if (name7 != '') {
	InventoryModel.create_or_increment(name7, number7, warehouse_name, warehouse_id, incident_name, incident_id, user_email, function(err, inventory) {
	  console.log("test");

	      });
	}
	if (name8 != '') {
	InventoryModel.create_or_increment(name8, number8, warehouse_name, warehouse_id, incident_name, incident_id, user_email, function(err, inventory) {
	  console.log("test");

	      });
	}
	if (name9 != '') {
	InventoryModel.create_or_increment(name9, number9, warehouse_name, warehouse_id, incident_name, incident_id, user_email, function(err, inventory) {
	  console.log("test");

	      });
	}
	if (name10 != '') {
	InventoryModel.create_or_increment(name10, number10, warehouse_name, warehouse_id, incident_name, incident_id, user_email, function(err, inventory) {
	  console.log("test");

	      });
	}
	if (name11 != '') {
	InventoryModel.create_or_increment(name11, number11, warehouse_name, warehouse_id, incident_name, incident_id, user_email, function(err, inventory) {
	  console.log("test");

	      });
	}
	if (name12 != '') {
	InventoryModel.create_or_increment(name12, number12, warehouse_name, warehouse_id, incident_name, incident_id, user_email, function(err, inventory) {
	  console.log("test");

	      });
	}
	
    },
    
      function(callback) {
   	OrderModel.remove(order_id, function(err, inventory) {
	  if (!err) {
	    console.log("no error");
	    	      callback()

	  } else {
	     console.log("error");
	     	      callback()

	    
	  }  
	  console.log("test");

	      });

    }, ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err){
	  console.log(err.message);
	  res.redirect("/error");
	  return next(err);
	}
        //Here locals will be populated with 'user' and 'posts'
	  // flash successful
	  req.flash('message', 'Delete Successful');
          res.redirect('/view_orders');

    
    });
}