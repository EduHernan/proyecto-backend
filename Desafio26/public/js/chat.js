// llamando al modulo de socket
let socket = io.connect();

// si llegan mensajes, los renderizo
socket.on('messages', data => {
    render(data);
});

// renderiza el html con los mensajes recibidos
function render(data) {
    var html = data.map((elem) => {
        return (`<div>
            <strong>${elem.author.id}</strong>
            "<strong>${elem.author.alias}</strong>"
            [<em>${elem.author.fecha}</em>]
            : <em>${elem.mensaje}</em>

            </div>
        `);
    }).join(" ");

    // inyecta el html en el elemento con id messages
    document.getElementById("messages").innerHTML = html;
}

// crea un mensaje y lo emite para ser enviado al servidor
function addMessage(e) {
    let mensaje = {
        author: {
            id: document.getElementById('email').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            alias: document.getElementById('alias').value,
            fecha: new Date().toLocaleString()
        },
        mensaje : document.getElementById('texto').value
    }

    socket.emit('new-message', mensaje);
    document.getElementById('texto').value = '';
    document.getElementById('texto').focus();

    return false;
}