/*
 * Developer : Andy Gimma (andy.n.gimma@gmail.com)
 * Date : 08/14/13
 * All code (c)2013 Andy Gimma all rights reserved
 */

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