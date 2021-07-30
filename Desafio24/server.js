// importo express
const express = require('express');
const app = express();

// importo modulos de cookies
const cookieParser = require('cookie-parser')
const session = require('express-session')

// importo socket.io y le pasamos la constante http
const http = require('http').Server(app);
const io = require('socket.io')(http);

//importo el modulo de clases
const productos = require('./api/productos');

// inicio programa de login de sesión

app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}))

const getNombreSession = req => req.session.nombre? req.session.nombre: ''

app.get('/login', (req,res) => {
    if(req.session.contador) {
        req.session.contador++
        res.send(`${getNombreSession(req)} visitaste la página ${req.session.contador} veces.`)
    }
    else {
        let { nombre } = req.query
        req.session.nombre = nombre
        req.session.contador = 1
        res.send(`Te damos la bienvenida ${getNombreSession(req)}`)
    }
})

app.get('/olvidar', (req,res) => {
    let nombre = getNombreSession(req)
    req.session.destroy( err => {
        if(!err) res.send(`Hasta luego ${nombre}`)
        else res.send({error: 'olvidar', body: err})
    })
})

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

const messages = {
    id:1000,
    mensajes: []
};


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

// pongo a escuchar el servidor en el puerto indicado
const server = http.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});


// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});
