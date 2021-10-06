const options = require('../database/databaseMYSQL');
const knex = require('knex')(options);

// esquema de base de datos MySQL
const schema = knex.schema.createTable('productos', table => {
    table.increments('id');
    table.string('title');
    table.integer('price');
    table.integer('stock');
    table.string('thumbnail');
    table.string('descripcion');
    table.timestamp('fecha', { useTz: true }).notNullable().defaultTo(knex.fn.now());
}).then(() => {
    console.log('tabla productos creada!');
}).catch(error => {
    console.log('error:', error);
    throw error;
}).finally(() => {
    console.log('cerrando conexion...');
    knex.destroy()});
module.exports = schema