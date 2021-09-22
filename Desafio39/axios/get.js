const axios = require('axios');

const URL = 'http://localhost:8080/api/productos/listar'

async function simpleGet() {
    try {
        let response = await axios.get(URL);
        console.log(response.data)
    } catch (error) {
        console.error(error.response);
    }
};

async function queryParams() {
    try {
        let response = await axios.get(URL + '/query', { params: { id: '60f91c10c8c8e714644bdd4e' } });
        console.log(response.data)
    } catch (error) {
        console.error(error.response);
    }
};

async function urlParams() {
    try {
        let response = await axios.get(URL + '/60f91c10c8c8e714644bdd4e');
        console.log(response.data)
    } catch (error) {
        console.error(error.response);
    }
};

simpleGet();
queryParams();
urlParams();