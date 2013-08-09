// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var dstk = require('dstk');


var IncidentModel = require('../models/Incident.js');



module.exports.post = function(req, res){
  console.log("edit incident");
  console.log(req.body.incident_id);
  var now = Date.now();


  async.series([
    function(callback) {
      //update user
       req.body.modified_at = now;
       // check for missing checkboxes

       IncidentModel.update(req.body.incident_id, req.body, function(err, doc){
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
	res.redirect("/admin-incidents");
    });
}