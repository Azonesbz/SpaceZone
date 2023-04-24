/* 
Créer une requête pour récupérer toute les cards, cards par id, ajouter une cards, modifier et supprimer 
*/

import { createPoolConnection } from "../lib/db.js"

// getCards

let getNumberProduct = async () => {
    const [result] = await createPoolConnection().query(`SELECT COUNT(*) as total_produits FROM products`)
    return result
}

let getProducts = async (page) => {
    const [products] = await createPoolConnection().query(`SELECT p.id, p.title, p.price, p.description, u.username FROM products p INNER JOIN users u ON p.user_id = u.id LIMIT 6 OFFSET ?`, [page])
    return products
}
let byId = async (id) => {
    console.log(id)
    const [product] = await createPoolConnection().query(`SELECT p.id, p.title, p.price, p.description, u.username FROM products p INNER JOIN users u ON p.user_id = u.id WHERE p.id = ?`, [id])
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

const searchProduct = async (vêtements, accessoires, divers, priceMin, priceMax) => {
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

const addProduct = async (id, title, price, description) => {
    const [info] = await createPoolConnection().query(`INSERT INTO products (user_id, title, price, description, category_id) VALUES (?, ?, ?, ?, ?)`, [id, title, price, description, 3])
    return info
}

export const products = {
    all: getProducts,
    number: getNumberProduct,
    byId: byId,
    add: addProduct,
    search: searchProduct,
    next: getNextProducts,
}