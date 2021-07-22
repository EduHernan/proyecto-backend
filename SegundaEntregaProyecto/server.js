// importo express
const express = require('express');
const app = express();

// importo socket.io y le pasamos la constante http
const http = require('http').Server(app);

//importo el modulo de clases
//  const productos = require('./api/mongoDB');


// importo modulo de rutas
const routesProductos = require('./routes/productos.routes.js');
const routesCarrito = require('./routes/carrito.routes.js')


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
