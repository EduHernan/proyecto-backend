const mongoose = require('mongoose');

// esquema de base de datos mongoDB
const schema = mongoose.Schema({
    productos: { type: String, require: true},
    email: { type: String, required: true},
    direccion: { type: String},
    timestamp: { type: Date, default: new Date()}
});

const Carrito = mongoose.model('carrito', schema);

module.exports = Carrito;