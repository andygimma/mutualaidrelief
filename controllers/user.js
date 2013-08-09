module.exports.get = function(req, res) {
    res.render('user.ejs', {
      layout:false,
      user: req.user,
      signed_in: req.isAuthenticated()
    });
}