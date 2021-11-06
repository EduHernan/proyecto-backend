// modulo de conección a base de datos de MySQL

const mysql = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'ecommerce'
    },
    pool: { min: 0, max: 7 }
}

module.exports = mysql;