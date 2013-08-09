module.exports.get = function(req, res){
  res.render('admin_cases.ejs', {
    layout:false,
    signed_in: req.isAuthenticated()
  });
};