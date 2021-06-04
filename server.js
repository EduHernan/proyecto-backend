const express = require('express');
const productos = require('./api/productos');

// creo una app de tipo express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// completar el codigo...


// pongo a escuchar el servidor en el puerto indicado
const puerto = 8080;

app.get('/api/productos/listar', (req, res) => {
    productos.guardar('perro', 211, 'perro.jpg');
    productos.guardar('gato', 911, 'agato.jpg');
    productos.guardar('globo', 850, 'globos.jpg');
    productos.listar();
    console.log(productos.array)
    
    
    res.send({productos:productos.array});

})

app.get('/api/productos/listar/:id', (req, res) => {
    productos.guardar('perro', 211, 'perro.jpg');
    productos.guardar('gato', 911, 'agato.jpg');
    productos.guardar('globo', 850, 'globos.jpg');
    
    productos.listar();
    const info = productos.array
    const infoID = info[req.params.id]
    console.log(info)
    
    
    res.send({producto:infoID});

})

app.post('/api/productos/guardar', (req, res) => {
    productos.guardar('pez', 311, 'pez.jpg');
    const info = productos.array
    let objeto = req.body;
    res.send({productos:info, nuevo:objeto})
})

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});


// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});
