import express from 'express'
import { addProduct, getNumberProduct, getProductById, getProducts, getSearch } from './controllers/products_controller.js'
import { addUser, connectUser, deleteUser, editEmail, editFirstName, editNumberPhone, editUsername, getAllUsers, sessionIsValid, updateUser, userExist, userLogout } from './controllers/user_controller.js'
import { upload, uploadFile } from './controllers/uploadFile_controller.js'
import getCarts, { addProductCart } from './controllers/cart_controller.js'

const router = express.Router()

// Route product

router.get('/allproduct', getNumberProduct)
router.get('/product/:id', getProductById)

router.post('/product', getProducts)
router.post('/product/new', addProduct)
router.post('/search/product', getSearch)

// Route utilisateur

router.get('/users', getAllUsers)

router.post('/users/new', addUser)
router.post('/users/login', connectUser)
router.post('/users/search', userExist)

router.put('/users/:id', userLogout)
router.put('/updateUser/:id', updateUser)
router.put('/editUsername/:id', editUsername)
router.put('/editEmail/:id', editEmail)
router.put('/editNumberPhone/:id', editNumberPhone)
router.put('/editFirstName/:id', editFirstName)

router.delete('/deleteUser/:id', deleteUser)

// Panier utilisateur

router.post('/carts', getCarts)
router.post('/cart/newItem', addProductCart)

// Vérification du token

router.post('/api/session', sessionIsValid)

// Upload de fichier

router.post('/upload', upload.single('file'), uploadFile)

export default router