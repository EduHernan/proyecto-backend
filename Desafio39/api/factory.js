// importo modulo de loggers
const logger = require('../utils/winston');

// clase que trae la persistencia que sea seleccionada en configuración
class PersistenciaFactory {

    constructor() { }

    getPersistencia() {
        try {
            let persistencia = require('../config/config.json').persistencia;
            logger.info(`127.0.0.1 - Persistencia seleccionada: [${persistencia}]`)
            
            
            let modulo = require(`../persistencia/${persistencia}`);
            
            return modulo
        } catch (error) {
            logger.error(`127.0.0.1 - 'No se encontro el tipo de persistencia:`, error)
        }
    }
}

module.exports = new PersistenciaFactory();