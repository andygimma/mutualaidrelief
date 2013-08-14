var UserModel = require('../models/User.js');


// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var flash = require('connect-flash');


var IncidentModel = require('../models/Incident.js');



module.exports.post = function(req, res){
  console.log("in get");
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
      UserModel.create(req.body.email, req.body.password, incident_id, incident_name, function(err, user) {
	callback();
      });
    } ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err){
	  console.log(err.message);
	  res.redirect("/error");
	  return next(err);
	}
        //Here locals will be populated with 'user' and 'posts'
      res.render('signin.ejs', {
	layout:false,
	messages: req.flash('message'),
	signed_in: req.isAuthenticated()
      });
    
    });
}