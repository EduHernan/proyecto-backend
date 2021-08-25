// importo express
const express = require('express');

//importo el modulo de clases
const productos = require('./api/productos');

// importo modulo de rutas
const routesProductos = require('./routes/productos.routes.js')


// creo una app de tipo express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Directorio estatico / publico
app.use(express.static(__dirname + '/public'));

// seteo el motor de plantilla
app.set('views', './views');
app.set('view engine', 'ejs');


// importo las rutas y las uso con el prefijo /api

app.use('/api', routesProductos);

// pongo a escuchar el servidor en el puerto indicado
const puerto = 8080;

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});


// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});
