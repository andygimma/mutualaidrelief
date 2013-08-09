module.exports.get = function(req, res){
  res.render('admin-add-incident.ejs', {
    layout:false,
    signed_in: req.isAuthenticated()
  });
};