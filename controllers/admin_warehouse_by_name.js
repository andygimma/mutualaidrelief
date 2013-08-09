// use async and dstk to get lat,lng
// then add to database
var async = require('async');
var flash = require('connect-flash');


var WarehouseModel = require('../models/Warehouse.js');
var IncidentModel = require('../models/Incident.js');



module.exports.get = function(req, res){
  console.log("in get");
  var name = req.params.name;
  var this_warehouse;
  var incidents;
  
  async.series([
    function(callback) {
      WarehouseModel.read_by_name(name, function(err, doc){
	this_warehouse = doc;
	console.log(doc);
	callback();

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
	signed_in: req.isAuthenticated()
      });
    
    });
}