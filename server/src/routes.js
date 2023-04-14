import express from 'express'
import { addProduct, getAllProducts, getProductById, getSearch } from './controllers/products_controller.js'
import { addUser, getAllUsers } from './controllers/user_controller.js'

const router = express.Router()

// Route product

router.get('/product', getAllProducts)
router.get('/product/:id', getProductById)

router.post('/product', addProduct)
router.post('/search/product', getSearch)

// Route utilisateur

router.get('/users', getAllUsers)
router.post('/users/new', addUser)

export default router