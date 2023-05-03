import { products } from "../repository/products_repository.js";
import { currentDate } from "../utils.js";

export async function getProductPage(req, res){
    const currentPage = req.body.page
    const offset = (currentPage * 6 - 6)
    products.page(offset)
    .then(product => {
        console.log(currentPage)
        res.status(201).json({product})
    })
    .catch(err => {
        res.status(404).json({message: `Aucun article pour le moment, revenez plus tard !`, err})
    })
}
export async function getAllProduct(req, res){
    products.all().then(products => {
        res.status(201).json({products})
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
    const id = req.params.id
    products.byId(id)
    .then(
        product => {
            res.status(201).json({product})
        }
    )
    .catch(
        err => {
            console.log(err)
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
    const {description, name, price, inventory, id} = JSON.parse(req.body.productData)
    const created_at = currentDate()
    const files = req.files.map((file) => file.filename); // Récupération des noms de fichiers

    products.add(id, name, price, description, created_at, inventory, JSON.stringify(files)).then(
        (response) => {
            let data = {
                id: response[0],
                name: response[0],
                price: response[0],
                description: response[0],
                seller: response[0],
                created_at: response[0].created_at,
                url_image: response[0].url_image
            }
            res.status(200).json({newProduct: data})
        }
    )
    .catch(err => {
        res.status(500).json({msg:`Une erreur est survenue, veuillez réessayer dans quelques instants`, err})
    })
}

export async function updateProduct(req, res){
    const {inventory, author, title, price} = req.body
    const id = req.params.id
    products.update(id, title, author, price, inventory).then(response => {
        res.status(201).json({response})
    }).catch(err => {
        console.error(err)
        res.status(400).json({err})
    })
}


/** export async function getSearch(req, res){
    const {divers, accessoires, vêtements, priceMin, priceMax} = req.body
    if(divers === false && accessoires === false && vêtements === false){
        res.status(300).json({msg: 'Veuillez sélectionner au moins un critères de recherche.'})
        return;
    }
    console.log(accessoires)
    products.search(divers, accessoires, vêtements, priceMin, priceMax)
    .then(result => {
        console.log(result)
        res.status(200).json({result})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err})
    })
} */