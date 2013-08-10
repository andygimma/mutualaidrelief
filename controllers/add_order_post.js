// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var dstk = require('dstk');


var WarehouseModel = require('../models/Warehouse.js');
var InventoryModel = require('../models/Inventory.js');
var OrderModel = require('../models/Order.js');



module.exports.post = function(req, res){
  console.log("in post");
  // get all vars
  // iterate in series function
  // after that, the callback should work.
  var warehouse_id = req.body.warehouse;
  var warehouse_name = "";
  var this_incident_id = "";
  var this_incident_name = "";
  var order_number = req.body.order_number;
  var person_name = req.body.person;
  var address = req.body.address;
  
  var name1 = req.body.name1;
  var name2 = req.body.name2;
  var name3 = req.body.name3;
  var name4 = req.body.name4;
  var name5 = req.body.name5;
  var name6 = req.body.name6;
  var name7 = req.body.name7;
  var name8 = req.body.name8;
  var name9 = req.body.name9;
  var name10 = req.body.name10;
  var name11 = req.body.name11;
  var name12 = req.body.name12;
  
  var number1 = req.body.number1;
  var number2 = req.body.number2;
  var number3 = req.body.number3;
  var number4 = req.body.number4;
  var number5 = req.body.number5;
  var number6 = req.body.number6;
  var number7 = req.body.number7;
  var number8 = req.body.number8;
  var number9 = req.body.number9;
  var number10 = req.body.number10;
  var number11 = req.body.number11;
  var number12 = req.body.number12;
  
  var json_array = [];
  json_array.push({name: name1, number: number1});
  json_array.push({name: name2, number: number2});
  json_array.push({name: name3, number: number3});
  json_array.push({name: name4, number: number4});
  json_array.push({name: name5, number: number5});
  json_array.push({name: name6, number: number6});
  json_array.push({name: name7, number: number7});
  json_array.push({name: name8, number: number8});
  json_array.push({name: name9, number: number9});
  json_array.push({name: name10, number: number10});
  json_array.push({name: name11, number: number11});
  json_array.push({name: name12, number: number12});

  
  console.log(json_array);
  
  
  async.series([

     function(callback) {
	InventoryModel.decrement(warehouse_id, json_array[0].name, json_array[0].number, function(error, inventory) {
	      warehouse_name = inventory.warehouse_name;
	      	      console.log("WAREHOUSE NAME2");
	      console.log(inventory.warehouse_name);

	      this_incident_id = inventory.incident_id;
	      this_incident_name = inventory.incident_name;
	      callback()

	      });
// 	if (json_array[1].name != '') {
    console.log("22222222222222222222222");
    console.log(json_array[1].name);
	InventoryModel.decrement(warehouse_id, json_array[1].name, json_array[1].number, function(error, inventory) {
	      console.log(inventory);

	      });
// 	}

// 	if (json_array[2].name != '') {
	InventoryModel.decrement(warehouse_id, json_array[2].name, json_array[2].number, function(error, inventory) {
	      console.log(inventory);

	      });
// 	}
// 	if (json_array[3].name != '') {
	InventoryModel.decrement(warehouse_id, json_array[3].name, json_array[3].number, function(error, inventory) {
	      console.log(inventory);

	      });
// 	}
// 	if (json_array[4].name != '') {

	InventoryModel.decrement(warehouse_id, json_array[4].name, json_array[4].number, function(error, inventory) {
	      console.log(inventory);

	      });
// 	}
// 	if (json_array[5].name != '') {
	InventoryModel.decrement(warehouse_id, json_array[5].name, json_array[5].number, function(error, inventory) {
	      console.log(inventory);

	      });
// 	}
// 	if (json_array[6].name != '') {
	InventoryModel.decrement(warehouse_id, json_array[6].name, json_array[6].number, function(error, inventory) {
	      console.log(inventory);

	      });
// 	}
// 	if (json_array[7].name != '') {
	InventoryModel.decrement(warehouse_id, json_array[7].name, json_array[7].number, function(error, inventory) {
	      console.log(inventory);

	      });
// 	}
// 	if (json_array[8].name != '') {
	InventoryModel.decrement(warehouse_id, json_array[8].name, json_array[8].number, function(error, inventory) {
	      console.log(inventory);

	      });
// 	}
// 	if (json_array[9].name != '') {
	InventoryModel.decrement(warehouse_id, json_array[9].name, json_array[9].number, function(error, inventory) {
	      console.log(inventory);

	      });
// 	}
// 	if (json_array[10].name != '') {
	InventoryModel.decrement(warehouse_id, json_array[10].name, json_array[10].number, function(error, inventory) {
	      console.log(inventory);

	      });
// 	}
// 	if (json_array[11].name != '') {
	InventoryModel.decrement(warehouse_id, json_array[11].name, json_array[11].number, function(error, inventory) {
	      console.log(inventory);

	      });
// 	}

	
	
    },

    function(callback) {
        console.log("starting save");
	// change this to use the tested restful interface
	var json_data = {warehouse_id: warehouse_id, warehouse_name:warehouse_name, incident_id:this_incident_id, incident_name:this_incident_name, person_name: req.body.person_name, address: req.body.address, order_number: req.body.order_number, order_description: req.body.order_description, status: "pending delivery", item1: req.body.name1, item2: req.body.name2, item3: req.body.name3, item4: req.body.name4, item5: req.body.name5, item6: req.body.name6, item7: req.body.name7, item8: req.body.name8, item9: req.body.name9, item10: req.body.name10, item11: req.body.name11, item12: req.body.name12, number1: req.body.number1, number2: req.body.number2, number3: req.body.number3, number4: req.body.number4, number5: req.body.number5, number6: req.body.number6, number7: req.body.number7, number8: req.body.number8, number9: req.body.number9, number10: req.body.number10, number11: req.body.number11, number12: req.body.number12} 
	var order = new OrderModel.create(json_data, function(err, order) {
	  if (!err) {
	    console.log(order);
	    console.log("no error");
	  } else {
	     console.log("error");
	     console.log(err.message);
	    
	  }  
	});

	callback();
    }, ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err){
	  console.log(err.message);
	  res.redirect("/error");
	  return next(err);
	}
	req.flash('message', 'Successfully Added New Inventory. It may take a few moments to show on your screen.');

        //Here locals will be populated with 'user' and 'posts'
        console.log("no errors in async");
	res.redirect("/view_orders");
    });
}