module.exports.get = function(req, res){
  // if user, redirect to /:email
  res.render('index.ejs', {
    layout:false,
    signed_in: req.isAuthenticated()
  });
};