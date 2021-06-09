const express = require('express');
const productos = require('./api/productos');


productos.guardar('perro', 211, 'perro.jpg');
productos.guardar('gato', 311, 'gato.jpg');
productos.guardar('tortuga', 450, 'tortuga.jpg');
    
productos.listar();

// creo una app de tipo express
const app = express();
const router = express.Router();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// pongo a escuchar el servidor en el puerto indicado
const puerto = 8080;

router.get('/productos/listar', (req, res) => {
    
    
    console.log(productos)
    
    
    res.json({productos:productos.array});

})

router.get('/productos/listar/:id', (req, res) => {
    const info = productos.array
    const infoID = info[req.params.id-1]
    console.log(infoID)
    
    
    res.json({producto:infoID});

})

router.post('/productos/guardar', (req, res) => {
    productos.guardar('conejo', 111, 'conejo.jpg');
    const info = productos.array
    // let objeto = req.body;  
    //  info.push(objeto)
    
    res.json(info)
})

router.put('/productos/guardar', (req, res) => {
    productos.guardar('conejo', 111, 'conejo.jpg');
    const info = productos.array
    // let objeto = req.body;  
    //  info.push(objeto)
    
    res.json(info)
})

router.delete('/productos/borrar/:id', (req, res) => {
    console.log('exito')

    res.json({estado:'borrado', id:req.params.id})
})

app.use('/api', router);

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});


// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});
