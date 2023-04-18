import express from 'express'
import dotenv from 'dotenv'
import router from './src/routes.js'
import bodyParser from 'body-parser'
import cors from 'cors'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

app.listen(PORT, () => {
    console.log(`Le serveur est ouvert: http://localhost:${PORT}/`)
})

/* 

Liste des taches:

Côté serveur ->

-Finir le système d'authentification, avec google si possible --C
-Faire un système de like des produits
-Pouvoir mettre des articles dans le panier
-Pouvoir acheter un produit grâce à paypal
-Créer un système d'avis
-Créer un dashboard
-Faire la page de profil avec un système d'uplaod d'image
-Faire des rôles pour chaque utilisateur

Côté client ->

-Mettre au propre le site de manière général
-Créer une animation en css

De manière général ->

Mettre au propre tout le code et le commenter 


*/