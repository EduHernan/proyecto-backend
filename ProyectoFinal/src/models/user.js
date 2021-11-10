const mongoose = require('mongoose');

// esquema del usuario en la base de datos
const schema = mongoose.Schema({
    email: { type: String, max: 400 },
    password: {type: String, max: 400},
    username: {type: String, max: 400},
    edad: {type: Number, max: 400},
    direccion: {type: String, max: 400},
    telefono: {type: String, max: 400},
    imagen: {type: String, max: 400}
}); 

const User = mongoose.model('sessions', schema);

module.exports = User;

