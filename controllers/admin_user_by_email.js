/*
 * Developer : Andy Gimma (andy.n.gimma@gmail.com)
 * Date : 08/14/13
 * All code (c)2013 Andy Gimma all rights reserved
 */

// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var flash = require('connect-flash');


var UserModel = require('../models/User.js');
var IncidentModel = require('../models/Incident.js');



module.exports.get = function(req, res){
  console.log("in get");
  var email = req.params.email;
  var this_user;
  var incidents;
  
  async.series([
    function(callback) {
      UserModel.read_by_email(email, function(err, doc){
	this_user = doc;
	callback();

      });

    }, ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err){
	  console.log(err.message);
	  res.redirect("/error");
	  return next(err);
	}
        //Here locals will be populated with 'user' and 'posts'
      res.render('admin-edit-users.ejs', {
	user:this_user,
	layout:false,
	signed_in: req.isAuthenticated()
      });
    
    });
}