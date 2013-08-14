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
  var deliveries;
  var warehouses;
  var delivery_id = req.params.delivery_id;
  async.series([
    function(callback) {
      DeliveryModel.read(delivery_id, function(err, doc){
	deliveries = doc;
	callback();
	console.log(doc);

      });

    },
], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err){
	  console.log(err.message);
	  res.redirect("/error");
	  return next(err);
	}
        //Here locals will be populated with 'user' and 'posts'
    res.render('view_delivery_by_id.ejs', {
      layout:false,
      user: req.user,
      deliveries: deliveries,
      signed_in: req.isAuthenticated()
    });
    
    });
}