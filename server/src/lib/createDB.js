import { createPoolConnection } from "./db.js";

export async function createDB(){
    const con = createPoolConnection()

    await con.query('DROP TABLE IF EXISTS users')
    await con.query('DROP TABLE IF EXISTS roles')
    await con.query('DROP TABLE IF EXISTS products')

    await con.query(`CREATE TABLE users(
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        prenom VARCHAR(100),
        nom VARCHAR(100),
        numberphone INT
    )`);
    await con.query(`CREATE TABLE roles(
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        role_id VARCHAR(255) NOT NULL,
        permission VARCHAR(255) NOT NULL
        )`)
    await con.query(`CREATE TABLE products(
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        id_user VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(6, 2) NOT NULL,
        description TEXT
    )`);
    await con.query(`INSERT INTO products (id_user, name, price) VALUES (?, ?, ?)`, ['Azones', 'Tee-shirt Moon', 105.52])
    await con.query(`INSERT INTO products (id_user, name, price) VALUES (?, ?, ?)`, ['Sycatle', 'Puzzle', 53.99])
    await con.query(`INSERT INTO products (id_user, name, price) VALUES (?, ?, ?)`, ['Ali', 'Sweat à capuche', 85.50])
    await con.query(`INSERT INTO products (id_user, name, price) VALUES (?, ?, ?)`, ['Arthur', 'Sacoche', 85.50])
    await con.query(`INSERT INTO products (id_user, name, price) VALUES (?, ?, ?)`, ['Didier', 'Montre', 85.50])
    await con.query(`INSERT INTO products (id_user, name, price, description) VALUES (?, ?, ?, ?)`, ['Elliot', 'Lunette de soleil', 85.50, 'Le t-shirt sur le thème de l\'espace est un vêtement incontournable pour tous les passionnés d\'astronomie. Avec un design unique inspiré des merveilles de l\'univers, il présente des étoiles, des galaxies et des nébuleuses dans des couleurs vives et contrastées pour refléter la beauté spectaculaire de l\'espace. Imprimé avec une qualité élevée pour une durabilité à long terme, le t-shirt est fabriqué en coton doux et confortable pour une sensation agréable sur la peau. Sa coupe ajustée et son col rond décontracté en font un choix élégant et moderne pour les sorties décontractées, les voyages ou simplement se détendre chez soi. Associez-le avec un jean et des baskets pour un look décontracté ou avec une tenue plus habillée pour un style sophistiqué. En somme, ce tee-shirt est un ajout parfait à la garde-robe de tous les explorateurs fascinés par l\'univers.'])

}