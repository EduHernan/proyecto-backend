const options = require('../database/databaseMYSQL');
const knex = require('knex')(options);
// IMPORTANTE Habilitar este require una vez para crear la base de datos en mySQL
// require('../models/sqlProductos');

const factory = require('./factory');

let Persistencia = factory.getPersistencia();

class MySQLController extends Persistencia {

    constructor() {
        super(knex);
    }

}

module.exports = new MySQLController();