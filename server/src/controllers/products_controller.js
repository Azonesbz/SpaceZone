import { products } from "../repository/products_repository.js";

export async function getAllProducts(req, res){
    products.all()
    .then(product => {
        res.json({product})
    })
    .catch(err => {
        res.json({message: `Aucun article pour le moment, revenez plus tard !`, err})
    })
}
export async function getProductById(req, res){
    products.byId(req.params.id)
    .then(
        product => {
            console.log(product)
            res.json({product})
        }
    )
    .catch(
        err => {
            res.status(404).json({message: `Page introuvable, redirection vers la page d'acceuil.`, err})
        }
    )
}
export async function getNextProduct(req, res){
    const page = req.body.page
    products.next(page).then(productNext => {
        console.log(productNext)
        res.json({productNext})
    })
}
export async function getSearch(req, res){
    products.search(req.body.search).then(result => {
        res.json({result})
    })
}