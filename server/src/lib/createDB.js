import { createPoolConnection } from "./db.js";

export async function createDB(){
    const con = createPoolConnection()
    // await con.query(`ALTER TABLE products DROP FOREIGN KEY IF EXISTS products_ibfk_1`);
    await con.query('DROP TABLE IF EXISTS products');
    await con.query('DROP TABLE IF EXISTS product_category');
    await con.query('DROP TABLE IF EXISTS users');
    await con.query('DROP TABLE IF EXISTS roles');

await con.query(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        prenom VARCHAR(100),
        nom VARCHAR(100),
        numberphone INT
    )`);

await con.query(`CREATE TABLE roles (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        role_id VARCHAR(255) NOT NULL,
        permission VARCHAR(255) NOT NULL
    )`);

await con.query(`CREATE TABLE product_category (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(150) NOT NULL
    )`);

await con.query(`CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(6, 2) NOT NULL,
        description TEXT NOT NULL,
        category_id INTEGER,
        FOREIGN KEY (category_id) REFERENCES product_category(id)
    )`);

    await con.query(`INSERT INTO product_category (title) VALUES (?),(?),(?)`, ['vêtements', 'accessoires','divers'])
    await con.query(`INSERT INTO products (user_id, category_id, name, price, description) VALUES (?, ?, ?, ?, ?)`, ['Azones', 2,'Tee-shirt Moon', 105.52, 'Le t-shirt sur le thème de l\'espace est un vêtement incontournable pour tous les passionnés d\'astronomie.'])
    await con.query(`INSERT INTO products (user_id, category_id, name, price, description) VALUES (?, ?, ?, ?, ?)`, ['Sycatle', 1,'Puzzle', 53.99, 'Le t-shirt sur le thème de l\'espace est un vêtement incontournable pour tous les passionnés d\'astronomie. Le t-shirt sur le thème de l\'espace est un vêtement incontournable pour tous les passionnés d\'astronomie. Le t-shirt sur le thème de l\'espace est un vêtement incontournable pour tous les passionnés d\'astronomie.'])
    await con.query(`INSERT INTO products (user_id, category_id, name, price, description) VALUES (?, ?, ?, ?, ?)`, ['Ali', 3,'Sweat à capuche', 85.50, 'Le t-shirt sur le thème de l\'espace est un vêtement incontournable pour tous les passionnés d\'astronomie. Le t-shirt sur le thème de l\'espace est un vêtement incontournable pour tous les passionnés d\'astronomie.'])
    await con.query(`INSERT INTO products (user_id, category_id, name, price, description) VALUES (?, ?, ?, ?, ?)`, ['Ali', 3,'Sweat à capuche', 85.50, 'Le t-shirt sur le thème de l\'espace est un vêtement incontournable pour tous les passionnés d\'astronomie. Le t-shirt sur le thème de l\'espace est un vêtement incontournable pour tous les passionnés d\'astronomie.'])
    await con.query(`INSERT INTO products (user_id, category_id, name, price, description) VALUES (?, ?, ?, ?, ?)`, ['Ali', 3,'Sweat à capuche', 85.50, 'Le t-shirt sur le thème de l\'espace est un vêtement incontournable pour tous les passionnés d\'astronomie. Le t-shirt sur le thème de l\'espace est un vêtement incontournable pour tous les passionnés d\'astronomie.'])
    await con.query(`INSERT INTO products (user_id, category_id, name, price, description) VALUES (?, ?, ?, ?, ?)`, ['Ali', 3,'Sweat à capuche', 85.50, 'Le t-shirt sur le thème de l\'espace est un vêtement incontournable pour tous les passionnés d\'astronomie. Le t-shirt sur le thème de l\'espace est un vêtement incontournable pour tous les passionnés d\'astronomie.'])

}