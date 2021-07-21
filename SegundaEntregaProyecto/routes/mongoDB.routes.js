// importo el modulo de express
const express = require('express');
const router = express.Router();

//importo el modulo de clases
const Productos = require('../api/productos');

// Asigno las rutas a utilizar en el proyecto

router.get('/productos/listar', async (req, res) => {
    try {
        let listar = await Productos.listar();
        res.send(listar);
        
    } catch (error) {
        res.status(500).send(error);
    }
    
});

router.get('/productos/listar/:id', async (req, res) => {
    let id = req.params.id;
    let listarID = await Productos.listarPorID(id)
    res.json(listarID);
});

router.post('/productos/guardar', async (req, res) => {
    try {
        let producto = req.body;
        let guardar = await Productos.guardar(producto)
    
        res.send(guardar);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/productos/guardarForm', async (req, res) => {
    try {
        let producto = req.body;
        Productos.guardar(producto)
        res.redirect('/api/productos/vista')
    } catch (error) {
        res.status(500).send(error);
    }
    
});

router.put('/productos/actualizar/:id', async (req, res) => {
    let { id } = req.params
    let datos = req.body
    let actualizando = await Productos.actualizar(id, datos)
    res.send(actualizando)
    
});

router.delete('/productos/borrar/:id', async (req, res) => {
    let { id } = req.params;
    let borrar = await Productos.borrar(id)
    res.json(borrar)
    
});

router.get('/productos/vista', async (req, res) => {
    
    let prods = await Productos.listar();
    
    
    res.render('main', { productos: prods, hayProductos: prods.length });
    
    
});



module.exports = router;
