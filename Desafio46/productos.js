// productos.js
const Router = require('koa-router');


// Prefix all routes with /productos
const router = new Router({
	prefix: '/productos'
});

let productos = [
	{ id: 1, title: 'Adidas energyfalcon', price: 9999, descripcion: 'zapatillas adidas' },
];


/* ---------------------- Routes ----------------------- */
/* API REST Get All */

router.get('/', (ctx, next) => {
    if (productos.length < 1 ) {
        
        ctx.body = {
            status: 'error!',
            message: `no hay productos cargados`
        };
    } else {
        console.log(productos)
        ctx.body = {
            status: 'success',
            message: productos
        };
    }
    
	
	next();
});

/* API REST Get x ID */
router.get('/:id', (ctx, next) => {

    let id = ctx.params.id;

    const info = productos
    const infoID = info[id-1]
        
        if (infoID === undefined ) {
            ctx.response.status = 404;
            ctx.body = {
                status: 'error!',
                message: `producto con id: ${id} no encontrado`
            };
            return {error: `producto ${id} no encontrado`};
        } else {
            console.log(infoID)
            ctx.body = infoID;
            
        }
        next();
});

/* API REST Post */
router.post('/guardar', (ctx, next) => {

    let producto = ctx.request.body;
    let info = productos;
    let dataForm = producto;  
    dataForm.id = productos.length+1;
        
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
            ctx.response.status = 201;
		    ctx.body = {
			status: 'success',
			message: `New book added with id: ${dataForm.id}`
		};
        }
	next();
});

/* API REST Put */
router.put('/update/:id', (ctx, next) => {
    let id = ctx.params.id;
    let datos = ctx.request.body
    const info = productos
    let iden = id-1
        info[iden] = datos
        info[iden].id = id
    
        console.log(info)
        ctx.response.status = 201;
		ctx.body = {
			status: 'success',
			message: `New book updated with id: ${ctx.request.body.id}`
		};
    
	next();
});

/* API REST Delete */
router.delete('/delete/:id', (ctx, next) => {
    let id = ctx.params.id
    let filtro = productos.filter(prod => prod.id !== parseInt(id))
    productos = filtro
        
    console.log(productos)
    ctx.response.status = 200;
    ctx.body = {
        status: 'success',
        message: `Book deleted with id: ${id}`
    };
	next(); 
});


module.exports = router;