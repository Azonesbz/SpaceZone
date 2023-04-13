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
const searchProduct = async (value) => {
    console.log(value)
    const [result] = await createPoolConnection().query('SELECT * FROM products WHERE name LIKE ?', [`%${value}%`]);
    if(!result.length){
        return result
    }
    return result
}
const addProduct = async (name, price, description) => {
    const [info] = await createPoolConnection().query(`INSERT INTO products (id_user, name, price, description) VALUES (?, ?, ?, ?)`, ["Azones", name, price, description])
    console.log(info.insertId)
    return info
}

export const products = {
    all: getProducts,
    byId: byId,
    add: addProduct,
    search: searchProduct,
    next: getNextProducts,
}