// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var flash = require('connect-flash');


var OrderModel = require('../models/Order.js');
var VehicleModel = require('../models/Vehicle.js');



module.exports.get = function(req, res){
  console.log("in get");
  var orders;
  var vehicles;
  
  async.parallel([
    function(callback) {
      OrderModel.index(function(err, doc){
	orders = doc;
	callback();
	console.log(doc);

      });

    },
    function(callback) {
      VehicleModel.index(function(err, doc){
	vehicles = doc;
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
    res.render('add_delivery.ejs', {
      layout:false,
      user: req.user,
      vehicles:vehicles,
      orders: orders,
      signed_in: req.isAuthenticated()
    });
    
    });
}