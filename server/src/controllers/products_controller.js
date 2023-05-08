import { products } from "../repository/products_repository.js";
import { currentDate } from "../utils.js";

// Function to get product according to the page

export async function getProductPage(req, res){
    const currentPage = parseInt(req.body.page);
    const limit = 6; // Number of article to return
    let offset;
    if (currentPage > 1)
    {
        offset = (currentPage * 6 - 6)
    }
    else 
    {
        offset = 1
    }
    if (isNaN(offset) || offset < 1)
    {
        res.status(400).json({err: 'Le numéro de page doit être un entier positif'});
        return;
    }

    products.page(offset, limit) // Enter database with offset and limit
    .then(product => {
        res.status(200).json({product}) // Send product to response
    })
    .catch(err => {
        res.status(500).json({failure: `Erreur lors de la récupération des articles`, err})
    })
}
export async function getAllProduct(req, res){
    try {
        const product = await products.all()
        const count = products.length
        res.status(201).json({ success: "Tous les produits ont été récupérés avec succès.", count, product })
      } catch (err) {
        console.error(err)
        res.status(500).json({ failure: "Erreur lors de la récupération de tous les produits", err })
      }
}
export async function getNumberProduct(req, res){
    try {
        const productNumber = await products.number()
        res.status(201).json({ success: "Le nombre de produits à été récupérer avec succès.", number: productNumber[0].total_produits})
    } catch (err) {
        console.error(err);
        res.status(500).json({ failure: "Erreur lors de la récupération de tous les produits", err });
    }
}
export async function getProductById(req, res){
    const id = parseInt(req.params.id)

    if(typeof id !== "number"){
        res.status(400).json({err: "Les données entrantes sont invalides."})
        return;
    }

    products.byId(id)
    .then(
        product => {
            res.status(201).json({success: product})
        }
    )
    .catch(
        err => {
            console.log(err)
            res.status(404).json({failure: `Page introuvable, redirection vers la page d'acceuil.`, err})
        }
    )
}
export async function addProduct(req, res){
    const {description, name, price, inventory, id, category} = JSON.parse(req.body.productData)

    if(typeof description !== "string" || typeof name !== "string" || typeof price !== "number" || typeof inventory !== "number" || typeof id !== "number" || typeof category !== "number")
    {
        res.status(400).json({err: "Les données entrantes sont invalides."})
        return;
    }

    const created_at = currentDate()
    const files = req.files.map((file) => file.filename); // Récupération des noms de fichiers

    products.add(id, name, price, description, category, created_at, inventory, JSON.stringify(files)).then(
        (response) => {
            let data = {
                id: response[0],
                name: response[0],
                price: response[0],
                description: response[0],
                category: response[0],
                seller: response[0],
                created_at: response[0].created_at,
                url_image: response[0].url_image
            }
            res.status(200).json({success: data})
        }
    )
    .catch(err => {
        res.status(500).json({msg:`Une erreur est survenue, veuillez réessayer dans quelques instants`, err})
    })
}

export async function updateProduct(req, res){
    const {inventory, author, title, price} = req.body
    const id = parseInt(req.params.id)

    if(typeof inventory !== "number" || typeof author !== "number" || typeof title !== "string" || typeof price !== "number" || typeof id !== "number")
    {
        res.status(400).json({err: "Les données entrantes sont invalides."})
        return;
    }

    
    products.update(id, title, author, price, inventory).then(response => {
        res.status(201).json({success: response})
    }).catch(err => {
        console.error(err)
        res.status(400).json({err})
    })
}
export async function deleteProductId(req, res){
    const id = parseInt(req.params.id)
    if(typeof id !== "number")
    {
        res.status(400).json({err: "Les données entrantes sont invalides."})
        return;
    }
    products.delete(id)
    .then(response => res.status(201).json({response}))
    .catch(err => {
        console.error(err)
        res.status(500).json({err})
    })
}
export async function likeProduct(req, res){
    const { userId, productId } = req.body
    if(typeof userId !== "number" || typeof productId !== "number")
    {
        res.status(400).json({err: "Les données entrantes sont invalides."})
        return;
    }
    products.like(userId, productId)
    .then(response => {
        if(response.success){
            res.status(201).json({success: response.success[0]})
        } else if (response.deleted) {
            res.status(201).json({deleted: response})
        }
    })
    .catch(err => {
        console.error(err)
        res.status(500).json({failure: err})
    })
}
export async function getLikeProduct(req, res){
    const id = req.params.id

    products.getLike(id)
    .then(response => {
        res.status(201).json({success: response})
    })
    .catch(err => {
        console.error(err)
        res.status(500).json({err})
    })
}
export async function filterProduct(req, res){
    const {decreasing, crescent, category} = req.body
    console.table(typeof decreasing)
    if(typeof decreasing !== "boolean" || typeof crescent !== "boolean" || typeof category !== "number")
    {
        res.status(400).json({err: "Les données entrantes sont invalides."})
        return;
    }
    products.filter(decreasing, crescent, category).then(response => {
        res.status(201).json({success: response})
    })
    .catch(err => {
        console.error(err)
        res.status(500).json({failure: err})
    })
}