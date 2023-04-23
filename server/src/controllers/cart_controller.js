import { cart } from "../repository/cart_repository.js"

export default function getCarts(req, res){
    cart.all().then(response => {
        console.log(response)
        res.status(200).json({cartItem: response})
    })
    .catch(err => {
        console.error(err)
        res.status(404).json({msg: 'Aucun article dans votre panier', err})
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