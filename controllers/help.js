module.exports.get = function(req, res){
  res.render('help.ejs', {
    layout:false,
    signed_in: req.isAuthenticated()
  });
};