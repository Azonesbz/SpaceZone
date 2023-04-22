import express from 'express'
import { addProduct, getNumberProduct, getProductById, getProducts, getSearch } from './controllers/products_controller.js'
import { addUser, connectUser, getAllUsers, sessionIsValid, updateUserPseudo, userLogout } from './controllers/user_controller.js'
import { upload, uploadFile } from './controllers/uploadFile_controller.js'
import { addProductCard } from './controllers/cart_controller.js'

const router = express.Router()

// Route product

router.post('/product', getProducts)
router.get('/allproduct', getNumberProduct)
router.get('/product/:id', getProductById)

router.post('/product/new', addProduct)
router.post('/search/product', getSearch)

// Route utilisateur

router.get('/users', getAllUsers)
router.post('/users/new', addUser)
router.post('/users/login', connectUser)
router.put('/users/:id', userLogout)

router.put('/updatePseudo/:id', updateUserPseudo)

// Panier utilisateur

router.post('/cart/product', addProductCard)

// Vérification du token

router.post('/api/session', sessionIsValid)

// Upload de fichier

router.post('/upload', upload.single('file'), uploadFile)

export default router