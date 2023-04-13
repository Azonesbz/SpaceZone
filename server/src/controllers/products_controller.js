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
export async function addProduct(req, res){
    const {description, name, price} = req.body
    products.add(name, price, description).then(
        response => {
            res.status(200).json({msg: 'Le produit à bien été créer', response})
        }
    )
    .catch(err => {
        res.status(500).json({msg:`Une erreur est survenue, veuillez réessayer dans quelques instants`, err})
    })
}
export async function getSearch(req, res){
    const {divers, accessoires, vêtements} = req.body
    products.search(divers, accessoires, vêtements)
    .then(result => {
        res.status(200).json({result})
    })
    .catch(err => {
        res.status(500).json({err})
    })
}