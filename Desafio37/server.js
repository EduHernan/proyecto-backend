// importo express
const express = require('express');
const app = express();

// importo modulos de cookies
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoStore = require('connect-mongo')
 
// importo modulos de passport 
const passport = require('passport');
 
// importo socket.io y le pasamos la constante http
const http = require('http').Server(app);
const io = require('socket.io')(http);

// importo modulo de loggers
const logger = require('./utils/winston');

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

// Inicializando passport y restaurando la autenticacion si existe 
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
const initPassport = require('./config/initPassport');
initPassport(passport);

//importo el modulo de clases
// const productos = require('./api/mongoDB');


// importo modulo de rutas
const routesProductos = require('./routes/productos.routes.js');
const routesCarrito = require('./routes/carrito.routes.js')
const routesLogin = require('./routes/login.routes.js')


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


// importo las rutas y las uso con el prefijo /api
app.use('/api', routesProductos);
app.use('/api', routesCarrito);
app.use('/api', routesLogin(passport));

// obtengo el puerto del enviroment o lo seteo por defecto
const PORT = process.env.PORT || 8080;

// pongo a escuchar el servidor en el puerto indicado
const server = http.listen(PORT, () => {
    logger.info(`127.0.0.1 - servidor escuchando en http://localhost:${PORT}`)
    logger.info(`127.0.0.1 - id de salida: ${process.pid}`)
});


// en caso de error, avisar
server.on('error', error => {
    logger.error("127.0.0.1 - error en el servidor:", error)
});
