/* 
Créer une requête pour récupérer toute les cards, cards par id, ajouter une cards, modifier et supprimer 
*/

import { createPoolConnection } from "../lib/db.js"

// getCards

let getNumberProduct = async () => {
    const [result] = await createPoolConnection().query(`SELECT COUNT(*) as total_produits FROM products`)
    return result
}

let getProductPage = async (page) => {
    const [products] = await createPoolConnection().query(`SELECT p.id, p.title, p.price, p.description, u.username, u.id AS user_id, u.profil_picture, p.url_image FROM products p INNER JOIN users u ON p.user_id = u.id LIMIT 6 OFFSET ?`, [page])
    return products
}
let getAllProduct = async () => {
    const [products] = await createPoolConnection().query(`SELECT p.id, p.title, p.price, p.description, u.username, u.id AS user_id, p.inventory, u.profil_picture, CONVERT_TZ(p.created_at, '+00:00', '+02:00') AS created_at, p.url_image FROM products p INNER JOIN users u ON p.user_id = u.id`)
    return products
}
let byId = async (id) => {
    console.log(id)
    const [product] = await createPoolConnection().query(`SELECT p.id, p.title, p.price, p.description, u.username, p.url_image FROM products p INNER JOIN users u ON p.user_id = u.id WHERE p.id = ?`, [id])
    if(product.length){
        return product
    }
    throw err
}
let getNextProducts = async (page) => {
    const [nextProducts] = await createPoolConnection().query(`SELECT * FROM products LIMIT 3 OFFSET ?`, [page])
    return nextProducts
}

// Search system

let searchProduct = async (vêtements, accessoires, divers, priceMin, priceMax) => {
    const category = [];
    if (vêtements) category.push("VÊTEMENTS");
    if (accessoires) category.push("ACCESSOIRES");
    if (divers) category.push("DIVERS");
    console.log(category)
    const query =
    `SELECT * FROM products p
    JOIN category c ON p.category_id = c.name
    WHERE c.name IN (?) AND p.price <= ? AND p.price >= ?`
    const [result] = await createPoolConnection().query(query, [category, priceMax, priceMin])
    console.log(result)
    return result
}



// Add product

let addProduct = async (id, title, price, description, created_at, inventory, product_image) => {
    const [info] = await createPoolConnection().query(`INSERT INTO products (user_id, title, price, description, category_id, created_at, inventory, url_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [id, title, price, description, 3, created_at, inventory, product_image])
    const [result] = await createPoolConnection().query(`SELECT p.id, p.title, p.price, p.description, u.username, u.profil_picture, CONVERT_TZ(p.created_at, '+00:00', '+02:00') AS created_at, p.url_image FROM products p INNER JOIN users u ON p.user_id = u.id WHERE p.id = ?`, [info[0].insertId])
    return result
}

export const products = {
    all: getAllProduct,
    number: getNumberProduct,
    byId: byId,
    add: addProduct,
    page: getProductPage,
    search: searchProduct,
    next: getNextProducts,
}