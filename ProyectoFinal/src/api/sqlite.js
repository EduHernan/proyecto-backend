// importando modulos para la base de datos
const options = require('../database/databaseSqlite');
const knex = require('knex')(options);
// IMPORTANTE Habilitar este require una vez para crear la base de datos en sqlite
// require('../models/sqliteProductos');

const factory = require('./factory');

let Persistencia = factory.getPersistencia();

class SqliteController extends Persistencia {

    constructor() {
        super(knex);
    }

}

module.exports = new SqliteController();