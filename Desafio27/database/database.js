// module of connection to the database.
const mongoose = require('mongoose');

const connection = mongoose.connect("mongodb://localhost:27017/sesiones", { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('[Mongoose] - connected in: mongodb://localhost:27017/ecommerce');
});

mongoose.connection.on('error', (err) => {
    console.log('[Mongoose] - error:', err);
});

module.exports = connection;