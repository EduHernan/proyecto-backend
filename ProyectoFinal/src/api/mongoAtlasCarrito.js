const Productos = require('../models/mongoCarrito');

const Carrito = require('../persistencia/mongoCarrito');


class MongoCarritos extends Carrito {

    constructor() {
        super(Productos);
    }

}

module.exports = new MongoCarritos();