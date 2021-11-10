
Proyecto final backend

El servidor tiene un sistema de log in que le permite registrarse e ingresar a algunas pantallas del servidor.

Hay 5 bases de datos para hacer uso de las persistencias de los productos en las bases de datos.

La persistencia por defecto que le permite manipular el carrito de compras es mongoAtlas.

Todas las pruebas de la API REST se pueden realizar por postman. En el archivo Eduardo-backend.postman_collection hay un ejemplo de CRUD que facilita la manipulación de la API

Las 5 bases de datos presentes son:

mongoDB
mongoAtlas
sqlite
mySQL
memoria

Para interactuar con otra base de datos coloque el nombre de la persistencia que quiera utilizar en la carpeta de config en la constante de persistencia y la pantalla le mostrara en que persistencia se encuentra.

Para usar la persistencia de MySQL, cree la tabla una sola vez en la funcion comentada en la carpeta de api, archivo mySQL.js.