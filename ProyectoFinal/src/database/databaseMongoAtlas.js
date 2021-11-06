const mongoose = require('mongoose');
const config = require('../config/config.js');

// importo modulo de loggers
const logger = require('../utils/winston');

const connection = mongoose.connect(config.MONGO_DBAAS, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    logger.info(`127.0.0.1 - [Mongoose] - connected in: mongodb+srv://eduardo:ccziMeh@cluster0.fk8jx.mongodb.net/ecommerce`);
    
});

mongoose.connection.on('error', (err) => {
    logger.error(`127.0.0.1 - [Mongoose] - error:`, err);
    
});

module.exports = connection;