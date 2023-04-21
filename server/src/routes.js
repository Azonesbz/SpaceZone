import express from 'express'
import { addProduct, getAllProducts, getProductById, getSearch } from './controllers/products_controller.js'
import { addUser, connectUser, getAllUsers, sessionIsValid, updateUserPseudo, userLogout } from './controllers/user_controller.js'
import { upload, uploadFile } from './controllers/uploadFile_controller.js'
import { updatePseudo } from './repository/user_repository.js'

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
router.put('/users/:id', userLogout)

router.put('/updatePseudo/:id', updateUserPseudo)

// Vérification du token

router.post('/api/session', sessionIsValid)

// Upload de fichier

router.post('/upload', upload.single('file'), uploadFile)

export default router