// importo el modulo de express
const express = require('express');
const router = express.Router();

//importo el modulo de clases
const carrito = require('../api/carrito');
const archivo = require('../persistencia/persistenciaCarrito');

// Asigno las rutas a utilizar en el proyecto

router.get('/carrito/listar', (req, res) => {
    res.json(carrito.listar());
});

router.get('/carrito/listar/:id', (req, res) => {
    let id = req.params.id;
    res.json(carrito.listarPorId(id));
});

router.post('/carrito/guardar/:id', (req, res) => {
    let { id } = req.params
    res.json(carrito.guardar(id));
    archivo.guardar()
    
    
});

router.delete('/carrito/borrar/:id', (req, res) => {
    let { id } = req.params;
    res.json({estado:'borrado', carrito:carrito.borrar(id), id:req.params.id})
    
});


module.exports = router;
