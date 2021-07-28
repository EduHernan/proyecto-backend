// importo express
const express = require('express');
const app = express();

const { normalize, schema } = require('normalizr');

const fs = require('fs')

class Normalize {
    constructor () {}

    getMensajes() {

        const messages = {
            id:1000,
            mensajes: []
        };
        console.log(messages)
        
        // haciendo conexion websocket
        io.on('connection', socket => {
            console.log('Nuevo usuario conectado');
            console.log(messages)
            /* Envio los mensajes al cliente que se conectó */
        
            socket.emit('messages', messages.mensajes);
        
            // si el cliente envia un nuevo mensaje, lo guardo y emito
            socket.on('new-message', data => {
        
                // aca normalizo
                messages.mensajes.push(data);
                console.log(messages)
                io.sockets.emit('messages', messages.mensajes);
            });
        });
        
    }
}

module.exports = new Normalize();