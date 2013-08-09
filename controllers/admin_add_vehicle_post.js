var IncidentModel = require('../models/Incident.js');


// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var flash = require('connect-flash');


var VehicleModel = require('../models/Vehicle.js');



module.exports.post = function(req, res){
  console.log("add vehicle");
  var incident_name;
  var incident_id = req.body.incident;
  
  async.series([
    function(callback) {
      IncidentModel.read(incident_id, function(err, doc){
	incident_name = doc.name;
	console.log(doc);
	callback();

      });

    },
    function(callback) {
      console.log(req.body);
      VehicleModel.create(req.body.owner_name, req.body.other_drivers, req.body.phone1, req.body.owner_email, req.body.owner_twitter, req.body.vehicle_type, req.body.license_plate, req.body.emergency_contact_name, req.body.emergency_contact_number, incident_id, incident_name, function(err, user) {
	callback();
      });
    } ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err){
	  console.log(err.message);
	  res.redirect("/error");
	  return next(err);
	}
	
        //Here locals will be populated with 'user' and 'posts'
      res.redirect('/admin-vehicles');
    
    });
}