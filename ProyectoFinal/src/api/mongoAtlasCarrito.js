const Productos = require('../models/mongoOrden');

const Carrito = require('../persistencia/mongoCarrito');


class MongoCarritos extends Carrito {

    constructor() {
        super(Productos);
    }

}

module.exports = new MongoCarritos();