// importo el modulo de express
const express = require('express');
const router = express.Router();

//importo el modulo de clases
const carrito = require('../api/mongoAtlasCarrito');

// Asigno las rutas a utilizar en el proyecto

router.get('/carrito/listar', async (req, res) => {
    try {
        
        let listar = await carrito.listar();
        res.json(listar);
        
    } catch (error) {
        res.status(500).send(error);
    }
    
});

router.get('/carrito/listar/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let listar = await carrito.listarPorID(id);
        res.json(listar);
        
    } catch (error) {
        res.status(500).send(error);
    }
    
});

router.post('/carrito/guardar/:id', async (req, res) => {
    try {
        let { id } = req.params
        let guardar = await carrito.guardar(id);
        res.json(guardar);
        
    } catch (error) {
        res.status(500).send(error);
    }
    
});

router.delete('/carrito/borrar/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let borrar = await carrito.borrar(id)
        res.json(borrar)
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/carrito/enviar', async (req, res) => {
    try {
        let pedido = await carrito.enviarPedido();
        console.log(pedido)
        res.json(pedido);
        
    } catch (error) {
        res.status(500).send(error);
    }
    
    
});


module.exports = router;

