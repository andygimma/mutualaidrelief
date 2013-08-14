/*
 * Developer : Andy Gimma (andy.n.gimma@gmail.com)
 * Date : 08/14/13
 * All code (c)2013 Andy Gimma all rights reserved
 */

// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var flash = require('connect-flash');


var OrderModel = require('../models/Order.js');
var WarehouseModel = require('../models/Warehouse.js');



module.exports.get = function(req, res){
  console.log("in get");
  var orders;
  var warehouses;
  var order_id = req.params.order_id;
  console.log(order_id);
  async.series([
    function(callback) {
      OrderModel.index_by_order_id(order_id, function(err, doc){
	orders = doc;
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
    res.render('view_order.ejs', {
      layout:false,
      user: req.user,
      orders: orders,
      signed_in: req.isAuthenticated()
    });
    
    });
}