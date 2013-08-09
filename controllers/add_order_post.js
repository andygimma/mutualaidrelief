// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var dstk = require('dstk');


var WarehouseModel = require('../models/Warehouse.js');
var InventoryModel = require('../models/Inventory.js');



module.exports.post = function(req, res){
  console.log("in post");
  // get all vars
  // iterate in series function
  // after that, the callback should work.
  var warehouse_id = req.body.warehouse;
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
  if (name1 != '') {
    json_array.push({name: name1, number: number1});
  }
  if (name2 != '') {
    json_array.push({name: name2, number: number2});
  }
  if (name3 != '') }{
    json_array.push({name: name3, number: number3});
  }
  if (name4 != '') {
    json_array.push({name: name4, number: number4});
  }
  if (name5 != '') {
    json_array.push({name: name5, number: number5});
  }
  if (name6 != '') {
    json_array.push({name: name6, number: number6});
  }
  if (name7 != '') {
    json_array.push({name: name7, number: number7});
  }
  if (name8 != '') {
    json_array.push({name: name8, number: number8});
  }
  if (name9 != '') {
    json_array.push({name: name9, number: number9});
  }
  if (name10 != '') {
    json_array.push({name: name10, number: number10});
  }
  if (name11 != '') {
    json_array.push({name: name11, number: number11});
  }
  if (name12 != '') {
    json_array.push({name: name12, number: number12});
  }
  
  console.log(json_array);
  
  
  async.series([
     function(callback) {
      for (var i = 0; i < json_array.length; i++) {
	InventoryModel.decrement(warehouse_id, json_array[i].name, json_array[i].number function (error, warehouse) {
	      this_warehouse_name = warehouse.name;
	      this_incident_id = warehouse.incident_id;
	      this_incident_name = warehouse.incident_name;

	      });
      
	
	callback()

      }
      

    },

    function(callback) {
        console.log("starting save");
	// change this to use the tested restful interface
	
	var inventory = new InventoryModel.create_or_increment(req.body.name, req.body.number, this_warehouse_name, req.body.warehouse, this_incident_name, this_incident_id, req.body.user_email, function(err, user) {
	  if (!err) {
	    console.log("no error");
	  } else {
	     console.log("error");
	    
	  }  
	});

	callback();
    } ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err){
	  console.log(err.message);
	  res.redirect("/error");
	  return next(err);
	}
	req.flash('message', 'Successfully Added New Inventory. It may take a few moments to show on your screen.');

        //Here locals will be populated with 'user' and 'posts'
        console.log("no errors in async");
	res.redirect("/view_inventory");
    });
}