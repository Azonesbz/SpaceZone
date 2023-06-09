import jwt from ".pnpm/jsonwebtoken@9.0.0/node_modules/jsonwebtoken"
import { cart } from "../repository/cart_repository.js"


// Defining the function to get the items in the user cart

export default function getCarts(req, res){
    const token = req.body.token // Extract JwT token to the request
    jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) =>{ // Verifying the JWT token and decoding token to get user information
        if(err){
            return res.status(401).json({err}) // If there error in the token verification (token invalid or expire), send error response
        }
        cart.all(decoded.id).then(response => { // querying the user's cart items from database
            res.status(200).json({success: response}) // Send cart items in the response
        })
        .catch(err => {
            console.error(err)
            res.status(200).json({msg: 'Votre panier est vide', err})
        })
    })
}

// Add product to cart

export async function addProductCart(req, res){
    const {id, quantity, user_id, price} = req.body

    // Verify if all data exist
    if (!id || !quantity || !user_id || !price) {
        return res.status(400).json({err: "Tous les champs sont obligatoires."})
    }

    cart.add(id, quantity, user_id, price).then(response => {
        res.status(201).json({success: response.success})
    })
    .catch(err => {
        console.error(err)
        res.status(500).json({err: "Une erreur est survenue lors de l'ajout du produit au panier."})
    })
}

export async function deleteItemsCart(req, res){
    const id = req.params.id
    cart.delete(id).then(response => {
        res.status(201).json({response})
    })
    .catch(err => console.error(err))
}