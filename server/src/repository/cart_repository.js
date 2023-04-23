import { createPoolConnection } from "../lib/db.js";

const pool = createPoolConnection();

export async function getItemsCart(){
    const [cartItems] = await pool.query(`SELECT c.id, p.title, u.username, c.price, c.quantity FROM carts_items c INNER JOIN users u ON c.cart_id = u.id INNER JOIN products p ON c.product_id = p.id`)
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

        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, error: error.message };
    }
}

export const cart = {
    all: getItemsCart,
    add: addToCart,
}