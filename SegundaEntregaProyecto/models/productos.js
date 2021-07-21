const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: { type: String, require: true, max: 400 },
    price: { type: Number, require: true},
    stock: { type: Number, require: true, max: 400 },
    thumbnail: { type: String, require: true, max: 400 },
    descripcion: { type: String, require: true },
    timestamp: { type: Date, default: new Date() }
});

const Productos = mongoose.model('productos', schema);

module.exports = Productos;