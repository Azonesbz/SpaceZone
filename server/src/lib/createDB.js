import { createPoolConnection } from "./db.js";

export async function createDB(){
    const con = createPoolConnection()
    // await con.query(`ALTER TABLE products DROP FOREIGN KEY IF EXISTS products_ibfk_1`);
    await con.query('DROP TABLE IF EXISTS products');
    await con.query('DROP TABLE IF EXISTS products_features');
    await con.query('DROP TABLE IF EXISTS users');
    await con.query('DROP TABLE IF EXISTS role');

    
    await con.query(`CREATE TABLE role (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        permission VARCHAR(255) NOT NULL
        )`);
    await con.query(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id VARCHAR(255) NOT NULL,
        role_id INT NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        token TEXT,
        firstname VARCHAR(100),
        lastname VARCHAR(100),
        numberphone VARCHAR(50),
        FOREIGN KEY (role_id) REFERENCES role(id)
    )`);
    await con.query(`CREATE TABLE products_features (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            categorie VARCHAR(150) NOT NULL
        )`);

await con.query(`CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(6, 2) NOT NULL,
        description TEXT NOT NULL,
        category_id INTEGER,
        FOREIGN KEY (category_id) REFERENCES products_features(id)
    )`);

    await con.query(`INSERT INTO products_features (categorie) VALUES (?),(?),(?)`, ['vêtements', 'accessoires','divers'])

}