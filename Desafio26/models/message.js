const mongoose = require('mongoose');

const schema = mongoose.Schema({
    mensaje: { type: String, max: 400 },
    email: { type: String, require: true, max: 100 },
    timestamp: { type: Date, default: new Date() }
});

const Message = mongoose.model('mensajes', schema);

module.exports = Message;