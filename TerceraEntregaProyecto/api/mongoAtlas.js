
const Productos = require('../models/mongoProductos');

const factory = require('./factory');

let Persistencia = factory.getPersistencia();

require('../database/databaseMongoAtlas');

class MongoController extends Persistencia {

    constructor() {
        super(Productos);
    }

}

module.exports = new MongoController();