// modulo de conección a base de datos de Mongo
const mongoose = require('mongoose');
const config = require('../config/config.json');

const connection = mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('[Mongoose] - connected in: mongodb://localhost:27017/ecommerce');
});

mongoose.connection.on('error', (err) => {
    console.log('[Mongoose] - error:', err);
});

module.exports = connection;