import jwt from "jsonwebtoken"
import { cart } from "../repository/cart_repository.js"

export default function getCarts(req, res){
    const token = req.body.token
    jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) =>{
        if(err){
            return res.status(500).json({err})
        }
        cart.all(decoded.id).then(response => {
            res.status(200).json({cartItem: response})
        })
        .catch(err => {
            console.error(err)
            res.status(404).json({msg: 'Aucun article dans votre panier', err})
        })
    })
}

export async function addProductCart(req, res){
    const {id, quantity, user_id, price} = req.body
    console.log(quantity)
    cart.add(id, quantity, user_id, price).then(response => {
        console.log(response)
        res.status(200).json({response})
    })
    .catch(err => console.error(err))
}