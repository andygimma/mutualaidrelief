/*
 * Developer : Andy Gimma (andy.n.gimma@gmail.com)
 * Date : 08/14/13
 * All code (c)2013 Andy Gimma all rights reserved
 */

// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var flash = require('connect-flash');


var WarehouseModel = require('../models/Warehouse.js');



module.exports.get = function(req, res){
  console.log("in get");
  var warehouse_id = req.params.warehouse_id;
  
  async.series([
    function(callback) {
      WarehouseModel.remove(warehouse_id, function (error, user) {
	    callback()

	    });

    }, ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err){
	  console.log(err.message);
	  res.redirect("/error");
	  return next(err);
	}
        //Here locals will be populated with 'user' and 'posts'
	  // flash successful
	  req.flash('message', 'Delete Successful');
          res.redirect('/admin-warehouses');

    
    });
}