// modulo de conección a base de datos de sqlite

const sqlite3 = {
    client: 'sqlite3',
    connection: {
        filename: __dirname + '/../db/ecommerce.sqlite'
    },
    useNullAsDefault: true
}

module.exports = sqlite3;