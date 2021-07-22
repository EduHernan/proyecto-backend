const mongoose = require('mongoose');
const config = require('../config/config.json');

const connection = mongoose.connect(config.MONGO_DBAAS, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('[Mongoose] - connected in: mongodb+srv://eduardo:ccziMeh@cluster0.fk8jx.mongodb.net/ecommerce');
});

mongoose.connection.on('error', (err) => {
    console.log('[Mongoose] - error:', err);
});

module.exports = connection;