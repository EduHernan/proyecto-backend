// importo el modulo de express
const express = require('express');
const router = express.Router();

//importo el modulo de clases
const productos = require('../api/productos');

// Asigno las rutas a utilizar en el proyecto
router.get('/productos/listar', (req, res) => {
    res.json(productos.listar());
});

router.get('/productos/listar/:id', (req, res) => {
    let id = req.params.id;
    res.json(productos.listarPorId(id));
});

router.post('/productos/guardar', (req, res) => {
    let producto = req.body;
    res.json(productos.guardar(producto));
    
});

router.post('/productos/guardarForm', (req, res) => {
    let producto = req.body;
    productos.guardar(producto)
    res.redirect('/api/productos/vista')
    
});

router.put('/productos/actualizar/:id', (req, res) => {
    let { id } = req.params
    let datos = req.body
    res.json({estado:'actualizado', productos:productos.actualizar(id, datos)})
    
});

router.delete('/productos/borrar/:id', (req, res) => {
    let { id } = req.params;
    res.json({estado:'borrado', productos:productos.borrar(id), id:req.params.id})
    
});

router.get('/productos/vista', (req, res) => {
    
    let prods = productos.listar();
    res.render('index.pug', { productos: prods, hayProductos: prods.length });
    
    
});



module.exports = router;
