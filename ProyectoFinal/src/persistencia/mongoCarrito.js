const Productos = require('../models/mongoProductos');
// const Orden = require('../models/mongoOrdenCompra');

class CarritoCrud {
    constructor(carr) {
        this.carrito = carr;
        this.productos = []
    }

    getProductos() {
        return this.carrito;
    }

    async guardar(id) {
        try {
            let producto = await Productos.find({_id:id})
            const infoCarrito = this.productos
            infoCarrito.push(producto)

            return infoCarrito
        } catch (error) {
            throw error;
        }
    }

    async listar() {
        try {
            return this.productos;
        } catch (error) {
            throw error;
        }
    }

    async listarPorID (id) {
        try {
        const infoCarrito = this.productos
        let productoID = infoCarrito.find (p => p._id == id)
        return productoID
        } catch (error) {
            throw error;
        }
    }

    async enviarPedido(id) {
        try {
            let producto = this.productos
            const email = 'ejemplo@hotmail.com'
            const direccion = 'bernardo de irigoyen'
            const carro = {
                email: email,
                direccion: direccion,
                productos: producto
            }
            console.log(carro)
            const ejemplo = this.carrito.create(carro)
            return ejemplo
        } catch (error) {
            throw error;
        }
    }
    
    async actualizar(id, datos) {
        try {
            let actualizado = await this.carrito.update({_id:id}, {$set: {...datos}}, {multi:true})
            return actualizado;
        } catch (error) {
            throw error;
        }
    }

    async borrar(id) {
        try {
            let borrado = await this.carrito.findByIdAndDelete(id)
            return borrado;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CarritoCrud;