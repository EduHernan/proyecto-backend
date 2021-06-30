const fs = require('fs');
const carrito = require('../api/carrito');

class Archivo {
    constructor() {
        
        }
    
        async guardar() {
            const carr = carrito.listar()
            try {
                await fs.promises.writeFile('./carrito.txt', JSON.stringify(carr,null,'\t'))
            } 
            catch (err) {
                console.log('error de escritura', err)
            }
            
        }

        async leer () {
            try {
                let contenido = await fs.promises.readFile('./carrito.txt')
                const info = JSON.parse(contenido)
                console.log(info)
            }
            catch (err) {
                console.log('error de escritura', err)
            }
        }

        async borrar() {
            try {
                await fs.promises.unlink('./carrito.txt')
                console.log('archivo borrado con exito')
            } 
            catch (err) {
                console.log('error de escritura', err)
            }
        }


        
}

let archivo = new Archivo();

module.exports = new Archivo();