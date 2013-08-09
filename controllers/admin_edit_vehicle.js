// use async and dstk to get lat,lng
// then add to database
var async = require('async');


var VehicleModel = require('../models/Vehicle.js');
var IncidentModel = require('../models/Incident.js');


module.exports.get = function(req, res){
  console.log("edit_vehicle");
  var this_vehicle;
  var incidents;
  var vehicle_id = req.params.vehicle_id;
  console.log(vehicle_id);
  
  async.series([
  function(callback) {
    console.log("4");
    
      IncidentModel.index(function(err, doc){
	incidents = doc;
	console.log(incidents);
	callback();

      });

    },
    function(callback) {
      console.log("3");
      VehicleModel.read(vehicle_id, function (error, user) {
	    this_vehicle = user;
	    console.log(this_vehicle);
	    callback()

	    });

    }, ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err){
	  console.log(err.message);
	  res.redirect("/error");
	  return next(err);
	}
        //Here locals will be populated with 'user' and 'posts'
        console.log("about to render");
      res.render('admin-edit-vehicle.ejs', {
	vehicle:this_vehicle,
	incidents: incidents,
	layout:false,
	signed_in: req.isAuthenticated()
      });
    
    });
}