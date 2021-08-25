// importo el modulo de express
const express = require('express');
const router = express.Router();

//importo el modulo de clases
const Mensajes = require('../api/mensajes');

// Asigno las rutas a utilizar en el proyecto

router.post('/mensajes/guardar', async (req, res) => {
    try {
        let mensaje = await Mensajes.guardar(req.body);
        res.send(mensaje);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/mensajes', async (req, res) => {
    try {
        let mensajes = await Mensajes.buscar(req.query);
        res.send(mensajes);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;