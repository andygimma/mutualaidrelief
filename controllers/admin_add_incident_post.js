// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var dstk = require('dstk');


var IncidentModel = require('../models/Incident.js');



module.exports.post = function(req, res){
  console.log("in post");
  var lat;
  var lng;
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
        console.log("starting save");
	// change this to use the tested restful interface
	var incident = new IncidentModel.create(req.body.name, req.body.short_name, req.body.city, req.body.state, req.body.country, lat, lng, function(err, user) {
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
	req.flash('message', 'Successfully Added New Incident');

        //Here locals will be populated with 'user' and 'posts'
        console.log("no errors in async");
	res.redirect("/admin-incidents");
    });
}