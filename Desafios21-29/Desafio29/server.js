// importo express
const express = require('express');
const app = express();

// importo modulos de cookies
const cookieParser = require('cookie-parser')
const session = require('express-session')

// importo modulos de passport 
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const dotenv = require('dotenv');

// importo socket.io y le pasamos la constante http
const http = require('http').Server(app);
const io = require('socket.io')(http);

//importo el modulo de clases
const productos = require('./api/productos');

// iniciando programa para registro y logueo de usuarios 

// asignando credenciales de facebook
dotenv.config();
const FACEBOOK_CLIENT_ID = process.argv[3] || process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET = process.argv[4] || process.env.FACEBOOK_CLIENT_SECRET;


// configuramos passport para usar facebook
passport.use(new FacebookStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails'],
  scope: ['email']
}, function (accessToken, refreshToken, profile, done) {
  console.log(profile);
  let userProfile = profile;
  return done(null, userProfile);
}));

  // Configure Passport authenticated session persistence.

  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (obj, done) {
      done(null, obj);
  });

// inicio programa de login de sesión

app.use(cookieParser())
app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}))

// Initialize Passport and restore authentication state, if any, from the session.
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

// ruta para info de sistema 

const numCPUs = require('os').cpus().length;

app.get('/info', (req,res) => {
    res.render('info', {
        args:  JSON.stringify(process.argv,null,'\t'),
        path: process.execPath,
        plataforma: process.platform,
        pid: process.pid,
        version: process.version,        
        dir: process.cwd(),        
        memoria: JSON.stringify(process.memoryUsage(),null,'\t'),
        numCPUs: numCPUs

    })
})

// rutas para login de sesion

app.get('/login', (req,res) => {
    if(req.isAuthenticated()) {
        res.render("home", {
          nombre: req.user.displayName,
          foto: req.user.photos[0].value,
          email: req.user.emails[0].value
        })
    }
    else {
        res.render("login")
    }
})


app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/login', 
    failureRedirect: '/faillogin' }
));


app.get('/faillogin', (req,res) => {
    res.render('login-error', {});
})


app.get('/logout', (req,res) => {
    let nombre = req.user.displayName
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
const PORT = Number(process.argv[2]) || process.env.PORT;

// pongo a escuchar el servidor en el puerto indicado
const server = http.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
    console.log(`id de salida: ${process.pid}`)
    
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});
