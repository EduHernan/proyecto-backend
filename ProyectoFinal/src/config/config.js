const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env')
});


module.exports.ENV = process.env.NODE_ENV;
module.exports.HOST = process.env.HOST || 'http://localhost';
module.exports.PORT = process.env.PORT || 8000;
module.exports.MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/mern';
module.exports.MONGO_DBAAS = process.env.MONGO_DBAAS || 'mongodb+srv://eduardo:ccziMeh@cluster0.fk8jx.mongodb.net/ecommerce?retryWrites=true&w=majority';
module.exports.PERSISTENCIA = process.env.PERSISTENCE || 'mongoAtlas';
