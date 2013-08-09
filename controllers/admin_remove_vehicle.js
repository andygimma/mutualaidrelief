// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var flash = require('connect-flash');


var VehicleModel = require('../models/Vehicle.js');



module.exports.get = function(req, res){
  console.log("delete vehicle");
  var vehicle_id = req.params.vehicle_id;
  
  async.series([
    function(callback) {
      VehicleModel.remove(vehicle_id, function (error, user) {
	    callback()

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
          res.redirect('/admin-vehicles');

    
    });
}