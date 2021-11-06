var login = require('./login');
var signup = require('./signup');
var User = require('../models/user');

module.exports = function(passport) {

     // Configure Passport authenticated session persistence.

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);

}