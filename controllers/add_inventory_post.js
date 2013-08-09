// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var dstk = require('dstk');


var WarehouseModel = require('../models/Warehouse.js');
var InventoryModel = require('../models/Inventory.js');



module.exports.post = function(req, res){
  console.log("in post");
  var lat;
  var lng;
  var this_warehouse_name;
  var full_address = req.body.address + " " + req.body.city + " " + req.body.state;
  var this_incident_id;
  var this_incident_name;
  
  async.series([
     function(callback) {
      WarehouseModel.read(req.body.warehouse, function (error, warehouse) {
	    this_warehouse_name = warehouse.name;
	    this_incident_id = warehouse.incident_id;
	    this_incident_name = warehouse.incident_name;
	    callback()

	    });

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