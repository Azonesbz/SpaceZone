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

let addProduct = async (id, title, price, description, category, created_at, inventory, product_image) => {
    const [info] = await createPoolConnection().query(`INSERT INTO products (user_id, title, price, description, category_id, created_at, inventory, url_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [id, title, price, description, category, created_at, inventory, product_image])
    const [result] = await createPoolConnection().query(`SELECT p.id, p.title, p.price, p.description, u.username, u.profil_picture, CONVERT_TZ(p.created_at, '+00:00', '+02:00') AS created_at, p.url_image FROM products p INNER JOIN users u ON p.user_id = u.id WHERE p.id = ?`, [info[0].insertId])
    return result
}
let getLikeProductDb = async (id) => {
    const [result] = await createPoolConnection().query(`SELECT p.id, p.user_id, p.product_id, u.username FROM products_likes p INNER JOIN users u ON p.user_id = u.id WHERE p.user_id = ?`, [id])
    if(result.length){
        return result
    }
    return
}
let likeProductDb = async (userId, productId) => {
    const [verify] = await createPoolConnection().query(`SELECT id FROM products_likes WHERE product_id = ? AND user_id = ?`, [productId, userId])
    if(verify.length){
        await createPoolConnection().query(`DELETE FROM products_likes WHERE product_id = ? AND user_id = ?`, [productId, userId])
        return {deleted: verify}
    } else {
        const [info] = await createPoolConnection().query(`INSERT INTO products_likes (product_id, user_id) VALUES (?, ?)`, [productId, userId])
        console.log(info)
        const [result] = await createPoolConnection().query(`SELECT p.id, p.user_id, p.product_id, u.username FROM products_likes p INNER JOIN users u ON p.user_id = u.id WHERE p.id = ?`, [info.insertId])
        return {success: result}
    }
}

// Update product

let updateProductDb = async (id, title, author, price, inventory) => {
    await createPoolConnection().query(`
    UPDATE products 
    SET title = ?, user_id = ?, price = ?, inventory = ? 
    WHERE id = ?`, [title, author, price, inventory, id])

    const [info] = await createPoolConnection().query(`
    SELECT p.id, p.title, p.price, p.description, u.username, p.user_id, p.inventory, u.profil_picture, CONVERT_TZ(p.created_at, '+00:00', '+02:00') AS created_at, p.url_image 
    FROM products p
    INNER JOIN users u ON p.user_id = u.id`)

    return info;
}

let deleteProductDb = async (id) => {
    const [productIsLike] = await createPoolConnection().query(`SELECT pl.user_id FROM products p INNER JOIN products_likes pl ON p.id = pl.product_id WHERE p.id = ?`, [id])
    console.log(productIsLike)
    if(productIsLike.length){
        console.log('ok')
        await createPoolConnection().query(`DELETE FROM products_likes WHERE user_id = ?`, [productIsLike[0].user_id]);
    }
    const [info] = await createPoolConnection().query(`DELETE FROM products WHERE id = ?`, [id]);
    return info
}
let filterProductDb = async (decreasing, crescent, category) => {
    console.log(decreasing, crescent, category)
    if(decreasing && category != 0){
        console.log("🚀 ~ file: products_repository.js:110 ~ filterProductDb ~ category:", category)
        const [product] = await createPoolConnection().query(`SELECT p.id, p.title, p.price, p.description, u.username, u.id AS user_id, u.profil_picture, p.url_image 
        FROM products p 
        INNER JOIN users u ON p.user_id = u.id
        WHERE p.category_id = ?
        ORDER BY p.price DESC`, [category])
        return product
    } else if(crescent && category != 0){
    console.log("🚀 ~ file: products_repository.js:113 ~ filterProductDb ~ category:", category)
        const [product] = await createPoolConnection().query(`SELECT p.id, p.title, p.price, p.description, u.username, u.id AS user_id, u.profil_picture, p.url_image 
        FROM products p 
        INNER JOIN users u ON p.user_id = u.id
        WHERE p.category_id = ?
        ORDER BY p.price ASC`, [category])
        return product
    } else if(decreasing){
        const [product] = await createPoolConnection().query(`SELECT p.id, p.title, p.price, p.description, u.username, u.id AS user_id, u.profil_picture, p.url_image 
        FROM products p 
        INNER JOIN users u ON p.user_id = u.id 
        ORDER BY p.price DESC`)
        return product
    } else if(crescent){
        const [product] = await createPoolConnection().query(`SELECT p.id, p.title, p.price, p.description, u.username, u.id AS user_id, u.profil_picture, p.url_image 
        FROM products p 
        INNER JOIN users u ON p.user_id = u.id 
        ORDER BY p.price ASC`)
        return product
    }else if(category){
        const [product] = await createPoolConnection().query(`SELECT p.id, p.title, p.price, p.description, u.username, u.id AS user_id, u.profil_picture, p.url_image 
        FROM products p 
        INNER JOIN users u ON p.user_id = u.id
        WHERE p.category_id = ?`,[category])
        return product
    } else {
        const [product] = await createPoolConnection().query(`SELECT p.id, p.title, p.price, p.description, u.username, u.id AS user_id, u.profil_picture, p.url_image 
        FROM products p 
        INNER JOIN users u ON p.user_id = u.id`)
        return product
    }
}

export const products = {
    all: getAllProduct,
    byId: byId,
    add: addProduct,
    update: updateProductDb,
    delete: deleteProductDb,
    page: getProductPage,
    number: getNumberProduct,
    next: getNextProducts,
    like: likeProductDb,
    getLike: getLikeProductDb,
    filter: filterProductDb,
}