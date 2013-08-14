/*
 * Developer : Andy Gimma (andy.n.gimma@gmail.com)
 * Date : 08/14/13
 * All code (c)2013 Andy Gimma all rights reserved
 */

// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var flash = require('connect-flash');


var DeliveryModel = require('../models/Delivery.js');


module.exports.get = function(req, res){
  console.log("in get");
  var status = req.params.status;
  var deliveries;
  
  async.series([
    function(callback) {
      DeliveryModel.index_by_status(status, function(err, doc){
	deliveries = doc;
	callback();

      });

    },
    ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err){
	  console.log(err.message);
	  res.redirect("/error");
	  return next(err);
	}
        //Here locals will be populated with 'user' and 'posts'
    res.render('view_deliveries.ejs', {
      layout:false,
      user: req.user,
      deliveries: deliveries,
      signed_in: req.isAuthenticated()
    });
    
    });
}