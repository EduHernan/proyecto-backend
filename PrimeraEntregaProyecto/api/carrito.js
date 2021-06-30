const productos = require('../api/productos');

class Carrito {
    constructor() {
        // inicializando variables
        this.carrito = {
            timestamp: new Date().toLocaleString(),
            id:1,
            productos:[]
        }
    }

    // funciones a utilizar
    listar () {
        
        if (this.carrito.productos.length < 1 ) {
        
            return {error: 'no hay carrito cargados'};
        } else {
            return this.carrito;
        }
        
    }

    listarPorId(id) {
        const infoCarrito = this.carrito.productos
        let productoID = infoCarrito.find (p => p.id === parseInt(id))
        console.log(productoID)
        return productoID
        
    }
    
    guardar(id) {
        let prods = productos.listar()
        let productoPorID = prods[id-1]

        const infoCarrito = this.carrito
        infoCarrito.productos.push(productoPorID)
        console.log(infoCarrito)

        return infoCarrito
        
        
    }

    borrar(id) {
        let filtro = this.carrito.productos.filter(prod => prod.id !== parseInt(id))
        this.carrito.productos = filtro
        
        console.log(this.carrito)
        return this.carrito
    }

    
}

let producto = new Carrito();


// exporto una instancia de la clase

module.exports = new Carrito();

