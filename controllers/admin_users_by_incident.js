// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var flash = require('connect-flash');


var UserModel = require('../models/User.js');
var IncidentModel = require('../models/Incident.js');



module.exports.get = function(req, res){
  console.log("in get");
  var incident_name = req.params.incident_name;
  var users;
  var incidents;
  
  async.series([
    function(callback) {
      IncidentModel.index(function(err, doc){
	incidents = doc;
	callback();

      });

    },
    function(callback) {
      UserModel.index_by_incident_name(incident_name, function(err, doc){
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
      res.render('admin-users.ejs', {
	selected_incident: incident_name,
	incidents: incidents,
	users:users,
	layout:false,
	messages: req.flash('message'),
	signed_in: req.isAuthenticated()
      });
    
    });
}