// importo express
const express = require('express');
const app = express();

// importo modulos de cookies
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoStore = require('connect-mongo')

// importo modulos de passport 
const passport = require('passport');
const bCrypt = require('bCrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

// importo socket.io y le pasamos la constante http
const http = require('http').Server(app);
const io = require('socket.io')(http);

//importo el modulo de clases
const productos = require('./api/productos');


// iniciando programa para registro y logueo de usuarios 

passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) { 
    // Intentando encontrar un usuario ya existente en la base de datos
    User.findOne({ 'username' :  username }, function(err, user) {
        // En caso de error, devolver
        if (err)
          return done(err);
        // Si el usuario no existe, muestra error
        if (!user){
          console.log('Usuario no encontrado con el nombre '+username);               
          return done(null, false)
        }
        // Si el usuario existe, pero la contraseña da error, muestra el error
        if (!isValidPassword(user, password)){
          console.log('Contraseña inválida');
          return done(null, false) 
        }
        // User and password both match, return user from 
        // done method which will be treated like success
        return done(null, user);
      }
    );
  })
);

let isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}

passport.use('register', new LocalStrategy({
    passReqToCallback: true
  },
    function (req, username, password, done) {
      findOrCreateUser = function () {
        // Intentando encontrar un usuario ya existente en la base de datos
        User.findOne({ 'username': username }, function (err, user) {
          // En caso de error, devolver
          if (err) {
            console.log('Error en registro: ' + err);
            return done(err);
          }
          // Si ya existe el usuario, devolver
          if (user) {
            console.log('mensaje', 'El usuario ya existe');
            return done(null, false);
          } else {
            // si el usuario no existe lo creamos
            let newUser = new User();
            newUser.username = username;
            newUser.password = createHash(password);
  
            // guardando el usuario
            newUser.save(function (err) {
              if (err) {
                console.log('Error guardando usuario: ' + err);
                throw err;
              }
              console.log('Usuario registrado con exito');
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

  // Configure Passport authenticated session persistence.

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

// inicio programa de login de sesión

app.use(cookieParser())
app.use(session({
    store: mongoStore.create({ 
        // Conectando la persistencia de sesion a mongo atlas
        mongoUrl: "mongodb+srv://eduardo:ccziMeh@cluster0.fk8jx.mongodb.net/sesiones?retryWrites=true&w=majority",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 600
    }),
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}))

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// importo modulo de rutas
const routesMensajes = require('./routes/mensajes.routes.js');
const routesProductos = require('./routes/productos.routes.js')


// creando la app de tipo express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Directorio estatico / publico
app.use(express.static(__dirname + '/public'));

// seteo el motor de plantilla
const handlebars = require('express-handlebars');

// configuracion de handlebars en express
app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
}));

// seteo el motor de plantilla
app.set('view engine', 'hbs');
app.set('views', './views');

// rutas para login de sesion

app.get('/login', (req,res) => {
    if(req.isAuthenticated()) {
        res.render("home", {
            nombre: req.user.username
        })
    }
    else {
        res.render("login")
    }
})

app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), (req,res) => {
    res.redirect('/')        
})

app.get('/faillogin', (req,res) => {
    res.render('login-error', {});
})

// rutas para registro de usuario

app.get('/register', (req,res) => {
    res.render('registro', {})
})

app.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), (req,res) => {
    res.redirect('/') 
})

app.get('/failregister', (req,res) => {
    res.render('register-error', {});
})


app.get('/logout', (req,res) => {
    let nombre = req.user.username
    if(nombre) {
        req.logout()
        res.render("logout", { nombre })
    }
    else {
        res.redirect('/')
    }
})



// haciendo conexion websocket
io.on('connection', socket => {
    console.log('Nuevo usuario conectado');
    
    /* Envio los mensajes al cliente que se conectó */
    socket.emit('productos', productos.listar());

    socket.emit('messages', productos.normalizar().mensajes);

    /* Escucho los mensajes enviado por el cliente y se los propago a todos */
    socket.on('update', data => {
        io.sockets.emit('productos', productos.listar());
    });

    // si el cliente envia un nuevo mensaje, lo guardo y emito
    socket.on('new-message', data => {

        // aca normalizo
        let datos = productos.normalizar()
        datos.mensajes.push(data);
        io.sockets.emit('messages', datos.mensajes);
    });
});

// importo las rutas y las uso con el prefijo /api
app.use('/api', routesMensajes);
app.use('/api', routesProductos);

// obtengo el puerto del enviroment o lo seteo por defecto
const PORT = process.env.PORT || 8080;

// llamando a la base de datos mongoDB
require('./database/database');

// pongo a escuchar el servidor en el puerto indicado
const server = http.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
    
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});
