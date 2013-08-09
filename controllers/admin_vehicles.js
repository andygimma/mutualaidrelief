// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var flash = require('connect-flash');


var VehicleModel = require('../models/Vehicle.js');
var IncidentModel = require('../models/Incident.js');



module.exports.get = function(req, res){
  console.log("in get");
  var vehicles;
  var incidents;
  
  async.series([
    function(callback) {
      IncidentModel.index(function(err, doc){
	incidents = doc;
	callback();

      });

    },
    function(callback) {
      VehicleModel.index(function(err, doc){
	vehicles = doc;
	callback();

      });

    }, ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err){
	  console.log(err.message);
	  res.redirect("/error");
	  return next(err);
	}
        //Here locals will be populated with 'user' and 'posts'
      res.render('admin-vehicles.ejs', {
	selected_incident: "All Incidents (click to change)",
	incidents: incidents,
	vehicles:vehicles,
	layout:false,
	messages: req.flash('message'),
	signed_in: req.isAuthenticated()
      });
    
    });
}