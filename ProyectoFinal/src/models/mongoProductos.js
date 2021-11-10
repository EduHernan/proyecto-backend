const mongoose = require('mongoose');

// esquema de base de datos mongoDB
const schema = mongoose.Schema({
    title: { type: String, required: true, max: 400 },
    price: { type: Number, required: true},
    stock: { type: Number, required: true, max: 400 },
    thumbnail: { type: String, max: 400 },
    descripcion: { type: String, required: true },
    timestamp: { type: Date, default: new Date() }
});

const Productos = mongoose.model('productos', schema);

module.exports = Productos;