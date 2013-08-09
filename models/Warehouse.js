var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var osm = require('osmgeocoder');
// var geonoder = require('geonoder')
// 
// var plebiscitoAddress = '293 quincy st brooklyn ny'
// 
// geonoder.toCoordinates(plebiscitoAddress, geonoder.providers.nominatim, function(lat, long) {
//     console.log('Lat: ' + lat + ' Long: ' + long) // Lat: 41.8965209 Long: 12.4805225
// })
var WarehouseEntity = new Schema({
  name: {type: String, required: true, trim: true},
  address: {type: String, required: true, trim: true},
  short_description: {type: String, required: true, trim: true},
  city: {type: String, required: true, trim: true},
  state: {type: String, required: true, trim: true},
  lat: {type: String, required: true, trim: true},
  lng: {type: String, required: true, trim: true},
  incident_id: {type: String, required: true, trim: true},
  incident_name: {type: String, required: true, trim: true},
  created_at: {type: String, required: true, trim: true},
  modified_at: {type: String, required: true, trim: true}
});


var Warehouse = mongoose.model('X_WarehouseCollection', WarehouseEntity);
module.exports.Warehouse = Warehouse;

module.exports.index = function(callback) {
  Warehouse.find()
    .sort('name')
    .exec(function(err, q) {
	// code here
      if (!err) {
	callback(err, q);
      } else {
	callback(err, q);
      }
    })
    
}

module.exports.remove = function(_id, callback) {
  Warehouse.remove({_id: _id}, function (err, response) {
    callback(err, response);
  });
}

module.exports.read_by_name = function(name, callback) {
  Warehouse.findOne({name: name}, function(err, user) {
    console.log(user);
    callback(err, user);
  });
}

module.exports.index_by_incident_name = function(incident_name, callback) {
  Warehouse.find({incident_name: incident_name})
    .sort('name')
    .exec(function(err, q) {
	// code here
      if (!err) {
	callback(err, q);
      } else {
	callback(err, q);
      }
    })
    
}

module.exports.create = function(name, short_description, city, state, address, lat, lng, incident_id, incident_name, callback) {
  var now = Date.now();
  var warehouse = new Warehouse({name:name, short_description:short_description, created_at: now, modified_at: now, city:city, state:state, address:address, lat:lat, lng: lng, incident_id: incident_id, incident_name: incident_name});
  warehouse.save(function(err){
    if(!err){
      callback(err, warehouse);
    } else {
      console.log(err.message);
      callback(err, warehouse);

    }
  });
}


module.exports.read = function(_id, callback) {
  Warehouse.findById(_id, function(err, incident) {
    callback(err, incident);
  });
}

module.exports.update = function(_id, properties_set, callback) {
    Warehouse.update({_id: _id}, {$set: properties_set}, {upsert: true}, function(err, incident, response, fourth) {
      callback(err, incident, response);
  }); 
}

// module.exports.get_warehouse = function(req, res, next) {
//     if (checkSignedIn(req) != true) {
//     res.redirect('/signin');
//   } else {
//     var name = req.query.name;
//     console.log(name);
// 
//     Warehouse.find({name: name}, function(err,warehouses){
//       InventoryItem.find({warehouse_name: name}, function(err,items){
// 	console.log(items);
// 	res.render('warehouse_by_name.ejs', {
// 	  warehouses: warehouses,
// 	  inventory_items:items,
// 	  layout:false,
// 	  signed_in: checkSignedIn(req)
// 	});
//       });
// 
//     });
//   }
// };
// 
// module.exports.warehouses = function(req, res){
// 
//     Warehouse.find({}, function(err,q){
//     console.log(q);
//     res.render('warehouses.ejs', {
//       warehouses:q,
//       layout:false,
//       signed_in: checkSignedIn(req)
//     });
//   });
//     
// 
// };
// 
// module.exports.create_delivery_order = function(req, res, next) {
//   if (checkSignedIn(req) != true) {
//     res.redirect('/signin');
//   } else {
//     Warehouse.find({}, function(err,q){
//     console.log(q);
//     res.render('create-delivery-order.ejs', {
//       warehouses:q,
//       layout:false,
//       signed_in: checkSignedIn(req)
//     });
//   });
//   }
// };
// 
// 
// module.exports.inventory = function(req, res){
//   console.log(checkSignedIn(req));
// 
//   Warehouse.find({}, function(err,q){
//     console.log(q);
//     res.render('inventory.ejs', {
//       warehouses:q,
//       layout:false,
//       signed_in: checkSignedIn(req)
//     });
//   });
// };
// 
// 
// module.exports.create = function(req, res) {
//   var name = req.body.name;
//   var address = req.body.address;
//   var short_description = req.body.short_description;
//   var city = req.body.city;
//   var state = req.body.state;
//   
//   var final_address = address + " " +  city + " " + state;
//   console.log(final_address);
//   osm.geocode(final_address, function(err, response){
//     console.log(response[0].lat);
// //     console.log(response[0].lon);
//       var warehouse = new Warehouse({name: name, address: address, city: city, state: state, short_description: short_description, lat: response[0].lat, lon: response[0].lon});
//       warehouse.save(function(err){
// 	console.log("saving warehouse");
// 	if (!err) {
// 	  console.log("warehouse saved");
// 	  res.redirect("/admin");
// 	} else {
// 	  res.redirect("/error");
// 	}
//       });
// 
//   });
// 
// }
// 
// module.exports.add_inventory = function(req, res){
//   if (checkSignedIn(req) != true) {
//     res.redirect("/signup");
//   } else {
//         Warehouse.find({}, function(err,q){
//         console.log(q);
// 	res.render('add-inventory.ejs', {
// 	  warehouses:q,
// 	  layout:false,
// 	  signed_in: checkSignedIn(req)
// 	});
// 	
//     });
// 
//   }
// };