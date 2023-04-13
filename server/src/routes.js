import express from 'express'
import { addProduct, getAllProducts, getNextProduct, getProductById, getSearch } from './controllers/products_controller.js'

const router = express.Router()

router.get('/product', getAllProducts)
router.get('/product/:id', getProductById)
router.post('/product', addProduct)

router.post('/search/product', getSearch)

export default router