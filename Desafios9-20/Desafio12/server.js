const express = require('express');
const app = express();
const productos = require('./api/productos');
const handlebars = require('express-handlebars');
const http = require('http').Server(app);

// le pasamos la constante http a socket.io
const io = require('socket.io')(http);

// ejecuto las funciones de la clase
productos.guardar('Adidas Energifalcon', 8490, '/static/adidas-energyfalcon.jpg');
productos.guardar('Adidas X9000L2 ', 7990, '/static/Zapatillas_X9000L2.jpg');
productos.guardar('Adidas Superstar', 9490, '/static/Zapatillas_Superstar_Blanco.jpg');
    
productos.listar();

// creo una app de tipo express
const router = express.Router();
app.use('/static', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// configuracion de handlebars en express
app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
}));

// seteo el motor de plantilla
app.set('view engine', 'hbs');

app.set('views', './views');

// obtengo el puerto del enviroment o lo seteo por defecto
const PORT = process.env.PORT || 8080;


// haciendo conexion websocket
io.on('connection', socket => {
    console.log('Nuevo usuario conectado');
    /* Envio los mensajes al cliente que se conectó */
    socket.emit('productos', productos.listar());

    /* Escucho los mensajes enviado por el cliente y se los propago a todos */
    socket.on('update', data => {
        io.sockets.emit('productos', productos.listar());
    });
});

// haciendo get de las rutas

router.get('/productos/vista', (req, res) => {
    if (productos.array.length < 1 ) {
        
        res.render('main', { productos: productos.array, hayProductos: false });
    } else {
        console.log(productos)
    
    
        res.render('main', { productos: productos.array, hayProductos: true });
    }
    
    
}); 

router.get('/productos/listar', (req, res) => {
    
    if (productos.array.length < 1 ) {
        
        res.json({error: 'no hay productos cargados'});
    } else {
        console.log(productos)
    
    
        res.json({productos:productos.array});
    }

})

router.get('/productos/listar/:id', (req, res) => {
    const info = productos.array
    const infoID = info[req.params.id-1]
    
    
    if (infoID === undefined ) {
        res.json({error: 'producto no encontrado'});
        
        
    } else {
        console.log(infoID)
    
    
        res.json({producto:infoID});
    }
    

})


router.post('/productos/guardar', (req, res) => {
    // post valido
        let info = productos.array
        let dataForm = req.body;  
        dataForm.id = productos.array.length+1
        
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
        
        
        res.redirect('/api/productos/vista')
    
    })
    
    router.put('/productos/actualizar/:id', (req, res) => {
        
        const info = productos.array
        let id = req.params.id-1
        info[id] = req.body
        info[id].id = req.params.id
        console.log(info)
        
        
        res.json({estado:'actualizado', productos:info,})
    })
    
    router.delete('/productos/borrar/:id', (req, res) => {  
        
        let id = req.params.id
        let filtro = productos.array.filter(prod => prod.id !== parseInt(id))
        productos.array = filtro
        
        console.log(productos.array)
        
    
        res.json({estado:'borrado', productos:productos.array, id:req.params.id})
    })



app.use('/api', router);

// pongo a escuchar el servidor en el puerto indicado
const server = http.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});


// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});
