module.exports.get = function(req, res){
    res.render('inventory.ejs', {
//       warehouses: warehouses,
      layout:false,
      signed_in: req.isAuthenticated()
    });
};
