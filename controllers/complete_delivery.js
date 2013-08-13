// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var flash = require('connect-flash');


var DeliveryModel = require('../models/Delivery.js');


module.exports.get = function(req, res){
  console.log("delete order");
  var delivery_id = req.params.delivery_id;
  var update_set = {status: 'delivered'};

  
  async.series([
  function(callback) {
      DeliveryModel.update(delivery_id, update_set, function (error, delivery) {
	  
	  console.log(delivery);
	    callback()
	      
	    });

    },
    
 	      ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err){
	  console.log(err.message);
	  res.redirect("/error");
	  return next(err);
	}
        //Here locals will be populated with 'user' and 'posts'
	  // flash successful
	  req.flash('message', 'Delete Successful');
          res.redirect('/view_deliveries');

    
    });
}