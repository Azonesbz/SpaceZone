import { cart } from "../repository/cart_repository.js"

export async function addProductCard(req, res){
    const id = req.body.id
    cart.add().then(response => {
        res.status(200).json({response})
    })
    .catch(err => console.error(err))
}