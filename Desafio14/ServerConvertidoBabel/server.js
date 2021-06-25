'use strict';

// importo express
var express = require('express');
var app = express();

// importo socket.io y le pasamos la constante http
var http = require('http').Server(app);
var io = require('socket.io')(http);

//importo el modulo de clases
var productos = require('./api/productos');

// importo modulo de rutas
var routesProductos = require('./routes/productos.routes.js');

// creando la app de tipo express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Directorio estatico / publico
app.use(express.static(__dirname + '/public'));

// seteo el motor de plantilla
var handlebars = require('express-handlebars');

// configuracion de handlebars en express
app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts'
}));

// seteo el motor de plantilla
app.set('view engine', 'hbs');
app.set('views', './views');

var messages = [];

// haciendo conexion websocket
io.on('connection', function (socket) {
    console.log('Nuevo usuario conectado');
    /* Envio los mensajes al cliente que se conectó */
    socket.emit('productos', productos.listar());

    socket.emit('messages', messages);

    /* Escucho los mensajes enviado por el cliente y se los propago a todos */
    socket.on('update', function (data) {
        io.sockets.emit('productos', productos.listar());
    });

    // si el cliente envia un nuevo mensaje, lo guardo y emito
    socket.on('new-message', function (data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

// importo las rutas y las uso con el prefijo /api

app.use('/api', routesProductos);

// obtengo el puerto del enviroment o lo seteo por defecto
var PORT = process.env.PORT || 8080;

// pongo a escuchar el servidor en el puerto indicado
var server = http.listen(PORT, function () {
    console.log('servidor escuchando en http://localhost:' + PORT);
});

// en caso de error, avisar
server.on('error', function (error) {
    console.log('error en el servidor:', error);
});
