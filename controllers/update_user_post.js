/*
 * Developer : Andy Gimma (andy.n.gimma@gmail.com)
 * Date : 08/14/13
 * All code (c)2013 Andy Gimma all rights reserved
 */

// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var dstk = require('dstk');


var UserModel = require('../models/User.js');



module.exports.post = function(req, res){
  console.log("in post");
  console.log(req.body.authorized);
  var now = Date.now();


  async.series([
    function(callback) {
      //update user
       req.body.modified_at = now;
       // check for missing checkboxes
       if (! req.body.create_cases) {
	 req.body.create_cases = false
       }
       if (! req.body.view_cases) {
	 req.body.view_cases = false
       }
       if (! req.body.update_or_delete_cases) {
	 req.body.update_or_delete_cases = false
       }
       
       if (! req.body.create_inventory) {
	 req.body.create_inventory = false
       }
        if (! req.body.view_inventory) {
	 req.body.view_inventory = false
       }
        if (! req.body.update_or_delete_inventory) {
	 req.body.update_or_delete_inventory = false
       }
       
        if (! req.body.create_orders) {
	 req.body.create_orders = false
       }
        if (! req.body.view_orders) {
	 req.body.view_orders = false
       }
        if (! req.body.update_or_delete_orders) {
	 req.body.update_or_delete_orders = false
       }
       UserModel.update(req.body.user_id, req.body, function(err, doc){
	console.log(doc);
	console.log("####" + req.body);
	console.log(req.body);
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
	res.redirect("/admin-users");
    });
}