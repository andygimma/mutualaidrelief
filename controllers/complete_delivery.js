// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var flash = require('connect-flash');


var DeliveryModel = require('../models/Delivery.js');
var OrderModel = require('../models/Order.js');


module.exports.get = function(req, res){
  console.log("delete order");
  var delivery_id = req.params.delivery_id;
  var update_set = {status: 'delivered'};
  var orders_array;

  
  async.series([
  function(callback) {
      DeliveryModel.update(delivery_id, update_set, function (error, delivery) {
	  
	  console.log(delivery);
	    callback()
	      
	    });

    },
        function(callback) {
      DeliveryModel.read(delivery_id, function (error, delivery) {
	console.log(delivery);
	    orders_array = delivery.order_numbers;
	    console.log(orders_array);
	    callback()

	    });

    },
        function(callback) {
     // DeliveryModel.create incident_id, incident_name, vehicle_id, vehicle_driver, order_numbers, status, callback
	console.log("UPDATE###############################");
	console.log(orders_array);
	for (var i=0; i < orders_array.length; i++) {
	  console.log(orders_array[i]);
	  OrderModel.update_by_order_number(orders_array[i], {status: 'delivered'}, function(err, doc){
	    	console.log("UPDATE");

	    console.log(doc);

	  });
	   
	 }
	 	    callback();

	
	
    }, ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
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