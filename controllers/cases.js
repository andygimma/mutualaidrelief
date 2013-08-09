module.exports.get = function(req, res){
  res.render('cases.ejs', {
    layout:false,
    signed_in: req.isAuthenticated()
  });
};