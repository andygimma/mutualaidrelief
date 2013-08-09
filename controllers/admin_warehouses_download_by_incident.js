// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var flash = require('connect-flash');
var json2csv = require('json2csv');



var WarehouseModel = require('../models/Warehouse.js');



module.exports.get = function(req, res){
  console.log("in get");
  var warehouses;
  var type = req.params.type;
  var incident = req.params.incident;
  console.log(type);
  
  async.series([
    function(callback) {
      WarehouseModel.index_by_incident_name(incident, function(err, doc){
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
      if (type == "json") {	
	res.send(warehouses);
      }
      
      if (type == "csv") {
	// send csv
	console.log("csv");
	json2csv({data: warehouses, fields: ['name', 'city', 'state']}, function(err, csv) {
	  if (err) console.log(err);
	  res.send(csv);
	});
      }
    
    });
}