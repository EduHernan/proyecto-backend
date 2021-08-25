/* crear una base de datos */
CREATE DATABASE prueba CHARACTER SET utf8;

/* crear una tabla con id autoincremental*/
CREATE TABLE items (
    id int NOT NULL AUTO_INCREMENT,
    nombre varchar(255) NOT NULL ,
    categoria varchar(255) NOT NULL,
    stock integer unsigned,
    PRIMARY KEY (id)
);

/* insertando datos en una tabla */
INSERT INTO items (nombre, categoria, stock) VALUES ("Fideos", "Harina", 20);
INSERT INTO items (nombre, categoria, stock) VALUES ("Leche", "Lacteos", 30);
INSERT INTO items (nombre, categoria, stock) VALUES ("Crema", "Lacteos", 15);   

/* borrando datos de una tabla */
DELETE FROM items WHERE id = 1;

/* actualizando datos de la tabla */
UPDATE items SET stock = 45 WHERE id = 2