/*
 * Developer : Andy Gimma (andy.n.gimma@gmail.com)
 * Date : 08/14/13
 * All code (c)2013 Andy Gimma all rights reserved
 */

var mongoose = require("mongoose");
var crypto = require('crypto');
var Schema = mongoose.Schema;
var dstk = require('dstk');
var paginate = require('mongoose-paginate');


var CaseEntity = new Schema({
  name : {type: String, required: true, trim: true}
  address : {type: String, required: true, trim: true},
  city: {type: String, required: true, trim: true},
  state: {type: String, required: true, trim: true},
  notes: {type: String, required: true, trim: true},
  lat: {type: String, required: true, trim: true},
  lng: {type: String, required: true, trim: true},
  phase: {type: String, required: false, trim: true},
  incident_id: {type: String, required: true, trim: true}
});

var Case= mongoose.model('X_CaseCollection', CaseEntity);

module.exports.CaseEntity = Case;


