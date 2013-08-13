// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var dstk = require('dstk');


var IncidentModel = require('../models/Incident.js');
var DeliveryModel = require('../models/Delivery.js');
var VehicleModel = require('../models/Vehicle.js');


module.exports.post = function(req, res){
  var now = Date.now();
  console.log("PASE");
  console.log(req.body);
  var post_objects = req.body;
  var orders_array = [];
  var incident_id = req.user.incident_id;
  var incident_name = req.user.incident_name;
  var vehicle_id = req.body.vehicle;
  var vehicle_driver;


  async.series([
    function(callback) {
      for (var key in post_objects) {
	if (key != "vehicle") {
	 var this_order = post_objects[key];
	 orders_array.push(this_order);
	}
      }
	callback();
    },   
    function(callback) {
      VehicleModel.read(vehicle_id, function(err, doc){
	vehicle_driver = doc.owner_name;
	callback();
	console.log(doc);

      });

    },
    
    // get vehicle name from number
    function(callback) {
     // DeliveryModel.create incident_id, incident_name, vehicle_id, vehicle_driver, order_numbers, status, callback
     	var delivery = new DeliveryModel.create(incident_id, incident_name, vehicle_id, vehicle_driver, orders_array, "en route", function(err, delivery) {
	  if (!err) {
	    console.log("no error");
	    console.log(delivery);
	  } else {
	     console.log("error");
	    
	  }  
	});
	callback();
    },], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err){
	  console.log(err.message);
	  res.redirect("/error");
	  return next(err);
	}
        //Here locals will be populated with 'user' and 'posts'
        req.flash('message', 'Update Successful');
        console.log("no errors in async");
	console.log(orders_array);
	res.redirect("/view_deliveries");
    });
}