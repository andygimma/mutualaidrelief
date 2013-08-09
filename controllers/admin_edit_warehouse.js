// use async and dstk to get lat,lng
// then add to database
var async = require('async');


var WarehouseModel = require('../models/Warehouse.js');
var IncidentModel = require('../models/Incident.js');



module.exports.get = function(req, res){
  console.log("in get");
  var this_warehouse;
  var incidents;
  var warehouse_id = req.params.warehouse_id;
  
  async.series([
    function(callback) {
	IncidentModel.index(function(err, doc){
	  incidents = doc;
	  callback();
	  console.log(doc);

	});

      },
    function(callback) {
      WarehouseModel.read(warehouse_id, function (error, warehouse) {
	    this_warehouse = warehouse;
	    callback()

	    });

    }, ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err){
	  console.log(err.message);
	  res.redirect("/error");
	  return next(err);
	}
        //Here locals will be populated with 'user' and 'posts'
      res.render('admin-edit-warehouse.ejs', {
	warehouse:this_warehouse,
	layout:false,
	incidents: incidents,
	signed_in: req.isAuthenticated()
      });
    
    });
}