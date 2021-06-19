import express from 'express';
import { promises } from 'fs';

const app = express();

const puerto = 8080;

let contador = 0;
let contadorRandom = 0;

// defino las ruta con get 

app.get('/items', async (req, res) => {
    try {
        let contenido = await promises.readFile('./productos.txt');
        const info = JSON.parse(contenido)
        console.log(info);
        contador ++;
        res.send({items: info, cantidadProductos: info.length});
    }
    catch (err) {
        console.log('error de servidores:', err )
        

    }
})

app.get('/item-random', async (req, res) => {
        try {

            function numeroRandom (min, max) {
                return Math.floor(Math.random() * (max -min)) + min;
            }
            
            let numeroAleatorio = numeroRandom (0, 3);
            
            let contenido = await promises.readFile('./productos.txt');
            const info = JSON.parse(contenido)
            const infoAleatoria = info[numeroAleatorio]
            console.log(infoAleatoria);
            contadorRandom ++
            res.send({items: infoAleatoria});
        }
        catch (err) {
            console.log('error de servidores:', err )
    
        }

})

app.get('/visitas', (req, res) => {
    
    res.send({visitas:{items:`${contador}`, itemRandom:`${contadorRandom}`}});

   
})

// escucho el servidor

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
})

// en caso de error

server.on('error', error => {
    console.log('error en el servidor:', error)
})