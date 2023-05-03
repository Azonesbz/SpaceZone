import { createPoolConnection } from "../lib/db.js";

const pool = createPoolConnection();

export async function getUserItemsCart(id){
    const [cartItems] = await pool.query(`SELECT c.quantity, u.username, p.price, p.title, category.name, p.url_image FROM carts_items c 
    INNER JOIN carts ON c.cart_id = carts.id 
    INNER JOIN users u ON carts.user_id = u.id
    INNER JOIN products p ON c.product_id = p.id
    INNER JOIN category ON p.category_id = category.id WHERE u.id = ?`, [id]);
    return cartItems
}

export async function addToCart(productId, quantity, userId, price) {
    try {
        const [cart] = await pool.query('SELECT id FROM carts WHERE user_id = ?', [userId]);

        if (cart.length) {
            const [existingItem] = await pool.query(
                'SELECT id, quantity FROM carts_items WHERE cart_id = ? AND product_id = ?',
                [cart[0].id, productId]
            );

            if (existingItem.length) {
                await pool.query(
                    'UPDATE carts_items SET quantity = ? WHERE id = ?',
                    [existingItem.quantity + quantity, existingItem.id]
                );
            } else {
                await pool.query(
                    'INSERT INTO carts_items (cart_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                    [cart[0].id, productId, quantity, price]
                );
            }
        } else {
            const [result] = await pool.query(
                'INSERT INTO carts (user_id, created_at) VALUES (?, ?)',
                [userId, new Date()]
            );

            await pool.query(
                'INSERT INTO carts_items (cart_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [result.insertId, productId, quantity, price]
            );
        }
        const [cartItems] = await pool.query(`
        SELECT c.quantity, u.username, p.price, p.title, category.name, p.url_image FROM carts_items c 
        INNER JOIN carts ON c.cart_id = carts.id 
        INNER JOIN users u ON carts.user_id = u.id
        INNER JOIN products p ON c.product_id = p.id
        INNER JOIN category ON p.category_id = category.id WHERE u.id = ?`, [userId]);
        return { success: cartItems };
    } catch (error) {
        console.error(error);
        return { success: false, error: error.message };
    }
}

let deleteItemsCartDb = async (id) => {
    console.log(id)
    const [deleteCart] = await createPoolConnection().query(`DELETE FROM carts_items WHERE cart_id IN (SELECT id FROM carts WHERE user_id = ?)`, [id]);
    console.log(deleteCart)
    return deleteCart;
}

export const cart = {
    all: getUserItemsCart,
    add: addToCart,
    delete: deleteItemsCartDb
}