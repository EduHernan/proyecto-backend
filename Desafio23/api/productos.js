const { normalize, schema } = require('normalizr');

const fs = require('fs')

class Productos {
    constructor() {
        // inicializando variables
        this.productos = []
        this.messages = {
            id:1000,
            mensajes: []
        };
    }

    // funciones a utilizar

    normalizar() {


        return this.messages
    }

    propagar (data) {
        let datos = this.messages.mensajes
        datos.push(data);
        console.log(datos)
        
        return datos
    }

    probarNormalizado() {
        const schemaAuthor = new schema.Entity('author', {}, {idAttribute:'email'} );

        // definiendo esquema de mensajes
        const schemaMensaje = new schema.Entity('post', {
            author: schemaAuthor
        }, {idAttribute: '_id'})

        // definiendo un esquema de posts

        const schemaMensajes = new schema.Entity('posts', {
            author: schemaAuthor,
            mensajes:[schemaMensaje]
        }, {idAttribute: 'id'})

        let mensajesNormalizar = this.messages.mensajes

        let mensajesNormalizados = normalize(mensajesNormalizar, schemaMensajes)
        
        fs.writeFileSync('./normalizado.json', JSON.stringify(mensajesNormalizados, null, 3));

        return mensajesNormalizados
    }

    generar(cant) {
        let cantidad = cant || 10
        let id = 1
        let array = [];

        for (let i=0; i < cantidad; i++) {
             array.push({
                 id: id ++,
                 title: faker.commerce.productName(),
                 price:faker.commerce.price(),
                 thumbnail:faker.internet.avatar()
             })
        }
        return array
    }

    listar () {
        if (this.productos.length < 1 ) {
        
            return {error: 'no hay productos cargados'};
        } else {
            console.log(this.productos)
            return this.productos;
        }
        
    }

    listarPorId(id) {
        const info = this.productos
        const infoID = info[id-1]
        
        if (infoID === undefined ) {
            return {error: `producto ${id} no encontrado`};
        } else {
            console.log(infoID)
            return infoID;
        }
        
    }

    guardar(producto) {
        let info = this.productos;
        let dataForm = producto;  
        dataForm.id = this.productos.length+1;
        
    // agregando un Artículo con un id ya existente
        const Existe = info.some(producto => producto.id === dataForm.id)
        
        
        if (Existe) {
            const productosID = info.map(prod => {
                if (prod.id === dataForm.id) {
                    dataForm.id++;
                    return prod
    
                } else {
                    return prod
                }
            })
            info.push(dataForm)
        } else {
            // Agregando un artículo nuevo
            info.push(dataForm)
        }
        console.log(info)
        return info
        
    }

    actualizar(id, datos) {
        const info = this.productos
        let iden = id-1
        info[iden] = datos
        info[iden].id = id
    
        console.log(info)
        return info
    }

    borrar(id) {
        let filtro = this.productos.filter(prod => prod.id !== parseInt(id))
        this.productos = filtro
        
        console.log(this.productos)
        return this.productos
    }

    
}

let producto = new Productos();


// exporto una instancia de la clase

module.exports = new Productos();