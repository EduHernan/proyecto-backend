const ProductoDTO = require('../persistencia/dto/productosDto');


class MongoCRUD {
    constructor(prod) {
        this.productos = prod;
    }

    getProductos() {
        return this.productos;
    }

    async guardar(producto) {
        try {
            let resultado = await this.productos.create(producto)
            return resultado
        } catch (error) {
            throw error;
        }
    }

    async listar() {
        try {
            let mensajes = await this.productos.find()
            return mensajes.map(m => new ProductoDTO(m));
        } catch (error) {
            throw error;
        }
    }

    async listarPorID (condicion) {
        try {
            let mensaje = await this.productos.find({_id:condicion})
            return new ProductoDTO(mensaje);
        } catch (error) {
            throw error;
        }
    }
    

    async actualizar(id, datos) {
        try {
            let actualizado = await this.productos.update({_id:id}, {$set: {...datos}}, {multi:true})
            return actualizado;
        } catch (error) {
            throw error;
        }
    }

    async borrar(id) {
        try {
            let borrado = await this.productos.findByIdAndDelete(id)
            return borrado;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MongoCRUD;