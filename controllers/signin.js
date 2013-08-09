module.exports.get = function(req, res) {
   if (req.isAuthenticated() == true) {
    res.redirect('/');
  } else {
    res.render('signin.ejs', {
      layout:false,
      signed_in: req.isAuthenticated()
    });
  } 
  
}