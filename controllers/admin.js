module.exports.get = function(req, res){
  res.render('admin.ejs', {
    layout:false,
    signed_in: req.isAuthenticated()
  });
}