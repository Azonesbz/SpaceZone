import { createPoolConnection } from "../lib/db.js";

export async function addToCart(){
    const query = `INSERT INTO cart_items (cart_id, product_id, quantity, price)
    SELECT c.cart_id, p.name, 1, p.price
    FROM users u
    INNER JOIN cart c ON u.user_id = c.user_id
    INNER JOIN products p ON p.name = ?
    WHERE u.user_id = ?`
    const values = ['Portable', 'Azones']
    const [info] = await createPoolConnection().query(query, values)
    console.log(info)
    return info
}

export const cart = {
    add: addToCart,
}