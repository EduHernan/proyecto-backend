const Productos = require('../models/mongoProductos');

const factory = require('./factory');

let Persistencia = factory.getPersistencia();


class MemoriaController extends Persistencia {

    constructor() {
        super(Productos);
    }

}

module.exports = new MemoriaController();