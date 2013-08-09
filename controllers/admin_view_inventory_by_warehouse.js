// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var flash = require('connect-flash');


var InventoryModel = require('../models/Inventory.js');
var WarehouseModel = require('../models/Warehouse.js');



module.exports.get = function(req, res){
  console.log("in get");
  var inventory;
  var warehouses;
  var warehouse_id = req.params.warehouse_id;
  async.series([
    function(callback) {
      InventoryModel.index_by_warehouse(warehouse_id, function(err, doc){
	inventory = doc;
	callback();
	console.log(doc);

      });

    },
    function(callback) {
      WarehouseModel.index(function(err, doc){
	warehouses = doc;
	callback();
	console.log(doc);

      });

    },], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err){
	  console.log(err.message);
	  res.redirect("/error");
	  return next(err);
	}
        //Here locals will be populated with 'user' and 'posts'
    res.render('admin_inventory.ejs', {
      layout:false,
      user: req.user,
      inventory: inventory,
      warehouses: warehouses,
      signed_in: req.isAuthenticated()
    });
    
    });
}