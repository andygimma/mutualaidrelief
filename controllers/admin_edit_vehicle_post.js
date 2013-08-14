/*
 * Developer : Andy Gimma (andy.n.gimma@gmail.com)
 * Date : 08/14/13
 * All code (c)2013 Andy Gimma all rights reserved
 */

// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var dstk = require('dstk');


var VehicleModel = require('../models/Vehicle.js');



module.exports.post = function(req, res){
  console.log("edit incident");
  console.log(req.body.vehicle_id);
  var now = Date.now();


  async.series([
    function(callback) {
      //update user
       req.body.modified_at = now;
       // check for missing checkboxes

       VehicleModel.update(req.body.vehicle_id, req.body, function(err, doc){
	console.log(doc);
	users = doc;
	callback();

      });
    } ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err){
	  console.log(err.message);
	  res.redirect("/error");
	  return next(err);
	}
        //Here locals will be populated with 'user' and 'posts'
        req.flash('message', 'Update Successful');
        console.log("no errors in async");
	res.redirect("/admin-vehicles");
    });
}