const socket = io.connect();

/* si recibo productos, los muestro usando handlebars */
socket.on('productos', function (productos) {
    console.log('productos recibidos')
    document.getElementById('datos').innerHTML = tablaHanblebars(productos)
});


// agregando plantilla handlebars
function tablaHanblebars(productos) {
    const plantilla = `
        <style>
            .table td,
            .table th {
                vertical-align: middle;
            }
        </style>

        {{#if productos.length}}
        <div class="table-responsive">
        <h3 style="color: red">Lista de Productos</h3>
            <table class="table table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Foto</th>
                </tr>
                {{#each productos}}
                <tr>
                    <td>{{this.title}}</td>
                    <td>$ {{ this.price }}</td>
                    <td><img width="100" src={{this.thumbnail}} alt="not found"></td>
                </tr>
                {{/each}}
            </table>
        </div>
        {{/if}}
    `

    console.log(productos);
    let template = Handlebars.compile(plantilla);
    let html = template({ productos: productos, hayProductos: productos.length });
    return html;
}
