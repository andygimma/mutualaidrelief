/*
 * Developer : Andy Gimma (andy.n.gimma@gmail.com)
 * Date : 08/14/13
 * All code (c)2013 Andy Gimma all rights reserved
 */

// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var flash = require('connect-flash');
var json2csv = require('json2csv');



var InventoryModel = require('../models/Inventory.js');



module.exports.get = function(req, res){
  console.log("in get");
  var inventory;
  var type = req.params.type;
  var warehouse = req.params.warehouse;
  console.log(type);
  
  async.series([
    function(callback) {
      InventoryModel.index_by_warehouse_id(warehouse, function(err, doc){
	inventory = doc;
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
      if (type == "json") {	
	res.send(inventory);
      }
      
      if (type == "csv") {
	// send csv
	console.log("csv");
	json2csv({data: inventory, fields: ['warehouse_name', 'total']}, function(err, csv) {
	  if (err) console.log(err);
	  res.send(csv);
	});
      }
    
    });
}