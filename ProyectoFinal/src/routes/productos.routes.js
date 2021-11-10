// importo el modulo de express
const express = require('express');
const router = express.Router();

//importo el modulo de clases
let persistencias = require('../config/config').PERSISTENCIA;

const Persistencia = require(`../api/${persistencias}`);

// Asigno las rutas a utilizar en el proyecto

router.get('/productos/listar', async (req, res) => {
    try {
        
        let listar = await Persistencia.listar();
        res.json(listar);
        
    } catch (error) {
        res.status(500).send(error);
    }
    
});

router.get('/productos/listar/:id', async (req, res) => {
    let id = req.params.id;
    let listarID = await Persistencia.listarPorID(id)
    res.json(listarID);
});

router.post('/productos/guardar', async (req, res) => {
    try {
        let producto = req.body;
        let guardar = await Persistencia.guardar(producto)
    
        res.json(guardar);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/productos/guardarForm', async (req, res) => {
    try {
        let producto = req.body;
        Persistencia.guardar(producto)
        res.redirect('/api/productos/vista')
    } catch (error) {
        res.status(500).send(error);
    }
    
});

router.put('/productos/actualizar/:id', async (req, res) => {
    let { id } = req.params
    let datos = req.body
    let actualizando = await Persistencia.actualizar(id, datos)
    res.json(actualizando)
    
});

router.delete('/productos/borrar/:id', async (req, res) => {
    let { id } = req.params;
    let borrar = await Persistencia.borrar(id)
    res.json(borrar)
    
});

router.get('/productos/vista', async (req, res) => {
    
    let prods = await Persistencia.listar();
    
    
    res.render('main', { productos: prods, hayProductos: prods.length });
    
    
});



module.exports = router;
