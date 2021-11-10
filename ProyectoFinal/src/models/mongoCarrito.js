const mongoose = require('mongoose');

// esquema de base de datos mongoDB
const schema = mongoose.Schema({
    email: { type: String, required: true},
    direccion: { type: String},
    timestamp: { type: Date, default: new Date()},
    productos: { type: Array, required: true}
});

const Carrito = mongoose.model('carrito', schema);

module.exports = Carrito;