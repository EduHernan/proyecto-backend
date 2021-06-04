class Productos {
    constructor() {
        // inicializar variables
        this.array = []
    }

    listar () {
        let contenido = this.array
        
    }

    guardar(title, precio, url) {
        let productoAgregado = {title:title, precio: precio, url:url, id: this.array.length+1}
        this.array.push(productoAgregado)
        let escribir = this.array
        
        
    }

    
}

let producto = new Productos();





// ejecuto las funciones
producto.guardar('perro', 211, 'perro.jpg');
producto.guardar('gato', 911, 'agato.jpg');
producto.guardar('globo', 811, 'globo.jpg');
producto.listar();




 

// exporto una instancia de la clase
module.exports = new Productos();