import { products } from "../repository/products_repository.js";

export async function getProducts(req, res){
    const currentPage = req.body.page
    const offset = currentPage * 6 - 6
    products.all(offset)
    .then(product => {
        res.status(201).json({product})
    })
    .catch(err => {
        res.status(404).json({message: `Aucun article pour le moment, revenez plus tard !`, err})
    })
}
export async function getNumberProduct(req, res){
    products.number().then(
        result => {
            res.status(200).json({result: result[0].total_produits})
        }
    )
    .catch(err => res.status(404).json({err}))
}
export async function getProductById(req, res){
    products.byId(req.params.id)
    .then(
        product => {
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
        res.json({productNext})
    })
}
export async function addProduct(req, res){
    const {description, name, price, user_id} = req.body
    products.add(user_id, name, price, description).then(
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