const options = require('../database/databaseSqlite');
const knex = require('knex')(options);


class sqliteCRUD {
    constructor(prod) {
        this.productos = prod;
    }

    getProductos() {
        return this.productos;
    }

    async guardar(producto) {
        try {
            let resultado = await knex('productos').insert(producto);
            return resultado
        } catch (error) {
            throw error;
        }
    }

    async listar() {
        try {
            let mensajes = await knex.from('productos').select('*')
            return mensajes;
        } catch (error) {
            throw error;
        }
    }

    async listarPorID (condicion) {
        try {
            let mensaje = await knex.from('productos').select('*').where('id', '=', condicion)
            return mensaje;
        } catch (error) {
            throw error;
        }
    }
    

    async actualizar(id, datos) {
        try {
            let actualizado = await knex.from('productos').where('id', '=', id).update(datos)
            return actualizado;
        } catch (error) {
            throw error;
        }
    }

    async borrar(id) {
        try {
            let borrado = await knex.from('productos').where('id', '=', id).del()
            return borrado;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = sqliteCRUD;