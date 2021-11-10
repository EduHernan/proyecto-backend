const Productos = require('../models/mongoProductos');
// modulos para envio de email
const EnviarGmail = require('../utils/nodemailer-gmail.js');
const config = require('../config/config');

class CarritoCrud {
    constructor(carr) {
        this.carrito = carr;
        this.productos = []
    }

    // funciones a utilizar
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
    // funcion para enviar carrito a la base de datos
    async enviarPedido() {
        try {
            let producto = JSON.stringify(this.productos)
            const email = config.EMAIL
            const direccion = 'Adrogue, Buenos Aires'
            const carro = {
                email: email,
                direccion: direccion,
                productos: producto
            }
            const envio = await this.carrito.create(carro)
            
            // variables para envio de email
            let asunto = 'Su orden de compras'
            let mensaje = 'Felicidades, su compra efectuada en ' 
            + new Date().toLocaleString() + ' es la siguiente ' + envio

            //Envio de carrito por Gmail
            
            EnviarGmail(asunto, mensaje, (err, info) => {
            if(err) console.log(err)
            else console.log(info)       
            })
            return envio
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