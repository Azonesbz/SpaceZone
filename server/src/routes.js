import express from 'express'
import { addProduct, getAllProducts, getProductById, getSearch } from './controllers/products_controller.js'
import { addUser, connectUser, getAllUsers, userLogout } from './controllers/user_controller.js'
import sessionIsValid from './security/session.js'

const router = express.Router()

// Route product

router.get('/product', getAllProducts)
router.get('/product/:id', getProductById)

router.post('/product/new', addProduct)
router.post('/search/product', getSearch)

// Route utilisateur

router.get('/users', getAllUsers)
router.post('/users/new', addUser)
router.post('/users/login', connectUser)
router.post('/users/logout', userLogout)

// Vérification du token

router.get('/api/session', sessionIsValid)

export default router