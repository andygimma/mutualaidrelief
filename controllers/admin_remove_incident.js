// use async and dstk to get lat,lng
// then add to database
var async = require('async');


var IncidentModel = require('../models/Incident.js');



module.exports.get = function(req, res){
  console.log("in get");
  var this_user;
  var incident_id = req.params.incident_id;
  
  async.series([
    function(callback) {
      IncidentModel.remove(incident_id, function (error, user) {
	    this_user = user;
	    callback()

	    });

    }, ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err){
	  console.log(err.message);
	  res.redirect("/error");
	  return next(err);
	}
        //Here locals will be populated with 'user' and 'posts'
          res.redirect('/admin-incidents');

    
    });
}