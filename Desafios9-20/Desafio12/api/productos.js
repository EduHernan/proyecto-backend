class Productos {
    constructor() {
        // inicializar variables
        this.array = []
    }

    listar () {
        let contenido = this.array
        return this.array
        
    }

    guardar(title, price, thumbnail) {
        let productoAgregado = {title:title, price: price, thumbnail:thumbnail, id: this.array.length+1}
        this.array.push(productoAgregado)
        let contenido2 = this.array
        return contenido2
        
        
    }

    
}

let producto = new Productos();





// ejecuto las funciones





 

// exporto una instancia de la clase
module.exports = new Productos();