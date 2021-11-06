const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bCrypt');
var User = require('../models/user');
const logger = require('../utils/winston');


module.exports = function(passport){

    // iniciando programa para registro y logueo de usuarios 

passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) { 
    const email = req.body.email
    
    // Intentando encontrar un usuario ya existente en la base de datos
    User.findOne({ 'email': email }, function(err, user) {
        // En caso de error, devolver
        if (err)
          return done(err);
        // Si el email no existe, muestra error
        if (!user){
          logger.warn(`127.0.0.1 - email no encontrado con el nombre: ${email}`)            
          return done(null, false)
        }
        // Si el email existe, pero la contraseña da error, muestra el error
        if (!isValidPassword(user, password)){
          logger.warn(`127.0.0.1 - Contraseña inválida`)
          return done(null, false) 
        }
        // User and password both match, return user from 
        // done method which will be treated like success
        return done(null, user);
      }
    )
  })
);

let isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}
      
  }