import express from 'express'
import { addProduct, deleteProductId, getAllProduct, getLikeProduct, getNumberProduct, getProductById, getProductPage, likeProduct, updateProduct } from './controllers/products_controller.js'
import { addUser, connectUser, deleteUser, editEmail, editFirstName, editNumberPhone, editUsername, getAllUsers, getNumberUser, sessionIsValid, updateUser, userExist, userLogout } from './controllers/user_controller.js'
import { uploadProfil, uploadProduct, uploadProfilFile } from './controllers/uploadFile_controller.js'
import getCarts, { addProductCart, deleteItemsCart } from './controllers/cart_controller.js'

const router = express.Router()

// Route utilisateur

router.get('/users', getAllUsers)
router.get('/countUser', getNumberUser)
router.post('/users/new', addUser)
router.post('/users/login', connectUser)
router.post('/users/search', userExist)

router.put('/users/:id', userLogout)
router.put('/updateUser/:id', updateUser)
router.put('/editUsername/:id', editUsername)
router.put('/editEmail/:id', editEmail)
router.put('/editNumberPhone/:id', editNumberPhone)
router.put('/editFirstName/:id', editFirstName)
router.put('/editPicture/:id', editFirstName)

router.delete('/deleteUser/:id', deleteUser)

// Route product

router.get('/productNumber', getNumberProduct)
router.get('/product/:id', getProductById)
router.get('/allProduct', getAllProduct)
router.get(`/getLikedProducts/:id`, getLikeProduct)

router.post('/productPage', getProductPage)
router.post('/likeProduct', likeProduct)
router.post('/product/new', uploadProduct.array('files'), addProduct)

router.put('/updateProduct/:id', updateProduct)

router.delete(`/deleteProduct/:id`, deleteProductId)

// Cart router

router.post('/carts', getCarts)
router.post('/cart/newItem', addProductCart)

router.delete('/deleteItemsCart/:id', deleteItemsCart)

// Vérification du token

router.post('/api/session', sessionIsValid)

// Upload de fichier

router.put('/upload', uploadProfil.single('file'), uploadProfilFile)



export default router