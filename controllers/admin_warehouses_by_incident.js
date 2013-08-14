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
var IncidentModel = require('../models/Incident.js');



module.exports.get = function(req, res){
  console.log("in get");
  var incident_name = req.params.incident_name;
  var warehouses;
  var incidents;
  
  async.series([
    function(callback) {
      IncidentModel.index(function(err, doc){
	incidents = doc;
	callback();

      });

    },
    function(callback) {
      WarehouseModel.index_by_incident_name(incident_name, function(err, doc){
	warehouses = doc;
	callback();

      });

    }, ], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err){
	  console.log(err.message);
	  res.redirect("/error");
	  return next(err);
	}
        //Here locals will be populated with 'user' and 'posts'
      res.render('admin_warehouses.ejs', {
	selected_incident: incident_name,
	incidents: incidents,
	warehouses:warehouses,
	layout:false,
	messages: req.flash('message'),
	signed_in: req.isAuthenticated()
      });
    
    });
}