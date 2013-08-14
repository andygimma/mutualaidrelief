/*
 * Developer : Andy Gimma (andy.n.gimma@gmail.com)
 * Date : 08/14/13
 * All code (c)2013 Andy Gimma all rights reserved
 */

var PORT = 8080;
var express = require('express');
var mongoose = require('mongoose');

var mongoURI = process.env.MONGOHQ_URL || 'mongodb://localhost/SomeDb';
var db = mongoose.connect(mongoURI);
var app = express();
var path = require('path');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
var flash = require('connect-flash');



// ----- Controllers ----- //
// 
var signin = require('./controllers/signin.js');
var index = require('./controllers/index.js');
var cases = require('./controllers/cases.js');
var help = require('./controllers/help.js');
var inventory = require('./controllers/inventory.js');
var signup = require('./controllers/signup.js');
var signup_post = require('./controllers/signup_post.js');
var admin = require('./controllers/admin.js');
var admin_add_incident = require('./controllers/admin_add_incident.js');
var admin_add_incident_post = require('./controllers/admin_add_incident_post.js');
var admin_users = require('./controllers/admin-users.js');
var admin_warehouses = require('./controllers/admin_warehouses.js');
var admin_inventory = require('./controllers/admin_inventory.js');
var admin_edit_users = require('./controllers/admin_edit_users.js');
var update_user_post = require('./controllers/update_user_post.js');
var admin_remove_user = require('./controllers/admin_remove_user.js');
var admin_cases = require('./controllers/admin_cases.js');
var admin_incidents = require('./controllers/admin_incidents.js');
var admin_users_by_incident = require('./controllers/admin_users_by_incident.js');
var admin_user_by_email = require('./controllers/admin_user_by_email.js');
var admin_users_download = require('./controllers/admin_users_download.js');
var admin_users_download_by_incident = require('./controllers/admin_users_download_by_incident.js');
var admin_remove_incident = require('./controllers/admin_remove_incident.js');
var admin_edit_incident = require('./controllers/admin_edit_incident.js');
var admin_edit_incident_post = require('./controllers/admin_edit_incident_post.js');
var admin_remove_warehouse = require('./controllers/admin_remove_warehouse.js');
var admin_warehouse_by_name = require('./controllers/admin_warehouse_by_name.js');
var admin_warehouses_by_incident = require('./controllers/admin_warehouses_by_incident.js');
var admin_warehouses_download = require('./controllers/admin_warehouses_download.js');
var admin_warehouses_download_by_incident = require('./controllers/admin_warehouses_download_by_incident');
var admin_add_warehouse = require('./controllers/admin_add_warehouse.js');
var admin_add_warehouse_post = require('./controllers/admin_add_warehouse_post.js');
var admin_edit_warehouse = require('./controllers/admin_edit_warehouse.js');
var admin_edit_warehouse_post = require('./controllers/admin_edit_warehouse_post.js');
var admin_vehicles = require('./controllers/admin_vehicles.js');
var admin_add_vehicle = require('./controllers/admin_add_vehicle.js');
var admin_add_vehicle_post = require('./controllers/admin_add_vehicle_post.js');
var admin_remove_vehicle = require('./controllers/admin_remove_vehicle.js');
var admin_vehicles_download = require('./controllers/admin_vehicles_download.js');
var admin_vehicles_download_by_incident = require('./controllers/admin_vehicles_download_by_incident.js');
var admin_vehicles_by_incident = require('./controllers/admin_vehicles_by_incident');
var admin_edit_vehicle = require('./controllers/admin_edit_vehicle');
var admin_edit_vehicle_post = require('./controllers/admin_edit_vehicle_post.js');
var user = require('./controllers/user.js');
var add_inventory = require('./controllers/add_inventory.js');
var add_inventory_post = require('./controllers/add_inventory_post.js');
var view_inventory = require('./controllers/view_inventory.js');
var view_inventory_by_warehouse = require('./controllers/view_inventory_by_warehouse.js');
var view_inventory_by_name = require('./controllers/view_inventory_by_name.js');
var admin_view_inventory_by_warehouse = require('./controllers/admin_view_inventory_by_warehouse.js');
var admin_inventory_download = require('./controllers/admin_inventory_download.js');
var admin_inventory_download_by_incident = require('./controllers/admin_inventory_download_by_incident.js');
var add_order = require('./controllers/add_order');
var check_availability_json = require('./controllers/check_availability_json');
var add_order_post = require('./controllers/add_order_post.js');
var view_orders = require('./controllers/view_orders.js');
var view_orders_by_warehouse = require('./controllers/view_orders_by_warehouse.js');
var view_order_by_number = require('./controllers/view_order_by_number.js');
var add_delivery = require('./controllers/add_delivery.js');
var view_order = require('./controllers/view_order.js');
var cancel_order = require('./controllers/cancel_order.js');
var view_orders_by_status = require('./controllers/view_orders_by_status.js');
var add_delivery_post = require('./controllers/add_delivery_post.js');
var view_deliveries = require('./controllers/view_deliveries.js');
var view_deliveries_by_id = require('./controllers/view_deliveries_by_id.js');
var view_deliveries_by_status = require('./controllers/view_deliveries_by_status.js');
var view_deliveries_by_order_number = require('./controllers/view_deliveries_by_order_number.js');
var cancel_delivery = require('./controllers/cancel_delivery.js');
var complete_delivery = require('./controllers/complete_delivery.js');
// var signout = require('./controllers/signout.js');
// var add_vehicle = require('./controllers/add-vehicle.js');
// var add_orders_to_vehicle = require('./controllers/add-orders-to-vehicle.js');
// var add_case = require('./controllers/add-case.js');
// var map_cases = require('./controllers/map-cases.js');
// 
// // ----- Models ----- //
// 
var UserModel = require('./models/User.js');
// var WarehouseModel = require('./models/Warehouse.js');
// var InventoryModel = require('./models/Inventory.js');
// var VehicleModel = require('./models/Vehicle.js');
// var OrderModel = require('./models/Order.js');
// var DeliveryModel = require('./models/Delivery.js');
// var CaseModel = require('./models/Case.js');
// 
// // ----- RESTful Interfaces ----- //

passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(this_email, done) {
  UserModel.UserEntity.findOne({ email: this_email }, function (err, user) {
    done(err, user);
  });
});
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    console.log(password);
    console.log(username);
    var shasum = crypto.createHash('sha1');
    var hash_salt = "9eir9234jlt90sgdj2390";
    shasum.update(password + hash_salt);
    var password_hash = shasum.digest('hex');

    // set user authorized to be true
    UserModel.UserEntity.findOne({ email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
	console.log("incorrect username");

        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password_hash != password_hash) {
	console.log("incorrect password");
	console.log(user.password_hash);
	console.log(password_hash);
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'secret_key'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(app.router);
  

});
// special handling of the root folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.get);
app.get('/signin', signin.get);
app.get('/cases', cases.get);
app.get('/help', help.get);
app.get('/inventory', inventory.get);
app.get('/signup', signup.get);
app.get('/admin', ensureAdmin, admin.get);
app.get('/admin-add-incident', ensureAdmin, admin_add_incident.get);
app.get('/admin-add-vehicle', ensureAdmin, admin_add_vehicle.get);
app.get('/admin-users', ensureAdmin, admin_users.get);
app.get('/admin-warehouses', ensureAdmin, admin_warehouses.get);
app.get('/admin-warehouses/:incident_name', ensureAdmin, admin_warehouses_by_incident.get);
app.get('/admin-edit-warehouse/:warehouse_id', ensureAdmin, admin_edit_warehouse.get);
app.get('/admin-remove-warehouse/:warehouse_id', ensureAdmin, admin_remove_warehouse.get);
app.get('/admin-warehouse-by-name/:name', ensureAdmin, admin_warehouse_by_name.get);
app.get('/admin-users/:incident_name', ensureAdmin, admin_users_by_incident.get);
app.get('/admin-user-by-email/:email', ensureAdmin, admin_user_by_email.get);
app.get('/admin-users-download/:type', ensureAdmin, admin_users_download.get);
app.get('/admin-warehouses-download/:type', ensureAdmin, admin_warehouses_download.get);
app.get('/admin-warehouses-download/:incident/:type', ensureAdmin, admin_warehouses_download_by_incident.get);
app.get('/admin-vehicles/:incident_name', ensureAdmin, admin_vehicles_by_incident.get);
app.get('/admin-vehicles-download/:type', ensureAdmin, admin_vehicles_download.get);
app.get('/admin-vehicles-download/:incident/:type', ensureAdmin, admin_vehicles_download_by_incident.get);
app.get('/admin-inventory-download/:type', ensureAdmin, admin_inventory_download.get);
app.get('/admin-inventory-download/:incident/:type', ensureAdmin, admin_inventory_download_by_incident.get);
app.get('/admin-users-download/:incident/:type', ensureAdmin, admin_users_download_by_incident.get);
app.get('/admin-remove-incident/:incident_id', ensureAdmin, admin_remove_incident.get);
app.get('/admin-remove-vehicle/:vehicle_id', ensureAdmin, admin_remove_vehicle.get);
app.get('/admin-edit-users/:user_id', ensureAdmin, admin_edit_users.get);
app.get('/admin-remove-user/:user_id', ensureAdmin, admin_remove_user.get);
app.get('/admin-cases', ensureAdmin, admin_cases.get);
app.get('/admin-incidents', ensureAdmin, admin_incidents.get);
app.get('/admin-edit-incident/:incident_id', ensureAdmin, admin_edit_incident.get);
app.get('/admin-edit-vehicle/:vehicle_id', ensureAdmin, admin_edit_vehicle.get);
app.get('/admin-vehicles', ensureAdmin, admin_vehicles.get);
app.get('/user', ensureAuthenticated, user.get);
app.get('/add_inventory', ensureAuthenticated, add_inventory.get);
app.get('/view_inventory', ensureAuthenticated, view_inventory.get);
app.get('/view_inventory/:warehouse_id', ensureAuthenticated, view_inventory_by_warehouse.get);
app.get('/view_inventory_name/:name', ensureAuthenticated, view_inventory_by_name.get);
app.get('/admin-inventory', ensureAdmin, admin_inventory.get);
app.get('/admin_view_inventory/:warehouse_id', ensureAuthenticated, admin_view_inventory_by_warehouse.get);
app.get('/add_order', ensureAuthenticated, add_order.get);
app.get('/view_orders', ensureAuthenticated, view_orders.get);
app.get('/view_orders/:warehouse_id', ensureAuthenticated, view_orders_by_warehouse.get);
app.get('/view_order_by_number/:order_number', ensureAuthenticated, view_order_by_number.get);
app.get('/add_delivery', ensureAuthenticated, add_delivery.get);
app.get('/view_order/:order_id', ensureAuthenticated, view_order.get);
app.get('/cancel_order/:order_id', ensureAuthenticated, cancel_order.get);
app.get('/view_orders_by_status/:status', ensureAuthenticated, view_orders_by_status.get);
app.get('/view_deliveries', ensureAuthenticated, view_deliveries.get);
app.get('/view_delivery/:delivery_id', ensureAuthenticated, view_deliveries_by_id.get);
app.get('/view_deliveries_by_status/:status', ensureAuthenticated, view_deliveries_by_status.get);
app.get('/view_deliveries_by_order_number/:order_number', ensureAuthenticated, view_deliveries_by_order_number.get);
app.get('/cancel_delivery/:delivery_id', ensureAuthenticated, cancel_delivery.get);
app.get('/complete_delivery/:delivery_id', ensureAuthenticated, complete_delivery.get);


app.get('/signout', function(req, res){
  req.logout();
  res.redirect('/');
});
app.get('/admin-add-warehouse', ensureAdmin, admin_add_warehouse.get);
// app.get('/add-inventory', WarehouseModel.add_inventory);
// app.get('/add-vehicle', add_vehicle.get);
// app.get('/signout', signout.get);
// app.get('/create-delivery-order', WarehouseModel.create_delivery_order);
// app.get('/warehouses', ensureAuthenticated, WarehouseModel.warehouses);
// app.get('/list-inventory', InventoryModel.list_inventory);
// app.get('/api-get-container-for-item', InventoryModel.api_get_container_for_item);
// app.get('/api-get-container-volume-for-item', InventoryModel.api_get_container_volume_for_item);
// app.get('/warehouse', WarehouseModel.get_warehouse);
// app.get('/mark-delivery-complete', DeliveryModel.getMarkComplete);
// app.get('/cancel-delivery', DeliveryModel.getCancelDelivery);
// app.get('/see-all-current-deliveries', DeliveryModel.seeAllCurrent);
// app.get('/add-orders-to-vehicle', add_orders_to_vehicle.get);
// app.get('/add-case', add_case.get);
// app.get('/map-cases', map_cases.get);
// app.get('/cases_index', CaseModel.index);
// 
// // app.post('/signin', UserModel.signin);
app.post('/signin',
  passport.authenticate('local', { successRedirect: '/user',
                                   failureRedirect: '/signin' })
);
app.post('/signup', signup_post.post);
app.post('/admin-add-incident', ensureAdmin, admin_add_incident_post.post);
app.post('/update-user', ensureAdmin, update_user_post.post);
app.post('/admin-edit-incident', ensureAdmin, admin_edit_incident_post.post);
app.post('/admin-add-warehouse', ensureAdmin, admin_add_warehouse_post.post);
app.post('/admin-edit-warehouse', ensureAdmin, admin_edit_warehouse_post.post);
app.post('/admin-add-vehicle', ensureAdmin, admin_add_vehicle_post.post);
app.post('/admin-edit-vehicle', ensureAdmin, admin_edit_vehicle_post.post);
app.post('/add_inventory_post', ensureAuthenticated, add_inventory_post.post);
app.post('/add_order_post', ensureAuthenticated, add_order_post.post);
app.post('/api/check_availability_json', ensureAuthenticated, check_availability_json.post);
app.post('/add_delivery_post', ensureAuthenticated, add_delivery_post.post);


// app.post('/add-warehouse', WarehouseModel.create);
// app.post('/add-inventory', InventoryModel.create);
// app.post('/add-vehicle', InventoryModel.create);
// app.post('/add-order', OrderModel.create);
// app.post('/add-orders-to-vehicle', DeliveryModel.create);
// app.post('/mark-delivery-complete', DeliveryModel.markComplete);
// app.post('/cancel-delivery', DeliveryModel.cancelDelivery);
// app.post('/add-case', CaseModel.create);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/signin')
}

function ensureAuthorized(req, res, next) {
  if (req.isAuthenticated() && req.user.authorized == "true") { return next(); }
  res.redirect('/signin')
}

function ensureAdmin(req, res, next) {
  if (typeof req.user == 'undefined') { 
    res.redirect('/signin') 
  } else {
    if (req.isAuthenticated() && req.user.role == "admin") { return next(); }
    res.redirect('/restricted')
  }
}

function ensureCreateCases(req, res, next) {
  if (typeof req.user == 'undefined') { 
    res.redirect('/signin') 
  } else {
    if (req.isAuthenticated() && req.user.create_cases == "true" || req.user.role == "admin") { return next(); }
    res.redirect('/restricted')
  }
}

// function ensureIncidentCreate(req, res, next) {
//   if (req.isAuthenticated() && req.user.create_incident == "true" || req.user.role=="admin") { return next(); }
//   // res.redirect("/restricted")
// }
// startup this server
app.listen(process.env.PORT || PORT)
console.log('Server on port %s', PORT);
