// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var flash = require('connect-flash');
var json2csv = require('json2csv');


var VehicleModel = require('../models/Vehicle.js');



module.exports.get = function(req, res){
  console.log("in get");
  var users;
  var type = req.params.type;
  console.log(type);
  
  async.series([
    function(callback) {
      VehicleModel.index(function(err, doc){
	users = doc;
	callback();

      });

    }, ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err){
	  console.log(err.message);
	  res.redirect("/error");
	  return next(err);
	}
        //Here locals will be populated with 'user' and 'posts'
      if (type == "json") {	
	res.send(users);
      }
      
      if (type == "csv") {
	// send csv
	console.log("csv");
	json2csv({data: users, fields: ['owner_name', 'phone1', 'vehicle_type']}, function(err, csv) {
	  if (err) console.log(err);
	  res.send(csv);
	});
      }
    
    });
}