// Usaremos ES5
const mongoose = require('mongoose');
const PedidoSchema = new mongoose.Schema({
    carrito: {
        type: mongoose.Schema.ObjectId, ref: "carrito",
    },
    productos: [{
        id: {
            type: mongoose.Schema.ObjectId, ref: "productos",
        },
    }]
});
module.exports = mongoose.model('pedido', PedidoSchema);