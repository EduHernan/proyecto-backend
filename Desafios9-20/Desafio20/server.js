// importo express
const express = require('express');
const app = express();

// importo socket.io y le pasamos la constante http
const http = require('http').Server(app);
const io = require('socket.io')(http);

//importo el modulo de clases
const productos = require('./api/productos');
require('./database/database');

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

const messages = [];

// haciendo conexion websocket
io.on('connection', socket => {
    console.log('Nuevo usuario conectado');
    /* Envio los mensajes al cliente que se conectó */
    socket.emit('productos', productos.listar());

    socket.emit('messages', messages);

    /* Escucho los mensajes enviado por el cliente y se los propago a todos */
    socket.on('update', data => {
        io.sockets.emit('productos', productos.listar());
    });

    // si el cliente envia un nuevo mensaje, lo guardo y emito
    socket.on('new-message', data => {
        messages.push(data);
        io.sockets.emit('messages', messages);
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
