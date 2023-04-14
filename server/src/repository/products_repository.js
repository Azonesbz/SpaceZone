/* 
Créer une requête pour récupérer toute les cards, cards par id, ajouter une cards, modifier et supprimer 
*/

import { createPoolConnection } from "../lib/db.js"

// getCards

const getProducts = async () => {
    const [products] = await createPoolConnection().query(`SELECT * FROM products`)
    return products
}
const byId = async (id) => {
    const [product] = await createPoolConnection().query(`SELECT * FROM products WHERE id = ?`, [id])
    if(product.length <= 0){
        throw err
    }
    return product
}
const getNextProducts = async (page) => {
    const [nextProducts] = await createPoolConnection().query(`SELECT * FROM products LIMIT 3 OFFSET ?`, [page])
    return nextProducts
}
const searchProduct = async (vêtements, accessoires, divers, priceMin, priceMax) => {
    if(vêtements === true) {
        vêtements = "vêtements"
    } else {
        vêtements = null
    }
    if(accessoires === true){
        accessoires = "accessoires"
    } else {
        accessoires = null
    }
    if(divers === true){
        divers = "accessoires"
    } else {
        divers = null
    }
    const query =
    `SELECT *
    FROM products p 
    LEFT JOIN product_category c ON p.category_id = c.id
    WHERE c.title IN (?, ?, ?)
    GROUP BY p.id`
    const [result] = await createPoolConnection().query(query, [accessoires, vêtements, divers])
    return result
}

// Modifier le nom d'utilisateur pour l'auteur du produit
const addProduct = async (name, price, description) => {
    const [info] = await createPoolConnection().query(`INSERT INTO products (user_id, name, price, description) VALUES (?, ?, ?, ?)`, ["Azones", name, price, description])
    return info
}

export const products = {
    all: getProducts,
    byId: byId,
    add: addProduct,
    search: searchProduct,
    next: getNextProducts,
}