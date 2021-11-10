const dotenv = require('dotenv');

dotenv.config();

// variables de configuración del servidor
module.exports.ENV = process.env.NODE_ENV;
module.exports.HOST = process.env.HOST || 'http://localhost';
module.exports.PORT = process.env.PORT || 8000;
module.exports.PERSISTENCIA = process.env.PERSISTENCE || 'mongoAtlas';
module.exports.MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/mern';
module.exports.MONGO_DBAAS = process.env.MONGO_DBAAS || 'mongodb+srv://eduardo:ccziMeh@cluster0.fk8jx.mongodb.net/ecommerce?retryWrites=true&w=majority';
module.exports.EMAIL = process.env.EMAIL || 'emanuelbalcazar13@gmail.com';
module.exports.GMAIL_USER = process.env.GMAIL_USER 
module.exports.GMAIL_PASS = process.env.GMAIL_PASS
