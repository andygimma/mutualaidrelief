// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var flash = require('connect-flash');


var WarehouseModel = require('../models/Warehouse.js');



module.exports.get = function(req, res){
  console.log("in get");
  var warehouses;
  
  async.series([
    function(callback) {
      WarehouseModel.index(function(err, doc){
	warehouses = doc;
	callback();
	console.log(doc);

      });

    }, ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err){
	  console.log(err.message);
	  res.redirect("/error");
	  return next(err);
	}
        //Here locals will be populated with 'user' and 'posts'
    res.render('add_inventory.ejs', {
      layout:false,
      user: req.user,
      warehouses: warehouses,
      signed_in: req.isAuthenticated()
    });
    
    });
}