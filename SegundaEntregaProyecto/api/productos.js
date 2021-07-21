const Productos = require('../models/productos');

const factory = require('./factory');

let Persistencia = factory.getPersistencia();


class ProductosController extends Persistencia {

    constructor() {
        super(Productos);
    }

}

module.exports = new ProductosController();