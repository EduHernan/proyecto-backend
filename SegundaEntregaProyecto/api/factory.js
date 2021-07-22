// clase que trae la persistencia que sea seleccionada en configuración
class PersistenciaFactory {

    constructor() { }

    getPersistencia() {
        try {
            let persistencia = require('../config/config.json').persistencia;
            console.log(`persistencia seleccionada: [${persistencia}]`)
            
            let modulo = require(`../persistencia/${persistencia}`);
            
            return modulo
        } catch (error) {
            console.log('No se encontro el tipo de persistencia:', error);
        }
    }
}

module.exports = new PersistenciaFactory();