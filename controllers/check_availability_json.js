// use async and dstk to get lat,lng
// then add to database
var async = require('async');


var InventoryModel = require('../models/Inventory.js');



module.exports.post = function(req, res){
  console.log("check_availability");
  var this_user;
  var send_object = req.body;
  var unavailable_object = new Object();
  var all_go = true;
  console.log(send_object);
  console.log(req.body.warehouse);
  // in parallel, not series, test all 12. If any come back false, add them to an array.
  
  async.parallel([
    function(callback) {
      // test for existence of name1, number1
      console.log(req.body.name1);
      if (req.body.name1 == '' || req.body.number1 == '') {
	console.log("no name or number");
	callback()

      } else {
	InventoryModel.check_availability(req.body.warehouse, req.body.name1, req.body.number1, function (error, available) {
	  console.log("answer");
	  console.log(available);
	  if (!available) {
	    unavailable_object.name1 == true
	    all_go = false;
	  } else {
	    unavailable_object.name1 == false

	  }
	  callback()
	});
      }

    },
    function(callback) {
      // test for existence of name2, number2
      if (req.body.name2 == '' || req.body.number2 == '') {
	console.log("no name or number");
	callback()
      } else {
	InventoryModel.check_availability(req.body.warehouse, req.body.name2, req.body.number2, function (error, available) {
	  console.log("answer");
	  console.log(available);
	  if (!available) {
	    unavailable_object.name2 == true
	    all_go = false;
	  } else {
	    unavailable_object.name2 == false
	  }
	  callback()
	});
      }

    },
      function(callback) {
      // test for existence of name2, number2
      if (req.body.name3 == '' || req.body.number3 == '') {
	console.log("no name or number");
	callback()
      } else {
	InventoryModel.check_availability(req.body.warehouse, req.body.name3, req.body.number3, function (error, available) {
	  console.log("answer");
	  console.log(available);
	  if (!available) {
	    all_go = false;
	  } else {
	  }
	  callback()
	});
      }

    },
        function(callback) {
      // test for existence of name2, number2
      if (req.body.name4 == '' || req.body.number4 == '') {
	console.log("no name or number");
	callback()
      } else {
	InventoryModel.check_availability(req.body.warehouse, req.body.name4, req.body.number4, function (error, available) {
	  console.log("answer");
	  console.log(available);
	  if (!available) {
	    unavailable_object.name2 == true
	    all_go = false;
	  } else {
	    unavailable_object.name2 == false
	  }
	  callback()
	});
      }

    },
        function(callback) {
      // test for existence of name2, number2
      if (req.body.name5 == '' || req.body.number5 == '') {
	console.log("no name or number");
	callback()
      } else {
	InventoryModel.check_availability(req.body.warehouse, req.body.name5, req.body.number5, function (error, available) {
	  console.log("answer");
	  console.log(available);
	  if (!available) {
	    unavailable_object.name2 == true
	    all_go = false;
	  } else {
	    unavailable_object.name2 == false
	  }
	  callback()
	});
      }

    },
        function(callback) {
      // test for existence of name2, number2
      if (req.body.name6 == '' || req.body.number6 == '') {
	console.log("no name or number");
	callback()
      } else {
	InventoryModel.check_availability(req.body.warehouse, req.body.name6, req.body.number6, function (error, available) {
	  console.log("answer");
	  console.log(available);
	  if (!available) {
	    unavailable_object.name2 == true
	    all_go = false;
	  } else {
	    unavailable_object.name2 == false
	  }
	  callback()
	});
      }

    },
        function(callback) {
      // test for existence of name2, number2
      if (req.body.name7 == '' || req.body.number7 == '') {
	console.log("no name or number");
	callback()
      } else {
	InventoryModel.check_availability(req.body.warehouse, req.body.name7, req.body.number7, function (error, available) {
	  console.log("answer");
	  console.log(available);
	  if (!available) {
	    unavailable_object.name2 == true
	    all_go = false;
	  } else {
	    unavailable_object.name2 == false
	  }
	  callback()
	});
      }

    },
      function(callback) {
      // test for existence of name2, number2
      if (req.body.name8 == '' || req.body.number8 == '') {
	console.log("no name or number");
	callback()
      } else {
	InventoryModel.check_availability(req.body.warehouse, req.body.name8, req.body.number8, function (error, available) {
	  console.log("answer");
	  console.log(available);
	  
	  if (!available) {
	    unavailable_object.name2 == true
	    all_go = false;
	  } else {
	    unavailable_object.name2 == false
	  }
	  callback()
	});
      }

    },
    
          function(callback) {
      // test for existence of name2, number2
      if (req.body.name9 == '' || req.body.number9 == '') {
	console.log("no name or number");
	callback()
      } else {
	InventoryModel.check_availability(req.body.warehouse, req.body.name9, req.body.number9, function (error, available) {
	  console.log("answer");
	  console.log(available);
	  if (!available) {
	    unavailable_object.name2 == true
	    all_go = false;
	  } else {
	    unavailable_object.name2 == false
	  }
	  callback()
	});
      }

    },
          function(callback) {
      // test for existence of name2, number2
      if (req.body.name10 == '' || req.body.number10 == '') {
	console.log("no name or number");
	callback()
      } else {
	InventoryModel.check_availability(req.body.warehouse, req.body.name10, req.body.number10, function (error, available) {
	  console.log("answer");
	  console.log(available);
	  if (!available) {
	    unavailable_object.name2 == true
	    all_go = false;
	  } else {
	    unavailable_object.name2 == false
	  }
	  callback()
	});
      }

    },
          function(callback) {
      // test for existence of name2, number2
      if (req.body.name11 == '' || req.body.number11 == '') {
	console.log("no name or number");
	callback()
      } else {
	InventoryModel.check_availability(req.body.warehouse, req.body.name11, req.body.number11, function (error, available) {
	  console.log("answer");
	  console.log(available);
	  if (!available) {
	    unavailable_object.name2 == true
	    all_go = false;
	  } else {
	    unavailable_object.name2 == false
	  }
	  callback()
	});
      }

    },
              function(callback) {
      // test for existence of name2, number2
      if (req.body.name12 == '' || req.body.number12 == '') {
	console.log("no name or number");
	callback()
      } else {
	InventoryModel.check_availability(req.body.warehouse, req.body.name12, req.body.number12, function (error, available) {
	  console.log("answer");
	  console.log(available);
	  if (!available) {
	    unavailable_object.name2 == true
	    all_go = false;
	  } else {
	    unavailable_object.name2 == false
	  }
	  callback()
	});
      }

    },
 		], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err){
	  console.log(err.message);
	  res.redirect("/error");
	  return next(err);
	}
        //Here locals will be populated with 'user' and 'posts'
        console.log(all_go);
	console.log(unavailable_object.name2);
	var send = "";
	if (all_go) {
	  send = {go: true}
	} else {
	  send = {go: false}
	}
	  console.log("send object");
	  console.log(send);
          res.send(send);

    
    });
}