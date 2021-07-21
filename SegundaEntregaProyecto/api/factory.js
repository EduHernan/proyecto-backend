
class PersistenciaFactory {

    constructor() { }

    getPersistencia() {
        try {
            let persistencia = require('../config/config.json').persistencia;
            
            let modulo = require(`../persistencia/${persistencia}`);
            
            return modulo
        } catch (error) {
            console.log('No se encontro el tipo de persistencia:', error);
        }
    }
}

module.exports = new PersistenciaFactory();