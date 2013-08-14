/*
 * Developer : Andy Gimma (andy.n.gimma@gmail.com)
 * Date : 08/14/13
 * All code (c)2013 Andy Gimma all rights reserved
 */

module.exports.get = function(req, res){
  // if user, redirect to /:email
  res.render('index.ejs', {
    layout:false,
    signed_in: req.isAuthenticated()
  });
};