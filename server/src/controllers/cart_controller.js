import { cart } from "../repository/cart_repository.js"

export async function addProductCard(req, res){
    const {id, quantity, user_id, price} = req.body
    console.log(quantity)
    cart.add(id, quantity, user_id, price).then(response => {
        console.log(response)
        res.status(200).json({response})
    })
    .catch(err => console.error(err))
}