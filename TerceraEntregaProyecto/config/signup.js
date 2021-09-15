const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bCrypt');
var User = require('../models/user');
const logger = require('../utils/winston');

module.exports = function(passport){

  passport.use('register', new LocalStrategy({
    passReqToCallback: true
  },
    function (req, username, password, done) {
      findOrCreateUser = function () {
        const email = req.body.email
        // Intentando encontrar un usuario ya existente en la base de datos
        User.findOne({ 'email': email }, function (err, user) {
          // En caso de error, devolver
          if (err) {
            logger.error(`127.0.0.1 - Error en registro: ${err}`)  
            return done(err);
          }
          // Si ya existe el email, devolver
          if (user) {
            logger.warn(`127.0.0.1 - El email ya existe`)
            return done(null, false);
          } else {
            // si el usuario no existe lo creamos
            let newUser = new User();
                newUser.email = req.body.email
                newUser.password = createHash(password);
                newUser.imagen = 'https://ath2.unileverservices.com/wp-content/uploads/sites/5/2018/02/acondicionador-de-cabello-para-hombre-e1517521713969.jpg';
                newUser.direccion = req.body.direccion;
                newUser.edad = req.body.edad;
                newUser.username = username;
                newUser.telefono = req.body.telefono;
  
            // guardando el usuario
            newUser.save(function (err) {
              if (err) {
                console.log('Error guardando usuario: ' + err);
                throw err;
              }
              logger.info(`127.0.0.1 - Usuario registrado con exito`)
              return done(null, newUser);
            });
          }
        });
      }
      process.nextTick(findOrCreateUser);
    }))

    // Generates hash using bCrypt
let createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }
    
   
   }