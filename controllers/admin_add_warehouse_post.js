/*
 * Developer : Andy Gimma (andy.n.gimma@gmail.com)
 * Date : 08/14/13
 * All code (c)2013 Andy Gimma all rights reserved
 */

// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var dstk = require('dstk');


var WarehouseModel = require('../models/Warehouse.js');
var IncidentModel = require('../models/Incident.js');



module.exports.post = function(req, res){
  console.log("in post");
  var lat;
  var lng;
  var this_incident_name;
  var full_address = req.body.address + " " + req.body.city + " " + req.body.state;
  
  async.series([
    function(callback) {
      dstk.street2coordinates(full_address, function (error, data, httpResponse) {
	console.log(" dstk street2coordinates");
	if (!error) {
	    lat = data[full_address].latitude
	    lng = data[full_address].longitude
	    console.log(lat);
	    console.log(lng);

	}
	callback();

      });
    },
     function(callback) {
      IncidentModel.read(req.body.incident, function (error, incident) {
	    this_incident_name = incident.name;
	    console.log("THISSS" + this_incident_name);
	    callback()

	    });

    },

    function(callback) {
        console.log("starting save");
	// change this to use the tested restful interface
	var warehouse = new WarehouseModel.create(req.body.name, req.body.short_description, req.body.city, req.body.state, req.body.address, lat, lng, req.body.incident, this_incident_name, function(err, user) {
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
	req.flash('message', 'Successfully Added New Warehouse');

        //Here locals will be populated with 'user' and 'posts'
        console.log("no errors in async");
	res.redirect("/admin-warehouses");
    });
}