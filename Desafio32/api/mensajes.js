const mongoose = require('mongoose');
const Message = require('../models/message');

class Mensajes {

    constructor() { }

    async guardar(mensaje) {
        try {
            let resultado = await Message.create(mensaje)
            return resultado
        } catch (error) {
            throw error;
        }
    }

    async buscar(condicion) {
        try {
            let mensajes = await Message.find()
            return mensajes;
        } catch (error) {
            throw error;
        }
    }
}

let mensaje = new Mensajes();

module.exports = new Mensajes();