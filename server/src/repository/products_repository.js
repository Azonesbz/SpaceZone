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

export const products = {
    all: getProducts,
    byId: byId,
    search: searchProduct,
    next: getNextProducts,
}